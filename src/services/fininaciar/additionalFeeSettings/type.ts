export interface CustomerCompanyType {
  id: number;
  created_at: Date;
  updated_at: Date;
  shortcut_name: string;
  name: string;
  is_broker: boolean;
  ledger_id: number;
  contact_number: string;
  ledger_name: string;
}

export interface AdditionalFeeType {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  category_code: string;
  fee_code: string;
  fee_name: string;
  unit_measurement: string;
  fee_amount: number;
  number_1: number;
  number_2: number;
  total_amount: number;
  is_new?: boolean;
  is_default: string;
}

export interface AddItem {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  created_by: AtedBy;
  updated_by_id: number;
  updated_by?: AtedBy;
  fee_code: string;
  fee_name: string;
  unit_measurement: string;
  fee_amount: number;
  categories: Category[];
  capacity: number;
}

export interface Category {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  name: string;
  code: string;
  category_type: string;
  AdditionalFees: null;
}
export interface AtedBy {
  id: number;
  created_at: Date;
  updated_at: Date;
  creator_id: number;
  modifier_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  registration_number: string;
  age: number;
  gender: string;
  avatar_path: string;
  email: string;
  is_active: boolean;
  role_name: string;
  position: string;
  customer_company_id: number;
}
