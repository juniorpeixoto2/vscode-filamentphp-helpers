import * as vscode from "vscode";
import getWorkPath from "./getWorkPath";

export default async function checkSailExist() {
  const fs = require("fs");
  const pathWork = await getWorkPath();

  let artisanPrefix = "php artisan ";

  const dockerComposerFile = `${pathWork}/docker-compose.yml`;
  if (fs.existsSync(dockerComposerFile)) {
    const method = await vscode.window.showQuickPick(
      [
        {
          label: "sail Artisan..",
          value: "artisan",
        },
        {
          label: "php artisan..",
          value: "php",
        },
      ],
      {
        placeHolder: "Select the Method to execute",
      }
    );

    if (method?.value === "artisan") {
      artisanPrefix = "./vendor/bin/sail artisan ";
    }
  }

  return artisanPrefix;
}
