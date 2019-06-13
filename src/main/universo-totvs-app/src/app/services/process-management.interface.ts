import { PurchaseRequest } from '../models/purchase-request.interface';

export interface ApiBaseResponse {
  active: boolean;
  activities: string;
  deadlineSpecification: string;
  formFields: PurchaseRequest[];
  formId: number;
  formRecord: string;
  formRecordId: number;
  periodId: string;
  processDescription: string;
  processId: string;
  processInstanceId: number;
  processVersion: number;
  requester: string;
  slaStatus: string;
  startDate: string;
  status: string;
  _expandables: string[];
}
