import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ModelParameters from '../components/ai/ModelParameters.vue'

describe('modelParameters', () => {
  it('renders an accessible illustrative grid with 48 colored parameters', () => {
    const wrapper = mount(ModelParameters)
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('Illustrative grid of numerical model parameters')
    expect(wrapper.findAll('span')).toHaveLength(48)
    expect(wrapper.findAll('.bg-teal-700')).toHaveLength(16)
    expect(wrapper.findAll('.bg-primary')).toHaveLength(32)
  })

  it('defaults to trained parameters and updates their opacity during training', async () => {
    const wrapper = mount(ModelParameters)
    const trainedStyles = wrapper.findAll('span').map(cell => cell.attributes('style'))
    await wrapper.setProps({ trained: false })
    expect(wrapper.findAll('span').map(cell => cell.attributes('style'))).not.toEqual(trainedStyles)
    await wrapper.setProps({ trained: true })
    expect(wrapper.findAll('span').map(cell => cell.attributes('style'))).toEqual(trainedStyles)
  })

  it('accepts sizing and positioning classes from the slide', () => {
    const wrapper = mount(ModelParameters, { attrs: { class: 'w-200px' } })
    expect(wrapper.classes()).toContain('w-200px')
  })
})
