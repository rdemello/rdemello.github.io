$('.headerPage').parallax({imageSrc: '../../assets/media/blog/deforestation/deforestation.jpg'});
$('#amazon').parallax({imageSrc: '../../assets/media/blog/deforestation/amazon.jpg'});

function setupForestryChart(){
    var ctx = document.getElementById("forestChart").getContext("2d");
    const clinkerChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [48,37,5,5,4,1],
                backgroundColor: ['rgba(56, 117, 22, 0.7)','rgba(138, 191, 109, 0.7)','rgba(26, 143, 201, 0.7)','rgba(245, 134, 49, 0.7)','rgba(64, 78, 207, 0.7)','rgba(0, 0, 0, 0.2)']

            }],
            labels: [
                'North America',
                'Europe',
                'Oceania',
                'Asia',
                'Central and South America',
                'Africa'
            ]
        },
        options: {
          responsive: true,
          animation: {
            duration: 750,
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var labels = data.labels[tooltipItem.index]
                var currentValue = dataset.data[tooltipItem.index];
                
                return labels + ": " + currentValue + "%";
              }
            }
          }, 
          legend: {
              position:'top'
          }
        },
        plugins: [{
            beforeInit: function(chart, options) {
              chart.legend.afterFit = function() {
                this.height += 30; // must use `function` and not => because of `this`
              };
            }
          }]
      });
}

setupForestryChart()