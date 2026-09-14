import {
  BaseCreateCustomer,
  BaseCreateCustomerAddress,
  BaseUpdateCustomer,
  BaseUpdateCustomerAddress,
} from "../common"

export interface AdminCreateCustomer extends BaseCreateCustomer {
  /**
   * An internal note about the customer, visible to admin users only.
   */
  note?: string | null
}
export interface AdminUpdateCustomer extends BaseUpdateCustomer {
  /**
   * An internal note about the customer, visible to admin users only.
   */
  note?: string | null
}

export interface AdminCreateCustomerAddress extends BaseCreateCustomerAddress {}
export interface AdminUpdateCustomerAddress extends BaseUpdateCustomerAddress {}
