import * as vscode from "vscode";
import execCmd from "../execCmd";

export default async function widgetMake() {
  const widgetName = await vscode.window.showInputBox({
    placeHolder: "Widget Name",
    prompt: "Enter the Widget Name",
  });

  if (!widgetName) {
    vscode.window.showErrorMessage(
      "A Widget Name is mandatory to execute this action"
    );
    return;
  }

  const resourceName = await vscode.window.showInputBox({
    placeHolder: "Resource Name",
    prompt: "Enter the Resource Name",
  });

  if (resourceName === "") {
    vscode.window.showErrorMessage(
      "A Resource Name is mandatory to execute this action"
    );
    return;
  }

  //@todo auto select widget type
  const widgetTypeName = await vscode.window.showQuickPick(
    [
      {
        label: "Custom",
        value: "",
      },
      // {
      //   label: "Chart",
      //   value: "--chart",
      // },
      {
        label: "Stats Overview",
        value: "--stats-overview",
      },
      {
        label: "Table",
        value: "--table",
      },
    ],
    {
      placeHolder: "Select Widget Type",
    }
  );

  const widgetType = widgetTypeName?.value;
  let widgetTypeChartValue;

  let panelName = await vscode.window.showInputBox({
    placeHolder: "Panel Name (Default: admin)",
    prompt: "Enter the name of the panel for which it will be generated",
  });

  if (panelName === "") {
    panelName = "admin";
  }

  if (widgetType === "--chart") {
    const widgetTypeChart = await vscode.window.showQuickPick(
      [
        {
          label: "Bar chart",
          value: "--typeChart=barChart",
        },
        {
          label: "Bubble chart ",
          value: "--typeChart=bubble",
        },
        {
          label: " Doughnut chart",
          value: "--typeChart=doughnut",
        },
        {
          label: "Line chart",
          value: "--typeChart=line",
        },
        {
          label: "Pie chart",
          value: "--typeChart=pie",
        },
      ],
      {
        placeHolder: "Select Widget Type",
      }
    );

    widgetTypeChartValue = widgetTypeChart?.value;
  }

  const command = `php artisan make:filament-widget ${widgetName} --resource=${resourceName} ${widgetType} --panel=${panelName}`;
  execCmd(command);
}
