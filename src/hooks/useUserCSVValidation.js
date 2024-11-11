import { useState } from 'react';

const useUserCSVValidation = () => {
    const [isValid, setIsValid] = useState(false);

    const validateUserCSV = (data) => {
        if (!data || data.length === 0) {
            setIsValid(false);
            return false;
        }

        // Required fields for user CSV
        const requiredFields = [
            'UserID',
            'UserName',
            'Email',
            'LastActive',
            'TopChoices',
            'SignUpDate',
            'TotalOrders',
            'OrdersThisMonth'
        ];

        const isValidCSV = data.every((row) =>
            requiredFields.every((field) => field in row)
        );

        setIsValid(isValidCSV);
        return isValidCSV;
    };

    return { isValid, validateUserCSV };
};

export default useUserCSVValidation;
