// Prerecorded Markdown, streamed as text. Comark parses each cumulative frame in Vue.
const weatherChunks = [
  'A made-up forecast for your walk to the pub:\n\n',
  '::weather-card{city="Prague"',
  ' temperature="19°C"',
  ' condition="Partly cloudy"}\n',
  'Bring a light jacket for the evening.\n',
  '::\n\n',
]

const mapChunks = [
  'Here is the hackathon pub. Drag the map to explore.\n\n',
  '::weather-map\n',
  'Zoom in to find the pub.\n',
  '::\n\n',
]

export const weatherFrames = weatherChunks.map((_, index) => weatherChunks.slice(0, index + 1).join(''))
export const mapFrames = mapChunks.map((_, index) => mapChunks.slice(0, index + 1).join(''))
