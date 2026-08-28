#!/usr/bin/env node

import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_UPSTREAM_URL = "https://mcp.socialdatax.com/douyin/mcp";
const apiKey = process.env.SOCIALDATAX_API_KEY?.trim();

if (!apiKey || apiKey === "<SOCIALDATAX_API_KEY>") {
  console.error(
    "[douyin-mcp-bridge] Set SOCIALDATAX_API_KEY to a real API Key before starting the bridge."
  );
  process.exit(1);
}

const remotePackagePath = fileURLToPath(
  import.meta.resolve("mcp-remote/package.json")
);
const remoteEntry = join(
  dirname(remotePackagePath),
  "dist",
  "proxy.js"
);

const upstreamUrl =
  process.env.SOCIALDATAX_DOUYIN_MCP_URL || DEFAULT_UPSTREAM_URL;
const args = [
  upstreamUrl,
  "--transport",
  "http-only",
  "--silent",
  "--header",
  'Authorization: Bearer ${SOCIALDATAX_API_KEY}',
];
const childEnv = { ...process.env, SOCIALDATAX_API_KEY: apiKey };

const child = spawn(process.execPath, [remoteEntry, ...args], {
  stdio: "inherit",
  env: childEnv,
});

const signalHandlers = new Map();

for (const signal of ["SIGINT", "SIGTERM"]) {
  const handler = () => {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill(signal);
    }
  };
  signalHandlers.set(signal, handler);
  process.once(signal, handler);
}

child.on("error", (error) => {
  console.error(
    `[douyin-mcp-bridge] Failed to start mcp-remote: ${error.message}`
  );
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    const handler = signalHandlers.get(signal);
    if (handler) {
      process.off(signal, handler);
    }
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
