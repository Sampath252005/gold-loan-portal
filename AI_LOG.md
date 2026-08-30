# AI Assistance Log

## AI Tools Used

### ChatGPT

**ChatGPT** was used as a learning and development assistant during the planning and implementation of the project.

It was used for:

* Understanding the assignment requirements.
* Planning the overall project structure.
* Designing the backend folder structure using the Controller → Service → Routes architecture.
* Understanding how to configure Supabase with the backend.
* Receiving step-by-step guidance for building and testing backend APIs.
* Understanding validation and error-handling approaches.
* Discussing frontend component structure and application flow.

### OpenAI Codex

**OpenAI Codex** was used as an AI-assisted coding partner for:

* UI implementation and improvement.
* Code review.
* Validation review.
* Documentation.
* Code auditing.

AI-generated suggestions were reviewed before being incorporated into the project.

---

# Project Structure and Architecture

ChatGPT was used to help plan the initial project folder structure.

The backend follows a layered architecture:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Supabase Database
```

The backend structure was organized into separate folders for:

* `config` — Supabase configuration.
* `controllers` — Request handling and HTTP responses.
* `services` — Database operations and business-related logic.
* `routes` — API endpoint definitions.
* `utils` — Reusable calculation utilities.

The frontend was organized using reusable React components, pages, services, and utility functions.

---

# Backend API Development

ChatGPT was used for step-by-step guidance while implementing the backend APIs. The APIs were developed manually using Node.js, Express, JavaScript, and Supabase.

The backend implementation followed the Controller → Service → Routes architecture.

## Loan Scheme API

The following endpoint was implemented:

```text
GET /api/v1/loan-schemes
```

This API retrieves the available loan schemes from the Supabase database.

The request flow is:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Supabase Database
```

---

## Lead Submission API

The following endpoint was implemented:

```text
POST /api/v1/leads/submit
```

The backend processes the submitted application by:

1. Receiving customer and gold details.
2. Validating required fields.
3. Validating the mobile number format.
4. Validating gross and net weight values.
5. Ensuring net weight does not exceed gross weight.
6. Validating the gold purity.
7. Checking whether the selected loan scheme exists.
8. Checking for duplicate applications using the same mobile number within the last seven days.
9. Calculating the pure gold weight.
10. Calculating the eligible loan amount.
11. Applying the maximum LTV limit.
12. Saving the valid application to the Supabase database with a `SUBMITTED` status.

---

## Get Leads API

The following endpoint was implemented:

```text
GET /api/v1/leads
```

This API retrieves submitted loan applications from the database for display in the leads dashboard.

---

# AI-Assisted Work

## Form State and Client-Side Validation

**Prompt used with OpenAI Codex:**

> Build React form state management for a gold loan application with customerName, mobileNumber, grossWeightGrams, netWeightGrams, purityKarat, and selectedPlanId. Add inline client validation for a 10-digit mobile number, positive weights, net weight not exceeding gross weight, valid 18K/22K/24K purity, and a required scheme selection. Keep the backend API contract unchanged.

---

## Backend Validation and Financial Rules

**Prompt used with OpenAI Codex:**

> Review the Express POST /api/v1/leads/submit validation for missing fields, a 10-digit mobile number, positive gross and net weights, net weight less than or equal to gross weight, valid karat purity, duplicate mobile applications in the last seven days, and an LTV cap that must never exceed 75%.

---

# Manual Review and Correction

## Issue Identified

During manual review of the backend calculation logic, it was identified that the application passed `loanScheme.max_ltv` directly to the loan calculator.

This could allow the calculated loan amount to exceed the required **75% LTV ceiling** if a loan scheme in the database were configured with an LTV value greater than 75.

## Correction Applied

The lead controller was updated to validate that the configured scheme LTV is a valid, positive, finite number.

The LTV used for the final calculation is capped at 75%:

```js
const appliedLtv = Math.min(schemeLtv, 75);
```

The capped value is then used in the loan calculation.

The frontend calculator also applies the same cap for consistency in the displayed estimate. However, the backend remains the authoritative validation layer to ensure that the final loan amount never exceeds the 75% LTV limit.

---

# Verification Performed

After implementing the changes, the following checks were performed:

```bash
cd server
node --check controllers/lead.controller.js

cd ../client
npm run lint
npm run build
```

These checks were used to verify:

* JavaScript syntax in the updated backend controller.
* Code quality and linting in the frontend application.
* Successful production build of the client application.

---

# Testing Tools Used

## Postman

**Postman** was used for manual API testing and verification.

The following backend endpoints were tested:

* `GET /api/v1/loan-schemes`
* `POST /api/v1/leads/submit`
* `GET /api/v1/leads`

API responses and HTTP status codes were manually verified.

Validation scenarios were also tested, including:

* Invalid mobile numbers.
* Invalid weight values.
* Net weight exceeding gross weight.
* Invalid purity values.
* Invalid loan scheme selection.
* Duplicate applications within the seven-day restriction period.

Postman was used solely for API testing and verification and was not used to generate application code.

---

# Summary

AI tools were used as development and learning assistants throughout the project.

ChatGPT was used primarily for understanding the requirements, planning the project structure, learning the Controller → Service → Routes architecture, and receiving guidance while building the backend APIs.

OpenAI Codex was used primarily for UI implementation, validation review, code auditing, and documentation support.

All AI-generated suggestions were reviewed before being incorporated into the project. A potential issue related to the LTV calculation was identified during review and manually corrected.

The backend implementation was manually tested using Postman, and additional syntax, linting, and production build checks were performed before final submission.
