export interface User {
  email: string;
  password: string;
  name: string;
  city: string;
  birthdate: Date|string;
  address: string;
  age?: number;
  phone_number? :string;
}
