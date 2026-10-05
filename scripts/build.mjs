// Writes the theme files from source/. They're committed, because the editor reads them as they
// are; tests/themes.test.mjs fails when they're out of date, so run `pnpm build` after a change.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { THEME_FILES, buildTheme } from "../source/theme.mjs";

for (const { scheme, path } of THEME_FILES) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(buildTheme(scheme), null, 2)}\n`);
  console.log(`Wrote ${path}`);
}
