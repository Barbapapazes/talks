import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, inject, provide } from 'vue'

vi.mock('@slidev/client', () => ({
  useSlideContext: () => ({
    $frontmatter: {},
    $clicks: 0,
  }),
  useIsSlideActive: () => false,
}))

import BackgroundImage from '../components/BackgroundImage.vue'
import Card from '../components/Card.vue'
import CardLayout from '../components/CardLayout.vue'
import Footer from '../components/Footer.vue'
import FooterItem from '../components/FooterItem.vue'
import FooterLink from '../components/FooterLink.vue'
import Icon from '../components/Icon.vue'
import Modal from '../components/Modal.vue'
import ProgressiveList from '../components/ProgressiveList.vue'
import RecapList from '../components/RecapList.vue'
import Tree from '../components/Tree.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

const dialogCloseKey = Symbol('dialog-close')

const DialogRootStub = defineComponent({
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:open'],
  setup(props, { emit, slots }) {
    const close = () => emit('update:open', false)
    provide(dialogCloseKey, close)

    return () => props.open
      ? h('div', { class: 'dialog-root' }, slots.default?.({ close }))
      : null
  },
})

const DialogPortalStub = defineComponent({
  setup(_, { slots }) {
    return () => h('div', { class: 'dialog-portal' }, slots.default?.())
  },
})

const DialogOverlayStub = defineComponent({
  setup() {
    return () => h('div', { class: 'dialog-overlay' })
  },
})

const DialogContentStub = defineComponent({
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, role: 'dialog' }, slots.default?.())
  },
})

const DialogTitleStub = defineComponent({
  setup(_, { slots }) {
    return () => h('h2', slots.default?.())
  },
})

const DialogDescriptionStub = defineComponent({
  setup(_, { slots }) {
    return () => h('p', slots.default?.())
  },
})

const DialogCloseStub = defineComponent({
  setup(_, { attrs, slots }) {
    const close = inject<() => void>(dialogCloseKey, () => {})

    return () => h('button', {
      'type': 'button',
      'aria-label': attrs['aria-label'] as string | undefined,
      'onClick': close,
    }, slots.default?.())
  },
})

const modalMountOptions = {
  global: {
    stubs: {
      DialogRoot: DialogRootStub,
      DialogPortal: DialogPortalStub,
      DialogOverlay: DialogOverlayStub,
      DialogContent: DialogContentStub,
      DialogTitle: DialogTitleStub,
      DialogDescription: DialogDescriptionStub,
      DialogClose: DialogCloseStub,
    },
  },
}

