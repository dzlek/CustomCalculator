import { xPowerY, nthRoot, factorial } from './math'

export const initCalculator = () => {
    const display = document.getElementById('calc-display')
    const buttons = document.querySelectorAll('.calc-btn')

    const calc = {
        num1: '',
        num2: '',
        op: '',
        result: '',
        display,
        memory: 0,
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
            if (calc.num1.length >= 15) return
            if (calc.num1 === '0') {
                if (digit === '0') return
                calc.num1 = digit
            } else {
                calc.num1 += digit
            }
            calc.updateDisplay(calc.num1)
        },
    })

    const equalCmd = () => ({
        execute: () => {
            const { num1, num2, op } = calc
            if (!num1 || !num2 || !op) return

            const a = Number(num2)
            const b = Number(num1)

            let result

            switch (op) {
                case '+':
                    result = a + b
                    break
                case '-':
                    result = a - b
                    break
                case '*':
                    result = a * b
                    break
                case '/':
                    result = b !== 0 ? a / b : 'Error'
                    break
                case 'power':
                    result = xPowerY(a, b)
                    break
                case 'nth-root':
                    result = nthRoot(a, b)
                    break
                default:
                    result = ''
            }

            calc.result = result
            calc.num1 = String(result)
            calc.num2 = ''
            calc.op = ''
            calc.updateDisplay(result)

            console.log(
                `num2: ${num2} (${typeof num2}) ` +
                    `op: ${op} ` +
                    `num1: ${num1} (${typeof num1}) ` +
                    `= result: ${result}`
            )
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

    const squareCmd = () => ({
        execute: () => {
            calc.num1 = String(Number(calc.num1) * Number(calc.num1))
            calc.updateDisplay(calc.num1)
        },
    })

    const cubeCmd = () => ({
        execute: () => {
            calc.num1 = String(
                Number(calc.num1) * Number(calc.num1) * Number(calc.num1)
            )
            calc.updateDisplay(calc.num1)
        },
    })

    const tenPowerCmd = () => ({
        execute: () => {
            calc.num1 = String(xPowerY(10, Number(calc.num1)))
            calc.updateDisplay(calc.num1)
        },
    })

    const inverseCmd = () => ({
        execute: () => {
            if (Number(calc.num1) === 0) return
            calc.num1 = String(1 / Number(calc.num1))
            calc.updateDisplay(calc.num1)
        },
    })

    const powerCmd = () => ({
        execute: () => {
            calc.num2 = calc.num1
            calc.num1 = ''
            calc.op = 'power'
            calc.updateDisplay('^')
        },
    })

    const factorialCmd = () => ({
        execute: () => {
            const result = factorial(Number(calc.num1))
            if (result !== 'Error') {
                calc.num1 = String(result)
                calc.updateDisplay(calc.num1)
            }
        },
    })

    const nthRootCmd = () => ({
        execute: () => {
            if (calc.num1 && calc.num2 && calc.op) {
                const result = nthRoot(Number(calc.num2), Number(calc.num1))
                calc.num2 = String(result)
                calc.num1 = ''
            } else {
                calc.num2 = calc.num1
                calc.num1 = ''
            }
            calc.op = 'nth-root'
            calc.updateDisplay('√')
        },
    })

    const sqrtCmd = () => ({
        execute: () => {
            const x = Number(calc.num1)
            const result = nthRoot(x, 2)
            calc.num1 = String(result)
            calc.updateDisplay(calc.num1)
        },
    })

    const cbrtCmd = () => ({
        execute: () => {
            const x = Number(calc.num1)
            const result = nthRoot(x, 3)
            calc.num1 = String(result)
            calc.updateDisplay(calc.num1)
        },
    })

    const memoryClearCmd = () => ({
        execute: () => {
            calc.memory = 0
        },
    })

    const memoryPlusCmd = () => ({
        execute: () => {
            const value = Number(calc.num1 || '0')
            calc.memory += value
        },
    })

    const memoryMinusCmd = () => ({
        execute: () => {
            const value = Number(calc.num1 || '0')
            calc.memory -= value
        },
    })

    const memoryRecallCmd = () => ({
        execute: () => {
            calc.num1 = String(calc.memory)
            calc.updateDisplay(calc.num1)
        },
    })

    const plusCmd = () => ({
        execute: () => {
            if (calc.num1 && calc.num2 && calc.op) {
                const result = Number(calc.num2) + Number(calc.num1)
                calc.num2 = String(result)
                calc.num1 = ''
            } else {
                calc.num2 = calc.num1
                calc.num1 = ''
            }
            calc.op = '+'
            calc.updateDisplay('+')
        },
    })

    const minusCmd = () => ({
        execute: () => {
            if (calc.num1 && calc.num2 && calc.op) {
                const result = Number(calc.num2) - Number(calc.num1)
                calc.num2 = String(result)
                calc.num1 = ''
            } else {
                calc.num2 = calc.num1
                calc.num1 = ''
            }
            calc.op = '-'
            calc.updateDisplay('-')
        },
    })

    const multiplyCmd = () => ({
        execute: () => {
            if (calc.num1 && calc.num2 && calc.op) {
                const result = Number(calc.num2) * Number(calc.num1)
                calc.num2 = String(result)
                calc.num1 = ''
            } else {
                calc.num2 = calc.num1
                calc.num1 = ''
            }
            calc.op = '*'
            calc.updateDisplay('*')
        },
    })

    const divideCmd = () => ({
        execute: () => {
            if (calc.num1 && calc.num2 && calc.op) {
                const result =
                    Number(calc.num1) !== 0
                        ? Number(calc.num2) / Number(calc.num1)
                        : 'Error'
                calc.num2 = String(result)
                calc.num1 = ''
            } else {
                calc.num2 = calc.num1
                calc.num1 = ''
            }
            calc.op = '/'
            calc.updateDisplay('/')
        },
    })

    const actionsMap = {
        plus: plusCmd,
        minus: minusCmd,
        multiply: multiplyCmd,
        divide: divideCmd,
        equal: equalCmd,
        dot: dotCmd,
        'plus-minus': plusMinusCmd,
        percent: percentCmd,
        square: squareCmd,
        cube: cubeCmd,
        'ten-power': tenPowerCmd,
        power: powerCmd,
        factorial: factorialCmd,
        inverse: inverseCmd,
        'nth-root': nthRootCmd,
        sqrt: sqrtCmd,
        cbrt: cbrtCmd,
        ac: clearCmd,
        mc: memoryClearCmd,
        'm-plus': memoryPlusCmd,
        'm-minus': memoryMinusCmd,
        'm-recall': memoryRecallCmd,
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action
            const value = btn.textContent

            action ? actionsMap[action]().execute() : digitCmd(value).execute()

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
            '^': 'power',
            '!': 'factorial',
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
