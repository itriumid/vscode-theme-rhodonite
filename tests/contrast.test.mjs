import { test } from "node:test";
import assert from "node:assert/strict";
import { THEME_FILES, buildTheme } from "../source/theme.mjs";
import { themeProblems } from "../source/check.mjs";

test("every theme meets level AA", () => {
  for (const { scheme } of THEME_FILES) assert.deepEqual(themeProblems(buildTheme(scheme)), []);
});

// The checker has to fail what it should, or a broken checker passes everything.

test("the check catches faint code", () => {
  const theme = buildTheme("dark");
  theme.tokenColors.find((rule) => rule.name === "Comments").settings.foreground = "#555555";
  assert.ok(themeProblems(theme).some((problem) => problem.includes('token "Comments" on editor.background')));
});

test("the check catches faint interface text, including on a translucent background", () => {
  const theme = buildTheme("light");
  theme.colors["editor.selectionBackground"] = "#2b2b2bcc";
  assert.ok(themeProblems(theme).some((problem) => problem.includes("editor.foreground on editor.selectionBackground")));
});

test("the check catches a focus outline that can't be seen", () => {
  const theme = buildTheme("light");
  theme.colors.focusBorder = "#febfca";
  assert.ok(themeProblems(theme).some((problem) => problem.includes("focusBorder on editor.background")));
});

test("the check catches a missing color", () => {
  const theme = buildTheme("dark");
  delete theme.colors["statusBar.foreground"];
  assert.ok(themeProblems(theme).some((problem) => problem.includes("statusBar.foreground is missing")));
});

test("the check catches an unreadable terminal color", () => {
  const theme = buildTheme("light");
  theme.colors["terminal.ansiYellow"] = "#e6cf98";
  assert.ok(themeProblems(theme).some((problem) => problem.includes("terminal.ansiYellow")));
});
