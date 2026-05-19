import { resetSlideEnterCallbacks, slideEnterCallbacks } from '@slidev/client'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import Card from '../components/Card.vue'
import CardLayout from '../components/CardLayout.vue'
import Footer from '../components/Footer.vue'
import FooterItem from '../components/FooterItem.vue'
import FooterLink from '../components/FooterLink.vue'
import Icon from '../components/Icon.vue'
import LazySlidevGraph from '../components/LazySlidevGraph.vue'

beforeEach(() => {
  resetSlideEnterCallbacks()
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

  it('applies custom positionClass to the positioned card container', () => {
    const wrapper = mount(CardLayout, {
      props: {
        position: 'bottom-left',
        img: '/test-image.jpg',
        positionClass: 'right-2/5',
      },
      slots: { default: '<p>Card content</p>' },
    })

    expect(wrapper.find('.absolute.bottom-10.left-14.right-2\\/5').exists()).toBe(true)
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

describe('lazySlidevGraph', () => {
  const slidevGraphStub = {
    name: 'SlidevGraph',
    props: ['id', 'items', 'clicks'],
    template: '<div data-test="slidev-graph" :data-id="id" :data-clicks="clicks" :data-items-count="items.length" />',
  }

  it('does not render the graph before the slide is entered', () => {
    const wrapper = mount(LazySlidevGraph, {
      props: {
        id: 'graph-theory',
        items: [],
      },
      global: {
        stubs: {
          SlidevGraph: slidevGraphStub,
        },
      },
    })

    expect(slideEnterCallbacks).toHaveLength(1)
    expect(wrapper.find('[data-test="slidev-graph"]').exists()).toBe(false)
  })

  it('renders the graph on slide enter and forwards props', async () => {
    const items = [
      {
        name: 'a',
        display: 'A',
        color: '#dc2626',
        clicks: 1,
      },
    ]

    const wrapper = mount(LazySlidevGraph, {
      props: {
        id: 'graph-theory',
        items,
      },
      global: {
        stubs: {
          SlidevGraph: slidevGraphStub,
        },
      },
    })

    slideEnterCallbacks[0]!()
    await nextTick()

    const graph = wrapper.get('[data-test="slidev-graph"]')
    expect(graph.attributes('data-id')).toBe('graph-theory')
    expect(graph.attributes('data-clicks')).toBe('0')
    expect(graph.attributes('data-items-count')).toBe('1')
    expect(wrapper.getComponent({ name: 'SlidevGraph' }).props('items')).toEqual(items)
  })
})
