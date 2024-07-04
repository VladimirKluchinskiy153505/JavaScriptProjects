// script.js
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#dynamicTable tbody");

    function addRow(name, subject, mark) {
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = name;
        newRow.insertCell().textContent = subject;
        newRow.insertCell().textContent = mark;
        addDeleteButton(newRow);
    }

    function addDeleteButton(row) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            tableBody.deleteRow(row.rowIndex - 1);
        });
        row.insertCell().appendChild(deleteButton);
    }

    function clearInputFields() {
        document.getElementById("nameInput").value = "";
        document.getElementById("subjectInput").value = "";
        document.getElementById("markInput").value = "";
    }

    document.getElementById("addButton").addEventListener("click", function () {
        const name = document.getElementById("nameInput").value;
        const subject = document.getElementById("subjectInput").value;
        const mark = document.getElementById("markInput").value;

        if (name && subject && mark) {
            addRow(name, subject, mark);
            clearInputFields();
        } else {
            alert("Please fill in all fields.");
        }
    });
});