import { useEffect, useState } from "react";
import { useFetchUniversitiesQuery } from "../redux/api/universities";

const useDelayedApiQuery = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const fetchUniversities = useFetchUniversitiesQuery(debouncedValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);
  return fetchUniversities;
};

export default useDelayedApiQuery;
