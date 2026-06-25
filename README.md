# 抖音 MCP | Douyin MCP

This public repository provides public connection docs and MCP metadata for a hosted 抖音 MCP / Douyin MCP service by SocialDataX.

If you are looking for a Douyin MCP or 抖音 MCP for social media research workflows, this repository includes:

- public MCP metadata and client configuration examples
- the hosted `streamable-http` endpoint for clients that support remote MCP
- an `mcp-remote` fallback example for command/stdio-only MCP clients

The business implementation is privately hosted. This repository exposes only the public connection surface for social media content intelligence workflows.

## Search Aliases

Common search phrases for this MCP service:

- `抖音 MCP`
- `抖音 数据 MCP`
- `抖音 热榜 MCP`
- `抖音 作品 MCP`
- `抖音 评论 MCP`
- `抖音 达人 MCP`
- `Douyin MCP`
- `Douyin data MCP`
- `Douyin hot search MCP`
- `Douyin work research MCP`
- `Douyin comments MCP`
- `Douyin creator MCP`

## Service

- Hosted MCP endpoint: `https://mcp.52choujiang.com/douyin/mcp`
- Hosted transport: `streamable-http`
- Authentication: `Authorization: Bearer <SOCIALDATAX_API_KEY>`
- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.com>
- Registry name: `com.52choujiang/douyin-insights`
- Future registry name: `com.socialdatax/douyin-insights`
- Current public capability version: `0.2.4`

## Platform MCP

Use the hosted `streamable-http` endpoint directly from clients that support authenticated remote MCP. For clients that only support command/stdio MCP servers, use `mcp-remote` as a local compatibility proxy.

## Workflow Scope

This MCP service is designed for social media content intelligence workflows. It does not provide account login, posting, editing, liking, commenting, or other account actions.

Supported workflows include:

- Read the Douyin / 抖音 hot search list.
- Search Douyin works by keyword with optional paging and filters.
- Resolve a Douyin content page link, short link, or share text into structured work details.
- Read work details when the caller already has an `aweme_id`.
- Fetch paginated first-level comments for comment analysis.
- Fetch paginated replies under a first-level comment; pass both `aweme_id` and `comment_id`, and use `page_token` to continue pagination.
- Read creator profile data from a profile link, short link, share text, or `sec_user_id`.
- Fetch creator work lists from a profile link, short link, share text, or `sec_user_id`.
- Fetch creator short-drama / series lists from a profile link, short link, share text, or `sec_user_id`.
- Submit a work video speech-to-text transcript task; submit tools 提交完成后最多短等 15 秒, and unfinished jobs can be polled by `job_id`.

## Tools

| Tool | Public purpose |
| --- | --- |
| `douyin_get_hot_search_list` | Get the current Douyin / 抖音 main hot search list. |
| `douyin_search_videos` | Search Douyin works by keyword with optional paging and filters. |
| `douyin_get_video_detail_by_aweme_id` | Fetch structured work details when the caller already has an `aweme_id`. |
| `douyin_get_video_detail_by_url` | Resolve a Douyin content page link, short link, or share text into structured work details. |
| `douyin_get_video_comments_by_aweme_id` | Fetch paginated first-level comments when the caller already has an `aweme_id`. |
| `douyin_get_video_comments_by_url` | Fetch paginated first-level comments directly from a Douyin content page link, short link, or share text. |
| `douyin_get_video_comment_replies_by_comment_id` | Fetch paginated replies under a first-level comment; pass both `aweme_id` and `comment_id`, and use `page_token` to continue pagination. |
| `douyin_get_user_info_by_sec_user_id` | Fetch creator profile data when the caller already has a `sec_user_id`. |
| `douyin_get_user_info_by_profile_url` | Resolve a Douyin profile link, short link, or share text into creator profile data. |
| `douyin_get_user_posted_videos_by_sec_user_id` | Fetch a paginated list of works published by a creator when the caller already has a `sec_user_id`. |
| `douyin_get_user_posted_videos_by_profile_url` | Fetch a paginated list of works published by a creator from a profile link, short link, or share text. |
| `douyin_get_user_series_by_sec_user_id` | Fetch creator short-drama / series lists when the caller already has a `sec_user_id`. |
| `douyin_get_user_series_by_profile_url` | Fetch creator short-drama / series lists from a profile link, short link, or share text. |
| `douyin_submit_video_speech_text_by_video_url` | Submit a work video speech-to-text transcript task from a work page link, short link, or share text. 提交完成后最多短等 15 秒. |
| `douyin_submit_video_speech_text_by_aweme_id` | Submit a work video speech-to-text transcript task from an `aweme_id`. 提交完成后最多短等 15 秒. |
| `douyin_get_video_speech_text_job` | Check a work video speech-to-text transcript job by `job_id` without creating a new task. This v1 surface returns transcript only, not summary. |

## Quick Start

For clients that support authenticated `streamable-http`, use the hosted endpoint directly:

```json
{
  "mcpServers": {
    "socialdatax-douyin": {
      "type": "streamable_http",
      "url": "https://mcp.52choujiang.com/douyin/mcp",
      "headers": {
        "Authorization": "Bearer <SOCIALDATAX_API_KEY>"
      }
    }
  }
}
```

A ready-to-copy example is available in [`examples/streamable_http_config.json`](examples/streamable_http_config.json).

For command/stdio-only MCP clients, use `mcp-remote`:

```json
{
  "mcpServers": {
    "socialdatax-douyin": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.52choujiang.com/douyin/mcp",
        "--header",
        "Authorization: Bearer <SOCIALDATAX_API_KEY>"
      ]
    }
  }
}
```

Claude Code can use remote HTTP directly:

```bash
claude mcp add --transport http socialdatax-douyin https://mcp.52choujiang.com/douyin/mcp --header 'Authorization: Bearer ${SOCIALDATAX_API_KEY}'
```

Persist `SOCIALDATAX_API_KEY` in the runtime environment or client Secret before restarting Claude Code.

Claude Desktop should use its remote MCP / Connectors UI when available. If a local configuration file in your version only supports command/stdio servers, use the `mcp-remote` fallback.

## Client Examples

Configuration examples are available in [examples](examples/):

- [Command/stdio fallback config](mcp.json)
- [Claude Desktop fallback config](examples/claude_desktop_config.json)
- [Cursor remote HTTP config](examples/cursor_mcp.json)
- [Codex remote HTTP config](examples/codex_config.toml)
- [Direct streamable HTTP config](examples/streamable_http_config.json)

## API Key

Request or manage API access from the product website:

<https://socialdatax.com>

Use the key as a Bearer token in the `Authorization` request header. Do not commit real API keys to code, docs, issues, or screenshots.

## Directory Metadata

Public metadata files in this repository:

- [server-card.json](server-card.json): directory-oriented metadata for the hosted service. Official MCP Registry publishing uses the private source repo's `registry/douyin/server.json` for the current `com.52choujiang/douyin-insights` entry.
- [mcp.json](mcp.json): generic command/stdio fallback config using `mcp-remote`.
- [glama.json](glama.json): Glama repository ownership metadata.
- [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md): checklist for MCP directory submissions.

## License

The files in this public repository are released under the MIT License. The license covers the public documentation and configuration examples in this repository only. It does not cover the managed service implementation, hosted infrastructure, or any private backend code outside this repository.
