import { window } from "vscode";
import * as cp from "child_process";
import getWorkPath from "./getWorkPath";

export default async function execCmd(command: string) {
  const pathWork = await getWorkPath();

  cp.exec(command, { cwd: pathWork }, (err: any, stdout: any, stderr: any) => {
    if (err) {
      window.showErrorMessage(`Failed to execute command: ${err.toString()}`);
    }
  });
}
