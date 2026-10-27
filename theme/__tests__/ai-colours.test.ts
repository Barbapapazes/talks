// @vitest-environment node

import { createGenerator, presetWind3 } from 'unocss'
import { describe, expect, it } from 'vitest'
import config from '../uno.config'

describe('aI diagram colours', () => {
  it('generates the primary stroke for animated attention links', async () => {
    const uno = await createGenerator({
      ...config,
      presets: [
        presetWind3(),
      ],
    })
    const { css } = await uno.generate('stroke-primary', { preflights: false })
    expect(css).toContain('stroke:var(--slidev-theme-primary)')
  })

  it.each([
    ['bg-primary/9', 'background-color', 9],
    ['bg-primary/15', 'background-color', 15],
    ['border-primary/20', 'border-color', 20],
    ['text-primary/40', 'color', 40],
    ['ring-primary/12', '--un-ring-color', 12],
  ])('generates %s with its opacity', async (utility, property, opacity) => {
    const uno = await createGenerator({
      ...config,
      presets: [
        presetWind3(),
      ],
    })
    const { css } = await uno.generate(utility as string, { preflights: false })
    expect(css).toContain(`${property}:color-mix(in srgb, var(--slidev-theme-primary) ${opacity}%, transparent)`)
  })
})
