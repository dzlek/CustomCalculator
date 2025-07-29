import { initCalculator } from './calculator.js'

describe('Calculator Operations', () => {
    let display

    beforeEach(() => {
        document.body.innerHTML = `
          <div id="display">0</div>
          <div class="buttons">
                  <button data-action="o-parenthesis">(</button>
                <button data-action="c-parenthesis">)</button>
                <button data-action="mc">mc</button>
                <button data-action="m-plus">m+</button>
                <button data-action="m-minus">m-</button>
                <button data-action="m-recall">mr</button>
                <button data-action="ac">AC</button>
                <button data-action="plus-minus">±</button>
                <button data-action="percent">%</button>
                <button data-action="divide">÷</button>

                <button data-action="2nd">2ⁿᵈ</button>
                <button data-action="square">x²</button>
                <button data-action="cube">x³</button>
                <button data-action="power">xʸ</button>
                <button data-action="exp">eˣ</button>
                <button data-action="ten-power">10ˣ</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button data-action="multiply">×</button>

                <button data-action="inverse">1⁄x</button>
                <button data-action="sqrt">√x</button>
                <button data-action="cbrt">³√x</button>
                <button data-action="nth-root">ʸ√x</button>
                <button data-action="ln">ln</button>
                <button data-action="log10">log₁₀</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button data-action="minus">−</button>

                <button data-action="factorial">x!</button>
                <button data-action="sin">sin</button>
                <button data-action="cos">cos</button>
                <button data-action="tan">tan</button>
                <button data-action="e">e</button>
                <button data-action="EE">EE</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button data-action="plus">+</button>

                <button data-action="rad">Rad</button>
                <button data-action="sinh">sinh</button>
                <button data-action="cosh">cosh</button>
                <button data-action="tanh">tanh</button>
                <button data-action="pi">π</button>
                <button data-action="rand">Rand</button>
                <button class = 'zero'>0</button>
                <button data-action="dot">,</button>
                <button data-action="equal">=</button>
          </div>
        `

        initCalculator()
        display = document.getElementById('display')
    })

    function clickButtonByText(text) {
        const btn = Array.from(document.querySelectorAll('button')).find(
            (b) => b.textContent === text
        )
        btn.click()
    }

    function clickButtonByAction(action) {
        const btn = document.querySelector(`button[data-action="${action}"]`)
        btn.click()
    }

    test('division: 6 / 2 = 3', () => {
        clickButtonByText('6')
        clickButtonByAction('divide')
        clickButtonByText('2')
        clickButtonByAction('equal')
        expect(display.textContent).toBe('3')
    })

    test('multiplication: 2 * 2 = 4', () => {
        clickButtonByText('2')
        clickButtonByAction('multiply')
        clickButtonByText('2')
        clickButtonByAction('equal')
        expect(display.textContent).toBe('4')
    })

    test('subtraction: 6 - 5 = 1', () => {
        clickButtonByText('6')
        clickButtonByAction('minus')
        clickButtonByText('5')
        clickButtonByAction('equal')
        expect(display.textContent).toBe('1')
    })

    test('addition: 1 + 2 = 3', () => {
        clickButtonByText('1')
        clickButtonByAction('plus')
        clickButtonByText('2')
        clickButtonByAction('equal')
        expect(display.textContent).toBe('3')
    })

    test('percent: 50 % = 0.5', () => {
        clickButtonByText('5')
        clickButtonByText('0')
        clickButtonByAction('percent')
        expect(parseFloat(display.textContent)).toBe(0.5)
    })

    test('percent with addition: 200 + 10% = 220', () => {
        clickButtonByText('2')
        clickButtonByText('0')
        clickButtonByText('0')
        clickButtonByAction('plus')
        clickButtonByText('1')
        clickButtonByText('0')
        clickButtonByAction('percent')
        clickButtonByAction('equal')
        expect(display.textContent).toBe('220')
    })

    test('plus-minus: 5 -> -5', () => {
        clickButtonByText('5')
        clickButtonByAction('plus-minus')
        expect(display.textContent).toBe('-5')
    })

    test('square: 3^2 = 9', () => {
        clickButtonByText('3')
        clickButtonByAction('square')
        expect(display.textContent).toBe('9')
    })

    test('cube: 2^3 = 8', () => {
        clickButtonByText('2')
        clickButtonByAction('cube')
        expect(display.textContent).toBe('8')
    })

    test('power: 2^4', () => {
        clickButtonByText('2')
        clickButtonByAction('power')
        clickButtonByText('4')
        clickButtonByAction('equal')
        expect(display.textContent).toBe('16')
    })

    test('power 10^x: 10^3 = 100', () => {
        clickButtonByText('3')
        clickButtonByAction('ten-power')
        expect(display.textContent).toBe('1000')
    })

    test('inverse: 5 -> 1/5 = 0.2', () => {
        clickButtonByText('5')
        clickButtonByAction('inverse')
        expect(parseFloat(display.textContent)).toBeCloseTo(0.2)
    })

    test('sqrt: 9 -> 3', () => {
        clickButtonByText('9')
        clickButtonByAction('sqrt')
        expect(display.textContent).toBe('3')
    })

    test('cbrt: 27 -> 3', () => {
        clickButtonByText('2')
        clickButtonByText('7')
        clickButtonByAction('cbrt')
        expect(display.textContent).toBe('3')
    })

    test('nth-root: 27 ³√3', () => {
        clickButtonByText('2')
        clickButtonByText('7')
        clickButtonByAction('nth-root')
        clickButtonByText('3')
        clickButtonByAction('equal')
        expect(display.textContent).toBe('3')
    })

    test('factorial: 3! = 6', () => {
        clickButtonByText('3')
        clickButtonByAction('factorial')
        expect(display.textContent).toBe('6')
    })
})
