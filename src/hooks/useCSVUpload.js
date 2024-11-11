import { useState } from 'react';
import Papa from 'papaparse';

const useCSVUpload = (validateCSV) => {
    const [data, setData] = useState([]);

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: function (results) {
                    const isValid = validateCSV(results.data); // Use the validateCSV function
                    if (isValid) {
                        setData(results.data);
                    } else {
                        alert('Invalid CSV format');
                    }
                },
            });
        }
    };

    return { data, handleCSVUpload };
};

export default useCSVUpload;
