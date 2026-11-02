import type { Directive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TokenCapabilities from '../components/TokenCapabilities.vue'

const resize = vi.hoisted(() => ({ notify: () => {} }))

vi.mock('@vueuse/core', async () => {
  const { onMounted } = await import('vue')
  return {
    useResizeObserver: (_target: unknown, callback: () => void) => {
      resize.notify = callback
      onMounted(callback)
    },
  }
})

// Record Slidev's reveal steps without requiring a running presentation.
const click: Directive = {
  mounted(el, binding) {
    el.dataset.revealAt = String(binding.value)
  },
}

function mountCapabilities(props = {}) {
  return mount(TokenCapabilities, {
    props,
    global: { directives: { click } },
  })
}

describe('tokenCapabilities', () => {
  it('renders the model capabilities and token examples', () => {
    const wrapper = mountCapabilities()

    expect(wrapper.get('.source').text()).toBe('Generate thenext token')
    expect(wrapper.findAll('.label').map(label => label.text())).toEqual([
      'Text',
      'Reasoning',
      'Tool calling',
    ])
    expect(wrapper.findAll('.tokens').map(tokens => tokens.element.textContent)).toEqual([
      'The capital of France is Paris.',
      '17 × 20 = 340, 17 × 4 = 68…',
      'get_time({"city": "Paris"})',
    ])
    expect(wrapper.find('.loop-connectors').exists()).toBe(false)
  })

  it('keeps the original progressive reveal by default', () => {
    const wrapper = mountCapabilities()

    expect(wrapper.get('.source').attributes('data-reveal-at')).toBe('1')
    expect(wrapper.findAll('.branch').map(branch => branch.attributes('data-reveal-at'))).toEqual(['2', '3', '4'])
  })

  it('shows all capabilities initially and reveals the loop on the first click', async () => {
    const wrapper = mountCapabilities({ revealAt: 0, loop: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.get('.source').attributes('data-reveal-at')).toBe('0')
    expect(wrapper.findAll('.branch').map(branch => branch.attributes('data-reveal-at'))).toEqual(['0', '0', '0'])
    const arrows = wrapper.get('.loop-connectors')
    expect(arrows.element.parentElement?.dataset.revealAt).toBe('1')
    expect(arrows.findAll('path')).toHaveLength(4)
  })

  it('connects the loop to each token row and updates after resizing', async () => {
    const wrapper = mountCapabilities({ revealTogether: true, loop: true })
    const rows = wrapper.findAll('.tokens')

    rows.forEach((row, index) => {
      Object.defineProperties(row.element, {
        offsetWidth: { configurable: true, value: 300 + index * 20 },
        offsetTop: { value: 30 },
        offsetHeight: { value: 28 },
      })
    })
    resize.notify()
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.loop-connectors path').slice(0, 3).map(path => path.attributes('d'))).toEqual([
      'M 700 57 H 875 V 390 H 110 V 223',
      'M 720 172 H 875 V 390 H 110 V 223',
      'M 740 287 H 875 V 390 H 110 V 223',
    ])

    Object.defineProperty(rows[0]!.element, 'offsetWidth', { value: 350 })
    resize.notify()
    await wrapper.vm.$nextTick()
    expect(wrapper.get('.loop-connectors path').attributes('d')).toBe('M 750 57 H 875 V 390 H 110 V 223')
  })

  it('reveals the entire chart on the first click and the loop on the second', () => {
    const wrapper = mountCapabilities({ revealTogether: true, loop: true })

    expect(wrapper.get('.source').attributes('data-reveal-at')).toBe('1')
    expect(wrapper.findAll('.branch').map(branch => branch.attributes('data-reveal-at'))).toEqual(['1', '1', '1'])
    expect(wrapper.get('.loop-connectors').element.parentElement?.dataset.revealAt).toBe('2')
  })

  it('reveals the loop after all branches when using progressive reveals', () => {
    const wrapper = mountCapabilities({ revealAt: 2, loop: true })

    expect(wrapper.findAll('.branch').map(branch => branch.attributes('data-reveal-at'))).toEqual(['3', '4', '5'])
    expect(wrapper.get('.loop-connectors').element.parentElement?.dataset.revealAt).toBe('6')
  })
})
