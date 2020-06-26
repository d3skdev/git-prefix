import * as vscode from "vscode";
import { GitExtension, Repository } from "./api/git";

export function activate(context: vscode.ExtensionContext) {
  for (let index = 1; index < 5; index++) {
    let disposable = vscode.commands.registerCommand(
      `gitPrefix.setMessage${index}`,
      async (uri?) => {
        const git = getGitExtension();

        if (!git) {
          vscode.window.showErrorMessage("Unable to load Git Extension");
          return;
        }

        vscode.commands.executeCommand("workbench.view.scm");

        if (uri) {
          const selectedRepository = git.repositories.find((repository) => {
            return repository.rootUri.path === uri._rootUri.path;
          });

          if (selectedRepository) {
            await prefixCommit(selectedRepository, index);
          }
        } else {
          for (let repo of git.repositories) {
            await prefixCommit(repo, index);
          }
        }
      }
    );
    context.subscriptions.push(disposable);
  }
}

function isJiraFormat(string: string): string {
  const pattern = vscode.workspace.getConfiguration().get("gitPrefix.pattern");

  if (pattern === "(.*)") {
    return new RegExp(/(\w+-\d+)/g).test(string) ? "(\\w+-\\d+)" : "(.*)";
  } else {
    return vscode.workspace
      .getConfiguration()
      .get("gitPrefix.pattern") as string;
  }
}

async function prefixCommit(repository: Repository, index: number) {
  const branchName =
    (repository.state.HEAD && repository.state.HEAD.name) || "";
  const prefixPattern: string = isJiraFormat(branchName);
  const ignoreCase: boolean =
    vscode.workspace.getConfiguration().get("gitPrefix.patternIgnoreCase") ||
    false;
  const branchRegEx = ignoreCase
    ? new RegExp(prefixPattern, "i")
    : new RegExp(prefixPattern);
  const prefixReplacement: string =
    vscode.workspace
      .getConfiguration()
      .get(`gitPrefix.replacement #${index}`) || "[$1]* ";

  if (branchRegEx.test(branchName)) {
    const match = branchName.match(branchRegEx)![0];
    const ticket = match.replace(branchRegEx, prefixReplacement);
    console.log({ branchName, ticket, match, prefixReplacement });
    repository.inputBox.value = `${ticket}${repository.inputBox.value}`;
  } else {
    const message = `Pattern ${prefixPattern} not found in branch ${branchName}`;
    const editPattern = "Edit Pattern";
    let result = await vscode.window.showErrorMessage(
      message,
      { modal: false },
      editPattern
    );
    if (result === editPattern) {
      vscode.commands.executeCommand("workbench.action.openSettings");
      vscode.commands.executeCommand("settings.action.clearSearchResults");
    }
  }
}

function getGitExtension() {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>("vscode.git");
  const gitExtension = vscodeGit && vscodeGit.exports;
  return gitExtension && gitExtension.getAPI(1);
}

// called when extension is deactivated
export function deactivate() {}
