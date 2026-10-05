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

Never edit `themes/`, which `pnpm build` overwrites.

- **The colors themselves** come from `@itrium/palettes`: the interface colors from its
  stylesheet, the syntax and terminal colors from its `CODE_COLORS`. Change them there, release
  that package, then update the pinned version here.
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

## Releasing

1. Set the version in `package.json` in a pull request, and merge it.
2. Tag the merge commit and push the tag:

   ```sh
   git tag -a v0.2.0 -m "Rhodonite Theme 0.2.0"
   git push origin v0.2.0
   ```

3. `release.yml` checks the tag matches `package.json`, runs the checks again, packages the
   extension, publishes it to Open VSX, and attaches the `.vsix` to a GitHub release. A version
   that's already on Open VSX is skipped, so a failed release can be run again.

Publishing uses an Open VSX access token, stored as the `OVSX_TOKEN` repository secret and given
only to the publish step. Tokens don't expire on their own; when one is replaced, update the
secret with `gh secret set OVSX_TOKEN`.
