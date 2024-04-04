import { API_URL } from './url.js';

const PriceRegex = /^[0-9]+$/;
const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s']+$/;
var tbody = document.querySelector('tbody');


var listData = [];
var listCategory = [];

var getProduct = async (numberEntries, page) => {

    await fetch(`${API_URL}/api/product/pagination?limit=${numberEntries}&&page=${page}`, {
        method: 'get',
    })
        .then(response => response.json())
        .then(data => {
            listData = data;
            createRow();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}
getProduct(10, 1);
var errNode = document.querySelectorAll('#error');
var createRow = () => {
    listData.forEach((item, index) => {
        var create = document.createElement('tr'); // Tạo thẻ tr mới
        // Tạo các cột td và đổ dữ liệu từ mảng vào
        create.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="" width="40" height="40" alt="Product Photo"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.status}</td>
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
var btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", async () => {
    var search = document.querySelector("#search").value;
    await fetch(`${API_URL}/api/product/search?value=${search}`, {
        method: 'get',
    })
        .then(response => response.json())
        .then(data => {
            if (data.length <= 0) {
                return alert("No suitable products were found");
            }
            listData = data;
            cleanRow();
            createRow();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
})
var numberEntries = document.querySelector('#numberEntries');
var page = document.querySelector('#page');
var after = document.querySelector('#after');
var next = document.querySelector('#next');
numberEntries.addEventListener('change', () => {
    cleanRow();
    getProduct(numberEntries.value, page.value);
})
after.addEventListener('click', () => {
    if (page.value > 1) {
        page.value -= 1;
        cleanRow();
        getProduct(numberEntries.value, page.value);
    }

})
next.addEventListener('click', () => {
    if (page.value < 9999) {
        page.value = parseInt(page.value) + parseInt(1);
        cleanRow();
        getProduct(numberEntries.value, page.value);
    }

})
var btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", async () => {
    var name = document.querySelector("#name").value;
    var price = document.querySelector("#price").value;
    var quantity = document.querySelector("#quantity").value;
    var status = document.getElementById("status").selectedIndex;
    var category = listCategory[document.getElementById("category").selectedIndex];

    if (!name || !nameRegex.test(name)) {
        return setError(0, "Name is empty or invalid");
    } else if (!price || !PriceRegex.test(price)) {
        return setError(0, "Price is empty or invalid");
    } else if (price <= 0) {
        return setError(0, "Price must be greater than 0");
    } else if (!quantity) {
        return setError(0, "Please enter a quantity");
    } else if (quantity <= 0) {
        return setError(0, "Quantity must be greater than 0");
    }
    else {
        setError(0, "");
    }
    var data = {
        name: name,
        price: price,
        quantity: quantity,
        status: status,
        id_category: category
    }
    await fetch(`${API_URL}/api/product`, {
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
            alert("Create product succsetfully");
            cleanForm();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    cleanRow();
    getProduct();
})


var btnClickEvent = () => {
    var listBtnUpdate = document.querySelectorAll(".btn-success");
    var listBtnDelete = document.querySelectorAll(".btn-danger");
    listBtnUpdate.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            document.getElementById("id").value = listData[index]._id;
            document.getElementById("nameUpdate").value = listData[index].name;
            document.getElementById("priceUpdate").value = listData[index].price;
            document.getElementById("quantityUpdate").value = listData[index].quantity;
            document.getElementById("statusUpdate").selectedIndex = listData[index].status;
            listCategory.forEach((category) => {
                if (category._id == listData[index].id_category) {
                    document.getElementById("categoryUpdate").value = category.nameCategory;
                    return;
                }
            })

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
                    deleteProduct(listData[index]._id)

                }
            });
        })
    })
}
var btnUpdate = document.querySelector("#btnUpdate");
btnUpdate.addEventListener("click", () => {
    updateProduct();
});
var updateProduct = async () => {
    var id = document.getElementById("id").value;
    var name = document.querySelector("#nameUpdate").value;
    var price = document.querySelector("#priceUpdate").value;
    var quantity = document.querySelector("#quantityUpdate").value;
    var status = document.getElementById("statusUpdate").selectedIndex;
    var category = listCategory[document.getElementById("categoryUpdate").selectedIndex]._id;

    if (!name || !nameRegex.test(name)) {
        return setError(1, "Name is empty or invalid");
    } else if (!price || !PriceRegex.test(price)) {
        return setError(1, "Price is empty or invalid");
    } else if (price <= 0) {
        return setError(1, "Price must be greater than 0");
    } else if (!quantity) {
        return setError(1, "Please enter a quantity");
    } else if (quantity <= 0) {
        return setError(1, "Quantity must be greater than 0");
    }
    else {
        setError(1, "");
    }
    var data = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        status: status,
        id_category: category
    }
    await fetch(`${API_URL}/api/product`, {
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
            console.log(data);
            alert("Update product succsetfully");
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    cleanRow();
    getProduct();
}
var deleteProduct = async (id) => {

    await fetch(`${API_URL}/api/product/${id}`, {
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
    getProduct();
}
var getCategory = async () => {
    await fetch(`${API_URL}/api/category`, {
        method: 'get',
    })
        .then(response => response.json())
        .then(data => {
            listCategory = data;
            createCategoryOption();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}
getCategory();
var createCategoryOption = () => {
    listCategory.forEach((item) => {
        var option = document.createElement('option');
        option.innerText = item.nameCategory;
        document.querySelector("#categoryUpdate").appendChild(option);
        document.querySelector("#category").appendChild(option.cloneNode(true));
    })
}
var setError = (index, err) => {
    errNode[index].innerHTML = err;
}
function cleanForm() {
    var form = document.querySelector('#addProduct');
    form.reset();
}