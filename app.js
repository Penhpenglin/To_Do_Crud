var users = JSON.parse(localStorage.getItem("users") || "[]");
var nextId = users.length > 0 ? Math.max.apply(Math, users.map(function (u) { return u.id; })) + 1 : 1;
function renderTable() {
    var tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";
    users.forEach(function (user, index) {
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>".concat(index + 1, "</td>\n      <td>").concat(user.name, "</td>\n      <td>").concat(user.gender, "</td>\n      <td>").concat(user.age, "</td>\n      <td>").concat(user.address, "</td>\n      <td>\n        <button class=\"btn btn-warning btn-sm mr-2\" onclick=\"editUser(").concat(user.id, ")\">Edit</button>\n        <button class=\"btn btn-danger btn-sm\" onclick=\"deleteUser(").concat(user.id, ")\">Delete</button>\n      </td>\n    ");
        tbody.appendChild(row);
    });
}
function openAddModal() {
    Swal.fire({
        title: "Add User",
        html: "<input id=\"name\" class=\"swal2-input\" placeholder=\"Name\">" +
            "<input id=\"gender\" class=\"swal2-input\" placeholder=\"Gender\">" +
            "<input id=\"age\" type=\"number\" class=\"swal2-input\" placeholder=\"Age\">" +
            "<input id=\"address\" class=\"swal2-input\" placeholder=\"Address\">",
        focusConfirm: false,
        preConfirm: function () {
            var name = document.getElementById("name").value;
            var gender = document.getElementById("gender").value;
            var age = parseInt(document.getElementById("age").value);
            var address = document.getElementById("address").value;
            if (!name || !gender || !age || !address) {
                Swal.showValidationMessage("All fields are required");
                return;
            }
            users.push({ id: nextId++, name: name, gender: gender, age: age, address: address });
            saveToLocalStorage();
            renderTable();
        }
    });
}
function editUser(id) {
    var user = users.find(function (u) { return u.id === id; });
    if (!user)
        return;
    Swal.fire({
        title: "Edit User",
        html: "<input id=\"name\" class=\"swal2-input\" value=\"".concat(user.name, "\">") +
            "<input id=\"gender\" class=\"swal2-input\" value=\"".concat(user.gender, "\">") +
            "<input id=\"age\" type=\"number\" class=\"swal2-input\" value=\"".concat(user.age, "\">") +
            "<input id=\"address\" class=\"swal2-input\" value=\"".concat(user.address, "\">"),
        focusConfirm: false,
        preConfirm: function () {
            user.name = document.getElementById("name").value;
            user.gender = document.getElementById("gender").value;
            user.age = parseInt(document.getElementById("age").value);
            user.address = document.getElementById("address").value;
            saveToLocalStorage();
            renderTable();
        }
    });
}
function deleteUser(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won’t be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function (result) {
        if (result.isConfirmed) {
            users = users.filter(function (u) { return u.id !== id; });
            saveToLocalStorage();
            renderTable();
        }
    });
}
function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}
renderTable();
