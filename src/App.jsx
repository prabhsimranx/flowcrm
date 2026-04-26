import { useState, useRef } from "react";

import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

import {
  LayoutDashboard, Target, List, Users, Building2,
  Search, BarChart3, Settings, Plus, TrendingUp,
  TrendingDown, DollarSign, Phone, Mail, Calendar,
  X, Bell, ArrowUpRight, Trash2, Globe, SlidersHorizontal,
  ChevronRight, Zap, Star, Filter, CheckCircle2,
  Clock, AlertTriangle, Edit2, Tag, Layers, Briefcase,
  MapPin, Activity, Award, Percent, GripVertical
} from "lucide-react";

// ─────────────────── STYLES ───────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

*{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:#07090f;--s1:#0d1221;--s2:#111928;--s3:#162035;
  --b1:rgba(100,160,255,.09);--b2:rgba(100,160,255,.18);--b3:rgba(100,160,255,.28);
  --a:#4c8fff;--a2:#818cf8;--a3:#06b6d4;
  --ok:#10d9a0;--warn:#f59e0b;--danger:#f43f5e;--purple:#a78bfa;
  --t1:#dde8ff;--t2:#6d8ab5;--t3:#3a5078;
  --font:'Sora',system-ui,sans-serif;--mono:'IBM Plex Mono',monospace;
}

html,body,#root{height:100%;width:100%;overflow:hidden}
body{background:var(--bg);color:var(--t1);font-family:var(--font);font-size:13px}

.shell{display:flex;height:100vh;width:100vw;overflow:hidden}
.sidebar{width:214px;min-width:214px;background:var(--s1);border-right:1px solid var(--b1);display:flex;flex-direction:column}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}

.logo{padding:18px 16px 14px;border-bottom:1px solid var(--b1);display:flex;align-items:center;gap:10px}
.logo-mark{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--a),var(--a2));display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-name{font-size:14px;font-weight:800;color:var(--t1);letter-spacing:-.02em}
.logo-sub{font-size:9px;color:var(--t3);font-weight:600;letter-spacing:.12em;text-transform:uppercase}
.nav{padding:10px 8px;flex:1;overflow-y:auto}
.nav-sect{margin-bottom:18px}
.nav-label{font-size:9.5px;font-weight:700;color:var(--t3);letter-spacing:.12em;text-transform:uppercase;padding:0 10px;margin-bottom:4px}
.ni{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:500;color:var(--t2);transition:all .12s;margin-bottom:2px;user-select:none}
.ni:hover{background:var(--s2);color:var(--t1)}
.ni.on{background:rgba(76,143,255,.13);color:var(--a);font-weight:600}
.ni .nb{margin-left:auto;background:var(--a);color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:20px;font-family:var(--mono)}
.sb-foot{padding:10px 8px;border-top:1px solid var(--b1)}
.u-row{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:8px;cursor:pointer}
.u-row:hover{background:var(--s2)}
.ava{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--a),var(--a2));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0}
.un{font-size:12px;font-weight:700;color:var(--t1)}
.ur{font-size:10px;color:var(--t2)}

.topbar{height:52px;background:var(--s1);border-bottom:1px solid var(--b1);display:flex;align-items:center;padding:0 22px;gap:10px;flex-shrink:0}
.tb-title{font-size:15px;font-weight:800;color:var(--t1);flex:1;letter-spacing:-.02em}
.srch{display:flex;align-items:center;gap:7px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:5px 11px;width:200px}
.srch input{background:none;border:none;outline:none;color:var(--t1);font-size:12px;font-family:var(--font);width:100%}
.srch input::placeholder{color:var(--t3)}
.ib{width:30px;height:30px;border-radius:7px;border:1px solid var(--b1);background:var(--s2);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--t2);transition:all .12s}
.ib:hover{border-color:var(--b2);color:var(--t1)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border-radius:8px;font-size:12px;font-weight:700;font-family:var(--font);cursor:pointer;border:none;transition:all .12s}
.btn-p{background:var(--a);color:#fff}
.btn-p:hover{background:#3d7fe8;transform:translateY(-1px)}
.btn-g{background:var(--s2);border:1px solid var(--b1);color:var(--t2)}
.btn-g:hover{border-color:var(--b2);color:var(--t1)}

.content{flex:1;overflow-y:auto;padding:22px}
.content::-webkit-scrollbar{width:3px}
.content::-webkit-scrollbar-thumb{background:var(--s3);border-radius:2px}

.card{background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:18px}
.card-sm{background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:14px}
.card-t{font-size:11px;font-weight:700;color:var(--t2);letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}

.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}
.stat{background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:16px 18px;position:relative;overflow:hidden}
.stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--ac,var(--a))}
.stat-l{font-size:10.5px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.09em;margin-bottom:6px}
.stat-v{font-size:24px;font-weight:800;color:var(--t1);font-family:var(--mono);letter-spacing:-.02em}
.stat-s{font-size:10.5px;color:var(--t2);margin-top:4px;display:flex;align-items:center;gap:4px}
.stat-bg{position:absolute;right:14px;top:50%;transform:translateY(-50%);opacity:.06}

.kanban{display:flex;gap:12px;overflow-x:auto;height:calc(100vh - 130px);padding-bottom:8px}
.kanban::-webkit-scrollbar{height:3px}
.kanban::-webkit-scrollbar-thumb{background:var(--s3);border-radius:2px}
.k-col{min-width:220px;max-width:220px;background:var(--s1);border:1px solid var(--b1);border-radius:12px;display:flex;flex-direction:column;transition:border-color .15s}
.k-col.over{border-color:var(--a);background:rgba(76,143,255,.04)}
.k-head{padding:12px 12px 8px;border-bottom:1px solid var(--b1);flex-shrink:0}
.k-hn{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.k-title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em}
.k-cnt{font-size:10px;font-weight:700;background:var(--s2);border-radius:20px;padding:2px 7px;color:var(--t2);font-family:var(--mono)}
.k-val{font-size:11px;color:var(--t2);font-family:var(--mono)}
.k-body{padding:8px;flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:7px;min-height:40px}
.k-body::-webkit-scrollbar{width:2px}
.k-body::-webkit-scrollbar-thumb{background:var(--s3)}
.dc{background:var(--s2);border:1px solid var(--b1);border-radius:9px;padding:11px;cursor:grab;transition:all .15s}
.dc:hover{border-color:var(--b2);box-shadow:0 4px 16px rgba(0,0,0,.4);transform:translateY(-1px)}
.dc.drag{opacity:.45;cursor:grabbing}
.dc-name{font-size:12.5px;font-weight:700;color:var(--t1);margin-bottom:2px}
.dc-co{font-size:11px;color:var(--t2);margin-bottom:7px}
.dc-val{font-size:13px;font-weight:700;color:var(--a);font-family:var(--mono);margin-bottom:7px}
.dc-row{display:flex;align-items:center;gap:5px;flex-wrap:wrap}

