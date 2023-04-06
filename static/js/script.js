const numInputs = document.querySelectorAll(".afnum");
const calculateForm = document.getElementById("calculate");
const result = document.getElementById("result");

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
    }
    return val;
}

numInputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        const value = e.target.value;
        const formattedValue = commaSeparateNumber(value.replace(/\D/g, ""));
        e.target.value = formattedValue;
    });
});

calculateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const buyPrice = document.getElementById("buyprice");
    const sellPrice = document.getElementById("sellprice");
    const reducedTaxes = document.getElementById("taxrates");
    const buyTaxRate = 0.05;
    const sellTaxRate = reducedTaxes.checked ? 0.03 : 0.05;
    const buyPriceValue = parseInt(buyPrice.value.replace(/\D/g, ""));
    const sellPriceValue = parseInt(sellPrice.value.replace(/\D/g, ""));
    const buyTax = Math.ceil(buyPriceValue * buyTaxRate);
    const sellTax = Math.ceil(sellPriceValue * sellTaxRate);
    const profit = sellPriceValue - buyPriceValue - buyTax - sellTax;
    const timesProfit  = profit / (buyPriceValue + buyTax);

    const resultDisplay = `
        <table class="result-display">
            <tr>
                <td>Buying Cost:</td>
                <td>${commaSeparateNumber(buyPriceValue)} Gil</td>
            </tr>
            <tr>
                <td>Buying Tax:</td>
                <td>${commaSeparateNumber(buyTax)} Gil</td>
            </tr>
            <tr>
                <td>Selling Cost:</td>
                <td>${commaSeparateNumber(sellPriceValue)} Gil</td>
            </tr>
            <tr>
                <td>Selling Tax:</td>
                <td>${commaSeparateNumber(sellTax)} Gil</td>
            </tr>
            <tr>
                <td>${profit > 0 ? "Profit" : "Loss"}:</td>
                <td><span class="${profit > 0 ? "profit" : "loss"}">${commaSeparateNumber(Math.abs(profit))}</span> Gil 
                ${profit > 0 ? `(${timesProfit.toFixed(2)}x returns)` : `(${timesProfit.toFixed(2)}x loss)`}</td>
                </td>
            </tr>
        </table>
    `;

    const resultElement = document.createElement("div");
    resultElement.innerHTML = resultDisplay;
    result.innerHTML = "";
    result.appendChild(resultElement);
});
