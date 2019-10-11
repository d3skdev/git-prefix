# Git commit message helper

## New in 1.2.0

- Added 4 different buttons.
- Remove unmatched regex.

## Features

Insert a value from the current branch name into the Source Control Git Message box.

![Demo Git Prefix](images/demo.gif)

## Usage

- Open the Command Palette `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS)
- Type `Git Prefix Commit Message` and hit `return`
- The matching branch pattern is prefixed in the Git Message box

## Extension Settings

This extension contributes the following settings using JavaScript regular expression syntax:

- `gitPrefix.pattern`: Regular expression pattern to match in the branch name. Default matches
  entire branch name.
  > Tip: Match a ticket in a branch created by Jira using a pattern such as: `.*(TEST-\d+).*`

* `gitPrefix.patternIgnoreCase`: Ignore case in pattern. Default is `false`.
* `gitPrefix.replacement`: Regular expression replacement string to place into commit message. Default is `"[$1] "`.

**Happy Committing!**
