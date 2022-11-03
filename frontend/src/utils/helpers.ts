import { utils } from "near-api-js";

export const toNear = (value: string) => utils.format.formatNearAmount(value);

export const toYoctoNear = (value: string) =>
  utils.format.parseNearAmount(value);

export const formatTimeWithZero = (value: number) =>
  value < 10 ? `0${value}` : value;

export const fileToBase64  = async (file: File) => {
  const arrayBuf = await file.arrayBuffer()

  return arrayBufferToBase64(arrayBuf, file.type)
}


export const arrayBufferToBase64 = (buffer: ArrayBuffer, type: string) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const data = `data:${type};base64,` + window.btoa(binary);
  return data;
};
