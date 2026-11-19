import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0b1524] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Company Brand & Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded">
                <img
                  src="/images/logo.png"
                  alt="NEW National Engineering Works"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <div className="text-white font-extrabold tracking-wider text-base leading-tight">
                  APEXBAKE <span className="text-[#d97706]">• NEW</span>
                </div>
                <div className="text-[10px] font-mono-tech text-slate-400 tracking-widest uppercase">
                  HEAVY MACHINERY MANUFACTURING
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-[13px] leading-relaxed">
              Engineered durability, continuous high-throughput thermal processing, and robotic automated batch handling for commercial industrial bakeries globally.
            </p>

            <div className="space-y-2.5 text-xs font-mono-tech text-slate-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <span>rfq@apexbake-industrial.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <span>
                  Advanced Production Plant: 4800 Industrial Parkway, Sector 9, Chicago, IL 60638
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                <span>ASME Sec VIII, CE Marking, EHEDG Hygienic Compliant</span>
              </div>
            </div>
          </div>

          {/* Column 2: Machinery Systems */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-mono-tech text-sm font-semibold tracking-wider uppercase">
              MACHINERY
              <br />
              SYSTEMS
            </h4>
            <ul className="space-y-2.5 text-[13px] text-slate-400">
              <li>
                <Link to="/products?category=Mixing+Machines" className="hover:text-white transition-colors">
                  Continuous Mixing Units
                </Link>
              </li>
              <li>
                <Link to="/products?category=Dough+Processing" className="hover:text-white transition-colors">
                  Automated Dough Processing
                </Link>
              </li>
              <li>
                <Link to="/products?category=Slicing+Systems" className="hover:text-white transition-colors">
                  High-Speed Slicing Systems
                </Link>
              </li>
              <li>
                <Link to="/solutions/upgrade-scale" className="hover:text-white transition-colors">
                  Multi-Deck Tunnel Ovens
                </Link>
              </li>
              <li>
                <Link to="/products?category=Baking+Support" className="hover:text-white transition-colors">
                  Precision Proofer Chambers
                </Link>
              </li>
              <li>
                <Link to="/solutions/find-machinery" className="hover:text-white transition-colors">
                  Cooling Spiral Conveyors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Technical Resources */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-mono-tech text-sm font-semibold tracking-wider uppercase">
              TECHNICAL
              <br />
              RESOURCES
            </h4>
            <ul className="space-y-2.5 text-[13px] text-slate-400">
              <li>
                <Link to="/insights" className="hover:text-white transition-colors">
                  CAD & BIM Models Download
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-white transition-colors">
                  Plant Integration Blueprints
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-white transition-colors">
                  Sanitary Cleaning SOPs
                </Link>
              </li>
              <li>
                <Link to="/solutions/start-your-business" className="hover:text-white transition-colors">
                  Throughput Capacity Calculators
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-white transition-colors">
                  Preventative Maintenance Logs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Custom Line Design Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Hubs */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-mono-tech text-sm font-semibold tracking-wider uppercase">
              GLOBAL HUBS
            </h4>
            <div className="space-y-4 text-xs font-mono-tech">
              <div>
                <div className="text-white font-semibold">North America HQ</div>
                <div className="text-slate-400 mt-0.5">
                  Chicago, IL • +1 (800) 492-7325
                </div>
              </div>
              <div>
                <div className="text-white font-semibold">EMEA Regional Hub</div>
                <div className="text-slate-400 mt-0.5">
                  Frankfurt, Germany • +49 69 900 120
                </div>
              </div>
              <div>
                <div className="text-white font-semibold">APAC Logistics Center</div>
                <div className="text-slate-400 mt-0.5">
                  Singapore • +65 6712 8800
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 NEW – National Engineering Works & ApexBake Industrial Machinery Corporation. All engineering rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono-tech">
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              Terms of Industrial Supply
            </Link>
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              Hygienic Certifications
            </Link>
            <Link to="/products" className="hover:text-slate-300 transition-colors">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
