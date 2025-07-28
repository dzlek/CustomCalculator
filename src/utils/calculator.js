export const initCalculator = () => {
    const display = document.getElementById('display')
    const buttons = document.querySelectorAll('.buttons button')

    const calc = {
        num1: '',
        num2: '',
        op: '',
        result: '',
        display,
        updateDisplay(value) {
            this.display.textContent = value
        },
        clear() {
            this.num1 = ''
            this.num2 = ''
            this.op = ''
            this.result = ''
            this.updateDisplay('0')
        },
    }

    const digitCmd = (digit) => ({
        execute: () => {
            if (calc.num1.length >= 24) return
            if (calc.num1 === '0') {
                if (digit === '0') return
                calc.num1 = digit
            } else {
                calc.num1 += digit
            }
            calc.updateDisplay(calc.num1)
        },
    })

    const operationCmd = (operator) => ({
        execute: () => {
            calc.num2 = calc.num1
            calc.num1 = ''
            calc.op = operator
            calc.updateDisplay(operator)
        },
    })

    const equalCmd = () => ({
        execute: () => {
            const { num1, num2, op } = calc
            let result = ''
            switch (op) {
                case '+':
                    result = Number(num2) + Number(num1)
                    break
                case '-':
                    result = Number(num2) - Number(num1)
                    break
                case '*':
                    result = Number(num2) * Number(num1)
                    break
                case '/':
                    result = Number(num2) / Number(num1)
                    break
                default:
                    return
            }
            calc.result = result
            calc.num1 = String(result)
            calc.num2 = ''
            calc.op = ''
            calc.updateDisplay(result)
        },
    })

    const dotCmd = () => ({
        execute: () => {
            if (!calc.num1.includes('.')) {
                calc.num1 += calc.num1 ? '.' : '0.'
                calc.updateDisplay(calc.num1)
            }
        },
    })

    const plusMinusCmd = () => ({
        execute: () => {
            if (calc.num1) {
                calc.num1 = String(-Number(calc.num1))
                calc.updateDisplay(calc.num1)
            }
        },
    })

    const percentCmd = () => ({
        execute: () => {
            let percentValue
            if (calc.op === '+' || calc.op === '-') {
                percentValue = (calc.num1 * calc.num2) / 100
            } else {
                percentValue = calc.num1 / 100
            }
            calc.num1 = String(percentValue)
            calc.updateDisplay(calc.num1)
        },
    })

    const clearCmd = () => ({
        execute: () => calc.clear(),
    })

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action
            const value = btn.textContent
            let command = null

            if (!action) {
                command = digitCmd(value)
            } else {
                switch (action) {
                    case 'plus':
                        command = operationCmd('+')
                        break
                    case 'minus':
                        command = operationCmd('-')
                        break
                    case 'multiply':
                        command = operationCmd('*')
                        break
                    case 'divide':
                        command = operationCmd('/')
                        break
                    case 'equal':
                        command = equalCmd()
                        break
                    case 'dot':
                        command = dotCmd()
                        break
                    case 'plus-minus':
                        command = plusMinusCmd()
                        break
                    case 'percent':
                        command = percentCmd()
                        break
                    case 'ac':
                        command = clearCmd()
                        break
                }
            }

            if (command) command.execute()
            btn.blur()
        })
    })

    document.addEventListener('keydown', (e) => {
        const key = e.key

        const map = {
            '+': 'plus',
            '-': 'minus',
            '*': 'multiply',
            '/': 'divide',
            '%': 'percent',
            Enter: 'equal',
            Backspace: 'ac',
            Delete: 'ac',
            ',': 'dot',
            '.': 'dot',
        }

        if (!isNaN(key)) {
            const btn = [...buttons].find((btn) => btn.textContent === key)
            if (btn) btn.click()
        } else if (key in map) {
            const btn = [...buttons].find(
                (btn) => btn.dataset.action === map[key]
            )
            if (btn) btn.click()
        }
    })
}
