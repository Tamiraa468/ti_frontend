// import { Address } from "service/social-worker/customer/type";

import { Profile } from "service/type";

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  user: Admin;
}
export interface LoginCustomerResponse {
  token: string;
  user: Customer;
  role_name: string;
}

export interface Customer {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  customer_company_id: number;
  email: string;
  phone: string;
  is_active: boolean;
  user_type: number;
  city_id: number;
  // city: Address;
  profile: Profile;
  profile_id: number;
  district_id: number;
  agency_id: number;
  role_name: string;
}

export interface Admin {
  id: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  customer_company_id: number;
  phone: string;
  is_active: boolean;
  user_type: number;
  city_id: number;
  // city: Address;
  profile: Profile;
  profile_id: number;
  district_id: number;
  agency_id: number;
  role_name: string;
}
