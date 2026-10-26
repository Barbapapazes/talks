import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { isSlideActive } from '../../../../theme/__tests__/mocks/slidev-client'
import McpPromptDemo from '../components/McpPromptDemo.vue'
import McpResourceDemo from '../components/McpResourceDemo.vue'
import McpToolDemo from '../components/McpToolDemo.vue'

const wrappers: ReturnType<typeof mount>[] = []
function render(capability: 'tool' | 'resource' | 'prompt') {
  const components = { tool: McpToolDemo, resource: McpResourceDemo, prompt: McpPromptDemo }
  const wrapper = mount(components[capability], { attachTo: document.body, global: { stubs: { DialogPortal: { template: '<div><slot /></div>' } } } })
  wrappers.push(wrapper)
  return wrapper
}
async function finishConversation() {
  for (let i = 0; i < 2; i++) {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }))
    await nextTick()
  }
}
beforeEach(() => {
  vi.useFakeTimers()
  isSlideActive.value = true
})
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => {
    wrapper.unmount()
    wrapper.element.remove()
  })
  vi.useRealTimers()
})

describe('mcp capability demos', () => {
  it('calls create_issue and confirms issue #42', async () => {
    const wrapper = render('tool')
    await finishConversation()
    expect(wrapper.text()).toContain('create_issue')
    expect(wrapper.text()).toContain('Created issue #42')
  })

  it('requires selecting the resource before using its content', async () => {
    const wrapper = render('resource')
    await finishConversation()
    expect(wrapper.text()).not.toContain('Project Dashboard lets teams')
    await wrapper.get('.add-context').trigger('click')
    expect(wrapper.findAll('.resource-option')).toHaveLength(3)
    await wrapper.get('.resource-option').trigger('click')
    await finishConversation()
    expect(wrapper.get('[aria-label="Message context"]').text()).toContain('Project brief')
    expect(wrapper.find('[aria-label="Attached context"]').exists()).toBe(false)
    expect(wrapper.find('.composer-context .attachment-chip').exists()).toBe(false)
    expect(wrapper.text()).toContain('Project Dashboard lets teams')
    expect(wrapper.text()).not.toContain('create_issue')
  })

  it('loads a prompt without pretending to fetch the pull request', async () => {
    const wrapper = render('prompt')
    await wrapper.get('.command-input').setValue('/')
    expect(wrapper.get('.command-picker').text()).toContain('/review_pull_request')
    await wrapper.get('.command-picker button').trigger('click')
    expect(wrapper.get('[role="dialog"]').text()).toContain('Review a pull request')
    expect(wrapper.get<HTMLInputElement>('[name="repository"]').element.value).toBe('acme/project-dashboard')
    expect(wrapper.get<HTMLInputElement>('[name="pull_request"]').element.value).toBe('17')
    await finishConversation()
    expect(wrapper.text()).not.toContain('Please attach the diff')
    await wrapper.get('.command-arguments').trigger('submit')
    expect(wrapper.get('.command-badge').text()).toBe('/review_pull_request')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('.prompt-composer').text()).toContain('/review_pull_request Review pull request #17 in acme/project-dashboard')
    expect(wrapper.find('[aria-label="Message context"]').exists()).toBe(false)
    await finishConversation()
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.text()).toContain('Review pull request #17 in acme/project-dashboard')
    expect(wrapper.text()).toContain('Please attach the diff')
    expect(wrapper.find('.prompt-composer .command-badge').exists()).toBe(false)
    expect(wrapper.get('.prompt-composer').text()).toBe('Type your message...')
    expect(wrapper.get('.command-badge').text()).toBe('/review_pull_request')
  })

  it('uses edited arguments in both the prepared message and the model reply', async () => {
    const wrapper = render('prompt')
    await wrapper.get('.command-input').setValue('/review')
    await wrapper.get('.command-input').trigger('keydown', { key: 'Enter' })
    await wrapper.get('[name="repository"]').setValue('acme/another-project')
    await wrapper.get('[name="pull_request"]').setValue('28')
    await wrapper.get('.command-arguments').trigger('submit')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('.prompt-composer').text()).toContain('Review pull request #28 in acme/another-project')
    expect(wrapper.text()).not.toContain('Please attach the diff')
    await finishConversation()
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.text()).toContain('Please attach the diff for pull request #28')
    expect(wrapper.text()).not.toContain('pull request #17')
  })

  it('requires both arguments before loading the prompt', async () => {
    const wrapper = render('prompt')
    await wrapper.get('.command-input').setValue('/')
    await wrapper.get('.command-option').trigger('click')
    await wrapper.get('[name="repository"]').setValue(' ')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
    await wrapper.get('.command-arguments').trigger('submit')
    expect(wrapper.find('.command-arguments').exists()).toBe(true)
    await wrapper.get('[name="repository"]').setValue('acme/project-dashboard')
    await wrapper.get('[name="pull_request"]').setValue('not-a-number')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
    await wrapper.get('[name="pull_request"]').setValue('17')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeUndefined()
  })

  it('selects a slash command with Enter and dismisses suggestions with Escape', async () => {
    const wrapper = render('prompt')
    await wrapper.get('.command-input').setValue('/')
    await wrapper.get('.command-input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.command-picker').exists()).toBe(false)
    await wrapper.get('.command-input').setValue('/review')
    await wrapper.get('.command-input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.get('[role="dialog"]').text()).toContain('Review a pull request')
  })

  it('supports multiple removable attachments and closes with Escape', async () => {
    const wrapper = render('resource')
    await wrapper.get('.add-context').trigger('click')
    await wrapper.findAll('.resource-option')[0]!.trigger('click')
    await wrapper.get('.add-context').trigger('click')
    expect(wrapper.findAll('.resource-option')[0]!.attributes('disabled')).toBeDefined()
    await wrapper.findAll('.resource-option')[1]!.trigger('click')
    expect(wrapper.findAll('.attachment-chip')).toHaveLength(2)
    await wrapper.get('[aria-label="Remove Project brief"]').trigger('click')
    expect(wrapper.findAll('.attachment-chip')).toHaveLength(1)
    await wrapper.get('.add-context').trigger('click')
    await wrapper.get('.add-context').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.resource-picker').exists()).toBe(false)
  })

  it('clears the prompt when revisiting a slide', async () => {
    const wrapper = render('prompt')
    await wrapper.get('.command-input').setValue('/review')
    await wrapper.get('.command-input').trigger('keydown', { key: 'Enter' })
    await wrapper.get('.command-arguments').trigger('submit')
    await vi.advanceTimersByTimeAsync(5000)
    isSlideActive.value = false
    await nextTick()
    isSlideActive.value = true
    await nextTick()
    expect(wrapper.get<HTMLInputElement>('.command-input').element.value).toBe('')
    expect(wrapper.find('.command-badge').exists()).toBe(false)
    expect(wrapper.find('.command-picker').exists()).toBe(false)
    await finishConversation()
    expect(wrapper.text()).not.toContain('Please attach the diff')
  })

  it('clears the selection when revisiting a slide', async () => {
    const wrapper = render('resource')
    await wrapper.get('.add-context').trigger('click')
    await wrapper.get('.resource-option').trigger('click')
    isSlideActive.value = false
    await nextTick()
    isSlideActive.value = true
    await nextTick()
    expect(wrapper.find('.attachments').exists()).toBe(false)
    expect(wrapper.get('.add-context').attributes('aria-expanded')).toBe('false')
  })
})
