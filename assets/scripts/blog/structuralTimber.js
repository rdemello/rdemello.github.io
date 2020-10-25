$('.headerPage').parallax({imageSrc: '../../assets/media/blog/structuralTimber/clt.jpg'});
$('#end').parallax({imageSrc: '../../assets/media/blog/structuralTimber/inside.jpg'});


function setupCarbonChart(){
    var ctx = document.getElementById("materialComparison").getContext("2d");
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Steel", "Concrete", "CLT", "Glulam"],
            datasets: [
            {
                label: "GHG Emissions",
                fill: true,
                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                hoverBackgroundColor: 'rgba(50, 50, 50, 0.5)',
                borderColor: 'rgba(50, 50, 50, 1)',
                borderCapStyle: 'butt',
                data: [2600, 103, 114, 89],
            }, {
                label: "Carbon Sequestered",
                fill: true,
                backgroundColor: 'rgba(136, 194, 116, 0.5)',
                hoverBackgroundColor: 'rgba(136, 194, 116, 0.7)',
                borderColor: 'rgba(136, 194, 116, 1)',
                borderCapStyle: 'butt',
                data: [0, 0, -1621, -1712],
            }]
        },
        options: {
            responsive: true,
            scales: {
            yAxes: [{
                stacked: true,
                scaleLabel: {
                    labelString:"kg of carbon dixoide equivalent",
                    display:true
                }
            }]
            },
            animation: {
                duration: 750,
            },
            tooltips: {
                intersect: false,
                axis: 'x'
            },
            legend: {
                labels: {
                    padding: 20
                }
            }
        },
        plugins: [{
            beforeInit: function(chart, options) {
              chart.legend.afterFit = function() {
                this.height += 40; // must use `function` and not => because of `this`
              };
            }
          }]

    });
}

setupCarbonChart()