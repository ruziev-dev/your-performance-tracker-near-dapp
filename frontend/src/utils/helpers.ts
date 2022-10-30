import { utils } from "near-api-js";

export const toNear = (value: string) => utils.format.formatNearAmount(value);

export const toYoctoNear = (value: string) =>
  utils.format.parseNearAmount(value);

export const formatTimeWithZero = (value: number) =>
  value < 10 ? `0${value}` : value;