describe('backgroundImage', () => {
  it('renders nothing when no img is provided', () => {
    const wrapper = mount(BackgroundImage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders an img element when img is provided', () => {
    const wrapper = mount(BackgroundImage, {
      props: { img: '/test-image.jpg' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with a custom alt text', () => {
    const wrapper = mount(BackgroundImage, {
      props: { img: '/test-image.jpg', alt: 'Custom alt text' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with imgClass applied', () => {
    const wrapper = mount(BackgroundImage, {
      props: { img: '/test-image.jpg', imgClass: 'object-top' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('card', () => {
  it('renders correctly with default slot', () => {
    const wrapper = mount(Card, {
      slots: { default: '<p>Card content</p>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('icon', () => {
  it('renders correctly with a name', () => {
    const wrapper = mount(Icon, {
      props: { name: 'i-ph-house-duotone' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with a name and class', () => {
    const wrapper = mount(Icon, {
      props: { name: 'i-ph-house-duotone', class: 'size-4' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('footer', () => {
  it('renders correctly with default slot', () => {
    const wrapper = mount(Footer, {
      slots: { default: '<span>Footer content</span>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('footerItem', () => {
  it('renders correctly with default slot', () => {
    const wrapper = mount(FooterItem, {
      slots: { default: '<span>Item content</span>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with text prop', () => {
    const wrapper = mount(FooterItem, {
      props: { text: 'Footer item text' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('footerLink', () => {
  it('renders correctly with href and text', () => {
    const wrapper = mount(FooterLink, {
      props: {
        href: 'https://example.com',
        text: 'Example',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with href, text and icon', () => {
    const wrapper = mount(FooterLink, {
      props: {
        href: 'https://example.com',
        text: 'Example',
        icon: 'i-ph-house-duotone size-4',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('cardLayout', () => {
  it.each([
    'top-left',
    'top-center',
    'top-right',
    'center-left',
    'center',
    'center-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ] as const)('renders correctly with position "%s"', (position) => {
    const wrapper = mount(CardLayout, {
      props: {
        position,
        img: '/test-image.jpg',
      },
      slots: { default: '<p>Card content</p>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with imgClass', () => {
    const wrapper = mount(CardLayout, {
      props: {
        position: 'center',
        img: '/test-image.jpg',
        imgClass: 'object-top',
      },
      slots: { default: '<p>Card content</p>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with outside slot', () => {
    const wrapper = mount(CardLayout, {
      props: {
        position: 'bottom-left',
        img: '/test-image.jpg',
      },
      slots: {
        default: '<p>Card content</p>',
        outside: '<div class="outside-content">Outside</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('tree', () => {
  const items = [
    {
      title: 'src',
      children: [
        {
          title: 'main.ts',
        },
      ],
    },
    {
      id: 'package-json',
      title: 'package.json',
    },
  ]

  it('renders correctly with the panel variant', () => {
    const wrapper = mount(Tree, {
      props: {
        name: 'Project Files',
        items,
        defaultExpanded: ['src'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with the plain variant', () => {
    const wrapper = mount(Tree, {
      props: {
        name: 'Project Files',
        items,
        defaultExpanded: ['src'],
        variant: 'plain',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits the selected item when a row is clicked', async () => {
    const wrapper = mount(Tree, {
      props: {
        items,
        defaultExpanded: ['src'],
      },
    })

    await wrapper.get('[role="treeitem"]').trigger('click')

    expect(wrapper.emitted('select')).toEqual([[items[0]]])
  })

  it('infers icons from folder names and file extensions while keeping explicit icons', () => {
    const wrapper = mount(Tree, {
      props: {
        items: [
          {
            title: 'dist',
            children: [
              {
                title: 'assets',
                children: [
                  {
                    title: 'image-DNpSpoYj.jpg',
                  },
                  {
                    title: 'vite.config.ts',
                  },
                  {
                    title: 'README.md',
                    icon: 'i-custom-readme-icon',
                  },
                ],
              },
            ],
          },
        ],
        defaultExpanded: ['dist', 'assets'],
      },
    })

    const html = wrapper.html()

    expect(html).toContain('i-vscode-icons-folder-type-dist-opened')
    expect(html).toContain('i-vscode-icons-folder-type-asset-opened')
    expect(html).toContain('i-vscode-icons-file-type-image')
    expect(html).toContain('i-vscode-icons-file-type-vite')
    expect(html).toContain('i-custom-readme-icon')
  })
})

describe('modal', () => {
  it('does not render dialog content when closed', () => {
    const wrapper = mount(Modal, {
      ...modalMountOptions,
      props: {
        open: false,
        title: 'Hidden modal',
      },
      slots: {
        default: '<div>Invisible content</div>',
      },
    })

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Invisible content')
  })

  it('renders dialog content, title and footer when open', async () => {
    const wrapper = mount(Modal, {
      ...modalMountOptions,
      props: {
        open: true,
        title: 'Shared modal',
        description: 'Reusable dialog wrapper',
      },
      slots: {
        default: '<div class="modal-body">Body content</div>',
        footer: '<button type="button">Done</button>',
      },
    })

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Shared modal')
    expect(wrapper.text()).toContain('Reusable dialog wrapper')
    expect(wrapper.text()).toContain('Body content')
    expect(wrapper.text()).toContain('Done')
  })

  it('emits update:open when the close button is clicked', async () => {
    const wrapper = mount(Modal, {
      ...modalMountOptions,
      props: {
        open: true,
        title: 'Closable modal',
        description: 'Close me if you can',
      },
      slots: {
        default: '<div>Body content</div>',
      },
    })

    await wrapper.get('[aria-label="Close modal"]').trigger('click')

    expect(wrapper.emitted('update:open')).toEqual([[false]])
  })
})

describe('progressiveList', () => {
  it('dims previously revealed items until an extra click clears the dimming', async () => {
    const mountProgressiveList = ($clicks: number) => mount(ProgressiveList, {
      props: {
        items: ['Glitches', 'Cyclic dependencies', 'Mutable state'],
      },
      global: {
        mocks: {
          $clicks,
        },
        directives: {
          click: {},
        },
      },
    })

    const afterSecondClick = mountProgressiveList(2).findAll('[data-progressive-list-item]')
    expect(afterSecondClick[0].classes()).toContain('opacity-20')
    expect(afterSecondClick[1].classes()).not.toContain('opacity-20')
    expect(afterSecondClick[2].classes()).not.toContain('opacity-20')

    const afterThirdClick = mountProgressiveList(3).findAll('[data-progressive-list-item]')
    expect(afterThirdClick[0].classes()).toContain('opacity-20')
    expect(afterThirdClick[1].classes()).toContain('opacity-20')
    expect(afterThirdClick[2].classes()).not.toContain('opacity-20')

    const afterExtraClick = mountProgressiveList(4).findAll('[data-progressive-list-item]')
    for (const item of afterExtraClick)
      expect(item.classes()).not.toContain('opacity-20')
  })
})

describe('recapList', () => {
  it('renders the title and each recap item', () => {
    const wrapper = mount(RecapList, {
      props: {
        title: 'Vite en 3 points',
        items: [
          {
            title: 'Un serveur web pour le développement',
            description: 'Il fait transiter des requêtes qu\'on transformera à la volée',
          },
          {
            title: 'Un bundler pour la production',
            description: 'Il transforme notre code pour la production',
          },
          {
            title: 'Un système de plugins',
            description: 'Pour étendre ses fonctionnalités et faire tout ce qu\'on veut',
          },
        ],
      },
      global: {
        directives: {
          click: {},
        },
      },
    })

    expect(wrapper.findAll('[data-recap-list-item]')).toHaveLength(3)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
