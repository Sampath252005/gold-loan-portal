import { getAllLoanSchemes } from "../services/loanScheme.service.js";

export const getLoanSchemes = async (req, res) => {
  try {
    const schemes = await getAllLoanSchemes();
    const goldPricePerGram = Number(process.env.GOLD_PRICE_PER_GRAM);

    if (!Number.isFinite(goldPricePerGram) || goldPricePerGram <= 0) {
      return res.status(500).json({
        success: false,
        message: "Gold price is not configured correctly",
      });
    }

    return res.status(200).json({
      success: true,
      data: schemes,
      goldPricePerGram,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
