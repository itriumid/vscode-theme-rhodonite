// The contrast check every theme has to pass: level AA of the Web Content Accessibility
// Guidelines, the same bar as @itrium/palettes and using its contrast formula. 4.5:1 for text,
// 3:1 for focus outlines, the cursor and lines that show a state. Colors with an alpha channel
// are painted over what they sit on first, the way the editor draws them.

import { NON_TEXT, TEXT, contrast } from "@itrium/palettes/check";
import { TERMINAL_BACKGROUND_SHADES } from "./colors.mjs";

function channels(hex) {
  if (!/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(hex)) return null;
  const rgb = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
  const alpha = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
  return { rgb, alpha };
}

/** A color painted over an opaque base: what someone actually sees. */
function paint(hex, base) {
  const { rgb, alpha } = channels(hex);
  return rgb.map((value, index) => value * alpha + base[index] * (1 - alpha));
}

// Foreground, background, and the ratio it needs. Backgrounds with an alpha channel are painted
// over the editor background. Every text color that sits on a surface is here, for every surface
// it sits on.
const INTERFACE_PAIRS = [
  ...[
    "editor.background",
    "editor.lineHighlightBackground",
    "editor.selectionBackground",
  ].map((background) => ["editor.foreground", background, TEXT]),
  ["editorLineNumber.foreground", "editor.background", TEXT],
  ["editorLineNumber.activeForeground", "editor.lineHighlightBackground", TEXT],
  ["editorCodeLens.foreground", "editor.background", TEXT],
  ["editorInlayHint.foreground", "editorInlayHint.background", TEXT],
  ["titleBar.activeForeground", "titleBar.activeBackground", TEXT],
  ["titleBar.inactiveForeground", "titleBar.inactiveBackground", TEXT],
  ["activityBar.foreground", "activityBar.background", TEXT],
  ["activityBar.inactiveForeground", "activityBar.background", TEXT],
  ["activityBarBadge.foreground", "activityBarBadge.background", TEXT],
  ["sideBar.foreground", "sideBar.background", TEXT],
  ["sideBarSectionHeader.foreground", "sideBarSectionHeader.background", TEXT],
  ["descriptionForeground", "sideBar.background", TEXT],
  ["list.activeSelectionForeground", "list.activeSelectionBackground", TEXT],
  ["list.inactiveSelectionForeground", "list.inactiveSelectionBackground", TEXT],
  ["list.hoverForeground", "list.hoverBackground", TEXT],
  ["descriptionForeground", "list.activeSelectionBackground", TEXT],
  ["list.highlightForeground", "sideBar.background", TEXT],
  ["list.highlightForeground", "list.activeSelectionBackground", TEXT],
  ["list.highlightForeground", "list.hoverBackground", TEXT],
  ["tab.activeForeground", "tab.activeBackground", TEXT],
  ["tab.inactiveForeground", "tab.inactiveBackground", TEXT],
  ["tab.inactiveForeground", "tab.hoverBackground", TEXT],
  ["breadcrumb.foreground", "breadcrumb.background", TEXT],
  ["breadcrumb.focusForeground", "breadcrumb.background", TEXT],
  ["editorWidget.foreground", "editorWidget.background", TEXT],
  ["editorSuggestWidget.foreground", "editorSuggestWidget.background", TEXT],
  ["editorSuggestWidget.selectedForeground", "editorSuggestWidget.selectedBackground", TEXT],
  ["editorSuggestWidget.highlightForeground", "editorSuggestWidget.background", TEXT],
  ["editorSuggestWidget.highlightForeground", "editorSuggestWidget.selectedBackground", TEXT],
  ["editorHoverWidget.foreground", "editorHoverWidget.background", TEXT],
  ["peekViewTitleLabel.foreground", "peekViewTitle.background", TEXT],
  ["peekViewTitleDescription.foreground", "peekViewTitle.background", TEXT],
  ["peekViewResult.fileForeground", "peekViewResult.background", TEXT],
  ["peekViewResult.lineForeground", "peekViewResult.background", TEXT],
  ["peekViewResult.selectionForeground", "peekViewResult.selectionBackground", TEXT],
  ["input.foreground", "input.background", TEXT],
  ["input.placeholderForeground", "input.background", TEXT],
  ["dropdown.foreground", "dropdown.background", TEXT],
  ["button.foreground", "button.background", TEXT],
  ["button.foreground", "button.hoverBackground", TEXT],
  ["button.secondaryForeground", "button.secondaryBackground", TEXT],
  ["button.secondaryForeground", "button.secondaryHoverBackground", TEXT],
  ["badge.foreground", "badge.background", TEXT],
  ["keybindingLabel.foreground", "keybindingLabel.background", TEXT],
  ["menu.foreground", "menu.background", TEXT],
  ["menu.selectionForeground", "menu.selectionBackground", TEXT],
  ["quickInput.foreground", "quickInput.background", TEXT],
  ["quickInputList.focusForeground", "quickInputList.focusBackground", TEXT],
  ["pickerGroup.foreground", "quickInput.background", TEXT],
  ["notifications.foreground", "notifications.background", TEXT],
  ["notificationCenterHeader.foreground", "notificationCenterHeader.background", TEXT],
  ["notificationLink.foreground", "notifications.background", TEXT],
  ["panelTitle.activeForeground", "panel.background", TEXT],
  ["panelTitle.inactiveForeground", "panel.background", TEXT],
  ["statusBar.foreground", "statusBar.background", TEXT],
  ["statusBar.debuggingForeground", "statusBar.debuggingBackground", TEXT],
  ["statusBarItem.hoverForeground", "statusBarItem.hoverBackground", TEXT],
  ["statusBarItem.remoteForeground", "statusBarItem.remoteBackground", TEXT],
  ["statusBarItem.remoteHoverForeground", "statusBarItem.remoteHoverBackground", TEXT],
  ["statusBarItem.prominentForeground", "statusBarItem.prominentBackground", TEXT],
  ["statusBarItem.errorForeground", "statusBarItem.errorBackground", TEXT],
  ["statusBarItem.warningForeground", "statusBarItem.warningBackground", TEXT],
  ["textLink.foreground", "editor.background", TEXT],
  ["textLink.activeForeground", "editor.background", TEXT],
  ["errorForeground", "sideBar.background", TEXT],
  ["terminal.foreground", "terminal.background", TEXT],
  ["terminal.foreground", "terminal.selectionBackground", TEXT],
  ...[
    "gitDecoration.addedResourceForeground",
    "gitDecoration.modifiedResourceForeground",
    "gitDecoration.deletedResourceForeground",
    "gitDecoration.renamedResourceForeground",
    "gitDecoration.untrackedResourceForeground",
    "gitDecoration.ignoredResourceForeground",
    "gitDecoration.conflictingResourceForeground",
  ].flatMap((foreground) => [
    [foreground, "sideBar.background", TEXT],
    [foreground, "list.activeSelectionBackground", TEXT],
  ]),

  // Not text, but the only way to see focus, the cursor or what's active.
  ["focusBorder", "editor.background", NON_TEXT],
  ["focusBorder", "editorWidget.background", NON_TEXT],
  ["list.focusOutline", "list.activeSelectionBackground", NON_TEXT],
  ["editorCursor.foreground", "editor.background", NON_TEXT],
  ["editorCursor.foreground", "editor.lineHighlightBackground", NON_TEXT],
  ["terminalCursor.foreground", "terminal.background", NON_TEXT],
  ["tab.activeBorderTop", "tab.activeBackground", NON_TEXT],
  ["activityBar.activeBorder", "activityBar.background", NON_TEXT],
  ["panelTitle.activeBorder", "panel.background", NON_TEXT],
  ["progressBar.background", "editor.background", NON_TEXT],
  ["checkbox.border", "checkbox.background", NON_TEXT],
  ["inputOption.activeBorder", "input.background", NON_TEXT],
  ["peekView.border", "editor.background", NON_TEXT],
];

