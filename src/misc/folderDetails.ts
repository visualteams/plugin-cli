import Command from "@oclif/command";
import * as chalk from "chalk";
import * as figures from "figures";
import * as fs from "fs-extra";
import * as path from "path";
import * as process from "process";
import * as tv4 from "tv4";

import { packageJsonSchema } from "./packageJsonSchema";

export class FolderDetails {
  public folder: string;

  public toZip: string;

  public infoFile: string;

  public plugin: Record<string, any>;

  constructor(private command: Command) {
    this.setFolder(process.cwd());
    this.plugin = {};
  }

  public async doesFileExist(file: string): Promise<boolean> {
    return (await fs.pathExists(file)) && fs.statSync(file).isFile();
  }

  public mergeWithFolder(item: string): string {
    return path.join(this.folder, item);
  }

  public setFolder(folderPath: string): void {
    this.folder = folderPath;
    this.toZip = path.join(this.folder, "{,!(node_modules|test)/**/}*.*");
    this.infoFile = path.join(this.folder, "package.json");
  }

  /**
   * Validates the "package.json" file, loads it, and then retrieves the classFile property from it.
   * Throws an error when something isn't right.
   */
  public async readInfoFile(): Promise<void> {
    if (!(await this.doesFileExist(this.infoFile))) {
      throw new Error(
        'No App found to package. Missing an "package.json" file.'
      );
    }

    try {
      this.plugin = require(this.infoFile);
    } catch (e) {
      throw new Error('The "package.json" file is invalid.');
    }

    // This errors out if it fails
    this.validateAppDotJson();

    const homepageRef = `plugins/${this.plugin.name}`;
    if (this.plugin.homepage !== homepageRef)
      throw new Error(
        `The homepage variable is invalid. Must be ${homepageRef}`
      );
  }

  private validateAppDotJson(): void {
    const result = tv4.validateMultiple(this.plugin, packageJsonSchema);

    // We only care if the result is invalid, as it should pass successfully
    if (!this.isValidResult(result)) {
      this.reportFailed(result.errors.length, result.missing.length);

      result.errors.forEach((e: tv4.ValidationError) => this.reportError(e));
      result.missing.forEach((v: string) => this.reportMissing(v));

      throw new Error(
        'Invalid "package.json" file, please ensure it matches the schema.'
      );
    }
  }

  public setAppInfo(appInfo): void {
    this.plugin = appInfo;
  }

  private isValidResult(result: tv4.MultiResult): boolean {
    return result.valid && result.missing.length === 0;
  }

  private reportFailed(errorCount: number, missingCount: number): void {
    const results = [];
    if (errorCount > 0) {
      results.push(chalk.red(`${errorCount} validation error(s)`));
    }

    if (missingCount > 0) {
      results.push(chalk.red(`${missingCount} missing schema(s)`));
    }

    this.command.log(
      chalk.red(figures.cross),
      chalk.cyan(this.infoFile),
      results.length > 0 ? `has ${results.join(" and ")}` : ""
    );
  }

  private reportError(error: tv4.ValidationError, indent = "  ") {
    this.command.log(
      indent,
      chalk.red(`${figures.pointerSmall} Error:`),
      error.message || "No error message provided by validation module"
    );

    this.command.log(
      indent,
      "  at",
      chalk.blue(error.dataPath || "/"),
      "against schema",
      chalk.blue(error.schemaPath || "/")
    );

    if (error.subErrors) {
      error.subErrors.forEach((err) => this.reportError(err, `${indent}  `));
    }
  }

  private reportMissing(uri: string, indent = "  ") {
    this.command.log(
      indent,
      chalk.red(`${figures.pointerSmall} Missing:`),
      uri
    );
  }
}
