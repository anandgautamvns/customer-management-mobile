import { PAGE_NUMBER, PAGE_SIZE } from "../../constant";
import { CustomerEntity, CustomerRequest } from "../../redux/customer/type";

export const defaultCustomerRequest: CustomerRequest = {
  search: '',
  ordering: '',
  page: PAGE_NUMBER,
  page_size: PAGE_SIZE,
}

export const defaultCustomerEntity: Omit<CustomerEntity, 'id' | 'created_at' | 'modified_at'>  = {
  first_name: '',
  last_name: '',
  dob: '2025-03-20',
  phone_number: '',
  age: 0,
  email: '',
  gender: '',
  is_employee: false,
}