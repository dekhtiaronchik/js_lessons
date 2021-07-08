import 'regenerator-runtime/runtime'
import {
    mount
} from '@vue/test-utils'
import TestComponent from './TestComponent'

describe('TestComponent', () => {
    test('Content of TestComponent', () => {
        const wrapper = mount(TestComponent, {
            propsData: {
                message: 'Hello from test!'
            }
        })
        expect(wrapper.text()).toEqual(
            'The message is: Hello from test!'
        )
    })
})