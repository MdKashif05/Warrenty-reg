export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription?: string | null;
  description?: string | null;
  imagePath?: string | null;
  warrantyMonths: number;
  status: ProductStatus;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  models?: ProductModel[];
  serialNumbers?: SerialNumber[];
}

export interface ProductModel {
  id: string;
  productId: string;
  name: string;
  sku?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerialNumber {
  id: string;
  productId: string;
  productModelId?: string | null;
  serialNumber: string;
  batchCode?: string | null;
  isRegistered: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
  productModel?: ProductModel | null;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  country: string;
  postalCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WarrantyRegistration {
  id: string;
  registrationId: string;
  customerId: string;
  serialNumberId: string;
  purchaseType: PurchaseType;
  purchaseDate: Date;
  purchasedFrom?: string | null;
  invoicePath?: string | null;
  warrantyStatus: WarrantyStatus;
  warrantyStartDate?: Date | null;
  warrantyEndDate?: Date | null;
  notes?: string | null;
  emailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  customer?: Customer;
  serialNumber?: SerialNumber & { product?: Product };
}

export type ProductCategory = "THERMAL_PASTE" | "LIQUID_METAL" | "THERMAL_PADS" | "OTHER";
export type ProductStatus = "ACTIVE" | "INACTIVE" | "DISCONTINUED";
export type PurchaseType = "ONLINE" | "RETAIL_STORE" | "DISTRIBUTOR" | "OTHER";
export type WarrantyStatus = "PENDING" | "ACTIVE" | "EXPIRED" | "REJECTED" | "CLAIMED";
export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "SUPPORT";

export interface WarrantyFormData {
  step: number;
  serialNumber: string;
  verifiedProduct?: SerialNumber & { product: Product; productModel?: ProductModel | null };
  customerDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  purchaseDetails?: {
    purchaseType: PurchaseType;
    purchaseDate: string;
    purchasedFrom: string;
    invoiceFile?: File | null;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
