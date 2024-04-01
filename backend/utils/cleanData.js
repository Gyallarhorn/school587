const FIELDS = ['name', 'year', 'letter', 'phone', 'email', 'social', 'almaMater', 'position', 'workplace', 'economic', 'success', 'isSuccess', 'achievement', 'defineSuccess', 'successSource', 'mistakes', 'wish', 'wishToGraduates', 'photo', 'isPermitted'];

const cleanData = (data) => {
  const nonEmtpyKeys = Object.keys(data).filter((key) => data[key]);
  const newData = {};
  nonEmtpyKeys.forEach((key) => {
    newData[key] = data[key];
  });
  newData.name = `${newData.surname} ${newData.forename} ${newData.patronymic ? newData.patronymic : ''}`.trim();
  delete newData.forename;
  delete newData.surname;
  if (newData.patronymic) {
    delete newData.patronymic;
  }

  if (newData.economic && newData.economic === 'Сфера деятельности') {
    delete newData.economic;
  }
  return newData;
};

const findEmptyFields = (data) => {
  const nonEmtpyKeys = Object.keys(data).filter((key) => data[key]);
  const emptyFields = FIELDS.filter((elem) => !nonEmtpyKeys.includes(elem));
  console.log(emptyFields);
  return emptyFields.reduce((acc, elem) => {
    if (!acc[elem]) {
      acc[elem] = '';
    }
    return acc;
  }, {});
};

export { cleanData, findEmptyFields };