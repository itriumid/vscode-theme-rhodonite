# Rhodonite Theme

[Itrium](https://itrium.id)'s Rhodonite palette for Visual Studio Code and the editors built on
it: graphite with pink running through it, in a dark and a light version.

- **Rhodonite**: graphite `#2B2B2B` with off-white text and pastel pink `#FEBFCA`.
- **Rhodonite Light**: near-white `#FAFAFA` with graphite text, and pink deepened to rose
  wherever it has to be read or seen as a line.

## Pink means something

Most of the window is graphite and gray. Pink marks the few things worth finding at a glance:
the cursor, the active tab, what has focus, the primary button and the badges. In code, it's
the keywords. Everything else gets a muted color that sits next to the pink instead of
competing with it:

| | Dark | Light |
| --- | --- | --- |
| Keywords, tags, headings | `#FEBFCA` pink | `#A84D60` rose |
| Strings | `#A9C9A0` sage | `#3F7339` sage |
| Numbers, constants, attributes | `#E6CF98` sand | `#7F6216` sand |
| Functions, links, keys in JSON, YAML and CSS | `#9FB5D8` blue | `#3A5F93` blue |
| Types, classes, regular expressions | `#9DCEC7` teal | `#2F7069` teal |
| Errors, deletions | `#F58C9D` rose | `#B03A4F` rose |
| Comments | `#AAAAAA` gray, italic | `#6B6B6B` gray, italic |

The integrated terminal uses the same sixteen colors as the Rhodonite terminal themes, so code
reads the same in the editor and in a shell.

## Readable, not just pretty

Every color meets level AA of the Web Content Accessibility Guidelines, in both versions: 4.5:1
for code and interface text on every surface it sits on (the editor, the current line, a
selection, a selected row, a menu, a button), and 3:1 for the cursor, focus outlines and the
lines that mark what's active. A test checks every pairing before anything is released, and the
test has tests of its own, with deliberately broken themes, so it can't quietly pass everything.

The interface colors come from [`@itrium/palettes`](https://github.com/itriumid/palettes), the
same palette Itrium's free applications use, and that package's contrast formula does the
checking.

## Installing

Not on a marketplace yet. Build the package and install it:

```sh
pnpm install
pnpm package
code --install-extension dist/rhodonite-0.1.0.vsix
```

Then choose **Rhodonite** or **Rhodonite Light** under *Preferences: Color Theme*. To follow the
system's light and dark setting, add this to your settings:

```json
{
  "window.autoDetectColorScheme": true,
  "workbench.preferredDarkColorTheme": "Rhodonite",
  "workbench.preferredLightColorTheme": "Rhodonite Light"
}
```

## Development

Setting up and changing colors are in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

[MIT](LICENSE).
