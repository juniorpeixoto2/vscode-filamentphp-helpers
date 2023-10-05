import * as vscode from "vscode";
import execCmd from "../execCmd";

interface FilamentMakeType {
  commandMaker: string;
  requiredPanelName: boolean;
}

export default async function filamentMake({
  commandMaker,
  requiredPanelName = true,
}: FilamentMakeType) {
  const inputNameUpper =
    commandMaker.charAt(0).toUpperCase() + commandMaker.slice(1);

  const name = await vscode.window.showInputBox({
    placeHolder: `${inputNameUpper} Name`,
    prompt: `Enter the ${inputNameUpper} Name`,
  });

  if (!name) {
    vscode.window.showErrorMessage(
      `A ${inputNameUpper} Name is mandatory to execute this action`
    );
    return;
  }

  let panelName;
  if (requiredPanelName) {
    panelName = await vscode.window.showInputBox({
      placeHolder: "Panel Name (Default: admin)",
      prompt: "Enter the name of the panel for which it will be generated",
    });

    if (panelName === "") {
      panelName = "admin";
    }
  }

  if (name !== undefined) {
    const command = `php artisan make:filament-${commandMaker} ${name} ${
      panelName ? `--panel=${panelName}` : ""
    }`;
    execCmd(command);
  }
}
