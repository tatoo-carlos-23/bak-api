import type { IErrorHttp } from "./error.interface";

export const getError = (error: any): IErrorHttp => {
  const errorParsed = JSON.parse(error) as IErrorHttp;

  if (errorParsed?.xCode && errorParsed?.xMessage) {
    return errorParsed;
  }

  return {
    xCode: "CODE-GENERIC",
    xMessage: "Ocurrió un error intente de nuevo si desea",
  } as IErrorHttp;
};
