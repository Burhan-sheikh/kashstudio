# KashStudio

> **Digital Application Marketplace** - A curated platform for production-ready software products

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## Overview

KashStudio eliminates freelancing chaos by providing a structured marketplace where:

✅ **Fixed Scope** - No scope creep
✅ **Fixed Pricing** - Transparent costs
✅ **Instant Delivery** - Immediate downloads
✅ **Legal Protection** - Recorded ownership
✅ **Audit Trails** - Complete transaction history

### This is Software Commerce, Not Services

- **No bidding wars**
- **No outsourcing confusion**
- **No project management overhead**

Just browse → buy → download → own.

---

## System Architecture

```
┌─────────────┐
│   Next.js   │  ← Frontend (SSR/SSG)
│   Frontend  │
└──────┬──────┘
       │
       ├──────────────────────────┐
       │                          │
┌──────▼──────┐          ┌────────▼────────┐
│  Firestore  │          │ Cloud Functions │
│  Database   │          │   (API Layer)   │
└─────────────┘          └─────────────────┘
       │                          │
       └──────────┬───────────────┘
                  │
         ┌────────▼─────────┐
         │ Firebase Storage │
         │  (File Hosting)  │
         └──────────────────┘
```

**Tech Stack:**
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Firebase Cloud Functions
- **Database:** Firestore (NoSQL)
- **Storage:** Firebase Storage
- **Auth:** Firebase Authentication
- **Payments:** Provider Abstraction (Razorpay/PayPal)
- **Hosting:** Netlify

---

## User Roles

| Role | Access Level | Capabilities |
|------|--------------|-------------|
| **Admin** | Full System | Governance, moderation, compliance |
| **Developer** | Seller | Upload & sell production-ready apps |
| **Client** | Buyer | Purchase & download with legal rights |
| **Guest** | Public | Browse catalog (read-only) |

---

## Database Schema

### Core Collections

#### 1. Users (Root Identity)
```typescript
users/{uid} {
  role: "admin" | "developer" | "client"
  username: string
  email: string
  phone?: string
  photoURL?: string
  emailVerified: boolean
  isActive: boolean
  createdAt: Timestamp
  lastLoginAt: Timestamp
}
```

#### 2. Developers
```typescript
developers/{uid} {
  userId: string
  identityType: "individual" | "company"
  displayName: string
  supportEmail: string
  portfolioUrl?: string
  demoProjectUrl?: string
  status: "pending" | "approved" | "rejected" | "suspended"
  payoutMethod: "bank" | "upi"
  payoutDetails: object
  totalSales: number
  totalRevenue: number
  createdAt: Timestamp
  approvedAt?: Timestamp
}
```

#### 3. Projects (Main Catalog)
```typescript
projects/{projectId} {
  developerId: string
  title: string
  slug: string
  category: string
  platform: "web" | "android" | "ios"
  price: number
  currency: string
  ownershipType: "licensed" | "full"
  status: "draft" | "pending" | "approved" | "sold" | "hidden"
  previewUrl?: string
  images: string[]
  features: string[]
  techStack: string[]
  shortDescription: string
  fullDescription: string
  scope: string
  totalSales: number
  averageRating: number
  totalReviews: number
  currentVersion: string
  createdAt: Timestamp
  approvedAt?: Timestamp
  soldAt?: Timestamp
}
```

#### 4. Orders (Immutable Financial Record)
```typescript
orders/{orderId} {
  clientId: string
  developerId: string
  projectId: string
  projectVersion: string
  ownershipType: "licensed" | "full"
  amount: number
  currency: string
  platformFee: number
  developerAmount: number
  paymentProvider: string
  providerOrderId: string
  providerPaymentId?: string
  status: "created" | "paid" | "failed" | "refunded"
  createdAt: Timestamp
  paidAt?: Timestamp
}
```

#### 5. Purchases (Download Authority)
```typescript
purchases/{purchaseId} {
  orderId: string
  clientId: string
  developerId: string
  projectId: string
  projectVersion: string
  downloadEnabled: boolean
  downloadCount: number
  invoicePdfPath?: string
  createdAt: Timestamp
}
```

[View Complete Schema →](./docs/DATABASE_SCHEMA.md)

---

## Features

### 🛍️ Storefront (Public)
- Browse approved catalog
- Advanced search & filters
- Product details with demo/preview
- Developer profiles
- Rating & review system

