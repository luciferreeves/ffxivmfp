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
        const num = e.target.value.replace(/\D/g, "");
    });
});

calculateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const buyPrice = document.getElementById("buyprice");
    const sellPrice = document.getElementById("sellprice");
    const reducedTaxes = document.getElementById("taxrates");
    const buyTaxRate = 0.05;
    const sellTaxRate = reducedTaxes.checked ? 0.03 : 0.05;
    const buyPriceValue = buyPrice.value.replace(/\D/g, "");
    const sellPriceValue = sellPrice.value.replace(/\D/g, "");
    const buyTax = Math.ceil(buyPriceValue * buyTaxRate);
    const sellTax = Math.ceil(sellPriceValue * sellTaxRate);
    const profit = sellPriceValue - buyPriceValue - buyTax - sellTax;
    
    const resultStatement = `For an item listed at ${commaSeparateNumber(buyPriceValue)} Gil, you will pay ${commaSeparateNumber(buyTax)} Gil in taxes. If you sell the item for ${commaSeparateNumber(sellPriceValue)} Gil, you will pay ${commaSeparateNumber(sellTax)} Gil in taxes. After all taxes are paid, you will ${profit > 0 ? "<span class='profit'>make a profit</span>" : "<span class='loss'>suffer a loss</span>"} of ${commaSeparateNumber(Math.abs(profit))} Gil.`;
    const statementElement = document.createElement("p");
    statementElement.innerHTML = resultStatement;
    result.innerHTML = "";
    result.appendChild(statementElement);
});
