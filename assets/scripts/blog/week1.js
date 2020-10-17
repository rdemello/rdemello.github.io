$('.headerPage').parallax({imageSrc: '../../assets/media/blog/week1/concrete.jpg'});
$('#dam').parallax({imageSrc: '../../assets/media/blog/week1/threeGorges.jpg'});
$('#3dprint').parallax({imageSrc: '../../assets/media/blog/week1/3DPrint.jpg'});

function setupConcreteChart(){
    var ctx = document.getElementById("concreteProduction").getContext("2d");

    const RoWdata = [833, 849, 868, 878, 904, 950, 990, 1035, 1103, 1149, 1177, 1126, 1180, 1232, 1275, 1310, 1334, 1366, 1374, 1381];
    const indiaData = [85, 90, 95, 100, 100, 123, 130, 145, 160, 170, 185, 205, 220, 250, 270, 231, 240, 260, 280, 281];
    const USAData = [85, 87, 89, 90, 91, 94, 99, 100, 99, 96, 87, 64, 67, 68, 74, 77, 83, 84, 85, 86];
    const chinaData = [536, 573, 597, 661, 704, 862, 970, 1068, 1236, 1354, 1400, 1644, 1822, 2099, 2210, 2411, 2492, 2359, 2410, 2331];
    const xData = [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];

    const concChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xData,
        datasets: [
        {
            label: "USA",
            fill: true,
            backgroundColor: 'rgba(94, 170, 242, 0.5)',
            pointBackgroundColor: 'rgba(85, 140, 230, 1)',
            borderColor: 'rgba(85, 140, 230, 1)',
            pointHighlightStroke: 'rgba(85, 140, 230, 1)',
            borderCapStyle: 'butt',
            data: USAData,
        }, {
            label: "India",
            fill: true,
            backgroundColor: 'rgba(170, 170, 170, 1)',
            pointBackgroundColor: 'rgba(120, 120, 120, 1)',
            borderColor: 'rgba(120, 120, 120, 1)',
            pointHighlightStroke: 'rgba(120, 120, 120, 1)',
            borderCapStyle: 'butt',
            data: indiaData,
        }, {
        label: "RoW",
        fill: true,
        backgroundColor: 'rgba(242, 223, 105, 0.6)',
        pointBackgroundColor: 'rgba(242, 157, 36, 1)',
        borderColor: 'rgba(242, 157, 36, 1)',
        pointHighlightStroke: 'rgba(242, 157, 36, 1)',
        borderCapStyle: 'butt',
        data: RoWdata,

        }, {
        label: "China",
        fill: true,
        backgroundColor: 'rgba(219, 84, 50, 0.5)',
        pointBackgroundColor: 'rgba(200, 70, 45, 1)',
        borderColor: 'rgba(200, 70, 45, 1)',
        pointHighlightStroke: 'rgba(200, 70, 45, 1)',
        borderCapStyle: 'butt',
        data: chinaData,
        }]
    },
    options: {
        responsive: true,
        scales: {
        yAxes: [{
            stacked: true,
            scaleLabel: {
                labelString:"Cement production (MT)",
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

    // new Chart(ctx, config);
    var originalLineDraw = Chart.controllers.line.prototype.draw;
    Chart.helpers.extend(Chart.controllers.line.prototype, {
        draw: function() {
            originalLineDraw.apply(this, arguments);

            var chart = this.chart;
            var ctx = chart.chart.ctx;

            if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                var activePoint = this.chart.tooltip._active[0];
                var ctx = this.chart.ctx;
                var x = activePoint.tooltipPosition().x;
                var topY = this.chart.scales['y-axis-0'].top;
                var bottomY = this.chart.scales['y-axis-0'].bottom;

                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#666';
                ctx.stroke();
                ctx.restore();
            }
        }
    });


}

function setupClinkerChart(){
    var ctx = document.getElementById("clinkerChart").getContext("2d");
    const clinkerChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [50, 40, 10],
                backgroundColor: ['rgba(26, 143, 201, 0.7)','rgba(245, 134, 49, 0.7)','rgba(0, 0, 0, 0.2)']

            }],
            labels: [
                'Chemical Emissions',
                'Thermal Emissions',
                'Other'
            ]
        },
        options: {
          responsive: true,
          animation: {
            duration: 750,
          },
          tooltips: {
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

setupClinkerChart();
setupConcreteChart();