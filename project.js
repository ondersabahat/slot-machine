
const seven = document.querySelector("#seven");
const cherry = document.querySelector("#cherry");
const lemon = document.querySelector("#lemon");
const grape = document.querySelector("#grape");


const depositAmount = document.querySelector("#deposit");
const depositBtn = document.querySelector(".deposit-btn");
const depositDiv = document.querySelector("#deposit-amount");

const spinBtn = document.querySelector("#spin-btn");
const lines = document.querySelector("#lines");
const bet = document.querySelector("#bet");
const errorDiv = document.querySelector(".error");

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    seven: 2,
    grape: 4,
    cherry: 6, 
    lemon: 8
}

const SYMBOL_VALUES = {
    seven: 5, 
    grape: 4, 
    cherry: 3, 
    lemon: 2
}

let deposit = 0;

depositBtn.addEventListener("click", () => {
    errorDiv.innerHTML = "";
    const depos = parseFloat(depositAmount.value);
    
    if (depos <= 0) {
        errorDiv.innerHTML += "Deposit must be positive";
    }else {
        deposit += depos;
        depositDiv.innerHTML = deposit.toString();
    }
})


const spin = () => {

    const symbols = [];

    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const selectedSymbol = reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(Math.floor(Math.random() * reelSymbols.length), 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    symbols = [];
    for(let i=0; i < 3;i++){
        for(let j = 0; j < 3; j++){
            symbols.push(rows[i][j]);
        }
    }
    return symbols;
}
            
const getWinnings = (rows, bet, lines) => {
    
    let winnings = 0;

    for(let row=0; row<lines; row++){
        const symbols = rows[row];
        let allIsSame = true
        for (symbol of symbols) {
            console.log(symbol)
            if (symbol != symbols[0]){
                allIsSame = false;
                break;
            }
        }
        if (allIsSame) {
            winnings += SYMBOL_VALUES[symbols[0]] * bet;
        }
    }
    return winnings;
}

spinBtn.addEventListener("click", () => {
    errorDiv.innerHTML = "";
    if (lines.value < 1 || lines.value > 3){
        errorDiv.innerHTML += "lines must be in between 1-3";
    }
    else if (bet.value < 0 ) {
        errorDiv.innerHTML += "bet is not valid";
    }
    else if ((bet.value * lines.value) > deposit){
        errorDiv.innerHTML += "insufficient balance";
    }
    else {
        deposit -= (bet.value * lines.value);
        depositDiv.innerHTML = deposit.toString();

        const reels = spin();
        const rows = transpose(reels);
        const symbols = printRows(rows);
        for(let i = 0; i < symbols.length; i++){
           const cell = document.querySelector(`#i${i+1}`);
           const symbol = document.querySelector(`#${symbols[i]}`);
           cell.innerHTML = symbol.innerHTML;
        }
        let winnings = getWinnings(rows, bet.value, lines.value);
        deposit += winnings;
        depositDiv.innerHTML = deposit.toString();
    }
})



