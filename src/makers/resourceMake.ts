import * as vscode from "vscode";
import execCmd from "../commons/execCmd";
import checkSailExist from "../commons/checkSailExist";

export default async function resourceMake() {
  const name = await vscode.window.showInputBox({
    placeHolder: `Resource Name`,
    title: "Resource Name",
    prompt: `Enter the Resource Name`,
  });

  if (!name) {
    vscode.window.showErrorMessage(
      `A Resource Name is required to execute this action`
    );
    return;
  }

  const options = await vscode.window.showQuickPick(
    [
      {
        label: "Generating table columns (--generate)",
        value: " --generate",
      },
      {
        label: "View page",
        value: " --view",
      },
      {
        label: "Soft delete",
        value: " --soft-deletes",
      },
      {
        label: "Simple",
        value: " --simple",
      },
    ],
    {
      placeHolder: "Select extra options (Optional)",
      title: "Select extra options",
      canPickMany: true,
    }
  );

  let extraOptions = "";
  if (options) {
    for (const option of options) {
      extraOptions += option?.value;
    }
  }

  let panelName;
  panelName = await vscode.window.showInputBox({
    placeHolder: "Panel Name (Default: admin)",
    title: "Panel Name",
    prompt: "Enter the name of the panel for which it will be generated",
  });

  if (panelName === "") {
    panelName = "admin";
  }

  if (name !== undefined) {
    const prefixArtisan = await checkSailExist();
    const command = `${prefixArtisan} make:filament-resource ${name} ${extraOptions} ${
      panelName ? `--panel=${panelName}` : ""
    }`;

    await execCmd(command);
  }
}
