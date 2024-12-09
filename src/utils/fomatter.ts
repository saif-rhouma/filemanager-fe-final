export const fileSizeFormatter = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';

  const KILOBYTE = 1024;

  const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));

  return `${(bytes / Math.pow(KILOBYTE, i)).toFixed(2)} ${UNITS[i]}`;
};
