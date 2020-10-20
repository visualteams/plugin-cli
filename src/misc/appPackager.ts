import { Command } from "@oclif/command";
const targz = require("targz");
import { FolderDetails } from "./folderDetails";

export class AppPackager {
  constructor(private command: Command, private fd: FolderDetails) {}

  public async compress() {
    const dest = `/tmp/${this.fd.info.name}-${this.fd.info.version}.tar.gz`;

    await new Promise((resolve, reject) =>
      targz.compress(
        {
          src: ".",
          dest,
        },
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      )
    );

    return dest;
  }
}
