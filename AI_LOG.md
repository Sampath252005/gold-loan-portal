# AI Assistance Log

## AI Tool Used

* **OpenAI Codex** — used as an AI-assisted coding partner for UI implementation, code review, validation review, documentation, and code auditing.

## AI-Assisted Work

AI assistance was used to support development and review. All generated suggestions were reviewed before being incorporated into the project.

### Form State and Client-Side Validation

**Prompt used:**

> Build React form state management for a gold loan application with customerName, mobileNumber, grossWeightGrams, netWeightGrams, purityKarat, and selectedPlanId. Add inline client validation for a 10-digit mobile number, positive weights, net weight not exceeding gross weight, valid 18K/22K/24K purity, and a required scheme selection. Keep the backend API contract unchanged.

### Backend Validation and Financial Rules

**Prompt used:**

> Review the Express POST /api/v1/leads/submit validation for missing fields, a 10-digit mobile number, positive gross and net weights, net weight less than or equal to gross weight, valid karat purity, duplicate mobile applications in the last seven days, and an LTV cap that must never exceed 75%.

## Manual Review and Correction

### Issue Identified

During manual review of the backend calculation logic, it was identified that the application passed `loanScheme.max_ltv` directly to the loan calculator.

This could allow the calculated loan amount to exceed the required **75% LTV ceiling** if a loan scheme in the database were configured with an LTV value greater than 75.

### Correction Applied

The lead controller was updated to validate that the configured scheme LTV is a valid, positive, finite number.

The LTV used for the final calculation is capped at 75%:

```js
const appliedLtv = Math.min(schemeLtv, 75);
```

The capped value is then used in the loan calculation.

The frontend calculator also applies the same cap for consistency in the displayed estimate. However, the backend remains the authoritative validation layer to ensure that the final loan amount never exceeds the 75% LTV limit.

## Verification Performed

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

## Summary

AI was used as a development and review assistant. The generated suggestions were manually reviewed, and an issue related to the LTV calculation was identified and corrected before final verification.

The final implementation was checked to ensure that the backend enforces the 75% LTV limit as the authoritative safeguard.



## Testing Tools Used

### Postman

* **Postman** was used for manual API testing and verification.

* The following backend endpoints were tested:

  * `GET /api/v1/loan-schemes`
  * `POST /api/v1/leads/submit`
  * `GET /api/v1/leads`

* API responses and HTTP status codes were manually verified.

* Validation scenarios were also tested, including:

  * Invalid mobile numbers
  * Invalid weight values
  * Net weight exceeding gross weight
  * Invalid purity values
  * Invalid loan scheme selection
  * Duplicate applications within the seven-day restriction period

Postman was used solely for API testing and verification and was not used to generate application code.
