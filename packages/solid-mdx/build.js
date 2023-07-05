#!/usr/bin/env node
const estrella = require("estrella");
const package = require("./package.json");

const cjs = {
  platform: "node",
  format: "cjs",
  bundle: true,
  external: [
    ...Object.keys(package.dependencies ?? {}),
    ...Object.keys(package.peerDependencies ?? {}),
  ],
};

const esm = {
  platform: "node",
  format: "esm",
  bundle: true,
  external: [
    ...Object.keys(package.dependencies ?? {}),
    ...Object.keys(package.peerDependencies ?? {}),
  ],
};

estrella.build({
  entry: "src/index.ts",
  outfile: "dist/index.js",
  ...cjs,
});

estrella.build({
  entry: "src/index.ts",
  outfile: "dist/index.mjs",
  ...esm,
});
