#!/usr/bin/env node

import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_UPSTREAM_URL = "https://mcp.socialdatax.com/douyin/mcp";

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
const apiKey = process.env.SOCIALDATAX_API_KEY?.trim();
const args = [upstreamUrl, "--transport", "http-only", "--silent"];

if (apiKey) {
  args.push("--header", 'Authorization: Bearer ${SOCIALDATAX_API_KEY}');
}

const child = spawn(process.execPath, [remoteEntry, ...args], {
  stdio: "inherit",
  env: process.env,
});

child.on("error", (error) => {
  console.error(
    `[douyin-mcp-bridge] Failed to start mcp-remote: ${error.message}`
  );
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
