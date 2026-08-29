import dotenv from "dotenv/config";
import app from "./app.js";
import loanSchemeRoutes from "./routes/loanScheme.routes.js";
import leadRoutes from "./routes/lead.routes.js";

const PORT = process.env.PORT || 5000;

app.use("/api/v1/loan-schemes", loanSchemeRoutes);
app.use("/api/v1/leads", leadRoutes);   

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
