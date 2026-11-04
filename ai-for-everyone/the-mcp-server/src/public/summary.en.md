How does an LLM application go from drafting a GitHub issue to creating one? A simulated GitHub integration illustrates how the Model Context Protocol connects an application to external capabilities, and where the model, MCP client, and server each fit in.

Using MCP revision 2026-07-28, the session follows server discovery and tool execution through stateless JSON-RPC 2.0 requests, each carrying its own protocol version and client capabilities. It compares local connections over stdio with remote connections over Streamable HTTP, and distinguishes MCP from the APIs a server can call and the model's own tool-calling mechanism.

Beyond tools such as `create_issue`, the examples introduce resources for reading repository content and prompts for reusable requests such as pull request reviews. They show why exposing a capability does not grant permission to use it, why resources do not automatically enter the model's context, and how the host application orchestrates these interactions.
