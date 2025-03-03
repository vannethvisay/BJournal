import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { useDashboard } from '../context/DashboardContext'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const PerformanceChart = () => {
  const { chartData, darkMode } = useDashboard()
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          color: darkMode ? '#94a3b8' : '#64748b',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        titleColor: darkMode ? '#e2e8f0' : '#1e293b',
        bodyColor: darkMode ? '#cbd5e1' : '#475569',
        borderColor: darkMode ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 'bold',
        },
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: darkMode ? '#334155' : '#e2e8f0',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      }
    }
  }
  
  const data = {
    labels: chartData.dates,
    datasets: [
      {
        label: 'Daily Profit/Loss',
        data: chartData.dailyProfitData,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: darkMode ? '#1e293b' : '#ffffff',
        pointBorderWidth: 1.5,
        tension: 0.2,
      },
      {
        label: 'Cumulative Profit/Loss',
        data: chartData.cumulativeProfitData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.2,
      }
    ],
  }
  
  return (
    <div className="h-80">
      <Line options={options} data={data} />
    </div>
  )
}

export default PerformanceChart
