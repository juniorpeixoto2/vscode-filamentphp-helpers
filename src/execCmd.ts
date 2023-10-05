import { window, workspace } from "vscode";
import * as cp from "child_process";

export default async function execCmd(command: string) {
  const pathWork =
    workspace.workspaceFolders && workspace.workspaceFolders[0].uri.fsPath;

  cp.exec(command, { cwd: pathWork }, (err: any, stdout: any, stderr: any) => {
    if (err) {
      window.showErrorMessage(`Failed to execute command: ${err.toString()}`);
    }
  });
}
