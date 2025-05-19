export interface Address {
  id: number;
  created_at: Date;
  updated_at: Date;
  code: string;
  name: string;
  is_active: boolean;
}

export interface CreatedBy {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface DisabilityTypeInterface {
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  name: string;
  code: string;
  description: string;
}

export interface Logo {
  id: number;
  created_at: Date;
  updated_at: Date;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
}
