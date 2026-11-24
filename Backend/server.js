const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./config/db");
const { seedDatabase } = require("./utils/seedData");
const { errorHandler } = require("./Middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const machineryRoutes = require("./routes/machinery.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const contactRoutes = require("./routes/contact.routes");
const requestQuotationRoutes = require("./routes/requestQuotation.routes");
const categoryRoutes = require("./routes/category.routes");
const adminRoutes = require("./routes/admin.routes");
const bookSessionRoutes = require("./routes/bookSession.routes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Ensure Static Uploads Folder exists on deploy
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/machinery", machineryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/quotations", requestQuotationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/book-session", bookSessionRoutes);

// Health check endpoint for cloud platforms (Render, Railway, AWS, etc.)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    company: "NEW – National Engineering Works (ApexBake Industrial)",
    message: `B2B Machinery Platform API Server Running on PORT ${process.env.PORT || 3000}`,
  });
});

// Centralized Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (err) {
    console.error("Database initialization warning:", err.message);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
};

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
});

startServer();
