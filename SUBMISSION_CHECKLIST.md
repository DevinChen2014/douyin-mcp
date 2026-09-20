# MCP Directory Submission Checklist

Use this checklist before syncing this listing to the public Douyin MCP repository, submitting it to MCP directories, or updating a directory entry. Capability version `0.2.7` with 24 tracked tools is live in hosted production and the public GitHub repository. The npm stdio bridge remains `douyin-mcp@0.2.12`. The official Registry latest remains `0.2.5` pending publication of `0.2.7`.

## Public Repository

- Primary repository name: `douyin-mcp`
- Fallback repository name if unavailable: `douyin-socialdatax-mcp`
- Repository URL after creation: `https://github.com/DevinChen2014/douyin-mcp`
- Repository description: `抖音 MCP / Douyin MCP by SocialDataX for hot search, work search, product search, work details, comments, comment replies, creator profiles, creator works, and creator series.`
- Suggested repository topics: `mcp`, `mcp-server`, `douyin`, `douyin-mcp`, `douyin-data`, `short-video`, `socialdatax`, `social-insights`, `marketing-research`, `comment-analysis`, `creator-analytics`
- Root README title: `抖音 MCP | Douyin MCP`
- Product: `SocialDataX` / `社媒数据助手`
- Website: `https://socialdatax.com`
- Registry name: `com.52choujiang/douyin-insights`
- Future registry name: `com.socialdatax/douyin-insights`
- Hosted MCP endpoint: `https://mcp.socialdatax.com/douyin/mcp`
- Hosted auth: `Authorization: Bearer <SOCIALDATAX_API_KEY>`
- Default client transport: hosted `streamable-http`
- Command/stdio fallback: set `SOCIALDATAX_API_KEY` in the client environment, then use `npx -y mcp-remote https://mcp.socialdatax.com/douyin/mcp --header 'Authorization: Bearer ${SOCIALDATAX_API_KEY}'`
- License: MIT for the public documentation and examples only

## Safety Checks

- No real API Key values are present.
- No private backend implementation is included.
- No production configuration is included.
- No internal samples are included.
- No account data or credentials are included.
- No generated build output is included.
- Public text uses neutral product wording.
- Public docs do not expose internal business code.

## Required Files

- `README.md`
- `LICENSE`
- `server-card.json`
- `mcp.json`
- `glama.json`
- `examples/streamable_http_config.json`
- `examples/claude_desktop_config.json`
- `examples/cursor_mcp.json`
- `examples/codex_config.toml`
- `assets/logo.png`

## Directory Checks

- Hosted streamable HTTP clients can connect directly to `https://mcp.socialdatax.com/douyin/mcp` with `Authorization: Bearer <SOCIALDATAX_API_KEY>`.
- With a valid key, hosted MCP `initialize` succeeds.
- After deploying `0.2.7`, verify hosted MCP `tools/list` returns the current 24 public tools.
- `socialdatax_get_points_balance` is present in `tools/list`.
- `douyin_search_products` is present in `tools/list`.
- `douyin_get_product_detail_by_product_id` and `douyin_get_product_detail_by_url` are present in `tools/list`; each exposes one required input without a top-level schema union.
- `douyin_search_users` is present in `tools/list`.
- `douyin_submit_video_speech_text_by_video_url`, `douyin_submit_video_speech_text_by_aweme_id`, and `douyin_get_video_speech_text_job` are present in `tools/list`; if any are missing, deploy the latest service before publishing.
- `examples/codex_config.toml` uses remote HTTP URL and `bearer_token_env_var`, not `mcp-remote`.
- `examples/cursor_mcp.json` uses remote HTTP URL and `headers` with `${env:SOCIALDATAX_API_KEY}`, not `mcp-remote`.
- `mcp.json` is explicitly command/stdio fallback and uses `mcp-remote`.
- Before submitting to Smithery, verify `https://mcp.socialdatax.com/douyin/.well-known/mcp/server-card.json` returns the Douyin server card, not the root XHS server card.

## Directory Submission Order

1. Glama
2. Smithery
3. ModelScope MCP 广场
4. MCP.so
5. mcpservers.org
6. MCP Market
7. MCP Review
8. PulseMCP
9. MCP.Directory
10. Cline MCP Marketplace
11. awesome-mcp-servers / awesome-remote-mcp-servers

## Search Keywords To Verify After Approval

- `Douyin`
- `Douyin MCP`
- `Douyin data MCP`
- `Douyin hot search MCP`
- `Douyin comments MCP`
- `Douyin creator MCP`
- `抖音`
- `抖音 MCP`
- `抖音 数据 MCP`
- `抖音 热榜 MCP`
- `抖音 作品 MCP`
- `抖音 评论 MCP`
- `抖音 达人 MCP`
- `SocialDataX`
- `社媒数据助手`
