import React, { useEffect, useState } from 'react';
import BarChart from './BarChart'; // Import the new BarChart component
import TopSeller from './TopSeller';
import DoughnutChart from './DoughnutChart';

const ProductsChart = ({ productsData, selectedMetric }) => {
    const [sortedData, setSortedData] = useState(productsData);
    const [displayedData, setDisplayedData] = useState(productsData); // State to manage displayed products

    useEffect(() => {
        // Update sortedData whenever productsData changes
        setSortedData(productsData);
        setDisplayedData(productsData); // Reset displayed data when productsData changes
    }, [productsData]);

    // Function to sort data in ascending order based on the selected metric
    const handleSortAscending = () => {
        const sorted = [...productsData].sort((a, b) => a[selectedMetric] - b[selectedMetric]);
        setSortedData(sorted);
        setDisplayedData(sorted); // Reset displayed data to sorted
    };

    // Function to sort data in descending order based on the selected metric
    const handleSortDescending = () => {
        const sorted = [...productsData].sort((a, b) => b[selectedMetric] - a[selectedMetric]);
        setSortedData(sorted);
        setDisplayedData(sorted); // Reset displayed data to sorted
    };

    // Function to show only the first 20 products
    const handleShowFirst20 = () => {
        const first20 = sortedData.slice(0, 20); // Get the first 20 products
        setDisplayedData(first20); // Update displayed data
    };

    return (
        <div style={{ width: '100%' }}>
            <div className='line2'>
                {/* Doughnut Chart for Top 5 Products */}
                <div className='doughnut'>
                    <DoughnutChart productsData={productsData} selectedMetric={selectedMetric} />
                </div>
                <div className='topseller'>
                    <TopSeller productsData={productsData} />
                </div>
            </div>
            <div className='line3'>
                <button onClick={handleSortAscending} style={{ marginBottom: '10px', marginRight: '10px' }}>
                    Sort in Ascending Order
                </button>
                <button onClick={handleSortDescending} style={{ marginBottom: '10px', marginRight: '10px' }}>
                    Sort in Descending Order
                </button>
                <button onClick={handleShowFirst20} style={{ marginBottom: '10px' }}>
                    Show Only First 20 Products
                </button>
            </div>
            <BarChart displayedData={displayedData} selectedMetric={selectedMetric} />
        </div>
    );
};

export default ProductsChart;
