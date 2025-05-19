import type { LedgerType } from "../accountSettlement/ledger/type";

export interface CustomerCompanyType {
  id: number;
  created_at: Date;
  updated_at: Date;
  shortcut_name: string;
  created_by: any;
  name: string;
  is_broker: boolean;
  ledger_id: number;
  user: any;
  ledger: LedgerType;
  contact_number: string;
}
