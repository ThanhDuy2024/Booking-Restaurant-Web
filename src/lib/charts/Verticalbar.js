'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart = ({
                            titleChart,
                            labelDataset,
                            labelsChart,
                            dataChart,
  stepSize
                          }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: titleChart,
      }
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...dataChart) + stepSize,
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
        },
      },
      x: {
        grid: {
          offset: true
        }
      }
    },
  }

  const labels = labelsChart;

  const data = {
    labels,
    datasets: [{
      label: labelDataset,
      data: dataChart,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
    ]
  }
  return <Bar options={options} data={data} className={'!h-64'} />
}
export default VerticalBarChart;