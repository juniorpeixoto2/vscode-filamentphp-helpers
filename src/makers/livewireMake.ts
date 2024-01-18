import * as vscode from "vscode";
import execCmd from "../commons/execCmd";
import checkSailExist from "../commons/checkSailExist";

export default async function livewireMake() {
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

  if (name !== undefined) {
    const prefixArtisan = await checkSailExist();
    const command = `${prefixArtisan} make:livewire ${name}`;

    await execCmd(command);
  }
}
