// Shared types for warranty registration flow

export type WarrantyState = {
  step: number;
  serialNumber: string;
  verifiedProduct: {
    id: string;
    productName: string;
    category: string;
    warrantyMonths: number;
    productModelName?: string;
  } | null;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  } | null;
  purchaseDetails: {
    purchaseType: string;
    purchaseDate: string;
    purchasedFrom: string;
    invoiceFile: File | null;
  } | null;
};
