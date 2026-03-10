import { transformerRemoveComments } from "@shikijs/transformers";

export const shikiOptions = {
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  includeExplanation: true,
  transformers: [
    transformerRemoveComments(),
  ],
  colorReplacements: {
    '#fff': 'transparent',
  },
}
