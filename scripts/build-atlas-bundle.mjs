// Bundles scripts/atlas-browser-entry.ts (which re-exports content/atlas + lib/atlas) into one
// IIFE for embedding as an inline <script> in the Atlas UI prototype. Keeps the prototype running
// the exact same access/search code as the real content model, not a hand-copied reimplementation.
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

await build({
  entryPoints: [path.join(root, "scripts/atlas-browser-entry.ts")],
  bundle: true,
  format: "iife",
  target: "es2020",
  outfile: path.join(root, "scripts/.atlas-bundle.js"),
  logLevel: "info",
});
