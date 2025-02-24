import { useState } from "react";

const useLocalStorageWithExpiry = (key, defaultValue = null, expiry) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;

    const { value, expiry: expiryTime } = JSON.parse(item);
    if (new Date().getTime() > expiryTime) {
      window.localStorage.removeItem(key);
      return defaultValue;
    }
    return value;
  });

  const setValue = value => {
    const expiryTime = new Date().getTime() + expiry * 60 * 1000;
    window.localStorage.setItem(
      key,
      JSON.stringify({ value, expiry: expiryTime })
    );
    setStoredValue(value);
  };

  return [storedValue, setValue];
};

export default useLocalStorageWithExpiry;
