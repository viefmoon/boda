// ----------------------------------------------------------------------

export function localStorageAvailable() {
  try {
    const key = Array.from('ayola')
      .map((char) => char.charCodeAt(0).toString(16))
      .join('');

    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);

    return true;
  } catch (error) {
    console.error('localStorage is not available:', error);

    return false;
  }
}

// ----------------------------------------------------------------------

export function localStorageGetItem(key: string, defaultValue: string = '') {
  const storageAvailable = localStorageAvailable();

  let value: string | null = null;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}
