import React, { useEffect, useState } from 'react';

const TopSeller = ({ productsData }) => {
    const [topSeller, setTopSeller] = useState(null); // State to manage the top seller

    useEffect(() => {
        // Function to get the top-selling product
        const getTopSeller = () => {
            if (productsData.length > 0) {
                // Sort the products by Sales in descending order and get the top 1 product
                const topSellingProduct = [...productsData]
                    .sort((a, b) => b.Sales - a.Sales)[0]; // Get the top-selling product
                setTopSeller(topSellingProduct);
            }
        };

        getTopSeller();
    }, [productsData]);

    return (
        <div>
            <h2>Top Selling Product</h2>
            {topSeller ? (
                <p>
                    <strong>Product ID:</strong> {topSeller.ProductID}<br />
                    <strong>Product Name:</strong> {topSeller.ProductName}<br />
                    <strong>Category:</strong> {topSeller.Category}<br />
                    <strong>Views:</strong> {topSeller.Views}<br />
                    <strong>Sales:</strong> {topSeller.Sales}<br />
                    <strong>Returns:</strong> {topSeller.Returns}<br />
                    <strong>Rating:</strong> {topSeller.Rating}<br />
                    <strong>Average View Time:</strong> {topSeller['AverageViewTime']}
                </p>
            ) : (
                <p>No top-selling product found.</p>
            )}
        </div>
    );
};

export default TopSeller;
