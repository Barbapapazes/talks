// cl100k_base tokenization, including each token's leading space.
// Embeddings are illustrative, not extracted from a model.
export const inputTokens = [
  { text: 'The', id: 791, embedding: [0.12, -0.34, 0.08, 0.45, -0.23, 0.61, -0.12, 0.3] },
  { text: ' capital', id: 6864, embedding: [-0.21, 0.67, 0.15, -0.31, 0.42, 0.08, -0.52, 0.19] },
  { text: ' of', id: 315, embedding: [0.43, 0.02, -0.56, 0.12, -0.38, 0.29, 0.51, -0.17] },
  { text: ' France', id: 9822, embedding: [0.71, -0.18, 0.39, -0.44, 0.16, 0.54, -0.27, 0.05] },
  { text: ' is', id: 374, embedding: [-0.09, 0.31, 0.62, 0.18, -0.46, 0.03, 0.35, -0.29] },
]

export const sentence = inputTokens.map(token => token.text).join('')

export function visibleToken(text: string) {
  return text.replaceAll(' ', '·')
}

export function formatEmbedding(values: number[]) {
  return `[${values.slice(0, 3).map(value => value.toFixed(2).replace('-', '−').padStart(5)).join(', ')}, … ]`
}

// Displayed logits and probabilities agree under softmax, rounded to integers.
export const nextTokenCandidates = [
  { text: ' Paris', logit: '4.36', probability: 78 },
  { text: ' Lyon', logit: '2.20', probability: 9 },
  { text: ' the', logit: '1.61', probability: 5 },
  { text: null, logit: '…', probability: 8 },
]
