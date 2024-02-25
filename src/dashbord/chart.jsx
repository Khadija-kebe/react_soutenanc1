import React, { useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import '../css/chart.css'


function Chart() {
  // BAR CHART
  const barChartOptions = {
    series: [
      {
        data: [10, 8, 6, 4, 2],
      },
    ],
    chart: {
      type: 'bar',
      height: 200,
      toolbar: {
        show: false,
      },
    },
    colors: ['#22E41E', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['jour', 'semaine', 'mois', 'annee'],
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
  };

  // AREA CHART
  const areaChartOptions = {
    series: [
      {
        name: 'Purchase Orders',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Sales Orders',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 200,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ['#22E41E', '#EEEDE7'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'aout', 'Sep', 'Oct', 'Nov', 'Dec'],
    markers: {
      size: 0,
    },
 
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  useEffect(() => {
    const barChart = new ApexCharts(document.querySelector('#bar-chart'), barChartOptions);
    barChart.render();

    const areaChart = new ApexCharts(document.querySelector('#area-chart'), areaChartOptions);
    areaChart.render();
  }, []);

  return (
    <div className="charts">
      <div className="charts-card">
        <p className="chart-title">Nombres Moutons vendu</p>
        <div id="bar-chart" />
      </div>

      <div className="charts-card">
        <p className="chart-title">Nombres de visiteurs par mois</p>
        <div id="area-chart" />
      </div>
    </div>
  );
}

export default Chart;
