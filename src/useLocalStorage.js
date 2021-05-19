import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defaultValue = '') => {
  const [state, setState] = useState(() => {
    const local = localStorage.getItem(key);
    if (local) {
      return JSON.parse(local);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
