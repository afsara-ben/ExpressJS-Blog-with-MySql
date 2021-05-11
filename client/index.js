document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

$('table tbody').click((e) => {
    console.log(e.target);
    if (e.target.className === "delete-row-btn") {
        console.log(e.target.dataset.id);
        deleteRowById(e.target.dataset.id);
    }
    
    if (e.target.className === "edit-row-btn") {
        console.log(e.target.dataset.id);
        editRowById(e.target.dataset.id);
    }
});

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                location.reload(); 
            }
        })
        .catch();
}

function editRowById(id) {
    console.log("in edit row by id");
    let updateSection = $('#update-row');
    updateSection.attr("hidden", false);
}

let addBtn = $('#add-name-btn');

addBtn.click(() => {
    let nameInput = $('#name-input');
    let name = nameInput.val();
    nameInput.text = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']))
        .catch();
})

function insertRowIntoTable(data) {
    console.log("In inserting", data);
    let table = $('table tbody');
    let isTableData = $('.no-data');

    let tableHtml = "<tr>";
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    }
    else {
        table.append(tableHtml);
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    console.log(data);
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function ({ id, name, date_added }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

}
