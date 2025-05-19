import { CreatedBy } from "service/base/type";

export interface EmployRegistration {
  age: number;
  avatar_path: string;
  background_color: string;
  created_at: string;
  created_by: CreatedBy;
  created_by_id: number;
  device_id: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  is_active: boolean;
  last_name: string;
  phone: string;
  position: string;
  registration_number: string;
  role_id: number;
  text_color: string;
  updated_at: string;
  updated_by_id: number;
}
