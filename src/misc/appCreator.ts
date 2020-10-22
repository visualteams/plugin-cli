import { exec } from "child_process";
import * as fs from "fs";

import { FolderDetails } from "./folderDetails";
import { packageJsonTemplate } from "../templates/packageJsonTemplate";
import { gitIgnoreTemplate } from "../templates/gitIgnoreTemplate";
import { tsConfigClientTemplate } from "../templates/tsConfigClientTemplate";
import { tsConfigServerTemplate } from "../templates/tsConfigServerTemplate";
import { mainClientTemplate } from "../templates/mainClientTemplate";
import { mainServerTemplate } from "../templates/mainServerTemplate";
import { htmlTemplate } from "../templates/htmlTemplate";

export class AppCreator {
  constructor(private fd: FolderDetails) {}

  public async writeFiles(): Promise<void> {
    fs.mkdirSync(this.fd.folder);
    fs.mkdirSync(this.fd.mergeWithFolder("server"));
    fs.mkdirSync(this.fd.mergeWithFolder("src"));
    fs.mkdirSync(this.fd.mergeWithFolder("public"));
    this.createMainClientFile();
    this.createMainServerFile();
    this.createTsConfigClient();
    this.createTsConfigServer();
    this.createPackageJson();
    this.createGitIgnore();
    this.createPublicHtml();

    await this.runNpmInstall();
  }

  private createMainClientFile(): void {
    const toWrite = mainClientTemplate();
    fs.writeFileSync(
      this.fd.mergeWithFolder("/src/index.tsx"),
      toWrite,
      "utf8"
    );
  }

  private createMainServerFile(): void {
    const toWrite = mainServerTemplate();
    fs.writeFileSync(
      this.fd.mergeWithFolder("/server/index.ts"),
      toWrite,
      "utf8"
    );
  }

  private createTsConfigClient(): void {
    const toWrite = tsConfigClientTemplate();
    fs.writeFileSync(this.fd.mergeWithFolder("tsconfig.json"), toWrite, "utf8");
  }

  private createTsConfigServer(): void {
    const toWrite = tsConfigServerTemplate();
    fs.writeFileSync(
      this.fd.mergeWithFolder("tsconfig.server.json"),
      toWrite,
      "utf8"
    );
  }

  private createPackageJson(): void {
    const toWrite = packageJsonTemplate(this.fd.plugin);
    fs.writeFileSync(this.fd.mergeWithFolder("package.json"), toWrite, "utf8");
  }

  private createGitIgnore(): void {
    const toWrite = gitIgnoreTemplate();
    fs.writeFileSync(this.fd.mergeWithFolder(".gitignore"), toWrite, "utf8");
  }

  private createPublicHtml(): void {
    const toWrite = htmlTemplate();
    fs.writeFileSync(
      this.fd.mergeWithFolder("public/index.html"),
      toWrite,
      "utf8"
    );
  }

  // tslint:disable-next-line:promise-function-async
  private runNpmInstall(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(
        "npm install",
        {
          cwd: this.fd.folder,
        },
        (e) => {
          if (e) {
            reject();
            return;
          }

          resolve();
        }
      );
    });
  }
}
