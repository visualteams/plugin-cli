import { Command, flags } from "@oclif/command";
const chalk = require("chalk");

import { CloudAuth } from "../misc/cloudAuth";

export default class Login extends Command {
  public static description =
    "steps through the process to log out with VisualTeams Cloud";

  public static flags = {
    help: flags.help({ char: "h" }),
  };

  public async run() {
    const cloudAuth = new CloudAuth();
    try {
      await cloudAuth.hasToken();
      await cloudAuth.logout();
      console.log(chalk.green("success, you are already logged out!"));
    } catch (error) {
      console.log(chalk.red("failure."));
    }
  }
}
