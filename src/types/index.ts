import { Timestamp } from 'firebase/firestore';

// ============================================
// USER TYPES
// ============================================

export type UserRole = 'admin' | 'developer' | 'client';

export interface User {
  uid: string;
  role: UserRole;
  username: string;
  email: string;
  phone?: string;
  photoURL?: string;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

// ============================================
// DEVELOPER TYPES
// ============================================

export type DeveloperStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type IdentityType = 'individual' | 'company';
export type PayoutMethod = 'bank' | 'upi';

export interface Developer {
  userId: string;
  identityType: IdentityType;
  displayName: string;
  supportEmail: string;
  portfolioUrl?: string;
  demoProjectUrl?: string;
  status: DeveloperStatus;
  payoutMethod: PayoutMethod;
  payoutDetails: Record<string, any>;
  totalSales: number;
  totalRevenue: number;
  createdAt: Timestamp;
  approvedAt?: Timestamp;
}

// ============================================
// CLIENT TYPES
// ============================================

export interface Client {
  userId: string;
  totalPurchases: number;
  totalSpent: number;
  createdAt: Timestamp;
}

// ============================================
// PROJECT TYPES
// ============================================

export type ProjectStatus = 'draft' | 'pending' | 'approved' | 'sold' | 'hidden';
export type Platform = 'web' | 'android' | 'ios';
export type OwnershipType = 'licensed' | 'full';

export interface Project {
  id: string;
  developerId: string;
  title: string;
  slug: string;
  category: string;
  platform: Platform;
  price: number;
  currency: string;
  ownershipType: OwnershipType;
  status: ProjectStatus;
  previewUrl?: string;
  images: string[];
  features: string[];
  techStack: string[];
  shortDescription: string;
  fullDescription: string;
  scope: string;
  totalSales: number;
  averageRating: number;
  totalReviews: number;
  currentVersion: string;
  createdAt: Timestamp;
  approvedAt?: Timestamp;
  soldAt?: Timestamp;
}

export interface ProjectVersion {
  id: string;
  version: string;
  zipFilePath: string;
  changelog: string;
  createdAt: Timestamp;
}

// ============================================
// ORDER TYPES
// ============================================

export type OrderStatus = 'created' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  clientId: string;
  developerId: string;
  projectId: string;
  projectVersion: string;
  ownershipType: OwnershipType;
  amount: number;
  currency: string;
  platformFee: number;
  developerAmount: number;
  paymentProvider: string;
  providerOrderId: string;
  providerPaymentId?: string;
  status: OrderStatus;
  createdAt: Timestamp;
  paidAt?: Timestamp;
}

// ============================================
// PURCHASE TYPES
// ============================================

export interface Purchase {
  id: string;
  orderId: string;
  clientId: string;
  developerId: string;
  projectId: string;
  projectVersion: string;
  downloadEnabled: boolean;
  downloadCount: number;
  invoicePdfPath?: string;
  createdAt: Timestamp;
}

// ============================================
// REVIEW TYPES
// ============================================

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface ProjectReview {
  id: string;
  projectId: string;
  clientId: string;
  developerId: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: Timestamp;
}

// ============================================
// LEGAL TYPES
// ============================================

export interface LegalAcceptance {
  id: string;
  userId: string;
  role: UserRole;
  documentType: string;
  version: string;
  acceptedAt: Timestamp;
}

// ============================================
// DISPUTE TYPES
// ============================================

export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Dispute {
  id: string;
  orderId: string;
  clientId: string;
  developerId: string;
  reason: string;
  evidence: string[];
  status: DisputeStatus;
  createdAt: Timestamp;
  closedAt?: Timestamp;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
}

// ============================================
// PLATFORM SETTINGS
// ============================================

export interface PlatformSettings {
  platformFeePercent: number;
  paymentProviders: {
    razorpay: boolean;
    paypal: boolean;
  };
  maintenanceMode: boolean;
}
