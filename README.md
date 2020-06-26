# Git commit message helper

### 1.3.0 (2020-06-26)

- Detect branch name created by Jira
- Improvements

## Features

Insert a value from the current branch name into the Source Control Git Message box.

![Demo Git Prefix](images/demo.gif)

## Customizations

- Open the Command Palette `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS)
- Type `Git Prefix Commit Message` and hit `return`
- The matching branch pattern is prefixed in the Git Message box

## Extension Settings

This extension contributes the following settings using JavaScript regular expression syntax:

- `gitPrefix.pattern`: Regular expression pattern to match in the branch name. Default matches
  entire branch name or branch created by Jira.

* `gitPrefix.patternIgnoreCase`: Ignore case in pattern. Default is `false`.
* `gitPrefix.replacement`: Regular expression replacement string to place into commit message. Default is `"[$1] "`.

**Happy Committing!**
