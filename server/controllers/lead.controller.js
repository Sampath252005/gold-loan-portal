import {
  findRecentLeadByMobile,
  getLoanSchemeByCode,
  createLead,
  getAllLeads,
} from "../services/lead.service.js";

import { calculateLoanDetails } from "../utils/loanCalculator.js";


// Submit Lead
export const submitLead = async (req, res) => {
  try {
    const {
      customerName,
      mobileNumber,
      grossWeightGrams,
      netWeightGrams,
      purityKarat,
      selectedPlanId,
    } = req.body;


    // 1. Check required fields
    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      !mobileNumber ||
      grossWeightGrams === undefined ||
      netWeightGrams === undefined ||
      !purityKarat ||
      !selectedPlanId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // 2. Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;

    if (typeof mobileNumber !== "string" || !mobileRegex.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must contain exactly 10 digits",
      });
    }


    // Convert values to numbers
    const grossWeight = Number(grossWeightGrams);
    const netWeight = Number(netWeightGrams);
    const purity = Number(purityKarat);


    // 3. Validate weights
    if (
      !Number.isFinite(grossWeight) ||
      !Number.isFinite(netWeight) ||
      grossWeight <= 0 ||
      netWeight <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Weights must be valid positive numbers",
      });
    }

    // Net weight cannot be greater than gross weight
    if (netWeight > grossWeight) {
      return res.status(400).json({
        success: false,
        message: "Net weight cannot be greater than gross weight",
      });
    }


    // 4. Validate purity
    const validPurities = [18, 22, 24];

    if (!validPurities.includes(purity)) {
      return res.status(400).json({
        success: false,
        message: "Purity must be 18K, 22K, or 24K",
      });
    }


    // 5. Check duplicate application
    const existingLeads = await findRecentLeadByMobile(mobileNumber);

    if (existingLeads.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "An application already exists for this mobile number within the last 7 days",
      });
    }


    // 6. Check loan scheme
    const loanScheme = await getLoanSchemeByCode(selectedPlanId);

    if (!loanScheme) {
      return res.status(400).json({
        success: false,
        message: "Invalid loan scheme",
      });
    }

    // Regulatory safeguard: a scheme can offer less than 75% LTV, but never more.
    const schemeLtv = Number(loanScheme.max_ltv);

    if (!Number.isFinite(schemeLtv) || schemeLtv <= 0) {
      return res.status(500).json({
        success: false,
        message: "Loan scheme has an invalid LTV configuration",
      });
    }

    const appliedLtv = Math.min(schemeLtv, 75);


    // 7. Calculate loan details
    const goldPricePerGram = Number(process.env.GOLD_PRICE_PER_GRAM);

    if (!Number.isFinite(goldPricePerGram) || goldPricePerGram <= 0) {
      return res.status(500).json({
        success: false,
        message: "Gold price is not configured correctly",
      });
    }

    const loanDetails = calculateLoanDetails(
      netWeight,
      purity,
      goldPricePerGram,
      appliedLtv
    );


    // 8. Prepare database data
    const leadData = {
      customer_name: customerName.trim(),
      mobile_number: mobileNumber,
      gross_weight_grams: grossWeight,
      net_weight_grams: netWeight,
      purity_karat: purity,
      pure_gold_weight: loanDetails.pureGoldWeight,
      selected_plan_id: selectedPlanId,
      calculated_loan_amount:
        loanDetails.maximumEligibleLoan,
      status: "SUBMITTED",
    };


    // 9. Save lead
    const newLead = await createLead(leadData);


    // 10. Return response
    return res.status(201).json({
      success: true,
      message: "Loan application submitted successfully",
      applicationId: newLead.id,
      data: newLead,
    });

  } catch (error) {
    console.error("Submit lead error:", error);

    // The database trigger is the concurrency-safe final duplicate guard.
    if (error.code === "P0001" && error.message === "RECENT_LEAD_EXISTS") {
      return res.status(409).json({
        success: false,
        message:
          "An application already exists for this mobile number within the last 7 days",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};



// Get All Leads
export const getLeads = async (req, res) => {
  try {
    const leads = await getAllLeads();

    return res.status(200).json({
      success: true,
      data: leads,
    });

  } catch (error) {
    console.error("Get leads error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
