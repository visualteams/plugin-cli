import { Command } from "@oclif/command";
import { execSync } from "child_process";

export class AppCompiler {
  private command = null;

  constructor(private _command: Command) {
    this.command = _command;
  }

  public build() {
    execSync("npm run build:server");

    execSync("npm run build:client");
  }
}