/** Every problem with one theme: unreadable code, interface text, or state lines. */
export function themeProblems(theme) {
  const where = theme.name;
  const ui = theme.colors;
  const problems = [];
  const editorBackground = channels(ui["editor.background"])?.rgb;
  if (!editorBackground) return [`${where}: editor.background is ${ui["editor.background"]}`];

  const resolve = (key, base = editorBackground) => {
    if (!channels(ui[key] ?? "")) return null;
    return paint(ui[key], base);
  };

  const check = (label, foreground, background, minimum) => {
    const ratio = contrast(foreground, background);
    if (ratio < minimum) {
      // Rounded down, so a failure never reads as the number it needed.
      problems.push(`${where}: ${label} is ${(Math.floor(ratio * 100) / 100).toFixed(2)}:1, needs ${minimum}:1`);
    }
  };

  for (const [foreground, background, minimum] of INTERFACE_PAIRS) {
    const backgroundColor = resolve(background);
    const foregroundColor = backgroundColor && resolve(foreground, backgroundColor);
    if (!backgroundColor || !foregroundColor) {
      problems.push(`${where}: ${backgroundColor ? foreground : background} is missing or not a hex color`);
      continue;
    }
    check(`${foreground} on ${background}`, foregroundColor, backgroundColor, minimum);
  }

  // Code: every syntax color, on the editor background and on the current line.
  const codeBackgrounds = ["editor.background", "editor.lineHighlightBackground"];
  const syntaxColors = [
    ...theme.tokenColors
      .filter((rule) => rule.settings.foreground)
      .map((rule) => [`token "${rule.name}"`, rule.settings.foreground]),
    ...Object.entries(theme.semanticTokenColors)
      .map(([name, value]) => [`semantic token ${name}`, typeof value === "string" ? value : value.foreground])
      .filter(([, value]) => value),
  ];
  for (const [label, value] of syntaxColors) {
    for (const background of codeBackgrounds) {
      const backgroundColor = resolve(background);
      if (!channels(value)) {
        problems.push(`${where}: ${label} is ${value}, not a hex color`);
        break;
      }
      check(`${label} on ${background}`, paint(value, backgroundColor), backgroundColor, TEXT);
    }
  }

  // The terminal's sixteen colors, except the ones that are background shades by convention.
  const shades = TERMINAL_BACKGROUND_SHADES[theme.type].map(
    (name) => `terminal.ansi${name[0].toUpperCase()}${name.slice(1)}`,
  );
  const terminalBackground = resolve("terminal.background");
  for (const key of Object.keys(ui).filter((name) => name.startsWith("terminal.ansi"))) {
    if (shades.includes(key)) continue;
    check(`${key} on terminal.background`, resolve(key, terminalBackground), terminalBackground, TEXT);
  }

  return problems;
}
