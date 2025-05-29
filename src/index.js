import './styles/main.scss'
console.log('Started...')
document.getElementById('app').innerHTML = `
<div class="calculator">
    <div class="head" id="head">
        <button class="circle" data-color="red"></button>
        <button class="circle" data-color="red"></button>
        <button class="circle" data-color="red"></button>
        <button class="circle" data-color="red"></button>
        <button class="circle" data-color="red"></button>
        <button class="circle" data-color="red"></button>
        <button class="circle" data-color="red"></button>
        <button class="circle" data-color="red"></button>
    </div>

    <div class="display" id="display">0</div>
  
    <div class="buttons">
        <button data-action="clear">AC</button>
        <button data-action="sign">±</button>
        <button data-action="percent">%</button>
        <button data-action="divide">÷</button>

        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button data-action="multiply">×</button>

        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button data-action="subtract">-</button>

        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button data-action="add">+</button>

        <button>0</button>
        <button data-action="dot">,</button>
        <button data-action="equals">=</button>
    </div>
</div>
`
