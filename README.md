# Cowsays

A simplified Node.js based cowsay CLI with zero external dependencies.

```bash
$ cowsays "hello
there
bob,
how is it going????"
 ---------------------
/ hello               \
| there               |
| bob,                |
\ how is it going???? /
 ---------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Project Requirements/Goals

The original cowsay Homebrew formulae has been deprecated and I wanted a replacement!

* Node.js CLI that can take either command arguments or piped input from another command
* Zero dependencies — use Node.js with zero external packages
* Simplified version of cowsay:
  * Only does the default cowsay cow (`default.cow` from the original cowsay)
  * No changing eyes, tongue, or thought bubbles (this wouldn't be that difficult to do)

I also decided to maintain any newline characters from the input text and chop them in length.
The original cowsay command strips newline characters and then chops each line to about 40 characters long.

## Installation

Use the Node.js version specified in project's `.nvmrc` file.

**Note:** command used is `cowsays` (with an "s") to not interfere with original `cowsay` command if installed.

```bash
git clone <git@github.com:wdzajicek/cowsays.git>
cd cowsays
npm i -g .
```

## Usage

```bash
# Pass input as command line argument:
$ cowsays 'Hello, World!'
 ---------------
< Hello, World! >
 ---------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

# Pipe input from another command:
$ echo 'Hello, World!' | cowsays
 ---------------
< Hello, World! >
 ---------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