.chip{font-size:9.5px;font-weight:700;padding:2px 7px;border-radius:20px;background:var(--s3);color:var(--t2)}
.chip.hot{background:rgba(244,63,94,.18);color:#fb7185}
.chip.warm{background:rgba(245,158,11,.18);color:#fcd34d}
.chip.cold{background:rgba(76,143,255,.18);color:#93c5fd}
.chip.ind{background:rgba(167,139,250,.18);color:#c4b5fd}
.chip.ok{background:rgba(16,217,160,.18);color:#34d399}

.tbl-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:12.5px}
thead th{text-align:left;padding:9px 13px;font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.09em;border-bottom:1px solid var(--b1)}
tbody tr{border-bottom:1px solid var(--b1);transition:background .1s;cursor:pointer}
tbody tr:hover{background:var(--s2)}
tbody td{padding:11px 13px;color:var(--t2)}
tbody td:first-child{color:var(--t1);font-weight:600}
.s-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:10.5px;font-weight:700}
.s-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}

.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.g2r{display:grid;grid-template-columns:2fr 1fr;gap:14px}

.fg{margin-bottom:18px}
.fl{font-size:11px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}
.tag-flex{display:flex;flex-wrap:wrap;gap:7px}
.ftag{padding:5px 13px;border-radius:20px;font-size:11.5px;font-weight:600;border:1px solid var(--b1);background:var(--s2);color:var(--t2);cursor:pointer;transition:all .12s;user-select:none}
.ftag:hover{border-color:var(--b2);color:var(--t1)}
.ftag.sel{background:rgba(76,143,255,.18);border-color:var(--a);color:var(--a)}
.prospect{background:var(--s2);border:1px solid var(--b1);border-radius:10px;padding:14px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:all .12s}
.prospect:hover{border-color:var(--b2);transform:translateX(2px)}
.co-ico{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;flex-shrink:0;color:#fff}
.prospect-name{font-size:13px;font-weight:700;color:var(--t1)}
.prospect-meta{font-size:11px;color:var(--t2);margin-top:2px}
.prospect-tags{display:flex;gap:5px;margin-top:6px;flex-wrap:wrap}
.match-score{margin-left:auto;text-align:right;flex-shrink:0}
.ms-val{font-size:18px;font-weight:800;font-family:var(--mono)}
.ms-l{font-size:10px;color:var(--t2)}

.cc{background:var(--s1);border:1px solid var(--b1);border-radius:11px;padding:14px;display:flex;align-items:center;gap:12px;transition:all .12s}
.cc:hover{border-color:var(--b2)}
.ca{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0}
.cn1{font-size:13.5px;font-weight:700;color:var(--t1)}
.cn2{font-size:11px;color:var(--t2);margin-top:1px}
.cm{margin-left:auto;text-align:right}
.cm .cv{font-size:12.5px;font-weight:700;color:var(--a);font-family:var(--mono)}
.cm .cd{font-size:10.5px;color:var(--t2)}

.pbar{height:4px;background:var(--s3);border-radius:2px;overflow:hidden;margin-top:5px}
.pfill{height:100%;border-radius:2px;background:var(--a)}

.mb{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(6px)}
.modal{background:var(--s1);border:1px solid var(--b2);border-radius:14px;padding:22px;width:480px;max-height:85vh;overflow-y:auto}
.modal::-webkit-scrollbar{width:3px}
.modal::-webkit-scrollbar-thumb{background:var(--s3)}
.mt{font-size:16px;font-weight:800;color:var(--t1);margin-bottom:18px;letter-spacing:-.02em}
.fr{margin-bottom:12px}
.fl2{font-size:11px;font-weight:700;color:var(--t2);margin-bottom:5px;display:block}
.fi{width:100%;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:8px 11px;color:var(--t1);font-size:12.5px;font-family:var(--font);outline:none;transition:border-color .12s}
.fi:focus{border-color:var(--a)}
.fi-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}

.recharts-tooltip-wrapper{font-family:var(--font)!important}
.recharts-default-tooltip{background:var(--s2)!important;border:1px solid var(--b2)!important;border-radius:8px!important;font-size:12px!important}
.recharts-tooltip-label{color:var(--t1)!important;font-weight:700!important}

@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fi .22s ease}
@keyframes pp{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
.pop{animation:pp .18s ease}

.act-item{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--b1)}
.act-item:last-child{border-bottom:none}
.act-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:5px}
.act-text{font-size:12px;color:var(--t2);line-height:1.5}
.act-text b{color:var(--t1);font-weight:600}
.act-time{font-size:10.5px;color:var(--t3);margin-top:2px}
`;

// ─────────────────── CONSTANTS ───────────────────
const STAGES = ["Lead", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];
const STAGE_COLORS = {
  Lead: "#64748b", Qualified: "#818cf8", Proposal: "#f59e0b",
  Negotiation: "#f97316", Won: "#10d9a0", Lost: "#f43f5e",
};
const INDUSTRIES = ["SaaS", "FinTech", "HealthTech", "E-Commerce", "Manufacturing", "Retail", "Media", "Real Estate", "Education", "Logistics", "CleanTech", "Cybersecurity"];
const REVENUE_RANGES = ["< $1M", "$1M–$10M", "$10M–$100M", "$100M+"];
const EMPLOYEE_RANGES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];
const FUNDING_STAGES = ["Bootstrapped", "Seed", "Series A", "Series B", "Series C+", "Public"];
const PRODUCT_TYPES = ["SaaS Platform", "API/Integration", "Consulting", "Managed Services", "Hardware", "Marketplace", "Analytics Tool", "Security Solution"];
const REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa"];
const PALETTE = ["#4c8fff","#818cf8","#10d9a0","#f59e0b","#f43f5e","#06b6d4","#a78bfa","#fb923c"];

// ─────────────────── DATA ───────────────────
const INIT_DEALS = [
  { id:1, title:"Enterprise License", company:"Nexus Corp", contact:"Sarah Chen", value:85000, stage:"Negotiation", industry:"SaaS", employees:"201–1,000", revenue:"$10M–$100M", funding:"Series B", probability:75, daysInStage:12, expectedClose:"2025-03-28", priority:"hot", source:"Referral" },
  { id:2, title:"Annual Subscription", company:"DataFlow AI", contact:"Marcus Williams", value:42000, stage:"Proposal", industry:"FinTech", employees:"51–200", revenue:"$1M–$10M", funding:"Series A", probability:55, daysInStage:7, expectedClose:"2025-04-15", priority:"warm", source:"Cold Outreach" },
  { id:3, title:"Platform Integration", company:"MedSync", contact:"Dr. Priya Patel", value:120000, stage:"Qualified", industry:"HealthTech", employees:"201–1,000", revenue:"$10M–$100M", funding:"Series B", probability:40, daysInStage:3, expectedClose:"2025-05-01", priority:"hot", source:"Event" },
  { id:4, title:"Starter Pack", company:"EcoShop", contact:"James Liu", value:8500, stage:"Lead", industry:"E-Commerce", employees:"1–10", revenue:"< $1M", funding:"Bootstrapped", probability:20, daysInStage:1, expectedClose:"2025-04-30", priority:"cold", source:"Website" },
  { id:5, title:"Growth Bundle", company:"ShipFast", contact:"Elena Rodriguez", value:35000, stage:"Won", industry:"Logistics", employees:"51–200", revenue:"$1M–$10M", funding:"Seed", probability:100, daysInStage:0, expectedClose:"2025-02-20", priority:"warm", source:"Referral" },
  { id:6, title:"Security Audit Suite", company:"VaultSec", contact:"Noah Park", value:65000, stage:"Proposal", industry:"Cybersecurity", employees:"11–50", revenue:"$1M–$10M", funding:"Series A", probability:60, daysInStage:5, expectedClose:"2025-04-10", priority:"hot", source:"LinkedIn" },
  { id:7, title:"Custom Analytics", company:"RetailPlus", contact:"Amy Thompson", value:28000, stage:"Negotiation", industry:"Retail", employees:"201–1,000", revenue:"$10M–$100M", funding:"Bootstrapped", probability:80, daysInStage:8, expectedClose:"2025-03-25", priority:"warm", source:"Referral" },
  { id:8, title:"Data Pipeline Pro", company:"Quantifi", contact:"David Kim", value:95000, stage:"Won", industry:"FinTech", employees:"51–200", revenue:"$10M–$100M", funding:"Series B", probability:100, daysInStage:0, expectedClose:"2025-02-15", priority:"hot", source:"Cold Outreach" },
  { id:9, title:"EdTech Suite", company:"LearnPath", contact:"Sofia Okafor", value:22000, stage:"Lead", industry:"Education", employees:"11–50", revenue:"< $1M", funding:"Seed", probability:15, daysInStage:2, expectedClose:"2025-05-20", priority:"cold", source:"Website" },
  { id:10, title:"Cloud Migration", company:"GreenGrid", contact:"Chris Novak", value:180000, stage:"Qualified", industry:"CleanTech", employees:"201–1,000", revenue:"$100M+", funding:"Series C+", probability:35, daysInStage:6, expectedClose:"2025-06-01", priority:"hot", source:"Partnership" },
  { id:11, title:"Analytics Pro", company:"MediaHub", contact:"Lena Fischer", value:15000, stage:"Lost", industry:"Media", employees:"51–200", revenue:"$1M–$10M", funding:"Bootstrapped", probability:0, daysInStage:0, expectedClose:"2025-02-10", priority:"cold", source:"LinkedIn" },
  { id:12, title:"CRM Integration", company:"BuildRight", contact:"Tom Walsh", value:48000, stage:"Qualified", industry:"Real Estate", employees:"11–50", revenue:"$1M–$10M", funding:"Bootstrapped", probability:40, daysInStage:4, expectedClose:"2025-04-25", priority:"warm", source:"Event" },
  { id:13, title:"Security Monitoring", company:"CyberShield", contact:"Raj Mehta", value:72000, stage:"Lead", industry:"Cybersecurity", employees:"51–200", revenue:"$1M–$10M", funding:"Series A", probability:25, daysInStage:0, expectedClose:"2025-05-15", priority:"warm", source:"Cold Outreach" },
  { id:14, title:"Logistics Platform", company:"FastRoute", contact:"Maria Santos", value:55000, stage:"Proposal", industry:"Logistics", employees:"201–1,000", revenue:"$10M–$100M", funding:"Series B", probability:50, daysInStage:9, expectedClose:"2025-04-20", priority:"warm", source:"Referral" },
];

const CONTACTS = [
  { id:1, name:"Sarah Chen", title:"VP of Sales", company:"Nexus Corp", email:"s.chen@nexuscorp.com", phone:"+1 (415) 555-0192", deals:2, value:95000, lastContact:"2 days ago", score:92, color:"#4c8fff" },
  { id:2, name:"Marcus Williams", title:"CTO", company:"DataFlow AI", email:"m.williams@dataflow.ai", phone:"+1 (512) 555-0847", deals:1, value:42000, lastContact:"1 week ago", score:78, color:"#818cf8" },
  { id:3, name:"Dr. Priya Patel", title:"Chief Medical Officer", company:"MedSync", email:"priya@medsync.io", phone:"+1 (617) 555-0234", deals:1, value:120000, lastContact:"3 days ago", score:88, color:"#10d9a0" },
  { id:4, name:"James Liu", title:"Founder & CEO", company:"EcoShop", email:"james@ecoshop.co", phone:"+1 (347) 555-0561", deals:1, value:8500, lastContact:"5 days ago", score:45, color:"#f59e0b" },
  { id:5, name:"Elena Rodriguez", title:"Head of Operations", company:"ShipFast", email:"e.rod@shipfast.com", phone:"+1 (786) 555-0923", deals:1, value:35000, lastContact:"Today", score:95, color:"#06b6d4" },
  { id:6, name:"Noah Park", title:"CISO", company:"VaultSec", email:"n.park@vaultsec.io", phone:"+1 (650) 555-0478", deals:1, value:65000, lastContact:"Yesterday", score:82, color:"#f43f5e" },
  { id:7, name:"Amy Thompson", title:"Director of Technology", company:"RetailPlus", email:"amy.t@retailplus.com", phone:"+1 (213) 555-0637", deals:1, value:28000, lastContact:"4 days ago", score:71, color:"#a78bfa" },
  { id:8, name:"David Kim", title:"Head of Engineering", company:"Quantifi", email:"d.kim@quantifi.com", phone:"+1 (415) 555-0389", deals:2, value:140000, lastContact:"Today", score:97, color:"#fb923c" },
];

const COMPANIES_DATA = [
  { id:1, name:"Nexus Corp", industry:"SaaS", employees:"201–1,000", revenue:"$10M–$100M", funding:"Series B", website:"nexuscorp.com", contacts:2, openDeals:1, totalValue:85000, location:"San Francisco, CA", color:"#4c8fff" },
  { id:2, name:"DataFlow AI", industry:"FinTech", employees:"51–200", revenue:"$1M–$10M", funding:"Series A", website:"dataflow.ai", contacts:1, openDeals:1, totalValue:42000, location:"Austin, TX", color:"#818cf8" },
  { id:3, name:"MedSync", industry:"HealthTech", employees:"201–1,000", revenue:"$10M–$100M", funding:"Series B", website:"medsync.io", contacts:1, openDeals:1, totalValue:120000, location:"Boston, MA", color:"#10d9a0" },
  { id:4, name:"ShipFast", industry:"Logistics", employees:"51–200", revenue:"$1M–$10M", funding:"Seed", website:"shipfast.com", contacts:1, openDeals:0, totalValue:35000, location:"Miami, FL", color:"#f59e0b" },
  { id:5, name:"VaultSec", industry:"Cybersecurity", employees:"11–50", revenue:"$1M–$10M", funding:"Series A", website:"vaultsec.io", contacts:1, openDeals:1, totalValue:65000, location:"New York, NY", color:"#f43f5e" },
  { id:6, name:"Quantifi", industry:"FinTech", employees:"51–200", revenue:"$10M–$100M", funding:"Series B", website:"quantifi.com", contacts:2, openDeals:0, totalValue:95000, location:"Chicago, IL", color:"#06b6d4" },
  { id:7, name:"GreenGrid", industry:"CleanTech", employees:"201–1,000", revenue:"$100M+", funding:"Series C+", website:"greengrid.com", contacts:1, openDeals:1, totalValue:180000, location:"Seattle, WA", color:"#a78bfa" },
  { id:8, name:"RetailPlus", industry:"Retail", employees:"201–1,000", revenue:"$10M–$100M", funding:"Bootstrapped", website:"retailplus.com", contacts:1, openDeals:1, totalValue:28000, location:"Dallas, TX", color:"#fb923c" },
];

const MONTHLY = [
  { m:"Sep", deals:8, value:142, won:3, lost:2 },
  { m:"Oct", deals:11, value:198, won:5, lost:1 },
  { m:"Nov", deals:9, value:165, won:4, lost:3 },
  { m:"Dec", deals:14, value:287, won:7, lost:2 },
  { m:"Jan", deals:12, value:234, won:6, lost:2 },
  { m:"Feb", deals:16, value:318, won:8, lost:1 },
];

const ACTIVITIES = [
  { type:"deal", text:<>New deal <b>Cloud Migration</b> added at <b>GreenGrid</b></>, time:"2 min ago", color:"#4c8fff" },
  { type:"win", text:<><b>Data Pipeline Pro</b> marked as <b>Won</b> — $95,000</>, time:"1 hr ago", color:"#10d9a0" },
  { type:"contact", text:<>New contact <b>Raj Mehta</b> added at CyberShield</>, time:"3 hrs ago", color:"#818cf8" },
  { type:"stage", text:<><b>Enterprise License</b> moved to <b>Negotiation</b></>, time:"5 hrs ago", color:"#f59e0b" },
  { type:"task", text:<>Follow-up scheduled with <b>Dr. Priya Patel</b></>, time:"Yesterday", color:"#a78bfa" },
  { type:"lost", text:<><b>Analytics Pro</b> at MediaHub marked as Lost</>, time:"2 days ago", color:"#f43f5e" },
];

// ─────────────────── HELPERS ───────────────────
const fmt = (n) => n >= 1000000 ? `$${(n/1000000).toFixed(1)}M` : n >= 1000 ? `$${(n/1000).toFixed(0)}K` : `$${n}`;
const initials = (name) => name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();

const StageBadge = ({ stage }) => {
  const c = STAGE_COLORS[stage] || "#64748b";
  return (
    <span className="s-badge" style={{ background: `${c}22`, color: c }}>
      <span className="s-dot" style={{ background: c }} />
      {stage}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111928", border: "1px solid rgba(100,160,255,.2)", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontFamily: "'Sora',sans-serif" }}>
      <div style={{ color: "#dde8ff", fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#6d8ab5" }}>{p.name}: <b style={{ color: "#dde8ff" }}>{p.value}</b></div>
      ))}
    </div>
  );
};

// ─────────────────── SIDEBAR ───────────────────
const Sidebar = ({ view, setView, dealCount }) => {
  const nav = [
    { group: "Overview", items: [
      { id: "dashboard", icon: <LayoutDashboard size={14} />, label: "Dashboard" },
      { id: "analytics", icon: <BarChart3 size={14} />, label: "Analytics" },
    ]},
    { group: "Sales", items: [
      { id: "pipeline", icon: <Layers size={14} />, label: "Pipeline", badge: dealCount },
      { id: "deals", icon: <Briefcase size={14} />, label: "Deals" },
    ]},
    { group: "CRM", items: [
      { id: "contacts", icon: <Users size={14} />, label: "Contacts" },
      { id: "companies", icon: <Building2 size={14} />, label: "Companies" },
    ]},
    { group: "Tools", items: [
      { id: "targets", icon: <Target size={14} />, label: "Target Finder" },
      { id: "settings", icon: <Settings size={14} />, label: "Settings" },
    ]},
  ];
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-mark"><Zap size={15} color="#fff" /></div>
        <div>
          <div className="logo-name">FlowCRM</div>
          <div className="logo-sub">Pipeline OS</div>
        </div>
      </div>
      <nav className="nav">
        {nav.map(g => (
          <div key={g.group} className="nav-sect">
            <div className="nav-label">{g.group}</div>
            {g.items.map(item => (
              <div key={item.id} className={`ni ${view === item.id ? "on" : ""}`} onClick={() => setView(item.id)}>
                {item.icon}
                {item.label}
                {item.badge && <span className="nb">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="u-row">
          <div className="ava">AK</div>
          <div>
            <div className="un">Alex Kumar</div>
            <div className="ur">Sales Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────── TOPBAR ───────────────────
const VIEW_TITLES = {
  dashboard: "Dashboard", analytics: "Analytics", pipeline: "Pipeline Board",
  deals: "All Deals", contacts: "Contacts", companies: "Companies",
  targets: "Target Finder", settings: "Settings",
};

const Topbar = ({ view, search, setSearch, onAdd }) => (
  <div className="topbar">
    <div className="tb-title">{VIEW_TITLES[view]}</div>
    <div className="srch">
      <Search size={13} color="#3a5078" />
      <input placeholder="Search deals, contacts…" value={search} onChange={e => setSearch(e.target.value)} />
    </div>
    <div className="ib"><Bell size={13} /></div>
    <button className="btn btn-p" onClick={onAdd}><Plus size={12} /> Add Deal</button>
  </div>
);

// ─────────────────── DASHBOARD ───────────────────
const Dashboard = ({ deals }) => {
  const open = deals.filter(d => d.stage !== "Won" && d.stage !== "Lost");
  const won = deals.filter(d => d.stage === "Won");
  const totalPipeline = open.reduce((s, d) => s + d.value, 0);
  const wonValue = won.reduce((s, d) => s + d.value, 0);
  const winRate = Math.round(won.length / Math.max(won.length + deals.filter(d => d.stage === "Lost").length, 1) * 100);
  const avgDeal = Math.round(deals.reduce((s, d) => s + d.value, 0) / Math.max(deals.length, 1));
  const stageData = STAGES.filter(s => s !== "Lost").map(s => ({
    stage: s.slice(0, 4),
    count: deals.filter(d => d.stage === s).length,
    value: Math.round(deals.filter(d => d.stage === s).reduce((a, b) => a + b.value, 0) / 1000),
  }));
  const indData = [...new Set(deals.map(d => d.industry))].slice(0, 6).map(ind => ({
    name: ind,
    value: deals.filter(d => d.industry === ind).reduce((s, d) => s + d.value, 0) / 1000,
  })).sort((a, b) => b.value - a.value);
  return (
    <div className="fade">
      <div className="stats-row">
        {[
          { label:"Total Pipeline", value: fmt(totalPipeline), sub: `${open.length} active deals`, color:"#4c8fff", icon:<DollarSign size={42} />, trend:"+12%" },
          { label:"Won This Month", value: fmt(wonValue), sub: `${won.length} deals closed`, color:"#10d9a0", icon:<Award size={42} />, trend:"+8%" },
          { label:"Win Rate", value: `${winRate}%`, sub:"vs 58% last month", color:"#818cf8", icon:<Percent size={42} />, trend:"+5pts" },
          { label:"Avg Deal Size", value: fmt(avgDeal), sub:"across all deals", color:"#f59e0b", icon:<Activity size={42} />, trend:"+3%" },
        ].map((s, i) => (
          <div key={i} className="stat" style={{ "--ac": s.color }}>
            <div className="stat-l">{s.label}</div>
            <div className="stat-v">{s.value}</div>
            <div className="stat-s">
              <TrendingUp size={10} color={s.color} />
              <span style={{ color: s.color, fontWeight: 700 }}>{s.trend}</span>
              <span>{s.sub}</span>
            </div>
            <div className="stat-bg">{s.icon}</div>
          </div>
        ))}
      </div>
      <div className="g2r" style={{ marginBottom: 14 }}>
        <div className="card">
          <div className="card-t">Monthly Performance</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MONTHLY} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4c8fff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4c8fff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10d9a0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10d9a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" tick={{ fill: "#3a5078", fontSize: 10, fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3a5078", fontSize: 10, fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#4c8fff" fill="url(#gv)" strokeWidth={2} name="Value ($K)" />
              <Area type="monotone" dataKey="won" stroke="#10d9a0" fill="url(#gw)" strokeWidth={2} name="Won" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-t">Recent Activity</div>
          {ACTIVITIES.slice(0, 5).map((a, i) => (
            <div key={i} className="act-item">
              <div className="act-dot" style={{ background: a.color }} />
              <div>
                <div className="act-text">{a.text}</div>
                <div className="act-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-t">Pipeline by Stage</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={stageData} margin={{ top: 0, right: 10, left: -30, bottom: 0 }} barSize={28}>
              <XAxis dataKey="stage" tick={{ fill: "#3a5078", fontSize: 10, fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3a5078", fontSize: 10, fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Value ($K)" radius={[4, 4, 0, 0]}>
                {stageData.map((_, i) => (
                  <Cell key={i} fill={Object.values(STAGE_COLORS)[i] || "#4c8fff"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-t">Top Industries</div>
          {indData.map((d, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#dde8ff", fontWeight: 600 }}>{d.name}</span>
                <span style={{ fontSize: 11, color: "#4c8fff", fontFamily: "monospace", fontWeight: 700 }}>${d.value.toFixed(0)}K</span>
              </div>
              <div className="pbar">
                <div className="pfill" style={{ width: `${(d.value / indData[0].value) * 100}%`, background: PALETTE[i % PALETTE.length] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────── PIPELINE ───────────────────
const Pipeline = ({ deals, setDeals }) => {
  const [dragging, setDragging] = useState(null);
  const [over, setOver] = useState(null);
  const onDragStart = (e, deal) => { setDragging(deal); e.dataTransfer.effectAllowed = "move"; };
  const onDragOver = (e, stage) => { e.preventDefault(); setOver(stage); };
  const onDrop = (e, stage) => {
    e.preventDefault();
    if (dragging && dragging.stage !== stage) {
      setDeals(prev => prev.map(d => d.id === dragging.id ? { ...d, stage, daysInStage: 0 } : d));
    }
    setDragging(null); setOver(null);
  };
  const onDragEnd = () => { setDragging(null); setOver(null); };
  return (
    <div className="fade">
      <div style={{ marginBottom: 10, display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#6d8ab5" }}>
          Total Pipeline: <b style={{ color: "#4c8fff", fontFamily: "monospace" }}>
            {fmt(deals.filter(d => d.stage !== "Won" && d.stage !== "Lost").reduce((s, d) => s + d.value, 0))}
          </b>
        </span>
        <span style={{ fontSize: 12, color: "#3a5078" }}>·</span>
        <span style={{ fontSize: 12, color: "#6d8ab5" }}>Drag cards to move between stages</span>
      </div>
      <div className="kanban">
        {STAGES.map(stage => {
          const stagDeals = deals.filter(d => d.stage === stage);
          const stageValue = stagDeals.reduce((s, d) => s + d.value, 0);
          const color = STAGE_COLORS[stage];
          return (
            <div key={stage} className={`k-col ${over === stage ? "over" : ""}`}
              onDragOver={e => onDragOver(e, stage)} onDrop={e => onDrop(e, stage)}>
              <div className="k-head">
                <div className="k-hn">
                  <span className="k-title" style={{ color }}>{stage}</span>
                  <span className="k-cnt">{stagDeals.length}</span>
                </div>
                <div className="k-val">{fmt(stageValue)}</div>
              </div>
              <div className="k-body">
                {stagDeals.map(deal => (
                  <div key={deal.id} className={`dc ${dragging?.id === deal.id ? "drag" : ""}`}
                    draggable onDragStart={e => onDragStart(e, deal)} onDragEnd={onDragEnd}>
                    <div className="dc-name">{deal.title}</div>
                    <div className="dc-co">{deal.company}</div>
                    <div className="dc-val">{fmt(deal.value)}</div>
                    <div className="dc-row">
                      <span className={`chip ${deal.priority}`}>{deal.priority.toUpperCase()}</span>
                      <span className="chip ind">{deal.industry}</span>
                      {deal.daysInStage > 0 && (
                        <span className="chip" style={{ display:"flex", alignItems:"center", gap:3 }}>
                          <Clock size={8} />{deal.daysInStage}d
                        </span>
                      )}
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2, fontSize: 10, color: "#3a5078" }}>
                        <span>Probability</span>
                        <span style={{ color, fontFamily: "monospace", fontWeight: 700 }}>{deal.probability}%</span>
                      </div>
                      <div className="pbar">
                        <div className="pfill" style={{ width: `${deal.probability}%`, background: color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────── DEALS LIST ───────────────────
const Deals = ({ deals, search }) => {
  const [sortCol, setSortCol] = useState("value");
  const [sortDir, setSortDir] = useState(-1);
  const [stageFilter, setStageFilter] = useState("");
  const filtered = deals
    .filter(d => !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.company.toLowerCase().includes(search.toLowerCase()))
    .filter(d => !stageFilter || d.stage === stageFilter)
    .sort((a, b) => (a[sortCol] > b[sortCol] ? 1 : -1) * sortDir);
  const total = filtered.reduce((s, d) => s + d.value, 0);
  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "#6d8ab5", marginRight: 4 }}>Filter:</div>
        {["", ...STAGES].map(s => (
          <button key={s} className={`btn ${stageFilter === s ? "btn-p" : "btn-g"}`} onClick={() => setStageFilter(s)} style={{ padding: "4px 11px", fontSize: 11 }}>
            {s || "All"}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#6d8ab5" }}>
          {filtered.length} deals · <span style={{ color: "#4c8fff", fontFamily: "monospace", fontWeight: 700 }}>{fmt(total)}</span>
        </span>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                {[["title","Deal"],["company","Company"],["value","Value"],["stage","Stage"],["probability","Prob."],["industry","Industry"],["priority","Priority"],["source","Source"],["expectedClose","Close Date"]].map(([k,l]) => (
                  <th key={k} style={{ cursor:"pointer" }} onClick={() => { setSortCol(k); setSortDir(sortCol===k ? -sortDir : -1); }}>
                    {l}{sortCol===k ? (sortDir===-1?"  ↓":"  ↑"):""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td>{d.title}</td>
                  <td>{d.company}</td>
                  <td style={{ color: "#4c8fff", fontFamily: "monospace", fontWeight: 700 }}>{fmt(d.value)}</td>
                  <td><StageBadge stage={d.stage} /></td>
                  <td style={{ fontFamily: "monospace" }}>{d.probability}%</td>
                  <td><span className="chip ind">{d.industry}</span></td>
                  <td><span className={`chip ${d.priority}`}>{d.priority}</span></td>
                  <td>{d.source}</td>
                  <td>{d.expectedClose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─────────────────── CONTACTS ───────────────────
const Contacts = ({ contacts, search }) => {
  const filtered = contacts.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="fade">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map(c => (
          <div key={c.id} className="cc">
            <div className="ca" style={{ background: c.color }}>{initials(c.name)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="cn1">{c.name}</div>
              <div className="cn2">{c.title} · {c.company}</div>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:10.5, color:"#3a5078" }}>
                  <Mail size={10} />{c.email.split("@")[0]}…
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:10.5, color:"#3a5078" }}>
                  <Clock size={10} />{c.lastContact}
                </span>
              </div>
            </div>
            <div className="cm">
              <div className="cv">{fmt(c.value)}</div>
              <div className="cd">{c.deals} deal{c.deals !== 1 ? "s" : ""}</div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: c.color, fontFamily: "monospace" }}>{c.score}</div>
                <div style={{ fontSize: 9.5, color: "#3a5078" }}>score</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────── COMPANIES ───────────────────
const Companies = ({ search }) => {
  const filtered = COMPANIES_DATA.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="fade">
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th><th>Industry</th><th>Employees</th><th>Revenue</th>
                <th>Funding</th><th>Location</th><th>Contacts</th><th>Open Deals</th><th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="co-ico" style={{ width:28,height:28,borderRadius:7,background:c.color,fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0 }}>
                        {c.name[0]}
                      </div>
                      {c.name}
                    </div>
                  </td>
                  <td><span className="chip ind">{c.industry}</span></td>
                  <td>{c.employees}</td>
                  <td>{c.revenue}</td>
                  <td><span className="chip">{c.funding}</span></td>
                  <td style={{ display:"flex",alignItems:"center",gap:4 }}><MapPin size={10} />{c.location}</td>
                  <td style={{ textAlign:"center" }}>{c.contacts}</td>
                  <td style={{ textAlign:"center" }}>{c.openDeals}</td>
                  <td style={{ color:"#4c8fff",fontFamily:"monospace",fontWeight:700 }}>{fmt(c.totalValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─────────────────── TARGET FINDER ───────────────────
const TargetFinder = ({ addDeal }) => {
  const [selIndustries, setSelIndustries] = useState([]);
  const [selRevenue, setSelRevenue] = useState([]);
  const [selEmployees, setSelEmployees] = useState([]);
  const [selFunding, setSelFunding] = useState([]);
  const [selProduct, setSelProduct] = useState([]);
  const [selRegion, setSelRegion] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addedIds, setAddedIds] = useState(new Set());
  const [notification, setNotification] = useState(null);

  const toggle = (setter) => (val) =>
    setter(prev =>
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const prospects = [
    { id:1, name:"Apex Dynamics", industry:"SaaS", employees:"201–1,000", revenue:"$10M–$100M", funding:"Series B", region:"North America", color:"#6366f1", desc:"AI-powered workflow automation, 340 employees", match:94 },
    { id:2, name:"GreenTech Solutions", industry:"CleanTech", employees:"201–1,000", revenue:"$100M+", funding:"Series C+", region:"North America", color:"#06b6d4", desc:"Renewable energy analytics, 600 employees", match:91 },
    { id:3, name:"ShopAI", industry:"E-Commerce", employees:"51–200", revenue:"$1M–$10M", funding:"Series A", region:"North America", color:"#f59e0b", desc:"Personalized shopping AI for D2C brands, 120 employees", match:88 },
    { id:4, name:"MediSync Health", industry:"HealthTech", employees:"51–200", revenue:"$10M–$100M", funding:"Series B", region:"Europe", color:"#10b981", desc:"EHR interoperability middleware, 180 employees", match:86 },
    { id:5, name:"FinFlow Analytics", industry:"FinTech", employees:"201–1,000", revenue:"$10M–$100M", funding:"Series B", region:"North America", color:"#8b5cf6", desc:"Real-time treasury and cash-flow intelligence, 420 employees", match:83 },
    { id:6, name:"LogiSmart", industry:"Logistics", employees:"1,001–5,000", revenue:"$100M+", funding:"Series C+", region:"Asia Pacific", color:"#ef4444", desc:"Predictive freight optimization platform, 2,100 employees", match:79 },
    { id:7, name:"CloudSecure", industry:"Cybersecurity", employees:"51–200", revenue:"$1M–$10M", funding:"Series A", region:"North America", color:"#f97316", desc:"Zero-trust access management for mid-market, 95 employees", match:77 },
    { id:8, name:"EduForge", industry:"EdTech", employees:"11–50", revenue:"<$1M", funding:"Seed", region:"Europe", color:"#14b8a6", desc:"Adaptive learning OS for universities, 38 employees", match:74 },
    { id:9, name:"RetailIQ", industry:"RetailTech", employees:"51–200", revenue:"$10M–$100M", funding:"Series B", region:"North America", color:"#ec4899", desc:"Omnichannel inventory intelligence, 210 employees", match:72 },
    { id:10, name:"AgriPrecision", industry:"AgriTech", employees:"11–50", revenue:"$1M–$10M", funding:"Series A", region:"Asia Pacific", color:"#84cc16", desc:"Drone-based crop analytics for large farms, 45 employees", match:70 },
  ];

  const industries  = [...new Set(prospects.map(p => p.industry))];
  const revenues    = [...new Set(prospects.map(p => p.revenue))];
  const employeeRanges = [...new Set(prospects.map(p => p.employees))];
  const fundings    = [...new Set(prospects.map(p => p.funding))];
  const regions     = [...new Set(prospects.map(p => p.region))];

  const filtered = prospects.filter(p => {
    if (selIndustries.length  && !selIndustries.includes(p.industry))  return false;
    if (selRevenue.length     && !selRevenue.includes(p.revenue))      return false;
    if (selEmployees.length   && !selEmployees.includes(p.employees))  return false;
    if (selFunding.length     && !selFunding.includes(p.funding))      return false;
    if (selRegion.length      && !selRegion.includes(p.region))        return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.industry.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleAddToPipeline = (prospect) => {
    if (!addDeal) return;
    const newDeal = {
      id: Date.now(),
      title: "New Opportunity",
      company: prospect.name,
      contact: "—",
      value: 0,
      stage: "Prospecting",
      industry: prospect.industry,
      employees: prospect.employees,
      revenue: prospect.revenue,
      funding: prospect.funding,
      probability: Math.round(prospect.match * 0.3),
      daysInStage: 0,
      expectedClose: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0],
      priority: "medium",
      notes: prospect.desc,
      nextAction: "Initial outreach",
      nextActionDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
      tags: [prospect.industry],
      health: "good",
    };
    addDeal(newDeal);
    setAddedIds(prev => new Set([...prev, prospect.id]));
    setNotification(prospect.name + " added to pipeline!");
    setTimeout(() => setNotification(null), 3000);
  };

  const FilterChips = ({ label, options, selected, onToggle }) => (
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {options.map(opt => (
          <button key={opt} onClick={() => onToggle(opt)} style={{
            padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:500,cursor:"pointer",border:"1px solid",
            background: selected.includes(opt) ? "#6366f1" : "transparent",
            borderColor: selected.includes(opt) ? "#6366f1" : "#334155",
            color: selected.includes(opt) ? "#fff" : "#94a3b8",
            transition:"all .15s"
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{display:"flex",gap:0,height:"calc(100vh - 56px)",overflow:"hidden"}}>
      {/* Sidebar filters */}
      <div style={{width:260,flexShrink:0,background:"#0f172a",borderRight:"1px solid #1e293b",padding:20,overflowY:"auto"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
          <Target size={16} color="#6366f1"/> Filters
        </div>
        <div style={{marginBottom:16}}>
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search companies..."
            style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}}
          />
        </div>
        <FilterChips label="Industry" options={industries} selected={selIndustries} onToggle={toggle(setSelIndustries)} />
        <FilterChips label="Revenue" options={revenues} selected={selRevenue} onToggle={toggle(setSelRevenue)} />
        <FilterChips label="Employees" options={employeeRanges} selected={selEmployees} onToggle={toggle(setSelEmployees)} />
        <FilterChips label="Funding" options={fundings} selected={selFunding} onToggle={toggle(setSelFunding)} />
        <FilterChips label="Region" options={regions} selected={selRegion} onToggle={toggle(setSelRegion)} />
        {(selIndustries.length||selRevenue.length||selEmployees.length||selFunding.length||selRegion.length||searchTerm) ? (
          <button onClick={() => { setSelIndustries([]); setSelRevenue([]); setSelEmployees([]); setSelFunding([]); setSelRegion([]); setSearchTerm(""); }}
            style={{marginTop:8,padding:"6px 12px",background:"#1e293b",border:"1px solid #334155",borderRadius:6,color:"#94a3b8",fontSize:12,cursor:"pointer",width:"100%"}}>
            Clear all filters
          </button>
        ) : null}
      </div>

      {/* Results panel */}
      <div style={{flex:1,background:"#0a0f1a",overflowY:"auto",padding:24,position:"relative"}}>
        {notification && (
          <div style={{position:"fixed",top:20,right:20,background:"#10b981",color:"#fff",padding:"10px 18px",borderRadius:8,fontWeight:600,fontSize:13,zIndex:1000,boxShadow:"0 4px 12px rgba(0,0,0,0.3)"}}>
            ✓ {notification}
          </div>
        )}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <h2 style={{color:"#fff",margin:0,fontSize:18,fontWeight:700}}>Target Companies</h2>
            <p style={{color:"#64748b",margin:"4px 0 0",fontSize:13}}>{filtered.length} of {prospects.length} companies match your criteria</p>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div style={{textAlign:"center",padding:60,color:"#475569"}}>
            <Target size={40} style={{marginBottom:12,opacity:0.4}}/>
            <p style={{fontSize:15}}>No companies match the selected filters.</p>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
            {filtered.map(prospect => (
              <div key={prospect.id} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:12,padding:20,display:"flex",flexDirection:"column",gap:12,transition:"border-color .2s",borderLeft:"3px solid " + prospect.color}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{prospect.name}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{prospect.industry} · {prospect.region}</div>
                  </div>
                  <div style={{background:"#1e293b",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700,color:prospect.match>=85?"#10b981":prospect.match>=75?"#f59e0b":"#94a3b8"}}>
                    {prospect.match}% match
                  </div>
                </div>
                <p style={{fontSize:13,color:"#94a3b8",margin:0,lineHeight:1.5}}>{prospect.desc}</p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[prospect.employees + " emp", prospect.revenue, prospect.funding].map(tag => (
                    <span key={tag} style={{background:"#1e293b",borderRadius:6,padding:"3px 8px",fontSize:11,color:"#64748b"}}>{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => handleAddToPipeline(prospect)}
                  disabled={addedIds.has(prospect.id)}
                  style={{
                    marginTop:"auto",padding:"9px 16px",borderRadius:8,border:"none",cursor: addedIds.has(prospect.id) ? "not-allowed" : "pointer",
                    background: addedIds.has(prospect.id) ? "#1e293b" : "#6366f1",
                    color: addedIds.has(prospect.id) ? "#475569" : "#fff",
                    fontWeight:600,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .2s"
                  }}>
                  {addedIds.has(prospect.id) ? (
                    <>✓ Added to Pipeline</>
                  ) : (
                    <><Plus size={14}/> Add to Pipeline</>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────── ANALYTICS ───────────────────
const Analytics = ({ deals }) => {
  const won = deals.filter(d => d.stage === "Won");
  const lost = deals.filter(d => d.stage === "Lost");
  const open = deals.filter(d => d.stage !== "Won" && d.stage !== "Lost");
  const sourceData = [...new Set(deals.map(d => d.source))].map(src => ({
    name: src,
    value: deals.filter(d => d.source === src).length,
    revenue: deals.filter(d => d.source === src).reduce((s, d) => s + d.value, 0),
  }));
  const stageConv = [
    { stage:"Lead→Qual", rate:68 },
    { stage:"Qual→Prop", rate:54 },
    { stage:"Prop→Nego", rate:71 },
    { stage:"Nego→Won", rate:83 },
  ];
  const indBreakdown = INDUSTRIES.slice(0, 7).map(ind => ({
    name: ind.slice(0, 8),
    deals: deals.filter(d => d.industry === ind).length,
    value: Math.round(deals.filter(d => d.industry === ind).reduce((s, d) => s + d.value, 0) / 1000),
  })).filter(d => d.deals > 0);
  const forecast = [
    { m:"Feb", actual:318, forecast:null },
    { m:"Mar", actual:null, forecast:355 },
    { m:"Apr", actual:null, forecast:398 },
    { m:"May", actual:null, forecast:445 },
    { m:"Jun", actual:null, forecast:502 },
  ];
  const empDist = [
    { label:"1–10", count:2 }, { label:"11–50", count:4 }, { label:"51–200", count:5 }, { label:"201–1K", count:7 }, { label:"1K+", count:2 }
  ];
  return (
    <div className="fade">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:16 }}>
        {[
          { l:"Open Deals", v: open.length, c:"#4c8fff" },
          { l:"Pipeline Value", v: fmt(open.reduce((s,d)=>s+d.value,0)), c:"#818cf8" },
          { l:"Deals Won", v: won.length, c:"#10d9a0" },
          { l:"Deals Lost", v: lost.length, c:"#f43f5e" },
          { l:"Weighted Value", v: fmt(open.reduce((s,d)=>s+d.value*d.probability/100,0)), c:"#f59e0b" },
        ].map((k,i) => (
          <div key={i} className="stat" style={{ "--ac":k.c }}>
            <div className="stat-l">{k.l}</div>
            <div className="stat-v" style={{ fontSize:20 }}>{k.v}</div>
          </div>
        ))}
      </div>
      <div className="g2" style={{ marginBottom:14 }}>
        <div className="card">
          <div className="card-t">Win/Loss Trend</div>
          <ResponsiveContainer width="100%" height={175}>
            <BarChart data={MONTHLY} margin={{ top:5, right:10, left:-30, bottom:0 }} barSize={14} barGap={4}>
              <XAxis dataKey="m" tick={{ fill:"#3a5078", fontSize:10, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#3a5078", fontSize:10, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize:10, fontFamily:"'Sora',sans-serif", paddingTop:6 }} />
              <Bar dataKey="won" name="Won" fill="#10d9a0" radius={[3,3,0,0]} />
              <Bar dataKey="lost" name="Lost" fill="#f43f5e" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-t">Revenue Forecast ($K)</div>
          <ResponsiveContainer width="100%" height={175}>
            <LineChart data={forecast} margin={{ top:5, right:15, left:-30, bottom:0 }}>
              <XAxis dataKey="m" tick={{ fill:"#3a5078", fontSize:10, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#3a5078", fontSize:10, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line dataKey="actual" stroke="#4c8fff" strokeWidth={2.5} dot={{ fill:"#4c8fff", r:4 }} name="Actual" connectNulls={false} />
              <Line dataKey="forecast" stroke="#818cf8" strokeWidth={2} strokeDasharray="6 3" dot={{ fill:"#818cf8", r:3 }} name="Forecast" connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="g3" style={{ marginBottom:14 }}>
        <div className="card">
          <div className="card-t">Deal Sources</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3}>
                {sourceData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:10, fontFamily:"'Sora',sans-serif" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-t">Stage Conversion</div>
          {stageConv.map((s, i) => (
            <div key={i} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:11, color:"#dde8ff", fontWeight:600 }}>{s.stage}</span>
                <span style={{ fontSize:11, color: s.rate >= 70 ? "#10d9a0" : "#f59e0b", fontFamily:"monospace", fontWeight:700 }}>{s.rate}%</span>
              </div>
              <div className="pbar">
                <div className="pfill" style={{ width: `${s.rate}%`, background: s.rate >= 70 ? "#10d9a0" : "#f59e0b" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-t">Customer Size Mix</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={empDist} layout="vertical" margin={{ top:0, right:20, left:0, bottom:0 }} barSize={10}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="label" tick={{ fill:"#6d8ab5", fontSize:10, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} width={45} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Deals" radius={[0,3,3,0]}>
                {empDist.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <div className="card-t">Industry Breakdown</div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={indBreakdown} margin={{ top:5, right:20, left:-20, bottom:0 }} barSize={26}>
            <XAxis dataKey="name" tick={{ fill:"#3a5078", fontSize:10, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:"#3a5078", fontSize:10, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="Value ($K)" radius={[4,4,0,0]}>
              {indBreakdown.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ─────────────────── SETTINGS ───────────────────
const SettingsView = () => {
  const [stages, setStages] = useState([...STAGES]);
  const [industries, setIndustries] = useState([...INDUSTRIES]);
  const [newStage, setNewStage] = useState("");
  const [newInd, setNewInd] = useState("");
  return (
    <div className="fade">
      <div className="g2">
        <div>
          <div className="card" style={{ marginBottom:14 }}>
            <div className="card-t">Pipeline Stages</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
              {stages.map((s, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8, background:"var(--s2)", padding:"8px 12px", borderRadius:8, border:"1px solid var(--b1)" }}>
                  <GripVertical size={12} color="#3a5078" />
                  <span className="s-dot" style={{ width:8, height:8, borderRadius:"50%", background: STAGE_COLORS[s] || "#4c8fff" }} />
                  <span style={{ flex:1, fontSize:12.5, fontWeight:600, color:"#dde8ff" }}>{s}</span>
                  <Trash2 size={12} color="#3a5078" style={{ cursor:"pointer" }} onClick={() => setStages(prev => prev.filter((_,j) => j !== i))} />
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input className="fi" placeholder="New stage name…" value={newStage} onChange={e => setNewStage(e.target.value)} style={{ flex:1 }} />
              <button className="btn btn-p" onClick={() => { if(newStage.trim()){ setStages(prev=>[...prev,newStage.trim()]); setNewStage(""); }}}><Plus size={12} />Add</button>
            </div>
          </div>
          <div className="card">
            <div className="card-t">Team Members</div>
            {["Alex Kumar","Jessica Park","Raj Mehta","Lisa Chen"].map((name,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid var(--b1)" }}>
                <div className="ava" style={{ background:PALETTE[i] }}>{initials(name)}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12.5, fontWeight:600, color:"#dde8ff" }}>{name}</div>
                  <div style={{ fontSize:11, color:"#6d8ab5" }}>{["Sales Manager","AE","SDR","AE"][i]}</div>
                </div>
                <span className="chip ok">Active</span>
              </div>
            ))}
            <button className="btn btn-g" style={{ marginTop:12, width:"100%", justifyContent:"center" }}><Plus size={12} />Invite Member</button>
          </div>
        </div>
        <div>
          <div className="card" style={{ marginBottom:14 }}>
            <div className="card-t">Industries</div>
            <div className="tag-flex" style={{ marginBottom:14 }}>
              {industries.map((ind, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:4, background:"var(--s2)", border:"1px solid var(--b1)", borderRadius:20, padding:"4px 10px" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#c4b5fd" }}>{ind}</span>
                  <X size={9} color="#3a5078" style={{ cursor:"pointer" }} onClick={() => setIndustries(prev => prev.filter(x => x !== ind))} />
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input className="fi" placeholder="Add industry…" value={newInd} onChange={e => setNewInd(e.target.value)} style={{ flex:1 }} />
              <button className="btn btn-p" onClick={() => { if(newInd.trim()){ setIndustries(prev=>[...prev,newInd.trim()]); setNewInd(""); }}}><Plus size={12} />Add</button>
            </div>
          </div>
          <div className="card" style={{ marginBottom:14 }}>
            <div className="card-t">Deal Sources</div>
            <div className="tag-flex">
              {["Referral","Cold Outreach","LinkedIn","Website","Event","Partnership","Inbound"].map((s,i) => (
                <span key={i} className="chip" style={{ background:"rgba(76,143,255,.12)", color:"#93c5fd", fontSize:11, padding:"4px 10px" }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-t">Notifications</div>
            {[
              { label:"New deal assigned to you", on:true },
              { label:"Deal stage changed", on:true },
              { label:"Deal closes within 7 days", on:true },
              { label:"Contact activity", on:false },
              { label:"Weekly pipeline report", on:true },
            ].map((n,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:i<4?"1px solid var(--b1)":"none" }}>
                <span style={{ fontSize:12.5, color:"#dde8ff" }}>{n.label}</span>
                <div style={{ width:32, height:18, borderRadius:20, background:n.on?"rgba(76,143,255,.4)":"var(--s3)", cursor:"pointer", position:"relative", transition:"all .2s" }}>
                  <div style={{ width:12, height:12, borderRadius:50, background:n.on?"var(--a)":"#3a5078", position:"absolute", top:3, left:n.on?17:3, transition:"all .2s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────── ADD DEAL MODAL ───────────────────
const AddDealModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ title:"", company:"", contact:"", value:"", stage:"Lead", industry:"SaaS", priority:"warm", source:"Website", probability:30, expectedClose:"", employees:"51–200", revenue:"$1M–$10M", funding:"Series A" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="mb" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal pop">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <div className="mt" style={{ margin:0 }}>New Deal</div>
          <div className="ib" onClick={onClose}><X size={13} /></div>
        </div>
        <div className="fi-row">
          <div className="fr"><label className="fl2">Deal Title *</label><input className="fi" placeholder="e.g. Enterprise License" value={form.title} onChange={e=>set("title",e.target.value)} /></div>
          <div className="fr"><label className="fl2">Value ($)</label><input className="fi" type="number" placeholder="50000" value={form.value} onChange={e=>set("value",e.target.value)} /></div>
        </div>
        <div className="fi-row">
          <div className="fr"><label className="fl2">Company</label><input className="fi" placeholder="Company name" value={form.company} onChange={e=>set("company",e.target.value)} /></div>
          <div className="fr"><label className="fl2">Contact</label><input className="fi" placeholder="Contact name" value={form.contact} onChange={e=>set("contact",e.target.value)} /></div>
        </div>
        <div className="fi-row">
          <div className="fr"><label className="fl2">Stage</label>
            <select className="fi" value={form.stage} onChange={e=>set("stage",e.target.value)} style={{appearance:"none"}}>
              {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="fr"><label className="fl2">Industry</label>
            <select className="fi" value={form.industry} onChange={e=>set("industry",e.target.value)} style={{appearance:"none"}}>
              {INDUSTRIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="fi-row">
          <div className="fr"><label className="fl2">Priority</label>
            <select className="fi" value={form.priority} onChange={e=>set("priority",e.target.value)} style={{appearance:"none"}}>
              {["hot","warm","cold"].map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="fr"><label className="fl2">Source</label>
            <select className="fi" value={form.source} onChange={e=>set("source",e.target.value)} style={{appearance:"none"}}>
              {["Referral","Cold Outreach","LinkedIn","Website","Event","Partnership","Inbound"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="fi-row">
          <div className="fr"><label className="fl2">Revenue Range</label>
            <select className="fi" value={form.revenue} onChange={e=>set("revenue",e.target.value)} style={{appearance:"none"}}>
              {REVENUE_RANGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="fr"><label className="fl2">Funding Stage</label>
            <select className="fi" value={form.funding} onChange={e=>set("funding",e.target.value)} style={{appearance:"none"}}>
              {FUNDING_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="fi-row">
          <div className="fr"><label className="fl2">Probability (%)</label><input className="fi" type="number" min={0} max={100} value={form.probability} onChange={e=>set("probability",+e.target.value)} /></div>
          <div className="fr"><label className="fl2">Expected Close</label><input className="fi" type="date" value={form.expectedClose} onChange={e=>set("expectedClose",e.target.value)} /></div>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:18, justifyContent:"flex-end" }}>
          <button className="btn btn-g" onClick={onClose}>Cancel</button>
          <button className="btn btn-p" onClick={() => {
            if(!form.title || !form.company) return;
            onAdd({ ...form, id:Date.now(), value:+form.value||0, daysInStage:0 });
            onClose();
          }}>
            <Plus size={12} />Create Deal
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────── APP ───────────────────
export default function App() {
  const [view, setView] = useState("dashboard");
  const [deals, setDeals] = useState(INIT_DEALS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const addDeal = (deal) => setDeals(prev => [deal, ...prev]);
  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <Sidebar view={view} setView={v => { setView(v); setSearch(""); }} dealCount={deals.filter(d => d.stage !== "Won" && d.stage !== "Lost").length} />
        <div className="main">
          <Topbar view={view} search={search} setSearch={setSearch} onAdd={() => setModal("add")} />
          <div className="content">
            {view === "dashboard"  && <Dashboard deals={deals} />}
            {view === "pipeline"   && <Pipeline deals={deals} setDeals={setDeals} />}
            {view === "deals"      && <Deals deals={deals} search={search} />}
            {view === "contacts"   && <Contacts contacts={CONTACTS} search={search} />}
            {view === "companies"  && <Companies search={search} />}
            {view === "targets"    && <TargetFinder addDeal={addDeal} />}
            {view === "analytics"  && <Analytics deals={deals} />}
            {view === "settings"   && <SettingsView />}
          </div>
        </div>
        {modal === "add" && <AddDealModal onClose={() => setModal(null)} onAdd={addDeal} />}
      </div>
    </>
  );
}
