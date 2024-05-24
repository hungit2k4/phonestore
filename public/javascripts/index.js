import { API_URL } from './url.js';
var productList=[];
var oderList=[];

var getProduct = async () => {

  await fetch(`${API_URL}/api/product/new`, {
      method: 'get',
  })
      .then(response => response.json())
      .then(data => {
          productList = data;
          // Tạo mảng labels chứa tên sản phẩm
      

// Tạo mảng data chứa số lượng sản phẩm
      productChart();
      })
      .catch(error => {
          console.error('Error:', error); // Handle errors
      });
}

getProduct();

var getOder= async () => {

  await fetch(`${API_URL}/api/oder/newoder`, {
      method: 'get',
  })
      .then(response => response.json())
      .then(data => {
          oderList = data;
        console.log(data);
      oderChart();
      })
      .catch(error => {
          console.error('Error:', error); // Handle errors
      });
}

getOder();
const productChartId = document.getElementById('productChart');
const revenue = document.getElementById('revenue');       
var productChart=()=>{
  new Chart(productChartId, {
    type: 'bar',
    data: {
      labels: productList.map(product => product.name),
      datasets: [{
        label: 'sản phẩm mới',
        data: productList.map(product => product.quantity),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
  
var oderChart=()=>{

  new Chart(revenue, {
    type: 'line',
    data: {
      labels: oderList.map(oder => oder.code_oder),
      datasets: [{
        label: 'doanh thu',
        data: oderList.map(oder => oder.total_amount),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
               

