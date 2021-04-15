import { Command } from "@oclif/command";
const targz = require("targz");
import { FolderDetails } from "./folderDetails";
import * as path from "path";

export class AppPackager {
  constructor(private command: Command, private fd: FolderDetails) {}

  public async compress() {
    const dest = `/tmp/${this.fd.plugin.name}-${this.fd.plugin.version}.tar.gz`;

    await new Promise((resolve, reject) =>
      targz.compress(
        {
          src: ".",
          dest,
          tar: {
            ignore: function (name) {
              return path.dirname(name).includes("node_modules");
            },
          },
        },
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      )
    );

    return {
      filePath: dest,
      version: this.fd.plugin.version,
      pluginName: this.fd.plugin.name,
    };
  }
}
