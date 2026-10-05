# Contributing

## Setting up

You need Node 24 and pnpm 12.

```sh
pnpm install
```

| What | Command |
| --- | --- |
| Write the theme files from `source/` | `pnpm build` |
| Check the theme files: up to date, and every color at level AA | `pnpm test` |
| Check, then package the extension into `dist/` | `pnpm package` |

## Changing a color

Colors live in `source/`, never in `themes/`, which `pnpm build` overwrites:

- **Interface colors** (backgrounds, text, the accent) come from `@itrium/palettes`. Change
  them there, release that package, then update the pinned version here.
- **Syntax and terminal colors** are in `source/colors.mjs`. They match the Rhodonite terminal
  themes; change both together.
- **Which color goes where** is in `source/theme.mjs`.

Then run `pnpm build` and `pnpm test`, and commit the rebuilt files in `themes/` with the change.
If the test fails, change the color until it passes; never weaken a threshold or drop a pairing.
A new interface color with text on it gets a pairing in `source/check.mjs`.

To see a change, package it and install the `.vsix` over the previous one, then reload the
window.

## Pull requests

Conventions are in [`.handbook/`](.handbook/), a link to Itrium's handbook: branch names, pull
request titles, labels. Every pull request runs `Test`, which checks the committed theme files
as they are and packages the extension.

## Versioning

[Semantic versioning](https://semver.org). Until 1.0.0:

- **Patch:** a color adjusted, or a scope added.
- **Minor:** a new theme, or a change in where a color is used that people will notice.
