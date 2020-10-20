import axios from "axios";
import Conf = require("conf");

import SETTINGS from "../settigns";

axios.defaults.baseURL = SETTINGS.BASE_URL;

export class CloudAuth {
  private config: Conf;

  private async initialize(): Promise<void> {
    if (typeof this.config !== "undefined") {
      return;
    }

    this.config = new Conf({
      projectName: "com.visualteams.plugin-cli",
    });
  }

  public async login({ email, password }): Promise<boolean> {
    try {
      const res = await axios.post("/auth/login", null, {
        params: { email, password },
      });

      const access_token = res.data.access_token;

      const storageItem = {
        access_token,
      };

      this.config.set("vtplugin", storageItem);

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async logout(): Promise<boolean> {
    this.config.set("vtplugin", {});
  }

  private getHeaders(): Record<string, any> {
    return {
      Authorization: `Bearer ${this.config.get("vtplugin.access_token")}`,
    };
  }

  public async getProfil(): Promise<Record<string, any>> {
    try {
      const res = await axios.get("/auth/profile", {
        headers: this.getHeaders(),
      });

      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async hasToken(): Promise<boolean> {
    await this.initialize();

    return this.config.has("vtplugin.access_token");
  }
}
