import { useFormik } from "formik";

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes}${ampm}`;

    return `${formattedDate} / ${formattedTime}`;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return `${formattedDate}`;
}


export const inputNumbersOnly = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
        e.preventDefault();
    }
};

export const stringToBoolean = (str) => {
    return str?.toLowerCase() === 'true';
}

export const removeEmptyStringValuesInObj = (obj) => {
    const result = {};
    for (const key in obj) {
        if (obj[key] !== "") {
            result[key] = obj[key];
        }
    }
    return result;
}

// ***************** handle change for prevent the typing of leading spaces and characters except numbers ***************************
export const handleChangeOnlyNumbersInput = (e, handleChange) => {
    const { name, value } = e.target;
    // Allow only numeric values
    if (/^\d*$/.test(value)) {
        handleChange({
            target: {
                name,
                value
            }
        });
    }
};

// ***************** handle change to prevent typing of leading spaces and allow only alphabets and spaces ***************************
export const handleChangeOnlyAlphabetsInput = (e, handleChange, firstLetterCapital = false) => {
    let { name, value } = e.target;

    // Allow only alphabets and spaces, prevent leading spaces
    if (value === '' || (/^[A-Za-z\s]+$/.test(value) && value[0] !== ' ')) {
        // If firstLetterCapital is true, capitalize the first letter of the input
        if (firstLetterCapital && value) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }

        handleChange({
            target: {
                name,
                value
            }
        });
    }
};


// ***************** handle change for prevent the typing of leading spaces ***************************
export const handleInputChange = (e, handleChange, firstLetterCapital = false) => {
    let { value } = e.target;

    // Prevent typing leading spaces
    if (value === '' || value[0] !== ' ') {
        // If firstLetterCapital is true, capitalize the first letter of the input
        if (firstLetterCapital && value) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }

        // Call the handleChange function with the updated value
        handleChange({
            target: {
                name: e.target.name,
                value: value
            }
        });
    }
};



// ***************** handle change to allow only valid email characters ***************************
export const handleChangeEmailInput = (e, handleChange) => {
    const { name, value } = e.target;
    // Regular expression for valid email characters
    if (/^[a-zA-Z0-9@._-]*$/.test(value)) {
        handleChange({
            target: {
                name,
                value
            }
        });
    }
};

export const capitalizeString = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};


export const filterEmptyArrays = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value.length > 0)
    );
};



