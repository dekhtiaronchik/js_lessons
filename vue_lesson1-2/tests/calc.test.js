import 'regenerator-runtime/runtime'
import {
    mount
} from '@vue/test-utils'
import Calculator from '../src/components/Calculator.vue'

describe('Calculator operations tests', () => {
    test('Test sum operation', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('100')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')

        const sumOperationButton = wrapper.find('button[name="sum"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(105)
    })

    test('Test sub operation', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('100')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')

        const sumOperationButton = wrapper.find('button[name="sub"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(95)
    })

    test('Test mul operation', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('100')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')

        const sumOperationButton = wrapper.find('button[name="mul"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(500)
    })

    test('Test div operation', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('100')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')

        const sumOperationButton = wrapper.find('button[name="div"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(20)
    })

    test('Test intDiv operation', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('100')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')

        const sumOperationButton = wrapper.find('button[name="intDiv"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(20)
    })

    test('Test exp operation', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('5')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        const sumOperationButton = wrapper.find('button[name="exp"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(25)
    })

    test('Test input1', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('5')

        expect(wrapper.vm.operand1).toBe('5')
    })

    test('Test input2', async () => {
        const wrapper = mount(Calculator)

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('5')

        expect(wrapper.vm.operand2).toBe('5')
    })

    test('Test keyboard', async () => {
        const wrapper = mount(Calculator)

        const radio1 = wrapper.find('input[name=radio1]')
        const numberButton = wrapper.find('button[name="one"]')
        radio1.trigger('click')
        numberButton.trigger('click')

        expect(wrapper.vm.operand1).toBe('1')
    })

    test('Test delete', async () => {
        const wrapper = mount(Calculator)

        const deleteButton = wrapper.find('button[name=deleteButton]')
        const radio1 = wrapper.find('input[name=radio1]')
        const numberButton = wrapper.find('button[name="one"]')
        radio1.trigger('click')
        numberButton.trigger('click')
        numberButton.trigger('click')
        deleteButton.trigger('click')

        expect(wrapper.vm.operand1).toBe('1')
    })
})