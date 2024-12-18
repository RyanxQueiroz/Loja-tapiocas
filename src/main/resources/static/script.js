const foodSelect = document.getElementById('food-select');
const fillingsContainer = document.getElementById('fillings-container');
const cpfInput = document.getElementById('cpf');
const payButton = document.getElementById('pay-button');
const historyButton = document.getElementById('history-button');
const totalPriceElement = document.getElementById('total');
const historyModal = document.getElementById('history-modal');
const closeButton = document.querySelector('#close-modal');
const salesHistory = document.getElementById('history-container');

let totalPrice = 0;
let foodPrice = 0;

async function loadFillings(foodId) {
    try {
        const response = await fetch(`http://localhost:8080/food?id=${foodId}`);
        const data = await response.json();

        if (data.fillings && data.fillings.length > 0) {
            renderFillings(data.fillings);
        } else {
            fillingsContainer.innerHTML = '<p>Sem recheios disponíveis</p>';
        }

        foodPrice = parseFloat(data.price) || 0;
        totalPrice = foodPrice;
        updateTotalPrice();
    } catch (error) {
        console.error('Erro ao carregar recheios:', error);
        fillingsContainer.innerHTML = '<p>Erro ao carregar recheios.</p>';
    }
}

function renderFillings(fillings) {
    fillingsContainer.innerHTML = '';
    fillings.forEach(filling => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = filling.price;
        checkbox.dataset.name = filling.name;
        checkbox.classList.add('filling-checkbox');

        const label = document.createElement('label');
        label.textContent = `${filling.name} - R$ ${parseFloat(filling.price).toFixed(2)}`;

        const lineBreak = document.createElement('br');

        fillingsContainer.appendChild(checkbox);
        fillingsContainer.appendChild(label);
        fillingsContainer.appendChild(lineBreak);
    });
}

foodSelect.addEventListener('change', () => {
    const foodId = foodSelect.value;
    loadFillings(foodId);
});

fillingsContainer.addEventListener('change', () => {
    const selectedFillings = document.querySelectorAll('.filling-checkbox:checked');
    totalPrice = foodPrice + [...selectedFillings].reduce((acc, filling) => acc + parseFloat(filling.value), 0);
    updateTotalPrice();
});

function updateTotalPrice() {
    totalPriceElement.textContent = `Preço Total: R$ ${totalPrice.toFixed(2)}`;
}

payButton.addEventListener('click', async () => {
    const selectedFillings = document.querySelectorAll('.filling-checkbox:checked');
    const fillingNames = [...selectedFillings].map(f => f.dataset.name).join(', ');
    const cpf = cpfInput.value.trim();
    const foodId = foodSelect.value;

    if (!cpf || cpf.length < 11) {
        alert("Por favor, insira um CPF válido.");
        return;
    }

    const paymentData = {
        idfood: parseInt(foodId),
        cpf: cpf,
        description: fillingNames || "Sem recheios",
        price: totalPrice
    };

    try {
        const response = await fetch('http://localhost:8080/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData)
        });

        const result = await response.json();
        alert(result.success || result.error);
    } catch (error) {
        console.error('Erro no pagamento:', error);
        alert("Erro ao processar pagamento.");
    }
});

historyButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/sales');
        const sales = await response.json();
        salesHistory.innerHTML = '';
        sales.forEach(sale => {
            const saleItem = document.createElement('p');
            saleItem.textContent = `Data: ${sale.datesale}, Descrição: ${sale.description}, Preço: R$ ${sale.price.toFixed(2)}`;
            salesHistory.appendChild(saleItem);
        });
        historyModal.classList.remove('hidden');
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
    }
});

closeButton.addEventListener('click', () => {
    historyModal.classList.add('hidden');
});

window.addEventListener('DOMContentLoaded', () => {
    const foodId = foodSelect.value;
    loadFillings(foodId);
});
