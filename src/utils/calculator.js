import { xPowerY, nthRoot, factorial } from './math'

export const calc = {
    num1: '',
    num2: '',
    op: '',
    result: '',
    display: null,
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

export const digitCmd = (digit) => {
    if (calc.num1.length >= 15) return
    if (calc.num1 === '0') {
        if (digit === '0') return
        calc.num1 = digit
    } else {
        calc.num1 += digit
    }
    calc.updateDisplay(calc.num1)
}

export const equalCmd = () => {
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
}

export const dotCmd = () => {
    if (!calc.num1.includes('.')) {
        calc.num1 += calc.num1 ? '.' : '0.'
        calc.updateDisplay(calc.num1)
    }
}

export const plusMinusCmd = () => {
    if (calc.num1) {
        calc.num1 = String(-Number(calc.num1))
        calc.updateDisplay(calc.num1)
    }
}

export const percentCmd = () => {
    let percentValue
    if (calc.op === '+' || calc.op === '-') {
        percentValue = (calc.num1 * calc.num2) / 100
    } else {
        percentValue = calc.num1 / 100
    }
    calc.num1 = String(percentValue)
    calc.updateDisplay(calc.num1)
}

export const clearCmd = () => {
    calc.clear()
}

export const squareCmd = () => {
    calc.num1 = String(Number(calc.num1) * Number(calc.num1))
    calc.updateDisplay(calc.num1)
}

export const cubeCmd = () => {
    calc.num1 = String(
        Number(calc.num1) * Number(calc.num1) * Number(calc.num1)
    )
    calc.updateDisplay(calc.num1)
}

export const tenPowerCmd = () => {
    calc.num1 = String(xPowerY(10, Number(calc.num1)))
    calc.updateDisplay(calc.num1)
}

export const inverseCmd = () => {
    if (Number(calc.num1) === 0) return
    calc.num1 = String(1 / Number(calc.num1))
    calc.updateDisplay(calc.num1)
}

export const powerCmd = () => {
    calc.num2 = calc.num1
    calc.num1 = ''
    calc.op = 'power'
    calc.updateDisplay('^')
}

export const factorialCmd = () => {
    const result = factorial(Number(calc.num1))
    if (result !== 'Error') {
        calc.num1 = String(result)
        calc.updateDisplay(calc.num1)
    }
}

export const nthRootCmd = () => {
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
}

export const sqrtCmd = () => {
    const x = Number(calc.num1)
    const result = nthRoot(x, 2)
    calc.num1 = String(result)
    calc.updateDisplay(calc.num1)
}

export const cbrtCmd = () => {
    const x = Number(calc.num1)
    const result = nthRoot(x, 3)
    calc.num1 = String(result)
    calc.updateDisplay(calc.num1)
}

export const memoryClearCmd = () => {
    calc.memory = 0
}

export const memoryPlusCmd = () => {
    const value = Number(calc.num1 || '0')
    calc.memory += value
}

export const memoryMinusCmd = () => {
    const value = Number(calc.num1 || '0')
    calc.memory -= value
}

export const memoryRecallCmd = () => {
    calc.num1 = String(calc.memory)
    calc.updateDisplay(calc.num1)
}

export const plusCmd = () => {
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
}

export const minusCmd = () => {
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
}

export const multiplyCmd = () => {
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
}

export const divideCmd = () => {
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
}

export const initCalculator = () => {
    const display = document.getElementById('calc-display')
    const buttons = document.querySelectorAll('.calc-btn')
    calc.display = display

    const execute = (action) => {
        switch (action) {
            case 'plus':
                plusCmd()
                break
            case 'minus':
                minusCmd()
                break
            case 'multiply':
                multiplyCmd()
                break
            case 'divide':
                divideCmd()
                break
            case 'equal':
                equalCmd()
                break
            case 'dot':
                dotCmd()
                break
            case 'plus-minus':
                plusMinusCmd()
                break
            case 'percent':
                percentCmd()
                break
            case 'square':
                squareCmd()
                break
            case 'cube':
                cubeCmd()
                break
            case 'ten-power':
                tenPowerCmd()
                break
            case 'power':
                powerCmd()
                break
            case 'factorial':
                factorialCmd()
                break
            case 'inverse':
                inverseCmd()
                break
            case 'nth-root':
                nthRootCmd()
                break
            case 'sqrt':
                sqrtCmd()
                break
            case 'cbrt':
                cbrtCmd()
                break
            case 'ac':
                clearCmd()
                break
            case 'mc':
                memoryClearCmd()
                break
            case 'm-plus':
                memoryPlusCmd()
                break
            case 'm-minus':
                memoryMinusCmd()
                break
            case 'm-recall':
                memoryRecallCmd()
                break
            default:
                return
        }
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action
            const value = btn.textContent

            if (action) {
                execute(action)
            } else {
                digitCmd(value)
            }

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
