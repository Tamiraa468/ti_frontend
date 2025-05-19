export interface Base {
  id?: number;
  created_at: Date;
  updated_at: Date;
  created_user_id: string;
  updated_user_id: string;
}

export interface Address {
  city_id: number | null;
  city?: AddressResponse;
  district_id: number | null;
  district?: AddressResponse;
  khoroo_id: number | null;
  khoroo?: AddressResponse;
  desc: string;
}

export interface Agency {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
}

export interface AddressResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  code?: string;
  name: string;
  is_active: boolean;
}

export interface Profile {
  id: number;
  created_at: Date;
  updated_at: Date;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
}

export interface CreatePermissionType {
  address: {
    city_id: number;
    desc: string;
    district_id: number;
    khoroo_id: number;
  };
  agency_id: number;
  birth_date: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  password: string;
  phone: string;
  profile_id: number;
  profile?: any;
}

export interface ListType<T> {
  total: number;
  items: T;
  total_level_1?: number;
  total_level_2?: number;
  total_level_3?: number;
}
