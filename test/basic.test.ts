import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheCounter from '../src/components/TheCounter.vue'

describe('TheCounter.vue', () => {
  // 测试组件是否渲染
  it('should render', () => {
    // 创建一个TheCounter组件，并传入initial属性
    const wrapper = mount(TheCounter, { props: { initial: 10 } })
    // 断言wrapper中text()的值是否包含'10'
    expect(wrapper.text()).toContain('10')
    // 断言wrapper中html()的值是否包含快照
    expect(wrapper.html()).toMatchSnapshot()
  })

  // 测试组件是否可以接受点击事件
  it('should be interactive', async () => {
    // 创建一个TheCounter组件，并传入initial属性
    const wrapper = mount(TheCounter, { props: { initial: 0 } })
    // 断言wrapper中text()的值是否包含'0'
    expect(wrapper.text()).toContain('0')

    // 断言wrapper中.inc组件是否存在
    expect(wrapper.find('.inc').exists()).toBe(true)

    // 断言wrapper中.dec组件是否存在
    expect(wrapper.find('.dec').exists()).toBe(true)

    // 触发.inc组件的点击事件
    await wrapper.get('.inc').trigger('click')

    // 断言wrapper中text()的值是否包含'1'
    expect(wrapper.text()).toContain('1')

    // 触发.dec组件的点击事件
    await wrapper.get('.dec').trigger('click')

    // 断言wrapper中text()的值是否包含'0'
    expect(wrapper.text()).toContain('0')
  })
})
