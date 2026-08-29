import { getAllLoanSchemes } from "../services/loanScheme.service.js";

export const getLoanSchemes = async (req, res) => {
  try {
    const schemes = await getAllLoanSchemes();

    return res.status(200).json({
      success: true,
      data: schemes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};