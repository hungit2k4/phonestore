import { API_URL } from './url.js';

const phoneNumberRegex = /^((09|03|07|08|05)+([0-9]{8}))$/;
const PriceRegex = /^[0-9]+$/;
var listOder = [];
var indexUpdate;
var tbody = document.querySelector('tbody');

var errNode = document.querySelectorAll("#error");
document.querySelector('.bg').addEventListener('click', () => {
    createCodeOder();
});
var createCodeOder = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('codeOder').value = randomString;
};
var btnCreate = document.getElementById('btnCreate');
btnCreate.addEventListener('click', async () => {
    let codeOder = document.getElementById('codeOder').value;
    let totalAmount = document.getElementById('total').value;
    let address = document.getElementById('address').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    if (!PriceRegex.test(totalAmount)) {
        return setError(0, 'Invalid total amount');
    } else if (totalAmount <= 0) {
        return setError(0, 'Total amount must be greater than 0');
    } else if (address.length == 0) {
        return setError(0, 'Address is empty');
    } else if (!phoneNumberRegex.test(phoneNumber)) {
        return setError(0, 'Invalid phone number');
    } else {
        setError(0, "");
    }
    var data = {
        code_oder: codeOder,
        total_amount: totalAmount,
        address: address,
        phone_number: phoneNumber
    }
    await fetch(`${API_URL}/api/oder`, {
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
            alert("Create oder succsetfully");
            cleanForm();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
        cleanRow();
        getOder(10,1);
});

var getOder = async (numberEntries, page) => {

    await fetch(`${API_URL}/api/oder?limit=${numberEntries}&&page=${page}`, {
        method: 'get',
    })
        .then(response => response.json())
        .then(data => {
            listOder = data;
            createRow();
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}

getOder(10, 1);

var createRow = () => {
    listOder.forEach((item) => {
        var create = document.createElement('tr'); // Tạo thẻ tr mới
        // Tạo các cột td và đổ dữ liệu từ mảng vào
        create.innerHTML = `
            <td>${item.code_oder}</td>
            <td>${item.oder_date}</td>
            <td>${item.address}</td>
            <td>${item.phone_number}</td>
            <td>${item.total_amount}</td>
            <td>${item.status}</td>
            <td>
                <button class="btn btn-success btn-sm mr-2" data-bs-toggle="modal" data-bs-target="#update"><i class="fas fa-edit">
                    <span class="material-symbols-outlined">edit</span>
                </i></button>
                
            </td>
        `;

        tbody.appendChild(create);
        // Thêm hàng tr vào tbody
    });
    btnClickEvent();
}


var btnClickEvent = () => {
    var listBtnUpdate = document.querySelectorAll(".btn-success");
    var listBtnDelete = document.querySelectorAll(".btn-danger");
    listBtnUpdate.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            document.getElementById("id").value = listOder[index]._id;
            document.getElementById("codeOderUpdate").value = listOder[index].code_oder;
            document.getElementById("oderDateUpdate").value = listOder[index].oder_date;
            document.getElementById("addressUpdate").value = listOder[index].address;
            document.getElementById("phoneNumberUpdate").value = listOder[index].phone_number;
            document.getElementById("totalAmountUpdate").value = listOder[index].total_amount;
            document.getElementById("status").selectedIndex = listOder[index].status;
            indexUpdate=index;
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
                    deleteOder(listOder[index]._id);
                }
            });
        })
    })
}

var btnUpdate= document.querySelector("#btnUpdate");
btnUpdate.addEventListener("click", async() => {
    var id =document.getElementById("id").value;
    var address= document.getElementById("addressUpdate").value;
    var phoneNumber =document.getElementById("phoneNumberUpdate").value;
    var status = document.getElementById("status").selectedIndex;
    if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
        return setError(1, "Phone number invalid");
    }
    var data = {
        id: id,
        address: !address?listOder[indexUpdate].address:address,
        phone_number: !phoneNumber?listOder[indexUpdate].phone_number:phoneNumber,
        status: status,
    }
    await fetch(`${API_URL}/api/oder`, {
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
                title: "Updated!",
                text: "Oder update successfully",
                icon: "success"
            });
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    cleanRow();
    getOder(10,1);

});
var deleteOder = async (id) => {

    await fetch(`${API_URL}/api/oder/${id}`, {
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
    getOder(10,1);
}

var setError = (index, err) => {
    errNode[index].innerHTML = err;
}
function cleanForm() {
    var form = document.querySelector('#addOder');
    form.reset();
    createCodeOder();
}
var cleanRow = () => {
    tbody.innerHTML = '';
}