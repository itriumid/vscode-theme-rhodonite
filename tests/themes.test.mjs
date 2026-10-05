import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { THEME_FILES, buildTheme } from "../source/theme.mjs";

const manifest = JSON.parse(readFileSync("package.json", "utf8"));

test("the committed theme files match the source", () => {
  for (const { scheme, path } of THEME_FILES) {
    const committed = JSON.parse(readFileSync(path, "utf8"));
    assert.deepEqual(committed, buildTheme(scheme), `${path} is out of date: run pnpm build`);
  }
});

test("package.json lists every theme, with the right base", () => {
  const listed = manifest.contributes.themes.map((theme) => [theme.path.replace(/^\.\//, ""), theme.uiTheme]);
  const expected = THEME_FILES.map(({ scheme, path }) => [path, scheme === "dark" ? "vs-dark" : "vs"]);
  assert.deepEqual(listed, expected);
});

test("every color is a hex color", () => {
  for (const { scheme } of THEME_FILES) {
    const theme = buildTheme(scheme);
    const values = [
      ...Object.values(theme.colors),
      ...theme.tokenColors.map((rule) => rule.settings.foreground).filter(Boolean),
    ];
    for (const value of values) assert.match(value, /^#[0-9a-f]{6}([0-9a-f]{2})?$/, `${theme.name}: ${value}`);
  }
});
