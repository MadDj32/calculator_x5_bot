// Telegram WebApp initialization
let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

// Tab switching logic
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

function calculatePremium(type) {
    const formId = type === 'new' ? 'newPremiumForm' : 'oldPremiumForm';
    const positionsCollected = parseFloat(document.querySelector(`#${formId} #positionsCollected`).value);
    const defectRate = parseFloat(document.querySelector(`#${formId} #defectRate`).value);
    const collectionSpeed = parseFloat(document.querySelector(`#${formId} #collectionSpeed`).value);
    const replacementRate = parseFloat(document.querySelector(`#${formId} #replacementRate`).value);
    
    let multiplier = (defectRate <= 1 ? 2 : 1);

    const result = positionsCollected * defectRate * multiplier * collectionSpeed * replacementRate;
    const roundedResult = result.toFixed(2);

    document.getElementById(`${type}PremiumResult`).textContent = `Результат: ${roundedResult}`;

    if (type === 'new') {
        tg.sendData(`Новая премия рассчитана: ${roundedResult}`);
    } else {
        tg.sendData(`Старая премия рассчитана: ${roundedResult}`);
    }

    comparePremiums();
}

function comparePremiums() {
    const newPremiumResult = parseFloat(document.getElementById('newPremiumResult').textContent.split(': ')[1]);
    const oldPremiumResult = parseFloat(document.getElementById('oldPremiumResult').textContent.split(': ')[1]);

    const comparisonResult = document.getElementById('comparisonResult');

    if (!isNaN(newPremiumResult) && !isNaN(oldPremiumResult)) {
        if (newPremiumResult > oldPremiumResult) {
            comparisonResult.innerHTML = `<p style="color:green;">Новая премия выше (${newPremiumResult})</p><p style="color:red;">Старая премия ниже (${oldPremiumResult})</p>`;
        } else {
            comparisonResult.innerHTML = `<p style="color:red;">Новая премия ниже (${newPremiumResult})</p><p style="color:green;">Старая премия выше (${oldPremiumResult})</p>`;
        }
    }
}