document.addEventListener('DOMContentLoaded', () => {
    async function displayBalance() {
        const balanceElement = document.getElementById('balance');

        try {
            const response = await fetch('http://localhost:3306/balance', {
                method: 'GET',  // Изменено на метод GET
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Добавим отладочный вывод
            console.log('Response status:', response.status);

            const balanceData = await response.json();
            
            // Проверка, есть ли баланс в полученных данных
            if (balanceData && balanceData.balance !== undefined) {
                balanceElement.textContent = `Текущий баланс: ${balanceData.balance}руб.`;
            } else {
                throw new Error('Отсутствует информация о балансе');
            }
        } catch (error) {
            console.error('Ошибка при получении баланса:', error);
            balanceElement.textContent = 'Ошибка при получении баланса';
        }
    }

    // Вызываем функцию для отображения баланса
    displayBalance();
});
