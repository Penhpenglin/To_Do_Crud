declare const Swal: any;

interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  address: string;
}

let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
let nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

function renderTable(): void {
  const tbody = document.getElementById("userTableBody")!;
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.gender}</td>
      <td>${user.age}</td>
      <td>${user.address}</td>
      <td>
        <button class="btn btn-warning btn-sm mr-2" onclick="editUser(${user.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function openAddModal(): void {
  Swal.fire({
    title: "Add User",
    html:
      `<input id="name" class="swal2-input" placeholder="Name">` +
      `<input id="gender" class="swal2-input" placeholder="Gender">` +
      `<input id="age" type="number" class="swal2-input" placeholder="Age">` +
      `<input id="address" class="swal2-input" placeholder="Address">`,
    focusConfirm: false,
    preConfirm: () => {
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const gender = (document.getElementById("gender") as HTMLInputElement).value;
      const age = parseInt((document.getElementById("age") as HTMLInputElement).value);
      const address = (document.getElementById("address") as HTMLInputElement).value;

      if (!name || !gender || !age || !address) {
        Swal.showValidationMessage("All fields are required");
        return;
      }

      users.push({ id: nextId++, name, gender, age, address });
      saveToLocalStorage();
      renderTable();
    }
  });
}

function editUser(id: number): void {
  const user = users.find(u => u.id === id);
  if (!user) return;

  Swal.fire({
    title: "Edit User",
    html:
      `<input id="name" class="swal2-input" value="${user.name}">` +
      `<input id="gender" class="swal2-input" value="${user.gender}">` +
      `<input id="age" type="number" class="swal2-input" value="${user.age}">` +
      `<input id="address" class="swal2-input" value="${user.address}">`,
    focusConfirm: false,
    preConfirm: () => {
      user.name = (document.getElementById("name") as HTMLInputElement).value;
      user.gender = (document.getElementById("gender") as HTMLInputElement).value;
      user.age = parseInt((document.getElementById("age") as HTMLInputElement).value);
      user.address = (document.getElementById("address") as HTMLInputElement).value;

      saveToLocalStorage();
      renderTable();
    }
  });
}

function deleteUser(id: number): void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  }).then((result: any) => {
    if (result.isConfirmed) {
      users = users.filter(u => u.id !== id);
      saveToLocalStorage();
      renderTable();
    }
  });
}

function saveToLocalStorage(): void {
  localStorage.setItem("users", JSON.stringify(users));
}

renderTable();
