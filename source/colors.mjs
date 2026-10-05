// Every color in the two themes comes from @itrium/palettes, so a change there flows into the
// editor: the interface colors from its stylesheet, the syntax and terminal colors from its code
// colors.

import { readFileSync } from "node:fs";
import { STYLESHEET_URL, tokensFor } from "@itrium/palettes/check";
import { CODE_COLORS, TERMINAL_BACKGROUND_SHADES } from "@itrium/palettes/palettes";

const stylesheet = readFileSync(STYLESHEET_URL, "utf8");

/** Rhodonite's tokens from @itrium/palettes, without the leading dashes: `bg`, `text`, `accent`… */
function paletteTokens(scheme) {
  const tokens = tokensFor(stylesheet, { palette: "rhodonite", theme: scheme, system: scheme });
  return Object.fromEntries(
    Object.entries(tokens)
      .filter(([name]) => name.startsWith("--"))
      .map(([name, value]) => [name.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value]),
  );
}

// The syntax and terminal colors are Rhodonite's code colors, from the same package, and the
// Rhodonite terminal themes use them too, so code reads the same in the editor and in a shell.
// Black on dark and white on light are background shades by convention, so they're the only
// terminal colors below 4.5:1, and the contrast test knows to skip them.
export { TERMINAL_BACKGROUND_SHADES };

export function colors(scheme) {
  const { syntax, terminal } = CODE_COLORS[scheme];
  return { scheme, ...paletteTokens(scheme), ...syntax, terminal };
}
