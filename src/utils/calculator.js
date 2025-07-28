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

    const calculate = (a, b, op) => {
        const numA = Number(a)
        const numB = Number(b)
        switch (op) {
            case '+':
                return numA + numB
            case '-':
                return numA - numB
            case '*':
                return numA * numB
            case '/':
                return numB !== 0 ? numA / numB : 'Error'
            case 'power':
                return xPowerY(numA, numB)
            case 'nth-root':
                return nthRoot(numA, numB)
            default:
                return ''
        }
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

    const operationCmd = (operator) => ({
        execute: () => {
            if (calc.num1 && calc.num2 && calc.op) {
                const result = calculate(calc.num2, calc.num1, calc.op)
                calc.num2 = String(result)
                calc.num1 = ''
                calc.op = operator
                calc.updateDisplay(calc.num2)
            } else {
                calc.num2 = calc.num1
                calc.num1 = ''
                calc.op = operator
                calc.updateDisplay(operator)
            }
        },
    })

    const equalCmd = () => ({
        execute: () => {
            const { num1, num2, op } = calc
            if (!num1 || !num2 || !op) return

            const result = calculate(num2, num1, op)
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

    function xPowerY(x, y) {
        if (y < 0 || y % 1 !== 0) return 'Error'
        let result = 1
        for (let i = 0; i < y; i++) {
            result *= x
        }
        return result
    }

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
            const n = Number(calc.num1)
            if (n < 0 || n % 1 !== 0) return
            let result = 1
            for (let i = 2; i <= n; i++) {
                result *= i
            }
            calc.num1 = String(result)
            calc.updateDisplay(calc.num1)
        },
    })

    function nthRoot(x, y) {
        if (y <= 0 || (x < 0 && y % 2 === 0)) return 'Error'

        let guess = x / y
        const epsilon = 1e-10

        const absDiff = (a, b) => (a > b ? a - b : b - a)

        while (absDiff(xPowerY(guess, y), x) > epsilon) {
            guess = ((y - 1) * guess + x / xPowerY(guess, y - 1)) / y
        }

        return parseFloat(guess.toFixed(10))
    }

    const nthRootCmd = () => ({
        execute: () => {
            if (calc.num1 && calc.num2 && calc.op) {
                const result = calculate(calc.num2, calc.num1, calc.op)
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
                    case 'square':
                        command = squareCmd()
                        break
                    case 'cube':
                        command = cubeCmd()
                        break
                    case 'ten-power':
                        command = tenPowerCmd()
                        break
                    case 'power':
                        command = powerCmd()
                        break
                    case 'factorial':
                        command = factorialCmd()
                        break
                    case 'inverse':
                        command = inverseCmd()
                        break
                    case 'nth-root':
                        command = nthRootCmd()
                        break
                    case 'sqrt':
                        command = sqrtCmd()
                        break
                    case 'cbrt':
                        command = cbrtCmd()
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
