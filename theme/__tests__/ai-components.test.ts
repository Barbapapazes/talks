import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProbabilityBar from '../components/ai/ProbabilityBar.vue'
import TokenChip from '../components/ai/TokenChip.vue'

describe('tokenChip', () => {
  it('renders token text verbatim, including leading whitespace', () => {
    const wrapper = mount(TokenChip, { slots: { default: () => ' Paris' } })
    expect(wrapper.element.textContent).toBe(' Paris')
    expect(wrapper.classes()).toContain('whitespace-pre')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size', (size) => {
    const wrapper = mount(TokenChip, { props: { size }, slots: { default: 'Paris' } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can switch from plain sentence text to a highlighted token', async () => {
    const wrapper = mount(TokenChip, { props: { plain: true, class: 'token' } })
    expect(wrapper.classes()).toContain('border-transparent')
    expect(wrapper.classes()).not.toContain('text-primary')
    await wrapper.setProps({ plain: false })
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes()).toContain('token')
  })
})

describe('probabilityBar', () => {
  it('renders a neutral track with an accessible value', () => {
    const wrapper = mount(ProbabilityBar, { props: { value: 78 } })
    expect(wrapper.attributes('aria-valuenow')).toBe('78')
    expect(wrapper.get('span').attributes('style')).toContain('width: 78%')
    expect(wrapper.get('span').classes()).toContain('bg-neutral-400')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('highlights a selected candidate', async () => {
    const wrapper = mount(ProbabilityBar, { props: { value: 78 } })
    await wrapper.setProps({ active: true })
    expect(wrapper.get('span').classes()).toContain('bg-primary')
  })

  it('reveals the labelled bar without changing its value', async () => {
    const wrapper = mount(ProbabilityBar, { props: { value: 9, variant: 'labelled', revealed: false } })
    expect(wrapper.text()).toBe('9%')
    expect(wrapper.get('span').classes()).toContain('scale-x-0')
    await wrapper.setProps({ revealed: true })
    expect(wrapper.get('span').classes()).toContain('scale-x-100')
    expect(wrapper.attributes('aria-valuenow')).toBe('9')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([[-10, 0], [120, 100], [0, 0], [100, 100]])('clamps %s to %s', (value, expected) => {
    const wrapper = mount(ProbabilityBar, { props: { value, variant: 'labelled' } })
    expect(wrapper.attributes('aria-valuenow')).toBe(String(expected))
    expect(wrapper.text()).toBe(`${expected}%`)
    expect(wrapper.get('span').attributes('style')).toContain(`width: ${expected}%`)
  })
})
