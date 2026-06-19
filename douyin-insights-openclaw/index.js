const PLUGIN_ID = "douyin-insights-openclaw-plugin";
const PLUGIN_NAME = "社媒数据助手 抖音 MCP | Douyin MCP";
const PLUGIN_VERSION = "0.2.7";
const DEFAULT_ENDPOINT_URL = "https://mcp.52choujiang.com/douyin/mcp";
const DEFAULT_API_KEY_ENV = "SOCIALDATAX_API_KEY";
const LEGACY_API_KEY_ENV = "SOCIAL_MEDIA_MCP_API_KEY";
const API_KEY_ENV_NAMES = [DEFAULT_API_KEY_ENV, LEGACY_API_KEY_ENV];
const DEFAULT_CONNECTION_TIMEOUT_MS = 30000;

const CONFIG_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    connectionTimeoutMs: {
      type: "integer",
      default: DEFAULT_CONNECTION_TIMEOUT_MS,
      minimum: 1000,
      maximum: 120000,
      description: "Timeout in milliseconds for remote MCP HTTP requests.",
    },
  },
};

const PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Pagination token. Leave empty for the first page; pass the previous non-empty next_page_token to continue. Empty next_page_token means there is no next page. Do not parse, modify, or reuse tokens across pagination chains.",
};

