import {
    plusCmd,
    minusCmd,
    multiplyCmd,
    divideCmd,
    powerCmd,
    nthRootCmd,
    factorialCmd,
    squareCmd,
    cubeCmd,
    tenPowerCmd,
    inverseCmd,
    percentCmd,
    plusMinusCmd,
    sqrtCmd,
    cbrtCmd,
    clearCmd,
    equalCmd,
    calc,
} from './calculator'

describe('Calculator commands', () => {
    beforeEach(() => {
        calc.display = { textContent: '' }
        clearCmd()
    })

    it('1 + 2 = 3', () => {
        calc.num1 = '1'
        plusCmd()
        calc.num1 = '2'
        equalCmd()
        expect(calc.result).toBe(3)
    })

    it('5 - 3 = 2', () => {
        calc.num1 = '5'
        minusCmd()
        calc.num1 = '3'
        equalCmd()
        expect(calc.result).toBe(2)
    })

    it('4 * 2 = 8', () => {
        calc.num1 = '4'
        multiplyCmd()
        calc.num1 = '2'
        equalCmd()
        expect(calc.result).toBe(8)
    })

    it('10 / 2 = 5', () => {
        calc.num1 = '10'
        divideCmd()
        calc.num1 = '2'
        equalCmd()
        expect(calc.result).toBe(5)
    })

    it('10 / 0 = Error', () => {
        calc.num1 = '10'
        divideCmd()
        calc.num1 = '0'
        equalCmd()
        expect(calc.result).toBe('Error')
    })

    it('2 ^ 3 = 8', () => {
        calc.num1 = '2'
        powerCmd()
        calc.num1 = '3'
        equalCmd()
        expect(calc.result).toBe(8)
    })

    it('27 nth-root 3 = 3', () => {
        calc.num1 = '27'
        nthRootCmd()
        calc.num1 = '3'
        equalCmd()
        expect(calc.result).toBe(3)
    })

    it('factorial(5) = 120', () => {
        calc.num1 = '5'
        factorialCmd()
        expect(calc.num1).toBe('120')
    })

    it('square(5) = 25', () => {
        calc.num1 = '5'
        squareCmd()
        expect(calc.num1).toBe('25')
    })

    it('cube(3) = 27', () => {
        calc.num1 = '3'
        cubeCmd()
        expect(calc.num1).toBe('27')
    })

    it('10^2 = 100', () => {
        calc.num1 = '2'
        tenPowerCmd()
        expect(calc.num1).toBe('100')
    })

    it('inverse(0) should not change', () => {
        calc.num1 = '0'
        inverseCmd()
        expect(calc.num1).toBe('0')
    })

    it('plusMinus(3) = -3', () => {
        calc.num1 = '3'
        plusMinusCmd()
        expect(calc.num1).toBe('-3')
    })

    it('percent(200 plus 10% = 220', () => {
        calc.num2 = 200
        calc.op = '+'
        calc.num1 = 10
        percentCmd()
        equalCmd()
        expect(calc.result).toBe(220)
    })

    it('percent(50) = 0.5', () => {
        calc.num1 = '50'
        percentCmd()
        expect(calc.num1).toBe('0.5')
    })

    it('sqrt(16) = 4', () => {
        calc.num1 = '16'
        sqrtCmd()
        expect(calc.num1).toBe('4')
    })

    it('cbrt(27) = 3', () => {
        calc.num1 = '27'
        cbrtCmd()
        expect(calc.num1).toBe('3')
    })
})
