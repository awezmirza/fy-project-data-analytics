import { useState } from 'react';

const useProductCSVValidation = () => {
    const [isValid, setIsValid] = useState(false);

    const validateProductCSV = (data) => {
        if (!data || data.length === 0) {
            setIsValid(false);
            return false;
        }

        // Required fields for product CSV
        const requiredFields = [
            'ProductID',
            'ProductName',
            'Category',
            'Views',
            'Sales',
            'Returns',
            'Rating',
            'AverageViewTime'
        ];

        const isValidCSV = data.every((row) => {
            console.log(requiredFields.every((field) => field in row));
            return requiredFields.every((field) => field in row)
        }
        );

        setIsValid(isValidCSV);
        return isValidCSV;
    };

    return { isValid, validateProductCSV };
};

export default useProductCSVValidation;
