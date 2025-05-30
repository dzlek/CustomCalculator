import './styles/main.scss'

document.getElementById('app').innerHTML = `
<div class="calculator">
    <div class="head">
        <button class="theme">dark</button>
    </div>

    <div class="display" id="display">0</div>
  
    <div class="buttons">
        <button data-action="ac">AC</button>
        <button data-action="plusMinus">±</button>
        <button data-action="percent">%</button>
        <button data-action="divide">÷</button>

        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button data-action="multiply">×</button>

        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button data-action="minus">-</button>

        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button data-action="plus">+</button>

        <button>0</button>
        <button data-action="dot">.</button>
        <button data-action="equal">=</button>
    </div>
</div>
`
let isLight = true
const theme = document.querySelector('.theme')

const toggleTheme = () => {
    document.body.classList.toggle('dark')
    theme.textContent = isLight ? 'light' : 'dark'
    isLight = !isLight
}

theme.addEventListener('click', toggleTheme)

const display = document.getElementById('display')
const buttons = document.querySelectorAll('.buttons button')

let num1 = ''
let num2 = ''
let op = ''
let res = ''

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action
        const value = btn.textContent

        if (!action) {
            if (num1.length >= 8) return
            if (num1 === '0') {
                if (value === '0') return
                num1 = value
            } else {
                num1 = num1 + value
            }
            display.textContent = num1
        } else if (action === 'ac') {
            num1 = ''
            num2 = ''
            op = 'ac'
            res = '0'
            display.textContent = '0'
        } else if (action === 'plus') {
            num2 = num1
            num1 = ''
            op = '+'
            display.textContent = value
        } else if (action === 'minus') {
            num2 = num1
            num1 = ''
            op = '-'
            display.textContent = value
        } else if (action === 'divide') {
            num2 = num1
            num1 = ''
            op = '/'
            display.textContent = value
        } else if (action === 'multiply') {
            num2 = num1
            num1 = ''
            op = '*'
            display.textContent = value
        } else if (action === 'dot' && !String(num1).includes('.')) {
            num1 = num1 + (num1 ? '.' : '0.')
            display.textContent = num1
        } else if (action === 'plusMinus') {
            num1 = -num1
            display.textContent = num1
        } else if (action === 'percent' && !String(num1).includes('.')) {
            if (op === '+' || op === '-') {
                num1 = (num1 * num2) / 100
            } else {
                num1 = num1 / 100
            }
            display.textContent = num1
        } else if (action === 'equal') {
            switch (op) {
                case '*':
                    res = Number(num2) * Number(num1)
                    num1 = res
                    break
                case '-':
                    res = Number(num2) - Number(num1)
                    num1 = res
                    break
                case '/':
                    res = Number(num2) / Number(num1)
                    num1 = res
                    break
                case '+':
                    res = Number(num2) + Number(num1)
                    num1 = res
                    break
            }
            display.textContent = res
        }
        // console.log(
        //     'num1: ' + num1 + ' op: ' + op + ' num2: ' + num2 + ' res: ' + res
        // )
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
        const btn = [...buttons].find((btn) => btn.dataset.action === map[key])
        if (btn) btn.click()
    }
})
