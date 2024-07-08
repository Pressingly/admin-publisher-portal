export interface SubscriptionCharge {
  createdAt: string
  updatedAt: string
  id: string
  membershipOrgId: string
  membershipUserId: string
  subscriptionInstanceId: string
  amount: number
  currencyCode: string
  status: string
  description: string
}
export interface MembershipUser {
  membershipUserId: string
  totalAmount: number
}
export interface PaginationValue {
  currentPage: string
  totalItem: number
}
export interface MembershipOrg {
  membershipOrgId: string
  totalAmount: number
}
export interface SubscriptionChargesView {
  scId: string
  description: string
  amount: string
  interchangeFee: string
  receivables: string
  paidAmount: string
  unpaidAmount: string
  inDispute: string
  subscriptionChargeStatus: string
  createdDate: string
  updatedDate: string
  paymentDate: string
}

export interface MembershipUserView {
  id: string
  customer: string
  totalAmount: string
  interchangeFee: string
  receivables: string
  paidAmount: string
  unpaidAmount: string
  inDispute: string
  paymentStatus: string
  paymentDate: string
}

export interface MembershipOrgView {
  id: string
  org: string
  total: string
  interchange: string
  receivables: string
  paid: string
  unpaid: string
  inDispute: string
  status: string
  paymentDate: string
}
