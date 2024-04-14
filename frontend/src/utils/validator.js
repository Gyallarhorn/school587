import { toast } from "react-toastify";

const validateData = (data, validator) => {
  return Object
    .keys(validator)
    .every((key) => validator[key].test(data[key]));
};

const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  const regexp = /^\d{4}$/;
  if (!regexp.test(year)) {
    return false;
  }
  return Number(year) <= currentYear;
};

const findInvalidData = (data, validator) => {
  return Object
    .keys(validator)
    .filter((key) => !validator[key].test(data[key]));
};

const validateForm = (data, validator, errors) => {
  const isValid = validateData(data, validator);
  const isValidYear = validateYear(data.year);

  if (!isValidYear) {
    toast.error('Пожалуйста введите корректный год выпуска');
    return false;
  }

  if (!isValid) {
    const invalidData = findInvalidData(data, validator);
    invalidData.forEach((elem) => toast.error(errors[elem]));
    return false;
  }

  if (data.letter === 'Класс') {
    toast.error('Пожалуйста выберите класс');
    return false;
  }

  if (data.economic === 'Сфера деятельности') {
    toast.error('Пожалуйста выберите сферу деятельности');
    return false;
  }

  return true;
};

export { validateData, validateYear, findInvalidData, validateForm };
