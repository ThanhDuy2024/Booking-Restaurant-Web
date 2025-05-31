'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
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
        position: 'top',
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
        ticks:{
          stepSize: stepSize,
        }
      }
    }
  }

  const labels = labelsChart;

  const data = {
    labels,
    datasets: [{
      label: labelDataset,
      data: dataChart,
      borderColor: 'rgb(42,163,8)',
      backgroundColor: 'rgb(22,122,0)',
    }
    ]
  }
  return <Line options={options} data={data} className={'!h-64'}/>
}
export default LineChart;