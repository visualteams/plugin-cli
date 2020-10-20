import { Command, flags } from "@oclif/command";
const chalk = require("chalk");
import cli from "cli-ux";
import * as inquirer from "inquirer";

import { CloudAuth } from "../misc/cloudAuth";

export default class Login extends Command {
  public static description =
    "steps through the process to log in with VisualTeams Cloud";

  public static flags = {
    help: flags.help({ char: "h" }),
  };

  public async run() {
    inquirer.registerPrompt(
      "checkbox-plus",
      require("inquirer-checkbox-plus-prompt")
    );

    const cloudAuth = new CloudAuth();
    const hasToken = await cloudAuth.hasToken();
    let isAlreadyAuth = false;

    if (hasToken) {
      cli.action.start(chalk.green("Verifying") + " your token...");
      try {
        await cloudAuth.getProfil();
        cli.action.stop(chalk.green("success, you are already logged in!"));
        isAlreadyAuth = true;
      } catch (error) {
        cli.action.stop(chalk.red("failure."));
      }
    }

    if (!isAlreadyAuth) {
      try {
        const inputs = await inquirer.prompt([
          {
            type: "input",
            name: "email",
            message: "Email: ",
            validate: (v) => Boolean(v),
          },
          {
            type: "password",
            name: "password",
            message: "Password: ",
            validate: (v) => Boolean(v),
          },
        ]);

        cli.action.start(chalk.green("Trying") + " to login...");
        await cloudAuth.login(inputs);
        cli.action.stop(chalk.green("success!"));
      } catch (error) {
        cli.action.stop(chalk.red("failed to authenticate."));
      }
    }
  }
}
