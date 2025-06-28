import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  // State untuk menyimpan debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function untuk clear timeout jika value berubah
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Hanya re-run effect jika value atau delay berubah

  return debouncedValue;
}

export default useDebounce;