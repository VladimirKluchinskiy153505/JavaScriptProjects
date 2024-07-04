document.addEventListener("DOMContentLoaded", function() {
    var table = document.getElementById("data-table");
    var categories = ['None', 'Bronze', 'Silver', 'Gold'];

    // Добавление фиксированного столбца в заголовок таблицы
    var fixedColumnHeader = document.createElement('th');
    fixedColumnHeader.textContent = 'Фиксированный столбец';
    table.querySelector('thead tr').insertBefore(fixedColumnHeader, table.querySelector('thead tr th'));

    // Добавление выпадающего меню в каждую ячейку фиксированного столбца
    var rows = table.querySelectorAll('tbody tr');
    rows.forEach(function(row) {
        var cell = document.createElement('td');
        var select = document.createElement('select');
        categories.forEach(function(category) {
            var option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
        cell.appendChild(select);
        row.insertBefore(cell, row.querySelector('td'));
    });

    // Обработчик события изменения значения в выпадающем меню
    table.addEventListener('change', function(event) {
        var target = event.target;
        if (target.tagName === 'SELECT' && target.classList.contains('category-select')) {
            var selectedCategory = target.value;
            var rowData = Array.from(target.closest('tr').querySelectorAll('td')).slice(1); // Получаем данные из остальных ячеек
            sendDataToServer(rowData, selectedCategory);
        }
    });

    // Функция для отправки данных на сервер Django
    function sendDataToServer(rowData, selectedCategory) {
        // Ваш код для отправки данных на сервер Django
        // Используйте AJAX запрос или другие методы для отправки данных
        // Пример с использованием Fetch API:
        /*
        fetch('/your-django-endpoint/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rowData: rowData.map(cell => cell.textContent),
            selectedCategory: selectedCategory,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Данные успешно отправлены на сервер:', data);
        })
        .catch(error => {
          console.error('Ошибка при отправке данных на сервер:', error);
        });
        */
    }
});