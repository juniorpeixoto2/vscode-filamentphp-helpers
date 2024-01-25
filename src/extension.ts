import * as vscode from "vscode";
import widgetMake from "./makers/widgetMake";
import customPagesMake from "./makers/customPagesMake";
import filamentMake from "./makers/filamentMake";
import relationManagersMake from "./makers/relationManagersMake";
import resourceMake from "./makers/resourceMake";
import livewireMake from "./makers/livewireMake";
import livewireFilamentMake from "./makers/livewireFilamentMake";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("make.widget", async () => {
    widgetMake();
  });

  vscode.commands.registerCommand("make.custom.page", async () => {
    customPagesMake();
  });

  vscode.commands.registerCommand("make.relation.manager", async () => {
    relationManagersMake();
  });

  vscode.commands.registerCommand("make.resource", async () => {
    resourceMake();
  });

  vscode.commands.registerCommand("make.panel", async () => {
    filamentMake({ commandMaker: "panel", requiredPanelName: false });
  });

  vscode.commands.registerCommand("make.theme", async () => {
    filamentMake({ commandMaker: "theme", requiredPanelName: false });
  });

  vscode.commands.registerCommand("make.livewire.component", async () => {
    livewireMake();
  });

  vscode.commands.registerCommand("make.livewire.filament.table", async () => {
    livewireFilamentMake("table");
  });

  vscode.commands.registerCommand("make.livewire.filament.form", async () => {
    livewireFilamentMake("form");
  });
}

export function deactivate() {}
