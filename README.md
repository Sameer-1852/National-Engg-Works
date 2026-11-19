# NEW – National Engineering Works (ApexBake Industrial) | Full-Stack B2B Platform

A modern, responsive, production-ready B2B industrial bakery machinery platform built for **NEW – National Engineering Works (ApexBake Industrial)**.

---

## Architecture & Tech Stack

### Frontend (`/Frontend`)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend (`/Backend`)
- **Runtime & Server**: Node.js, Express.js
- **Database**: MongoDB Atlas & Mongoose ODM
- **File Uploads**: Multer (`/uploads`)
- **Architecture**: MVC (`config/`, `controllers/`, `models/`, `routes/`, `middleware/`, `utils/`)

---

## Implemented Pages & Modules

1. **Home Page (`/`)**
   - Top industrial utility bar (`ISO 9001:2015 CERTIFIED FACILITY`, `GLOBAL DESK`, `WHATSAPP DISPATCH`, `ADMIN`)
   - Hero section with `NEW – National Engineering Works` logo, CTAs, and sanitary/HMI architecture callouts
   - 30+ Years / 45+ Countries / 1,200+ Bakeries / 24/7 Support metrics bar
   - 3 Growth-Stage Solution cards (`Start Your Business`, `Find Your Exact Machinery`, `Upgrade & Scale Up Operations`)
   - Turnkey OEM & Industrial Systems showcase
   - 6 Commercial & Industrial Production Machinery cards linked to MongoDB
   - Industrial Advantage & 5 Sector Applications cards
   - Quick RFQ / Specification Form persisted to MongoDB (`POST /api/enquiries`)

2. **Products & Machinery Catalog (`/products`)**
   - Full 9-unit machinery catalog (`AB-SM250S`, `AB-SM130`, `AB-PM80`, `AB-KM100`, `AB-DS650`, `AB-BS450`, `AB-TS300`, `AB-PF24`, `AB-FS500`)
   - Live search by model/name, Equipment Category filters, Capacity Rating checkboxes, Sanitary Alloy checkboxes, and Drive Transmission checkboxes

3. **Machinery Detail Page (`/products/:id`)**
   - Interactive 4-thumbnail gallery + main machinery view
   - 2x2 Key Specs grid, feature pills, and Enterprise Pricing Tier box
   - 11-row Detailed Technical Information specification table
   - Thermal Friction Mitigation & Certified Industrial Applications
   - Direct Manufacturer RFQ split form saving directly to MongoDB
   - Complementary Industrial Machinery recommendations

4. **Request Machinery Quotation Popup Modal**
   - Accessible from the header `REQUEST A QUOTE (RFQ)` button, Hero CTA, or Machinery Detail page
   - Captures `Full Name / Plant Manager`, `Mobile Number`, and `Email Address` directly into MongoDB

5. **Start Your Business (`/solutions/start-your-business`)**
   - 3 Critical Pillars of a Commercial Bakery Launch
   - 4 Commercial Startup Profiles & Machinery Suites (`Profile A` – `Profile D`) with one-click consultation brief population
   - Interactive **Quick Bakery Utility Sizing Calculator** (dynamically computes 3-phase kW/Amp load, core units, oven, and mixer sizing)
   - Venture Sizing & Advisory Intake form connected to MongoDB

6. **Find Your Exact Machinery (`/solutions/find-machinery`)**
   - Interactive Equipment Matching Matrix with category tabs and 3 specification filter dropdowns
   - Formulation Viscosity vs. Machinery Specification Matrix table
   - Collapsible Sizing & Integration FAQ accordion

7. **Upgrade Machinery & Scale Production (`/solutions/upgrade-scale`)**
   - SCADA Telemetry Benchmark hero (`10,000+ kg/hr`)
   - 4 Targeted Machinery Retrofit Pathways comparing `Current Bottleneck` vs `ApexBake Upgrade`
   - 4-Step Zero-Downtime Scaling Framework
   - Guaranteed Buy-Back & Trade-In Program with value brackets

8. **Insights & Resources (`/insights`)**
   - Searchable & filterable Engineering & Operations Archive
   - Featured Technical Guide (`SPEC-ID: APX-710`) with modal reader
   - Technical Documentation & CAD/BIM Blueprint downloads
   - Monthly Technical Bulletin subscription connected to MongoDB

9. **About Us (`/about`)**
   - Corporate heritage since 1994, CNC & PLC origin bento grid, Primary Mission & Future Horizon
   - Five Core Pillars of ApexBake & 4 Manufacturing Campus Bays (`Bay A` – `Bay D`) with 4-step FAT protocol

10. **Contact Us (`/contact`)**
    - Direct Engineering & Operational Inquiry form with 5 engineering discipline radio selectors
    - 24/7 Breakdown Hotline (`PRIORITY P1`) & OEM Parts Express Dispatch
    - Worldwide Facilities (`Chicago`, `Frankfurt`, `Singapore`) & Campus Blueprint Map

11. **Admin Dashboard (`/admin`)**
    - Directly accessible without a login wall (per project requirements: no Login Page and no Payment Gateway)
    - Real-time KPI overview, Enquiry Pipeline status management (`New`, `Pending`, `Contacted`, `In Progress`, `Completed`, `Rejected`), and full CRUD for Machinery Systems and Equipment Categories.

---

## REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/machinery` | List all machinery systems with search & category filters |
| `GET` | `/api/machinery/:id` | Get single machinery details by `_id` or `modelCode` (e.g. `AB-SM250S`) |
| `POST` | `/api/machinery` | Add a new machinery system |
| `PUT` | `/api/machinery/:id` | Update a machinery system |
| `DELETE` | `/api/machinery/:id` | Delete a machinery system |
| `GET` | `/api/products` | List all products |
| `POST` | `/api/products` | Create a new product |
| `GET` | `/api/categories` | List all equipment categories |
| `POST` | `/api/categories` | Create a new category |
| `POST` | `/api/enquiries` | Submit any customer/engineering enquiry or RFQ |
| `GET` | `/api/enquiries` | List all customer enquiries (with status/search filter) |
| `PUT` | `/api/enquiries/:id` | Update enquiry status (`New`, `Pending`, `Contacted`, `In Progress`, `Completed`, `Rejected`) |
| `DELETE` | `/api/enquiries/:id` | Delete an enquiry |
| `GET` | `/api/admin/dashboard` | Fetch aggregated dashboard KPIs and recent enquiries |
| `GET` | `/api/admin/analytics` | Fetch category and enquiry status analytics |

---

## Installation & Running Locally

### 1. Backend Setup
```bash
cd Backend
npm install
node server.js
```
The backend server runs on `http://localhost:3000` and automatically connects to MongoDB and seeds initial machinery, categories, products, and sample enquiries if empty.

### 2. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
The frontend application runs on `http://localhost:5173` (or `http://localhost:5174`).
