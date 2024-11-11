import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DoughnutChart = ({ productsData, selectedMetric }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Sort products based on the selected metric and extract the top 5 products
        const top5Products = [...productsData]
            .sort((a, b) => b[selectedMetric] - a[selectedMetric])
            .slice(0, 5); // Get the top 5 products

        // Data for the doughnut chart
        const data = {
            labels: top5Products.map(product => product.ProductName),
            datasets: [
                {
                    data: top5Products.map(product => product[selectedMetric]),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Colors for the doughnut
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                },
            ],
        };

        // Create the doughnut chart
        const doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: `Top 5 Products by ${selectedMetric}`,
                    },
                },
            },
        });

        // Clean up the chart when the component is unmounted
        return () => {
            doughnutChart.destroy();
        };
    }, [productsData, selectedMetric]);

    return <div style={{ height: '100%' }}>
        <canvas ref={chartRef} style={{ height: '60vh', width: '60vh' }} />
    </div>
};

export default DoughnutChart;
