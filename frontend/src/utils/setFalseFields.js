const setFalseFields = (obj) => {
  const processedFilter = Object.keys(obj.filter).filter((elem) => {
    if (typeof obj.filter[elem] === 'boolean') {
      return true;
    }
    return false;
  });
  const booleanObject = processedFilter.reduce((acc, elem) => ({
    ...acc,
    [elem]: false,
  }), {});
  return booleanObject;
};

export default setFalseFields;
