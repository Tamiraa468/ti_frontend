import type { Customer } from "service/auth/type";
import type { AdditionalFeeType } from "service/fininaciar/additionalFeeSettings/type";
import type { CustomerCompanyType } from "service/fininaciar/customerCompany/type";

export interface CargoApproachList {
  id: number;
  created_by_id: number;
  updated_by_id: number;
  created_by: Customer;
  created_at: Date;
  container_code: string;
  capacity: string;
  broker_name: string;
  broker_id: number;
  direction: string;
  approach_report_date: Date;
  arrived_at_site: string;
  left_site: string;
  opened_at?: string;
  freed_at?: string;
  left_site_at?: string;
  returned_at?: string;
  shipped_at?: string;
  status: string;
  is_recieved_and_waggon_gone: boolean;
  for_sale: boolean;
  container_cargo: ContainerCargo;
  transport_recieve: TransportRecieve;
  transport_give: TransportGive;
  assignation_status: AssignationStatus;
  shipping_status: ShippingStatus;
  broker: any;
  shipping_ticket_id: number;
  assignment_ticket_id: number;
  tickets: Ticket[];
}

export interface AssignationStatus {
  is_assignation_additional_fee_calculated: boolean;
  is_assignation_additional_fee_paid: boolean;
}

export interface ShippingStatus {
  is_shipping_additional_fee_calculated: boolean;
  is_shipping_additional_fee_paid: boolean;
}

export interface ContainerCargo {
  cargo_name: string;
  reciever_email: string;
  reciever_phone: string;
}

export interface TransportGive {
  foreign_customer_company: any;
  transfer_fee: number;
  transport_broker: string;
  transfer_broker_name: string;
}

export interface TransportRecieve {
  transport_fee: number;
  currency: string;
  customer_company_id: number;
  customer_company: CustomerCompanyType;
  payment_method: string;
  additional_fee_note: string;
}

export interface GetTempAdditionalFeeType {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  container_transport_record_id: number;
  ticket_number: string;
  cargo_weight: number;
  additional_fee_category_id: number;
  date: Date;
  additional_fee_ticket_calculated: TempAdditionalFee[];
}

export interface TempAdditionalFee {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  temp_additional_fee_wrapper_id: number;
  additional_fee_id: number;
  additional_fee: AdditionalFeeType;
  number_1: number;
  number_2: number;
  total_amount: number;
  fee_amount: number;
}

export interface TicketAdditionalFeeType {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  container_transport_record_id: number;
  ticket_number: string;
  cargo_weight: number;
  additional_fee_category_id: number;
  additional_fee_category: null;
  date: Date;
  additional_fee_ticket_calculated: null;
}

export interface GetPublicView {
  container_tranport_record: ContainerTranportRecord;
  ticket: Ticket[];
  debit: Debit;
}

export interface ContainerTranportRecord {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  type: string;
  container_code: string;
  capacity: number;
  broker_name: string;
  broker_id: number;
  broker: null;
  transport_direction: string;
  direction: string;
  approach_report_date: Date;
  arrived_at_site: Date;
  opened_at: Date;
  freed_at: Date;
  left_site_at: Date;
  returned_at: Date;
  shipped_at: Date;
  status: string;
  is_recieved_and_waggon_gone: boolean;
  assignation: null;
  assignation_status: AssignationStatus;
  shipping_status: ShippingStatus;
  for_sale: boolean;
  container_cargo: ContainerCargo;
  transport_recieve: TransportRecieve;
  transport_give: TransportGive;
}

export interface AssignationStatus {
  is_assignation_additional_fee_calculated: boolean;
  is_assignation_additional_fee_paid: boolean;
}

export interface ContainerCargo {
  cargo_name: string;
  reciever_email: string;
  reciever_phone: string;
}

export interface ShippingStatus {
  is_shipping_additional_fee_calculated: boolean;
  is_shipping_additional_fee_paid: boolean;
}

export interface TransportGive {
  transfer_fee: number;
  transport_broker: string;
  transfer_broker_name: string;
}

export interface TransportRecieve {
  transport_fee: number;
  currency: string;
  customer_company_id: number;
  customer_company: CustomerCompanyType;
  customer_company_name: string;
  payment_method: string;
  additional_fee_note: string;
}

export interface Ticket {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  shipping_or_assignment: string;
  container_transport_record_id: number;
  container_transport_record: ContainerTranportRecord;
  debit?: Debit;
  ticket_number: string;
  cargo_weight: number;
  additional_fee_category_id: number;
  additional_fee_category: any;
  date: Date;
  additional_fee_ticket_calculated: AdditionalFeeTicketCalculated[];
}

export interface AdditionalFeeTicketCalculated {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  additional_fee_ticket_id: number;
  fee_code: string;
  fee_name: string;
  unit_measurement: string;
  fee_amount: number;
  number_1: number;
  number_2: number;
  total_amount: number;
}

export interface Debit {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  payer_name: string;
  ticket_number: string;
  ticket_id: number;
  ticket: null;
  ledger_id: number;
  ledger: Ledger;
  transaction_id: number;
  transaction: Transaction;
  total_amount: number;
  payment_type: string;
  crane_fee: number;
  area_usage_fee: number;
  cargo_storage_fee: number;
  container_wagon_cleaning_fee: number;
  waggon_usage_fee: number;
  tl_waggon_use_fee: number;
}

export interface Ledger {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  name: string;
  balance: number;
  initial_balance: number;
  customer_company: CustomerCompanyType;
}
export interface Transaction {
  id: number;
  created_at: Date;
  updated_at: Date;
  created_by_id: number;
  updated_by_id: number;
  ledger_id: number;
  ledger: Ledger;
  transaction_type: string;
  amount: number;
  payment_type: string;
  payer: string;
  barimt: number;
  ledger_amount: number;
}
