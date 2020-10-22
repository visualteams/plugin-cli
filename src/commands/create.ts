import { Command, flags } from "@oclif/command";
import * as chalk from "chalk";
import { cli } from "cli-ux";
import * as path from "path";
import { FolderDetails } from "../misc/folderDetails";
import { AppCreator } from "../misc/appCreator";

export default class Create extends Command {
  public static description = "create a VisualTeams plugin from template";

  public static flags = {
    help: flags.help({ char: "h" }),
    name: flags.string({
      char: "n",
      description: "Internal Name of the plugin",
    }),
    displayName: flags.string({
      char: "n",
      description: "Public Name of the plugin",
    }),
    description: flags.string({
      char: "d",
      description: "Description of the plugin",
    }),
  };

  public async run() {
    this.log("Let's get started creating your app.");
    this.log("We need some information first:");
    this.log("");

    const plugin = {
      name: "",
      displayName: "",
      version: "0.0.1",
      description: "",
    };

    const { flags } = this.parse(Create);
    plugin.name = flags.name
      ? flags.name
      : await cli.prompt(chalk.bold("   Internal Name"));
    plugin.displayName = flags.displayName
      ? flags.displayName
      : await cli.prompt(chalk.bold("   Public Name"));
    plugin.description = flags.description
      ? flags.description
      : await cli.prompt(chalk.bold("   Plugin Description"));

    const folder = path.join(process.cwd(), plugin.name);

    cli.action.start(`Creating a VisualTeams Plugin in ${chalk.green(folder)}`);

    const fd = new FolderDetails(this);
    fd.setAppInfo(plugin);
    fd.setFolder(folder);

    const creator = new AppCreator(fd, this);
    await creator.writeFiles();

    try {
      await fd.readInfoFile();
    } catch (error) {
      this.error(error && error.message ? error.message : error);
      return;
    }

    cli.action.stop(chalk.cyan("done!"));
  }
}
