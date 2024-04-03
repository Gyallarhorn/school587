const FIELDS = ['firstName', 'lastName', 'middleName', 'year', 'letter', 'phone', 'email', 'social', 'almaMater', 'position', 'workplace', 'economic', 'success', 'isSuccess', 'achievement', 'defineSuccess', 'successSource', 'mistakes', 'wish', 'wishToGraduates', 'photo', 'isPermitted'];

const cleanData = (data) => {
  const nonEmtpyKeys = Object.keys(data).filter((key) => data[key]);
  const newData = {};
  nonEmtpyKeys.forEach((key) => {
    newData[key] = data[key];
  });

  newData.fullName = `${newData.lastName} ${newData.firstName} ${newData?.middleName ? newData?.middleName : ''}`.trim();

  if (newData.economic && newData.economic === 'Сфера деятельности') {
    delete newData.economic;
  }

  return newData;
};

const findEmptyFields = (data) => {
  const nonEmtpyKeys = Object.keys(data).filter((key) => data[key]);
  const emptyFields = FIELDS.filter((elem) => !nonEmtpyKeys.includes(elem));
  return emptyFields.reduce((acc, elem) => {
    if (!acc[elem]) {
      acc[elem] = '';
    }
    return acc;
  }, {});
};

export { cleanData, findEmptyFields };
