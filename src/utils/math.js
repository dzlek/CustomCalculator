export function xPowerY(x, y) {
    if (y < 0 || y % 1 !== 0) return 'Error'
    let result = 1
    for (let i = 0; i < y; i++) {
        result *= x
    }
    return result
}

export function nthRoot(x, y) {
    if (y <= 0 || (x < 0 && y % 2 === 0)) return 'Error'

    let guess = x / y
    const epsilon = 1e-10

    const absDiff = (a, b) => (a > b ? a - b : b - a)

    while (absDiff(xPowerY(guess, y), x) > epsilon) {
        guess = ((y - 1) * guess + x / xPowerY(guess, y - 1)) / y
    }

    return parseFloat(guess.toFixed(10))
}

export function factorial(n) {
    if (n < 0 || n % 1 !== 0) return 'Error'
    let result = 1
    for (let i = 2; i <= n; i++) {
        result *= i
    }
    return result
}
