# 社媒数据助手 抖音 MCP | Douyin MCP

This directory contains an OpenClaw native plugin shim for the hosted 抖音 MCP service by SocialDataX.

The plugin registers namespaced OpenClaw tools and forwards each call to a remote, read-only `streamable-http` MCP endpoint:

- Endpoint: `https://mcp.52choujiang.com/douyin/mcp`
- API key environment variable: `SOCIALDATAX_API_KEY`
- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.com>
- Package name: `douyin-insights-openclaw-plugin`
- Version: `0.2.6`
- Search terms: Douyin, 抖音, social media research, Douyin content insights, hot search, video and image/text works, creator analytics, comments, comment replies, creator profiles, creator short-drama series

## Capabilities

The hosted Douyin MCP supports read-only social media intelligence workflows:

- Search related Douyin works by keyword.
- Fetch the current Douyin main hot search list.
- Resolve Douyin content page links, short links, share text, or aweme IDs into structured details.
- Fetch work details, first-level comments, and comment replies.
- Read creator profile information.
- Fetch creator work lists for content style and account research.
- Fetch creator short-drama series lists.

The service does not provide account login, posting, editing, liking, commenting, or other account actions.

## Plugin Structure

This package uses the native OpenClaw plugin path:

- `openclaw.plugin.json` declares the native plugin manifest and tool contracts.
- `package.json` declares the OpenClaw extension entry and MCP SDK dependency.
- `index.js` registers thin forwarding tools that call the hosted MCP service.
- Runtime metadata declares the required `node` binary, `SOCIALDATAX_API_KEY`, and the hosted MCP service domain.

It intentionally does not include `.codex-plugin/` or `.mcp.json`, because OpenClaw gives `openclaw.plugin.json` native-plugin precedence when both marker types are present.

## API Key

Set the shared API key before using this plugin:

```bash
export SOCIALDATAX_API_KEY="<SOCIALDATAX_API_KEY>"
```

The key is sent as:

```text
Authorization: Bearer ${SOCIALDATAX_API_KEY}
```

The plugin sends the key only to the fixed endpoint `https://mcp.52choujiang.com/douyin/mcp`. It does not support overriding the endpoint URL.

Do not commit real API keys to code, docs, issues, or screenshots.

## Tool Names

The native plugin registers namespaced tool names that match the earlier MCP server prefix convention. For example, the remote MCP tool `douyin_search_videos` is exposed as:

```text
douyin-insights__douyin_search_videos
```

## Publishing Check

Use ClawHub dry-run before publishing:

```bash
source ~/.nvm/nvm.sh
nvm use 24.13.0
clawhub package publish <public-checkout>/douyin-insights-openclaw \
  --family code-plugin \
  --name douyin-insights-openclaw-plugin \
  --display-name "社媒数据助手 抖音 MCP | Douyin MCP" \
  --version 0.2.6 \
  --source-repo <public-owner/public-repo> \
  --source-commit <public-commit-sha> \
  --source-path douyin-insights-openclaw \
  --dry-run \
  --json
```

Publish from a public GitHub source or pass explicit public `--source-repo`, `--source-commit`, and `--source-path` values. Do not publish from a private source checkout.
