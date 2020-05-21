import { useState, useCallback } from 'react';
const useToogle = intialState => {
  const [value, setValue] = useState(intialState);
  const toggle = useCallback(newValue => {
    if (newValue === true || newValue === false) {
      setValue(newValue);
    } else {
      setValue(v => !v);
    }
  }, []);
  return [value, toggle];
};

export default useToogle;
