import { convertHexToString } from "@swtc/common";
import { IMemo } from "@jccdex/jingtum-lib/lib/type";

export const isDef = (v): boolean => {
  return v !== undefined && v !== null;
};

export const isPositiveStr = (v): boolean => {
  return typeof v === "string" && v.length > 0;
};

export const isPositiveInteger = (v): boolean => {
  return Number.isInteger(v) && v > 0;
};

export const isJSON = (v): boolean => {
  try {
    JSON.parse(v);
    return true;
  } catch (error) {
    return false;
  }
};

export const string2json = (v: string) => {
  return JSON.parse(v);
};

export const convertTime = (v: number): number => {
  return v + 946684800;
};

export const convertMemo = (memos: IMemo[]): string => {
  const memo = memos?.[0]?.Memo?.MemoData;
  if (isDef(memo)) {
    return convertHexToString(memo);
  }
  return "";
};
