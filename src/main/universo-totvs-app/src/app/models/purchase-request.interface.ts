import { Products } from './products.interface';

export interface PurchaseRequest {
  code?: string;
  textbox0?: string;
  textbox1?: string;
  login?: string;
  zoomfield2?: string;
  companyid?: string;
  provider?: string;
  justify?: string;
  cardid?: string;
  tableid?: string;
  documentid?: string;
  hidden_provider?: string;
  version?: string;
  hidden_zoomfield2?: string;
  approve?: string;
  category?: string;
  providers?: string;
  products?: Products[];
}
