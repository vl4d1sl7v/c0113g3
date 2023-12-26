// tariffs.js

document.addEventListener('DOMContentLoaded', () => {
    displayTariffs();
    setupModal(); // Вызываем функцию настройки модального окна
});

// Функция для отображения тарифов
async function displayTariffs() {
    const tariffsContainer = document.getElementById('tariffs-container');

    try {
        const response = await fetch('http://localhost:5000/tariffs');
        const tariffs = await response.json();

        for (const tariff of tariffs) {
            const tariffElement = document.createElement('div');
            tariffElement.classList.add('tariff');

            const tariffInfo = document.createElement('div');
            tariffInfo.classList.add('tariff-info');

            const name = document.createElement('h3');
            name.textContent = tariff.name;

            const price = document.createElement('p');
            price.textContent = `Цена: ${tariff.price} руб.`;

            tariffInfo.appendChild(name);
            tariffInfo.appendChild(price);

            if (tariff.description) {
                const description = document.createElement('p');
                description.textContent = `${tariff.description}`;
                tariffInfo.appendChild(description);
            }

            // Добавляем кнопку "Подключить" и назначаем обработчик события
            const connectButton = document.createElement('button');
            connectButton.textContent = 'Подключить';
            connectButton.addEventListener('click', () => openModal(tariff.name));

            tariffInfo.appendChild(connectButton);

            tariffElement.appendChild(tariffInfo);
            tariffsContainer.appendChild(tariffElement);
        }
    } catch (error) {
        console.error('Ошибка при получении тарифов:', error);
    }
}

// Функция для настройки модального окна
function setupModal() {
    // Перенесем обработчик события для формы подключения сюда
    document.getElementById('connectionForm').addEventListener('submit', (event) => {
        event.preventDefault();
        // Здесь вы можете обработать данные из формы и отправить запрос на подключение тарифа
        closeModal(); // Закрываем модальное окно после обработки
    });
}

// Функция для открытия модального окна с передачей имени тарифа
function openModal(tariffName) {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    document.getElementById('tariffName').value = tariffName;
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}