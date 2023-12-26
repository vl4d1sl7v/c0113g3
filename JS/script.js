async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (result.success) {
            alert(`Авторизация успешна:\nID: ${result.user.id}, Имя: ${result.user.username}`);

            // Переход на страницу index.html после успешной авторизации
            window.location.href = 'index.html';
        } else {
            alert('Неверные учетные данные');
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
    }
}
