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

export default cleanData;
