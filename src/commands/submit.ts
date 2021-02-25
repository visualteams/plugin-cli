import { Command, flags } from "@oclif/command";
const chalk = require("chalk");
import cli from "cli-ux";
import { FolderDetails } from "../misc/folderDetails";
import { AppCompiler } from "../misc/appCompiler";
import { AppPackager } from "../misc/appPackager";

export default class Submit extends Command {
  public static description = "submits an App to the Marketplace for review";

  public static flags = {
    help: flags.help({ char: "h" }),
    update: flags.boolean({
      description: "submits an update instead of creating one",
    }),
  };

  public async run() {
    const { flags } = this.parse(Submit);

    cli.action.start(`${chalk.green("Packaging")} your app`);

    const fd = new FolderDetails(this);

    try {
      await fd.readInfoFile();
    } catch (error) {
      this.error(error && error.message ? error.message : error);
      return;
    }

    const compiler = new AppCompiler(this);

    try {
      compiler.build();
    } catch (error) {
      this.error(error && error.message ? error.message : error);
      return;
    }

    const packager = new AppPackager(this, fd);
    try {
      const zipName = await packager.compress();

      cli.action.stop(`packaged ! (${zipName})`);
    } catch (error) {
      this.error(error && error.message ? error.message : error);
    }
  }
}
