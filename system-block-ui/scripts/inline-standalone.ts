import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const stageDirectory = path.join(packageRoot, "dist", ".standalone-stage");
const outputPath = path.join(
  packageRoot,
  "dist",
  "ti-system-block-builder.html",
);

const sourceHtml = await readFile(
  path.join(stageDirectory, "index.html"),
  "utf8",
);
const moduleScript = sourceHtml.match(
  /<script\b[^>]*\btype="module"[^>]*\bsrc="([^"]+)"[^>]*><\/script>/,
);
const stylesheet = sourceHtml.match(
  /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/,
);

if (!moduleScript || !stylesheet) {
  throw new Error("The Vite entry script or stylesheet could not be located.");
}

const readStageAsset = (assetUrl: string) =>
  readFile(path.join(stageDirectory, assetUrl.replace(/^\.\//, "")), "utf8");
const [javascript, css] = await Promise.all([
  readStageAsset(moduleScript[1]),
  readStageAsset(stylesheet[1]),
]);

if (css.toLowerCase().includes("</style")) {
  throw new Error("The generated CSS contains an unsafe closing style tag.");
}

const safeJavascript = javascript.replace(/<\/script/gi, "<\\/script");
const standaloneHtml = sourceHtml
  .replace(
    moduleScript[0],
    () => `<script type="module">\n${safeJavascript}\n</script>`,
  )
  .replace(stylesheet[0], () => `<style>\n${css}\n</style>`)
  .replace(
    "<!doctype html>",
    "<!doctype html>\n<!-- Self-contained TI System Block Builder -->",
  );
const documentShell = standaloneHtml
  .replace(
    /<script type="module">[\s\S]*?<\/script>/,
    '<script type="module"></script>',
  )
  .replace(/<style>[\s\S]*?<\/style>/, "<style></style>");
const remainingExternalAsset = documentShell.match(
  /<(?:script\b[^>]*\bsrc|link\b[^>]*\brel="stylesheet")[^>]*>/i,
);

if (remainingExternalAsset) {
  throw new Error(
    `The standalone HTML still contains an external entry asset: ${remainingExternalAsset[0]}`,
  );
}

await writeFile(outputPath, standaloneHtml);
await rm(stageDirectory, { recursive: true, force: true });

console.log(`Standalone HTML: ${outputPath}`);
