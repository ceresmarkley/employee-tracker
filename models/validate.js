const validateInput = function (input) {
    if (input.trim() === '') {
        return 'This input cannot be empty, please re-enter again';
    }
    return true;
};

const validateNumber = function (input) {
    const validateSal = /^\d+(\.\d{1,2})?$/;
    if (!validateSal.test(input)) {
        return 'Must enter a number with 2 decimals.';
    }
    return true;
};

module.exports = {
    validateInput,
    validateNumber,
};