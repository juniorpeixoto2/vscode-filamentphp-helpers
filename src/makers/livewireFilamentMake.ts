import * as vscode from "vscode";
import execCmd from "../commons/execCmd";
import checkSailExist from "../commons/checkSailExist";

export default async function livewireFilamentMake(type: string) {
  const name = await vscode.window.showInputBox({
    placeHolder: "Component Name",
    prompt: "Enter the Component Name",
  });

  if (!name) {
    vscode.window.showErrorMessage(
      "A Name is mandatory to execute this action"
    );
    return;
  }

  const model = await vscode.window.showInputBox({
    placeHolder: "Model Name (is case sensitive)",
    prompt: "Enter the Model Name (is case sensitive)",
  });

  if (!name) {
    vscode.window.showErrorMessage(
      "A Model Name is mandatory to execute this action"
    );
    return;
  }

  if (name !== undefined) {
    const prefixArtisan = await checkSailExist();
    const command = `${prefixArtisan} make:livewire-${type} ${name} ${model} --generate ${
      type === "table" ? "" : "--edit"
    }`;

    await execCmd(command);
  }
}
