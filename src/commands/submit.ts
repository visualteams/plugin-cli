import { Command, flags } from "@oclif/command";
const chalk = require("chalk");
const FormData = require("form-data");
import axios from "axios";
import cli from "cli-ux";
import * as fs from "fs";

import { FolderDetails } from "../misc/folderDetails";
import { AppCompiler } from "../misc/appCompiler";
import { AppPackager } from "../misc/appPackager";
import { CloudAuth } from "../misc/cloudAuth";

export default class Submit extends Command {
  public static description = "submits an App to the Marketplace for review";

  public static flags = {
    help: flags.help({ char: "h" }),
  };

  public async run() {
    try {
      const { flags } = this.parse(Submit);

      const cloudAuth = new CloudAuth();

      const token = await cloudAuth.hasToken();

      if (!token) cli.error("You must be logged in");

      cli.action.start(`${chalk.green("Packaging")} your app`);

      const fd = new FolderDetails(this);

      await fd.readInfoFile();

      const compiler = new AppCompiler(this);

      compiler.build();

      const packager = new AppPackager(this, fd);
      const appCompressed = await packager.compress();

      cli.action.stop(`packaged ! (${appCompressed.filePath})`);

      cli.action.start(`${chalk.green("Publishing")} your app`);

      const pluginsList = await axios.get("/plugins", {
        params: {
          name: appCompressed.pluginName,
        },
      });

      const pluginId = pluginsList.data[0].id;

      console.log("pluginId:", pluginId);

      const form_data = new FormData();
      form_data.append("plugindId", pluginId);
      form_data.append("version", appCompressed.version);
      form_data.append(
        "minTargetVersion",
        fd.plugin.visualteams.minTargetVersion
      );
      form_data.append(
        "maxTargetVersion",
        fd.plugin.visualteams.maxTargetVersion
      );
      form_data.append("file", fs.createReadStream(appCompressed.filePath));

      console.log('cloudAuth.getHeaders():', cloudAuth.getHeaders());

      await axios.post("/versions/publish", {
        headers: cloudAuth.getHeaders(),
        data: form_data,
      });

      cli.action.stop(`published !`);
    } catch (error) {
      this.error(error && error.message ? error.message : error);
    }
  }
}
