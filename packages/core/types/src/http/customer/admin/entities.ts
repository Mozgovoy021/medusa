import { AdminCustomerGroup } from "../../customer-group"
import { BaseCustomer, BaseCustomerAddress } from "../common"

export interface AdminCustomer extends BaseCustomer {
  /**
   * Whether the customer is a guest.
   */
  has_account: boolean
  /**
   * An internal note about the customer, only visible to admin users.
   */
  internal_note: string | null
  /**
   * The groups the customer is in.
   */
  groups?: AdminCustomerGroup[]
  /**
   * The customer's addresses.
   */
  addresses: AdminCustomerAddress[]
}
export interface AdminCustomerAddress extends BaseCustomerAddress {}