const TOOL_DEFINITIONS = [
  {
    name: "douyin-insights__douyin_get_hot_search_list",
    remoteName: "douyin_get_hot_search_list",
    label: "Get Douyin Hot Search List",
    description: "Fetch the current Douyin main hot search list.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "douyin-insights__douyin_search_videos",
    remoteName: "douyin_search_videos",
    label: "Search Douyin Works",
    description: "Search Douyin works by keyword with optional sort, publish-time, duration, and content-type filters.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["keyword"],
      properties: {
        keyword: {
          type: "string",
          description: "Douyin search keyword.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
        sort_type: {
          type: "string",
          enum: ["general", "time_descending", "like_count_descending"],
          default: "general",
          description: "Sort order: general (default), time_descending (latest published first), or like_count_descending (most liked first).",
        },
        publish_time_range: {
          type: "string",
          enum: ["all", "day", "week", "half_year"],
          default: "all",
          description: "Publish-time filter: all, within a day, within a week, or within half a year.",
        },
        duration_range: {
          type: "string",
          enum: ["all", "under_1_minute", "one_to_five_minutes", "over_5_minutes"],
          default: "all",
          description: "Video duration filter: all, under 1 minute, between 1 and 5 minutes, or over 5 minutes.",
        },
        content_type: {
          type: "string",
          enum: ["all", "video", "image"],
          default: "all",
          description: "Content type filter: all, video, or image post.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_detail_by_aweme_id",
    remoteName: "douyin_get_video_detail_by_aweme_id",
    label: "Get Douyin Work Detail By ID",
    description: "Fetch structured work details when the caller already has an aweme ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["aweme_id"],
      properties: {
        aweme_id: {
          type: "string",
          description: "Douyin aweme ID.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_detail_by_url",
    remoteName: "douyin_get_video_detail_by_url",
    label: "Get Douyin Work Detail By URL",
    description: "Resolve a Douyin content page link, short link, or share text into structured work details.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {
          type: "string",
          description: "Douyin content page URL, short link, or share text; do not pass video.play_url.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_comments_by_aweme_id",
    remoteName: "douyin_get_video_comments_by_aweme_id",
    label: "Get Douyin Work Comments By ID",
    description: "Fetch paginated first-level comments when the caller already has an aweme ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["aweme_id"],
      properties: {
        aweme_id: {
          type: "string",
          description: "Douyin aweme ID.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_comments_by_url",
    remoteName: "douyin_get_video_comments_by_url",
    label: "Get Douyin Work Comments By URL",
    description: "Fetch paginated first-level comments from a Douyin content page URL, short link, or share text.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {
          type: "string",
          description: "Douyin content page URL, short link, or share text; do not pass video.play_url.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_video_comment_replies_by_comment_id",
    remoteName: "douyin_get_video_comment_replies_by_comment_id",
    label: "Get Douyin Comment Replies By Comment ID",
    description: "Fetch paginated replies under a first-level Douyin comment; pass both aweme ID and comment ID, and use page_token to continue pagination.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["aweme_id", "comment_id"],
      properties: {
        aweme_id: {
          type: "string",
          description: "Douyin aweme ID.",
        },
        comment_id: {
          type: "string",
          description: "First-level comment ID.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_info_by_sec_user_id",
    remoteName: "douyin_get_user_info_by_sec_user_id",
    label: "Get Douyin User Info By ID",
    description: "Fetch creator profile data when the caller already has a sec_user_id.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["sec_user_id"],
      properties: {
        sec_user_id: {
          type: "string",
          description: "Douyin sec_user_id.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_info_by_profile_url",
    remoteName: "douyin_get_user_info_by_profile_url",
    label: "Get Douyin User Info By Profile URL",
    description: "Resolve a Douyin profile link, short link, or share text into creator profile data.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["profile_url"],
      properties: {
        profile_url: {
          type: "string",
          description: "Douyin profile URL, short link, or share text.",
        },
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_posted_videos_by_sec_user_id",
    remoteName: "douyin_get_user_posted_videos_by_sec_user_id",
    label: "Get Douyin Creator Works By ID",
    description: "Fetch a paginated list of works published by a creator when the caller already has a sec_user_id.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["sec_user_id"],
      properties: {
        sec_user_id: {
          type: "string",
          description: "Douyin sec_user_id.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_posted_videos_by_profile_url",
    remoteName: "douyin_get_user_posted_videos_by_profile_url",
    label: "Get Douyin Creator Works By Profile URL",
    description: "Fetch a paginated list of works published by a creator from a profile link, short link, or share text.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["profile_url"],
      properties: {
        profile_url: {
          type: "string",
          description: "Douyin profile URL, short link, or share text.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_series_by_sec_user_id",
    remoteName: "douyin_get_user_series_by_sec_user_id",
    label: "Get Douyin Creator Series By ID",
    description: "Fetch a paginated list of short-drama series published by a creator when the caller already has a sec_user_id.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["sec_user_id"],
      properties: {
        sec_user_id: {
          type: "string",
          description: "Douyin sec_user_id.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "douyin-insights__douyin_get_user_series_by_profile_url",
    remoteName: "douyin_get_user_series_by_profile_url",
    label: "Get Douyin Creator Series By Profile URL",
    description: "Fetch a paginated list of short-drama series published by a creator from a profile link, short link, or share text.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["profile_url"],
      properties: {
        profile_url: {
          type: "string",
          description: "Douyin profile URL, short link, or share text.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
];

let mcpSdkModules;

export const id = PLUGIN_ID;

export function register(api = {}) {
  for (const definition of TOOL_DEFINITIONS) {
    api.registerTool(
      (context) => createForwardingTool({ api, context, definition }),
      { name: definition.name },
    );
  }
  api.logger?.debug?.(`[${PLUGIN_ID}] registered ${TOOL_DEFINITIONS.length} remote MCP forwarding tools.`);
}

function createForwardingTool({ api, context, definition }) {
  return {
    name: definition.name,
    label: definition.label,
    description: definition.description,
    parameters: definition.parameters,
    execute: async (_toolCallId, rawParams = {}) => {
      return callRemoteMcpTool({
        api,
        context,
        remoteName: definition.remoteName,
        publicName: definition.name,
        args: rawParams && typeof rawParams === "object" ? rawParams : {},
      });
    },
  };
}

async function callRemoteMcpTool({ api, remoteName, publicName, args }) {
  const config = resolvePluginConfig(api);
  const apiKey = readFirstEnv(API_KEY_ENV_NAMES);
  if (!apiKey) {
    throw new Error(`Missing API Key. Set ${DEFAULT_API_KEY_ENV} before using ${PLUGIN_NAME}.`);
  }

  const { Client, StreamableHTTPClientTransport } = await loadMcpSdkModules();
  const client = new Client(
    { name: PLUGIN_ID, version: PLUGIN_VERSION },
    { capabilities: {} },
  );
  const requestInit = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const signal = createTimeoutSignal(config.connectionTimeoutMs);
  if (signal) {
    requestInit.signal = signal;
  }
  const transport = new StreamableHTTPClientTransport(new URL(DEFAULT_ENDPOINT_URL), {
    requestInit,
  });

  try {
    await client.connect(transport, { timeout: config.connectionTimeoutMs });
    const result = await client.callTool({
      name: remoteName,
      arguments: args,
    }, undefined, { timeout: config.connectionTimeoutMs });
    if (result.isError) {
      throw new Error(extractMcpErrorMessage(result, remoteName));
    }
    return buildOpenClawToolResult(result, publicName);
  } finally {
    await client.close().catch(() => {});
  }
}

async function loadMcpSdkModules() {
  if (!mcpSdkModules) {
    const [{ Client }, { StreamableHTTPClientTransport }] = await Promise.all([
      import("@modelcontextprotocol/sdk/client/index.js"),
      import("@modelcontextprotocol/sdk/client/streamableHttp.js"),
    ]);
    mcpSdkModules = { Client, StreamableHTTPClientTransport };
  }
  return mcpSdkModules;
}

function readFirstEnv(names) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

function resolvePluginConfig(api) {
  const liveConfig = api.runtime?.config?.current?.();
  const configured =
    liveConfig?.plugins?.entries?.[PLUGIN_ID]?.config ??
    api.pluginConfig ??
    {};
  return {
    connectionTimeoutMs: normalizeTimeout(configured.connectionTimeoutMs),
  };
}

function normalizeTimeout(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return DEFAULT_CONNECTION_TIMEOUT_MS;
  }
  return Math.min(120000, Math.max(1000, Math.trunc(numeric)));
}

function createTimeoutSignal(timeoutMs) {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(timeoutMs);
  }
  return undefined;
}

function buildOpenClawToolResult(result, publicName) {
  const text = extractTextContent(result.content);
  return {
    content: [
      {
        type: "text",
        text: text || `${publicName} completed.`,
      },
    ],
    details: result.structuredContent ?? {
      content: Array.isArray(result.content) ? result.content : [],
    },
  };
}

function extractMcpErrorMessage(result, remoteName) {
  return (
    result.structuredContent?.message ||
    extractTextContent(result.content) ||
    `Remote MCP tool ${remoteName} returned an error.`
  );
}

function extractTextContent(content) {
  if (!Array.isArray(content)) {
    return "";
  }
  return content
    .filter((item) => item?.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

export default {
  id: PLUGIN_ID,
  name: PLUGIN_NAME,
  description: "Social media research, Douyin content insights, and creator analytics for Douyin and 抖音: hot search, search video and image/text works, analyze comments/replies, read work details, creator profiles, creator work lists, and creator short-drama series through a hosted read-only MCP service.",
  configSchema: CONFIG_SCHEMA,
  register,
};
