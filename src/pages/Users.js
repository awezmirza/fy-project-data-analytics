import React, { useState } from 'react';
import useCSVUpload from '../hooks/useCSVUpload';
import ProductsChart from '../components/ProductsChart';
import useUserCSVValidation from '../hooks/useUserCSVValidation';

const Products = () => {
    const { isValid: isUserCSVValid, validateUserCSV } = useUserCSVValidation();
    const { data: productData, handleCSVUpload: handleProductUpload } = useCSVUpload(validateUserCSV);

    const [selectedMetric, setSelectedMetric] = useState('Views'); // State to manage the selected metric

    // Function to calculate total sales
    const calculateTotalSales = () => {
        return productData.reduce((total, product) => total + parseInt(product.Sales || 0), 0); // Sum all the sales
    };

    // Function to calculate total views
    const calculateTotalViews = () => {
        return productData.reduce((total, product) => total + parseInt(product.Views || 0), 0); // Sum all the views
    };

    // Function to calculate total returns
    const calculateTotalReturns = () => {
        return productData.reduce((total, product) => total + parseInt(product.Returns || 0), 0); // Sum all the returns
    };

    return (
        <div className='product-page'>
            <div className='top2sqr'>
                <div className='sqr1'>
                    <h2>Upload Products Data CSV</h2>
                    <p>CSV should have the following fields:</p>
                    <pre>{JSON.stringify(['ProductID', 'ProductName', 'Category', 'Views', 'Sales', 'Returns', 'Rating', 'Average View Time'], null, 2)}</pre>
                    <input type="file" className="custom-input" accept=".csv" onChange={handleProductUpload} />
                </div>
                {isUserCSVValid && <>
                    <div className='sqr2'>
                        <h2>Select metric to analyze</h2>
                        <div className='btns'>
                            <button onClick={() => setSelectedMetric('Views')}>Show Views</button>
                            <button onClick={() => setSelectedMetric('Sales')}>Show Sales</button>
                            <button onClick={() => setSelectedMetric('Returns')}>Show Returns</button>
                            <button onClick={() => setSelectedMetric('Rating')}>Show Rating</button>
                            <button onClick={() => setSelectedMetric('AverageViewTime')}>Show Avg View Time</button>
                        </div>
                        <div>Showing data on the basis of {selectedMetric}</div>
                    </div>
                    <div className='sqr3'>
                        <h2>Total Products</h2>
                        <h1>{productData.length}</h1>
                        <h2>Total Sales</h2>
                        <h1>{calculateTotalSales()}</h1>
                        <h2>Total Views</h2>
                        <h1>{calculateTotalViews()}</h1>
                        <h2>Total Returns</h2>
                        <h1>{calculateTotalReturns()}</h1>
                    </div>
                </>}
            </div>

            {/* Buttons to select the metric */}
            {isUserCSVValid && productData.length > 0 && (
                <ProductsChart
                    productsData={productData}
                    selectedMetric={selectedMetric} // Pass the selected metric to ProductsChart
                />
            )}

        </div>
    );
};

export default Products;
