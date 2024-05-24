import { API_URL } from './url.js';

const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s']+$/;
var tbody = document.querySelector('tbody');
var listCategory = [];

var getCategory = async (numberEntries, page) => {

    await fetch(`${API_URL}/api/category/pagination?limit=${numberEntries}&&page=${page}`, {
        method: 'get',
    })
        .then(response => response.json())
        .then(data => {
            listCategory = data;
            createRow();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}
getCategory(10, 1);
var errNode = document.querySelectorAll('#error');
var createRow = () => {
    listCategory.forEach((item, index) => {
        var create = document.createElement('tr'); // Tạo thẻ tr mới
        // Tạo các cột td và đổ dữ liệu từ mảng vào
        create.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nameCategory}</td>
            <td>
                <button class="btn btn-success btn-sm mr-2" data-bs-toggle="modal" data-bs-target="#update"><i class="fas fa-edit">
                    <span class="material-symbols-outlined">edit</span>
                </i></button>
                <button class="btn btn-danger btn-sm"><i class="fas fa-trash">
                    <span class="material-symbols-outlined">delete</span>
                </i></button>
            </td>
        `;

        tbody.appendChild(create);
        // Thêm hàng tr vào tbody
    });
    btnClickEvent();
}
var cleanRow = () => {
    tbody.innerHTML = '';
}

var numberEntries = document.querySelector('#numberEntries');
var page = document.querySelector('#page');
var after = document.querySelector('#after');
var next = document.querySelector('#next');
numberEntries.addEventListener('change', () => {
    cleanRow();
    getCategory(numberEntries.value, page.value);
})
after.addEventListener('click', () => {
    if (page.value > 1) {
        page.value -= 1;
        cleanRow();
        getCategory(numberEntries.value, page.value);
    }

})
next.addEventListener('click', () => {
    if (page.value < 9999) {
        page.value = parseInt(page.value) + parseInt(1);
        cleanRow();
        getCategory(numberEntries.value, page.value);
    }

})

var btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", async () => {
    var search = document.querySelector("#search").value;
    await fetch(`${API_URL}/api/category/search?value=${search}`, {
        method: 'get',
    })
        .then(response => response.json())
        .then(data => {
            if (data.length <= 0) {
                return alert("No suitable products were found");
            }
            listCategory = data;
            cleanRow();
            createRow();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
})

var btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", async () => {
    var name = document.querySelector("#name").value;

    if (!name || !nameRegex.test(name)) {
        return setError(0, "Name is empty or invalid");
    } else {
        setError(0, "");
    }
    var data = {
        nameCategory: name,
    }
    await fetch(`${API_URL}/api/category`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 400)
                return alert(data.message);
                Swal.fire({
                    title: "Create!",
                    text: "Create Category Successfully",
                    icon: "success"
                });
            cleanForm();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    cleanRow();
    getCategory(10, 1);
})

var btnClickEvent = () => {
    var listBtnUpdate = document.querySelectorAll(".btn-success");
    var listBtnDelete = document.querySelectorAll(".btn-danger");
    listBtnUpdate.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            document.getElementById("id").value = listCategory[index]._id;
            document.getElementById("nameUpdate").value = listCategory[index].nameCategory;
        })
    })
    listBtnDelete.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteCategory(listCategory[index]._id)

                }
            });
        })
    })
}
var btnUpdate = document.querySelector("#btnUpdate");
btnUpdate.addEventListener("click", () => {
    updateCategory();
});
var updateCategory = async () => {
    var id = document.getElementById("id").value;
    var name = document.querySelector("#nameUpdate").value;
    if (!name || !nameRegex.test(name)) {
        return setError(1, "Name is empty or invalid");
    }else {
        setError(1, "");
    }
    var data = {
        id: id,
        nameCategory: name,
    }
    await fetch(`${API_URL}/api/category`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 400)
                return alert(data.message);
                Swal.fire({
                    title: "Update",
                    text: "Update Category successfully",
                    icon: "success"
                });
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    cleanRow();
    getCategory(10,1);
}

var deleteCategory = async (id) => {

    await fetch(`${API_URL}/api/category/${id}`, {
        method: 'delete',
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }

        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    cleanRow();
    getCategory(10,1);
}

var setError = (index, err) => {
    errNode[index].innerHTML = err;
}
function cleanForm() {
    var form = document.querySelector('#addCategory');
    form.reset();
}