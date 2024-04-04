const ctx = document.getElementById('myChart');
                      
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['samsung', 'iphone', 'xiaomi', 'oppo', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [100, 40, 70, 10, 2, 3],
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