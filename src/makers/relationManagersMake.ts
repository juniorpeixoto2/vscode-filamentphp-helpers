import * as vscode from "vscode";
import execCmd from "../commons/execCmd";
import checkSailExist from "../commons/checkSailExist";

export default async function relationManagersMake() {
  const resourceName = await vscode.window.showInputBox({
    placeHolder: "Resource Name",
    prompt: "Enter the Resource Name",
  });

  if (!resourceName) {
    vscode.window.showErrorMessage(
      "A Resource name is mandatory to execute this action"
    );
    return;
  }

  const relationshipName = await vscode.window.showInputBox({
    placeHolder: "What is the relationship?",
    prompt: "What is the relationship?",
  });

  if (relationshipName === "") {
    vscode.window.showErrorMessage(
      "A Relationship name is mandatory to execute this action"
    );
    return;
  }

  const attributeName = await vscode.window.showInputBox({
    placeHolder: "Attribute Name (name)",
    prompt: "What is the title attribute?",
  });

  if (attributeName === "") {
    vscode.window.showErrorMessage(
      "A Attribute Name is mandatory to execute this action"
    );
    return;
  }

  let panelName = await vscode.window.showInputBox({
    placeHolder: "Panel Name (Default: admin)",
    prompt: "Enter the name of the panel for which it will be generated",
  });

  if (panelName === "") {
    panelName = "admin";
  }

  const prefixArtisan = await checkSailExist();
  const command = `${prefixArtisan} make:filament-relation-manager ${resourceName} ${relationshipName} ${attributeName} --panel=${panelName}`;
  await execCmd(command);
}
