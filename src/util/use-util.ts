export const isHex64Str = (data: string): boolean => {
  const regex = /^[A-Fa-f0-9]{64}$/;
  return regex.test(data);
};
