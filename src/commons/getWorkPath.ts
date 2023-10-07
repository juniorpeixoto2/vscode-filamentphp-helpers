import { workspace } from "vscode";

export default async function getWorkPath() {
  return workspace.workspaceFolders && workspace.workspaceFolders[0].uri.fsPath;
}
