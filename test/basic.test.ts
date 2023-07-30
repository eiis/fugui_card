import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheCounter from '../src/components/TheCounter.vue'

describe('tests', () => {
  it('should works', () => {
    const wrapper = mount(TheCounter, { props: { initial: 10 } })
    console.log(wrapper)
    // expect(1 + 1).toMatchSnapshot()
    expect(1 + 1).toEqual(2)
  })
})
