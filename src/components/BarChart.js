import React, { useEffect, useMemo, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ displayedData, selectedMetric }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Generate an array of random light colors for each product
        const backgroundColors = displayedData.map(() => getRandomLightColor());

        // Create the chart
        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: displayedData.map((item) => item.ProductName),
                datasets: [
                    {
                        label: selectedMetric, // Use the selected metric as the label
                        data: displayedData.map((item) => item[selectedMetric]), // Use the selected metric for data
                        backgroundColor: backgroundColors, // Use the array of random colors
                        borderColor: 'rgba(0, 0, 0, 1)', // Optional: black border for contrast
                        borderWidth: 1,
                        barThickness: 30,
                        maxBarThickness: 30,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                indexAxis: 'y', // For horizontal bar chart
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Product Performance',
                    },
                    tooltip: {
                        callbacks: {
                            title: (tooltipItems) => {
                                const productName = tooltipItems[0].label;
                                return productName;
                            },
                            label: (tooltipItem) => {
                                const product = displayedData[tooltipItem.dataIndex];
                                return [
                                    `Views: ${product.Views}`,
                                    `Sales: ${product.Sales}`,
                                    `Returns: ${product.Returns}`,
                                    `Rating: ${product.Rating}`,
                                    `Avg View Time: ${product['AverageViewTime']}`,
                                ];
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        position: 'top',
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chartInstance.destroy();
        };
    }, [displayedData, selectedMetric]);

    const chartHeight = useMemo(() => displayedData.length * 50, [displayedData.length]);

    return <div style={{ width: '100%', height: chartHeight }}>
        <canvas ref={chartRef} />;
    </div>
};

// Function to generate a random light color with a random alpha value between 0.3 and 0.7
const getRandomLightColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Generate a random alpha value between 0.3 and 0.7
    const alpha = Math.random() * 0.4 + 0.3; // Random value between 0.3 and 0.7
    // Ensure the color is light by ensuring the RGB values are high enough
    return `rgba(${r + 100}, ${g + 100}, ${b + 100}, ${alpha})`; // Increase the RGB values to make it lighter
};

export default BarChart;
