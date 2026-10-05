// Every color in the two themes. The interface colors come from @itrium/palettes, so a change
// there flows into the editor; the syntax and terminal colors are this repository's own, and are
// the same as the Rhodonite terminal themes, so code reads the same in the editor and in a shell.

import { readFileSync } from "node:fs";
import { STYLESHEET_URL, tokensFor } from "@itrium/palettes/check";

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

// The syntax hues sit next to the pink rather than competing with it: muted, a little warm, and
// all at 4.5:1 or more on the editor background. Light mode deepens each one in the same hue,
// because the pastels are unreadable on near-white. Pink is never text on a light background
// (brand rule), so light keywords are a deep rose instead.
const syntax = {
  dark: {
    rose: "#f58c9d",
    sage: "#a9c9a0",
    sand: "#e6cf98",
    blue: "#9fb5d8",
    pink: "#febfca",
    teal: "#9dcec7",
    // A step quieter than the text, so code reads by its words, not its brackets.
    punctuation: "#d4d4d4",
  },
  light: {
    rose: "#b03a4f",
    sage: "#3f7339",
    sand: "#7f6216",
    blue: "#3a5f93",
    pink: "#a84d60",
    teal: "#2f7069",
    punctuation: "#4a4a4a",
  },
};

// The integrated terminal: the same sixteen colors as the Rhodonite terminal themes. Black on
// dark and white on light are background shades by convention, so they're the only ones below
// 4.5:1, and the contrast test knows to skip them.
const terminal = {
  dark: {
    black: "#3e3e3e", red: "#f58c9d", green: "#a9c9a0", yellow: "#e6cf98",
    blue: "#9fb5d8", magenta: "#febfca", cyan: "#9dcec7", white: "#d4d4d4",
    brightBlack: "#969696", brightRed: "#f9a8b5", brightGreen: "#c0dcb7", brightYellow: "#f1dfb4",
    brightBlue: "#bacce8", brightMagenta: "#ffd7de", brightCyan: "#bae1db", brightWhite: "#f2f2f2",
  },
  light: {
    black: "#2b2b2b", red: "#b03a4f", green: "#3f7339", yellow: "#7f6216",
    blue: "#3a5f93", magenta: "#a84d60", cyan: "#2f7069", white: "#e4e4e4",
    brightBlack: "#6b6b6b", brightRed: "#b8455a", brightGreen: "#477e41", brightYellow: "#86671a",
    brightBlue: "#4a70a6", brightMagenta: "#b0566a", brightCyan: "#367a72", brightWhite: "#ffffff",
  },
};

/** Terminal colors that are background shades, not text, so contrast doesn't apply. */
export const TERMINAL_BACKGROUND_SHADES = { dark: ["black"], light: ["white", "brightWhite"] };

export function colors(scheme) {
  return { scheme, ...paletteTokens(scheme), ...syntax[scheme], terminal: terminal[scheme] };
}
