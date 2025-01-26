export function wrapFirstWord(str: string, element: string) {
  const words = str.split(' ');
  if (words.length === 0) return str;
  const wrappedWord = `<${element}>${words[0]}</${element}>`;
  const result = [wrappedWord, ...words.slice(1)].join(' ');
  return result;
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows NT|Opera Mini/i.test(navigator.userAgent);
}
