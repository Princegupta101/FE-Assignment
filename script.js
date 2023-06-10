// Fetch cards data (mock API call)
const mockApiResponse = {
    data: [
    {
        name: 'Mixmax',
        budget_name: 'Software subscription',
        owner_id: 1,
        spent: {
            value: 100,
            currency: "SGD"
        },
        available_to_spend: {
            value: 1000,
            currency: "SGD"
        },
        card_type: "burner",
        expiry: "9 Feb",
        limit: 100,
        status: 'active'
    },
    {
        name: 'Quickbooks',
        budget_name: 'Software subscription',
        owner_id: 2,
        spent: {
            value: 50,
            currency: "SGD"
        },
        available_to_spend: {
            value: 250,
            currency: "SGD"
        },
        card_type: "subscription",
        limit: 10,
        status: 'active'
    }
],
page: 1,
per_page: 10,
total: 100
};

const cardListElement = document.getElementById('cardList');
// Filter cards by type
function filterCards(owner) {
    const filteredCards = mockApiResponse.data.filter(card => {
        if (owner === 'Your') {
            return card.owner_id === 1; // Replace with the actual owner ID logic
        } else if (owner === 'All') {
            return true;
        } else if (owner === 'Blocked') {
            return card.status === 'blocked';
        }
    });

    renderCardList(filteredCards);
}
// Show cards based on tab selection
function filterCardsByType() {
    const selectedType = document.getElementById('cardType').value;

    if (selectedType === 'all') {
        renderCardList(mockApiResponse.data);
    } else {
        const filteredCards = mockApiResponse.data.filter(card => card.card_type === selectedType);
        renderCardList(filteredCards);
    }
}
// Render card listing
function renderCardList(cards) {
    cardListElement.innerHTML = '';

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.classList.add(card.card_type);

        const typeElement = document.createElement('div');
        typeElement.classList.add('type');
        typeElement.textContent = card.card_type;
        cardElement.appendChild(typeElement);


        const nameElement = document.createElement('h3');
        nameElement.textContent = card.name;
        cardElement.appendChild(nameElement);

        const budgetElement = document.createElement('p');
        budgetElement.textContent = card.budget_name;
        cardElement.appendChild(budgetElement);


        if (card.card_type === 'burner') {
            const expiryElement = document.createElement('p');
            expiryElement.classList.add('expiry');
            expiryElement.textContent = `Expiry: ${card.expiry}`;
            cardElement.appendChild(expiryElement);
        } else if (card.card_type === 'subscription') {
            const limitElement = document.createElement('p');
            limitElement.classList.add('limit');
            limitElement.textContent = `Limit: ${card.limit}`;
            cardElement.appendChild(limitElement);
        }

        const statusElement = document.createElement('p');
        statusElement.classList.add('status');
        statusElement.textContent = `Status: ${card.status}`;
        cardElement.appendChild(statusElement);

        cardListElement.appendChild(cardElement);
    });
}

// Initial rendering
renderCardList(mockApiResponse.data);