### 👨‍💼 Client Dashboard
- Purchase history
- Secure downloads (signed URLs)
- Invoice management
- Legal document records
- Review purchased products

### 👨‍💻 Developer Portal
- Project management
- Version control system
- Sales analytics & earnings
- Payout management
- Performance metrics

### 🛡️ Admin Panel
- User governance
- Developer verification
- Project moderation
- Financial oversight
- Dispute resolution
- Legal document management

---

## Security Principles

- ✅ **Role-Based Access Control** - Firestore security rules
- ✅ **No Direct Storage Access** - All downloads via Cloud Functions
- ✅ **Server-Side Verification** - Payment webhooks validated
- ✅ **Immutable Financial Records** - Orders cannot be modified
- ✅ **Admin Action Logging** - Complete audit trails
- ✅ **Rate-Limited Downloads** - Prevent abuse

---

## Payment Architecture

```
Client Payment
     │
     ├─→ Platform Fee (X%)
     └─→ Developer Amount (100-X%)
```

**Principles:**
- Server verification mandatory
- Webhook logging for all transactions
- Immutable financial history
- Automatic revenue split
- No manual financial editing

---

## Project Structure

```
kashstudio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages
│   │   ├── (storefront)/      # Public marketplace
│   │   ├── admin/             # Admin panel
│   │   ├── client/            # Client dashboard
│   │   ├── developer/         # Developer portal
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # UI primitives
│   │   ├── layout/           # Layout components
│   │   └── features/         # Feature-specific
│   ├── lib/                   # Core utilities
│   │   ├── firebase/         # Firebase config
│   │   ├── auth/             # Auth helpers
│   │   └── utils/            # Shared utilities
│   └── types/                 # TypeScript types
├── functions/                 # Cloud Functions
│   ├── src/
│   │   ├── payments/         # Payment processing
│   │   ├── downloads/        # Secure downloads
│   │   ├── notifications/    # Email/push notifications
│   │   └── webhooks/         # Payment webhooks
│   └── package.json
├── firestore.rules            # Security rules
├── storage.rules              # Storage security
├── firebase.json              # Firebase config
└── docs/                      # Documentation
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI
- Firebase project

### Installation

```bash
# Clone repository
git clone https://github.com/Burhan-sheikh/kashstudio.git
cd kashstudio

# Install dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..

# Set up environment variables
cp .env.example .env.local

# Configure Firebase
firebase login
firebase use --add
```

### Environment Variables

Create `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Payment Providers
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=

# Platform Settings
NEXT_PUBLIC_PLATFORM_FEE_PERCENT=15
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
# Run Next.js dev server
npm run dev

# Run Firebase emulators
firebase emulators:start

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Cloud Functions
firebase deploy --only functions
```

---

## Deployment

### Netlify (Frontend)

```bash
# Build production
npm run build

# Deploy
npm run deploy
```

**Netlify Configuration:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18

### Firebase (Backend)

```bash
# Deploy all
firebase deploy

# Deploy specific services
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
firebase deploy --only functions
```

---

## Scale-Ready Architecture

The database schema supports future features **without restructuring:**

- ✅ Subscription models
- ✅ Version upgrades
- ✅ Support contracts
- ✅ API licensing
- ✅ Enterprise procurement
- ✅ White-label solutions

---

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md).

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Support

- 📧 Email: support@kashstudio.com
- 📖 Documentation: [docs.kashstudio.com](https://docs.kashstudio.com)
- 🐛 Issues: [GitHub Issues](https://github.com/Burhan-sheikh/kashstudio/issues)

---

## Roadmap

### Phase 1: MVP (Current)
- [x] Core marketplace functionality
- [x] User authentication & roles
- [x] Project listing & catalog
- [x] Payment integration
- [x] Secure downloads

### Phase 2: Enhancement
- [ ] Mobile apps (React Native)
- [ ] Advanced analytics
- [ ] Subscription tiers
- [ ] API marketplace
- [ ] Developer verification badges

### Phase 3: Scale
- [ ] Multi-currency support
- [ ] International payments
- [ ] Enterprise features
- [ ] White-label solutions
- [ ] Affiliate program

---

**Built with ❤️ in Kashmir** | [KashStudio](https://kashstudio.com)
