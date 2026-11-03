# Chat UI components

These are local shadcn-vue components adapted for this theme's UnoCSS setup. Button, Badge, and Collapsible use the New York sources. The AI Elements compositions use the current Reka base sources.

Upstream sources:
- https://www.shadcn-vue.com/r/styles/new-york/button.json
- https://www.shadcn-vue.com/r/styles/new-york/badge.json
- https://www.shadcn-vue.com/r/styles/new-york/collapsible.json

## AI Elements

The current AI Elements docs describe compositions of UI components, rather than standalone registry entries named `reasoning` or `tool`.

| Chat wrapper | Documented composition |
| --- | --- |
| `ChatMessage` | [Message](https://shadcn-vue.com/docs/ai-elements/message) with MessageContent, Bubble, and BubbleContent |
| `ChatInput` | [Prompt Input](https://shadcn-vue.com/docs/ai-elements/prompt-input) with InputGroup, InputGroupAddon, and InputGroupButton |
| `ChatReasoning` | [Reasoning](https://shadcn-vue.com/docs/ai-elements/reasoning) with Trace, TraceCollapsible, TraceLine, and TraceTitle |
| `ChatToolCall` | [Tool](https://shadcn-vue.com/docs/ai-elements/tool) with Trace and CodeBlock |

These components were adapted from [the Reka base sources at d1bf1b3](https://github.com/unovue/shadcn-vue/tree/d1bf1b3a2d1a824b19f32d7253a28a43797b8253/apps/v4/registry/bases/reka/ui). Only the parts and options used by the slides are included. CodeBlockContent supports plain text, wrapping, and JSON syntax highlighting through Shiki's JavaScript engine with GitHub light and dark themes. Pass `code` and `language="json"` to highlight valid JSON. Non-JSON content stays plain text. ChatToolCall uses this for both input and output. Line numbers are not included.

The chat wrappers share a Nuxt UI-inspired zinc palette with black primary controls in light mode and white primary controls in dark mode. Buttons, badges, code blocks, and cards use one radius scale. User messages fit their content up to 80% width, assistant responses use the available width, and the composer uses the same rounded rectangle with or without context. Reasoning keeps its leading caret and left border, and tool calls use subtle headers and status badges. The tool status names distinguish a model request from application execution, so they remain Requested, Running, and Completed.

Prompt Input uses the documented Input Group composition with a simulated message display in place of an editable textarea. File selection, model menus, message actions, AI SDK state, and markdown rendering dependencies are not installed. Existing attachment slots and pre-rendered assistant HTML still work.

## Styling and maintenance

Button retains Reka's Primitive composition and the variants used by chat. Badge uses a span for inline status labels. Collapsible exports Reka directly rather than wrapping it in pass-through components. We omit height animations so slide captures and scripted changes don't wait for transitions.

Styles use local `--ui-*` variables in `theme/styles/ui.css`, based on [Nuxt UI's design system](https://ui.nuxt.com/docs/getting-started/theme/design-system). Tokens are defined only at UI roots so nested primitives inherit overrides. Set `--ui-primary`, `--ui-primary-hover`, and `--ui-primary-foreground` on a chat root to change its accent. `--ui-radius` controls small controls, and `--ui-radius-lg` controls cards, bubbles, and the composer. No Tailwind dependency, preflight, global color aliases, CLI configuration, or class-merging package is required. These are owned components, not automatically synchronized registry files. Review upstream changes before porting them.

Keep chat orchestration in `ChatAnimation.vue` and `useAnimationTimeline`. The composer is a simulated display, not an editable textarea. Chat props, slots, and timeline shortcuts remain independent of these UI components.

Upstream shadcn-vue is MIT licensed. See `LICENSE`.
