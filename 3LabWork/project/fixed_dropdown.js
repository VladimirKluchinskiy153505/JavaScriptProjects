document.addEventListener("DOMContentLoaded", function() {
    var fixedColumn = document.getElementById("fixedColumn");
    var categories = ['None', 'Bronze', 'Silver', 'Gold'];

    // Добавление выпадающего меню в каждую ячейку фиксированного столбца
    var cells = document.querySelectorAll('td:nth-child(' + (fixedColumn.cellIndex + 1) + ')');
    cells.forEach(function(cell) {
        var select = document.createElement('select');
        categories.forEach(function(category) {
            var option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
        cell.appendChild(select);
    });

    // Обработчик события изменения значения в выпадающем меню
    document.getElementById('data-table').addEventListener('change', function(event) {
        var target = event.target;
        if (target.tagName === 'SELECT') {
            var selectedCategory = target.value;
            var rowData = Array.from(target.closest('tr').querySelectorAll('td')).slice(0, -1); // Получаем данные из остальных ячеек
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