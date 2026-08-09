export interface IErrorHttp<Metadata = unknown> {
  xTitle?: string;
  xSubTitle?: string;
  xCode: string;
  xMessage: string;
  xDescription?: string;
  xMetaData?: Metadata;
  xTraceId?: string;
  xUrl?: string;
}
