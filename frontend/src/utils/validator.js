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

export { validateData, validateYear, findInvalidData };
