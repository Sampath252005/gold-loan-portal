# Gold Loan Portal

A full-stack lead-intake portal for preliminary gold loan offers. Partners or prospective borrowers can enter gold collateral details, receive a real-time eligibility estimate, choose a loan scheme, and submit an application. A dashboard lists the submitted leads.

## Tech stack

- Frontend: React, Vite, JavaScript, Tailwind CSS, Lucide React
- Backend: Node.js, Express
- Database: Supabase (PostgreSQL)

## Features

- Customer and gold-collateral form with inline validation
- Dynamic pure-gold, market-value, and eligible-loan calculations
- Loan scheme selection with scheme-specific interest and LTV
- Regulatory safeguard that caps applied LTV at 75%
- Mobile-number duplicate prevention within seven days
- HTTP 400 validation errors and HTTP 409 duplicate errors
- Responsive submission confirmation and leads dashboard
- Masked mobile numbers, loading states, empty states, and toast notifications

## Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project containing `loan_schemes` and `leads` tables

## Environment configuration

Create `server/.env`:

```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-role-or-server-key
GOLD_PRICE_PER_GRAM=7000
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Never commit either environment file.

## Run locally

Start the API server in one terminal:

```bash
cd server
npm install
npm run dev
```

Start the React application in another terminal:

```bash
cd client
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

For a production client build:

```bash
cd client
npm run build
npm run preview
```

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/v1/loan-schemes` | Returns available loan schemes. |
| POST | `/api/v1/leads/submit` | Validates and creates a loan lead. |
| GET | `/api/v1/leads` | Returns submitted leads with their selected plans. |

### Submit example

```json
{
  "customerName": "Rahul Sharma",
  "mobileNumber": "9876543210",
  "grossWeightGrams": 50,
  "netWeightGrams": 45,
  "purityKarat": 22,
  "selectedPlanId": "PLAN_BULLET_01"
}
```

## Business rules

- Mobile number must contain exactly 10 digits.
- Gross and net weights must be positive.
- Net weight cannot be greater than gross weight.
- Valid purities are 18K, 22K, and 24K.
- Pure gold weight is calculated as `net weight × (karat / 24)`.
- The applied LTV is capped at 75%, even if a database scheme has a higher value.
- The same mobile number cannot submit another application within seven days.

## Project structure

```text
client/                 React + Vite application
  services/             API client and endpoint functions
  src/components/       Reusable form, calculator, feedback, and layout UI
  src/pages/            Application and dashboard pages
  src/utils/            Client validation and calculation helpers
server/                 Express API
  controllers/          Request validation and business logic
  routes/               REST endpoint definitions
  services/             Supabase/PostgreSQL data access
  utils/                Server-side financial calculation helpers
```

## Verification

```bash
cd client
npm run lint
npm run build
```
