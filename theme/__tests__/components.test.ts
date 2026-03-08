import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BackgroundImage from '../components/BackgroundImage.vue'
import Card from '../components/Card.vue'
import CardLayout from '../components/CardLayout.vue'
import Footer from '../components/Footer.vue'
import FooterItem from '../components/FooterItem.vue'
import FooterLink from '../components/FooterLink.vue'
import Icon from '../components/Icon.vue'

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
