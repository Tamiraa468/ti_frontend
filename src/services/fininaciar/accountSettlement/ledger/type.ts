import { CustomerCompanyType } from "service/fininaciar/additionalFeeSettings/type";

export interface LedgerType {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  name: string;
  debit: number;
  credit: number;
  balance: number;
  initial_balance: number;
  customer_company?: CustomerCompanyType;
}
