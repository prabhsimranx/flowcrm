import { useState, useRef, useEffect, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LayoutDashboard, Target, List, Users, Building2, Search, BarChart3, Settings, Plus, TrendingUp, TrendingDown, DollarSign, Phone, Mail, Calendar, X, Bell, ArrowUpRight, Trash2, Globe, SlidersHorizontal, ChevronRight, Zap, Star, Filter, CheckCircle2, Clock, AlertTriangle, Edit2, Tag, Layers, Briefcase, MapPin, Activity, Award, Percent, GripVertical, MessageSquare, LogOut, UserPlus, Gauge, Eye } from "lucide-react";

const _analytics = {
  sessionStart: Date.now(), events: [], pageTimes: {}, currentPage: null, pageStart: null, navCount: 0,
  track(event, data = {}) { this.events.push({ event, data, ts: Date.now() }); },
  enterPage(page) {
    if (this.currentPage) { const dur = Date.now() - this.pageStart; this.pageTimes[this.currentPage] = (this.pageTimes[this.currentPage] || 0) + dur; }
    this.currentPage = page; this.pageStart = Date.now(); this.navCount++; this.track("page_view", { page });
  },
  getPageTime(page) { let t = (this.pageTimes[page] || 0); if (this.currentPage === page) t += Date.now() - this.pageStart; return Math.round(t / 1000); },
  sessionDuration() { return Math.round((Date.now() - this.sessionStart) / 1000); },
};
const _perf = {
  marks: {}, mark(name) { this.marks[name] = performance.now(); },
  measure(name, start) { if (!this.marks[start]) return null; return Math.round(performance.now() - this.marks[start]); },
  getLoadTime() { try { const n = performance.getEntriesByType("navigation")[0]; return n ? Math.round(n.loadEventEnd - n.startTime) : null; } catch { return null; } },
  getFCP() { try { const p = performance.getEntriesByType("paint").find(e => e.name === "first-contentful-paint"); return p ? Math.round(p.startTime) : null; } catch { return null; } },
};
_perf.mark("app_init");

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07090f;--s1:#0d1221;--s2:#111928;--s3:#162035;--b1:rgba(100,160,255,.09);--b2:rgba(100,160,255,.18);--b3:rgba(100,160,255,.28);--a:#4c8fff;--a2:#818cf8;--a3:#06b6d4;--ok:#10d9a0;--warn:#f59e0b;--danger:#f43f5e;--purple:#a78bfa;--t1:#dde8ff;--t2:#6d8ab5;--t3:#3a5078;--font:'Sora',system-ui,sans-serif;--mono:'IBM Plex Mono',monospace}
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
.card-t{font-size:11px;font-weight:700;color:var(--t2);letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}
.stat{background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:16px 18px;position:relative;overflow:hidden}
.stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--ac,var(--a))}
.stat-l{font-size:10.5px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.09em;margin-bottom:6px}
.stat-v{font-size:24px;font-weight:800;color:var(--t1);font-family:var(--mono);letter-spacing:-.02em}
.stat-s{font-size:10.5px;color:var(--t2);margin-top:4px;display:flex;align-items:center;gap:4px}
.stat-bg{position:absolute;right:14px;top:50%;transform:translateY(-50%);opacity:.06}
.kanban{display:flex;gap:12px;overflow-x:auto;height:calc(100vh - 130px);padding-bottom:8px}
.k-col{min-width:220px;max-width:220px;background:var(--s1);border:1px solid var(--b1);border-radius:12px;display:flex;flex-direction:column;transition:border-color .15s}
.k-col.over{border-color:var(--a);background:rgba(76,143,255,.04)}
.k-head{padding:12px 12px 8px;border-bottom:1px solid var(--b1);flex-shrink:0}
.k-hn{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.k-title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em}
.k-cnt{font-size:10px;font-weight:700;background:var(--s2);border-radius:20px;padding:2px 7px;color:var(--t2);font-family:var(--mono)}
.k-val{font-size:11px;color:var(--t2);font-family:var(--mono)}
.k-body{padding:8px;flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:7px;min-height:40px}
.dc{background:var(--s2);border:1px solid var(--b1);border-radius:9px;padding:11px;cursor:grab;transition:all .15s}
.dc:hover{border-color:var(--b2);box-shadow:0 4px 16px rgba(0,0,0,.4);transform:translateY(-1px)}
.dc.drag{opacity:.45;cursor:grabbing}
.dc-name{font-size:12.5px;font-weight:800;color:var(--t1);margin-bottom:2px}
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
.ftag{padding:5px 13px;border-radius:20px;font-size:11.5px;font-weight:600;border:1px solid var(--b1);background:var(--s2);color:var(--t2);cursor:pointer;transition:all .12s;user-select:none}
.ftag.sel{background:rgba(76,143,255,.18);border-color:var(--a);color:var(--a)}
.cc{background:var(--s1);border:1px solid var(--b1);border-radius:11px;padding:14px;display:flex;align-items:center;gap:12px;transition:all .12s;cursor:pointer}
.cc:hover{border-color:var(--b2);transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.4)}
.ca{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0}
.cn1{font-size:13.5px;font-weight:700;color:var(--t1)}
.cn2{font-size:11px;color:var(--t2);margin-top:1px}
.cm{margin-left:auto;text-align:right}
.cm .cv{font-size:12.5px;font-weight:700;color:var(--a);font-family:var(--mono)}
.cm .cd{font-size:10.5px;color:var(--t2)}
.pbar{height:4px;background:var(--s3);border-radius:2px;overflow:hidden;margin-top:5px}
.pfill{height:100%;border-radius:2px;background:var(--a)}
.mb{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(6px)}
.modal{background:var(--s1);border:1px solid var(--b2);border-radius:14px;padding:22px;width:520px;max-height:88vh;overflow-y:auto}
.modal::-webkit-scrollbar{width:3px}
.modal::-webkit-scrollbar-thumb{background:var(--s3)}
.mt{font-size:16px;font-weight:800;color:var(--t1);margin-bottom:18px;letter-spacing:-.02em}
.fr{margin-bottom:12px}
.fl2{font-size:11px;font-weight:700;color:var(--t2);margin-bottom:5px;display:block}
.fi{width:100%;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:8px 11px;color:var(--t1);font-size:12.5px;font-family:var(--font);outline:none;transition:border-color .12s}
.fi:focus{border-color:var(--a)}
.fi-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.notes-area{width:100%;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:10px 11px;color:var(--t1);font-size:12.5px;font-family:var(--font);outline:none;transition:border-color .12s;resize:vertical;min-height:80px;line-height:1.5}
.notes-area:focus{border-color:var(--a)}
.note-item{background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:10px 12px;margin-bottom:8px}
.note-item-text{font-size:12.5px;color:var(--t1);line-height:1.5;margin-bottom:4px}
.note-item-meta{font-size:10px;color:var(--t3)}
.recharts-tooltip-wrapper{font-family:var(--font)!important}
.recharts-default-tooltip{background:var(--s2)!important;border:1px solid var(--b2)!important;border-radius:8px!important;font-size:12px!important}
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
.detail-drawer{position:fixed;top:0;right:0;width:480px;height:100vh;background:var(--s1);border-left:1px solid var(--b2);z-index:150;overflow-y:auto;padding:24px;box-shadow:-8px 0 32px rgba(0,0,0,.5)}
.detail-drawer::-webkit-scrollbar{width:3px}
.detail-drawer::-webkit-scrollbar-thumb{background:var(--s3)}
.drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:149}
.user-menu{position:absolute;bottom:60px;left:12px;width:190px;background:var(--s1);border:1px solid var(--b2);border-radius:10px;padding:6px;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,.5)}
.user-menu-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:7px;cursor:pointer;font-size:12.5px;color:var(--t2);transition:all .12s}
.user-menu-item:hover{background:var(--s2);color:var(--t1)}
.forecast-info{background:rgba(76,143,255,.06);border:1px solid rgba(76,143,255,.15);border-radius:10px;padding:14px 16px;margin-bottom:14px}
.forecast-info-title{font-size:11px;font-weight:700;color:var(--a);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.forecast-info-body{font-size:12px;color:var(--t2);line-height:1.7}
.forecast-info-body b{color:var(--t1)}
`;

const STAGES = ["Lead","Qualified","Proposal","Negotiation","Won","Lost"];
const STAGE_COLORS = {Lead:"#64748b",Qualified:"#818cf8",Proposal:"#f59e0b",Negotiation:"#f97316",Won:"#10d9a0",Lost:"#f43f5e"};
const INDUSTRIES = ["SaaS","FinTech","HealthTech","E-Commerce","Manufacturing","Retail","Media","Real Estate","Education","Logistics","CleanTech","Cybersecurity"];
const REVENUE_RANGES = ["< $1M","$1M–$10M","$10M–$100M","$100M+"];
const EMPLOYEE_RANGES = ["1–10","11–50","51–200","201–1,000","1,000+"];
const FUNDING_STAGES = ["Bootstrapped","Seed","Series A","Series B","Series C+","Public"];
const REGIONS = ["North America","Europe","Asia Pacific","Latin America","Middle East","Africa"];
const PALETTE = ["#4c8fff","#818cf8","#10d9a0","#f59e0b","#f43f5e","#06b6d4","#a78bfa","#fb923c"];
const USERS = [
  {id:1,name:"Alex Kumar",role:"Sales Manager",initials:"AK",color:"#4c8fff"},
  {id:2,name:"Jessica Park",role:"Account Executive",initials:"JP",color:"#818cf8"},
  {id:3,name:"Raj Mehta",role:"SDR",initials:"RM",color:"#10d9a0"},
  {id:4,name:"Lisa Chen",role:"Account Executive",initials:"LC",color:"#f59e0b"},
];

const INIT_DEALS = [
  {id:1,title:"Enterprise License",company:"Nexus Corp",contact:"Sarah Chen",value:85000,stage:"Negotiation",industry:"SaaS",employees:"201–1,000",revenue:"$10M–$100M",funding:"Series B",probability:75,daysInStage:12,expectedClose:"2025-03-28",priority:"hot",source:"Referral",notes:[]},
  {id:2,title:"Annual Subscription",company:"DataFlow AI",contact:"Marcus Williams",value:42000,stage:"Proposal",industry:"FinTech",employees:"51–200",revenue:"$1M–$10M",funding:"Series A",probability:55,daysInStage:7,expectedClose:"2025-04-15",priority:"warm",source:"Cold Outreach",notes:[]},
  {id:3,title:"Platform Integration",company:"MedSync",contact:"Dr. Priya Patel",value:120000,stage:"Qualified",industry:"HealthTech",employees:"201–1,000",revenue:"$10M–$100M",funding:"Series B",probability:40,daysInStage:3,expectedClose:"2025-05-01",priority:"hot",source:"Event",notes:[]},
  {id:4,title:"Starter Pack",company:"EcoShop",contact:"James Liu",value:8500,stage:"Lead",industry:"E-Commerce",employees:"1–10",revenue:"< $1M",funding:"Bootstrapped",probability:20,daysInStage:1,expectedClose:"2025-04-30",priority:"cold",source:"Website",notes:[]},
  {id:5,title:"Growth Bundle",company:"ShipFast",contact:"Elena Rodriguez",value:35000,stage:"Won",industry:"Logistics",employees:"51–200",revenue:"$1M–$10M",funding:"Seed",probability:100,daysInStage:0,expectedClose:"2025-02-20",priority:"warm",source:"Referral",notes:[]},
  {id:6,title:"Security Audit Suite",company:"VaultSec",contact:"Noah Park",value:65000,stage:"Proposal",industry:"Cybersecurity",employees:"11–50",revenue:"$1M–$10M",funding:"Series A",probability:60,daysInStage:5,expectedClose:"2025-04-10",priority:"hot",source:"LinkedIn",notes:[]},
  {id:7,title:"Custom Analytics",company:"RetailPlus",contact:"Amy Thompson",value:28000,stage:"Negotiation",industry:"Retail",employees:"201–1,000",revenue:"$10M–$100M",funding:"Bootstrapped",probability:80,daysInStage:8,expectedClose:"2025-03-25",priority:"warm",source:"Referral",notes:[]},
  {id:8,title:"Data Pipeline Pro",company:"Quantifi",contact:"David Kim",value:95000,stage:"Won",industry:"FinTech",employees:"51–200",revenue:"$10M–$100M",funding:"Series B",probability:100,daysInStage:0,expectedClose:"2025-02-15",priority:"hot",source:"Cold Outreach",notes:[]},
  {id:9,title:"EdTech Suite",company:"LearnPath",contact:"Sofia Okafor",value:22000,stage:"Lead",industry:"Education",employees:"11–50",revenue:"< $1M",funding:"Seed",probability:15,daysInStage:2,expectedClose:"2025-05-20",priority:"cold",source:"Website",notes:[]},
  {id:10,title:"Cloud Migration",company:"GreenGrid",contact:"Chris Novak",value:180000,stage:"Qualified",industry:"CleanTech",employees:"201–1,000",revenue:"$100M+",funding:"Series C+",probability:35,daysInStage:6,expectedClose:"2025-06-01",priority:"hot",source:"Partnership",notes:[]},
  {id:11,title:"Analytics Pro",company:"MediaHub",contact:"Lena Fischer",value:15000,stage:"Lost",industry:"Media",employees:"51–200",revenue:"$1M–$10M",funding:"Bootstrapped",probability:0,daysInStage:0,expectedClose:"2025-02-10",priority:"cold",source:"LinkedIn",notes:[]},
  {id:12,title:"CRM Integration",company:"BuildRight",contact:"Tom Walsh",value:48000,stage:"Qualified",industry:"Real Estate",employees:"11–50",revenue:"$1M–$10M",funding:"Bootstrapped",probability:40,daysInStage:4,expectedClose:"2025-04-25",priority:"warm",source:"Event",notes:[]},
  {id:13,title:"Security Monitoring",company:"CyberShield",contact:"Raj Mehta",value:72000,stage:"Lead",industry:"Cybersecurity",employees:"51–200",revenue:"$1M–$10M",funding:"Series A",probability:25,daysInStage:0,expectedClose:"2025-05-15",priority:"warm",source:"Cold Outreach",notes:[]},
  {id:14,title:"Logistics Platform",company:"FastRoute",contact:"Maria Santos",value:55000,stage:"Proposal",industry:"Logistics",employees:"201–1,000",revenue:"$10M–$100M",funding:"Series B",probability:50,daysInStage:9,expectedClose:"2025-04-20",priority:"warm",source:"Referral",notes:[]},
];
const CONTACTS = [
  {id:1,name:"Sarah Chen",title:"VP of Sales",company:"Nexus Corp",email:"s.chen@nexuscorp.com",phone:"+1 (415) 555-0192",deals:2,value:95000,lastContact:"2 days ago",score:92,color:"#4c8fff"},
  {id:2,name:"Marcus Williams",title:"CTO",company:"DataFlow AI",email:"m.williams@dataflow.ai",phone:"+1 (512) 555-0847",deals:1,value:42000,lastContact:"1 week ago",score:78,color:"#818cf8"},
  {id:3,name:"Dr. Priya Patel",title:"Chief Medical Officer",company:"MedSync",email:"priya@medsync.io",phone:"+1 (617) 555-0234",deals:1,value:120000,lastContact:"3 days ago",score:88,color:"#10d9a0"},
  {id:4,name:"James Liu",title:"Founder & CEO",company:"EcoShop",email:"james@ecoshop.co",phone:"+1 (347) 555-0561",deals:1,value:8500,lastContact:"5 days ago",score:45,color:"#f59e0b"},
  {id:5,name:"Elena Rodriguez",title:"Head of Operations",company:"ShipFast",email:"e.rod@shipfast.com",phone:"+1 (786) 555-0923",deals:1,value:35000,lastContact:"Today",score:95,color:"#06b6d4"},
  {id:6,name:"Noah Park",title:"CISO",company:"VaultSec",email:"n.park@vaultsec.io",phone:"+1 (650) 555-0478",deals:1,value:65000,lastContact:"Yesterday",score:82,color:"#f43f5e"},
  {id:7,name:"Amy Thompson",title:"Director of Technology",company:"RetailPlus",email:"amy.t@retailplus.com",phone:"+1 (213) 555-0637",deals:1,value:28000,lastContact:"4 days ago",score:71,color:"#a78bfa"},
  {id:8,name:"David Kim",title:"Head of Engineering",company:"Quantifi",email:"d.kim@quantifi.com",phone:"+1 (415) 555-0389",deals:2,value:140000,lastContact:"Today",score:97,color:"#fb923c"},
];
const COMPANIES_DATA = [
  {id:1,name:"Nexus Corp",industry:"SaaS",employees:"201–1,000",revenue:"$10M–$100M",funding:"Series B",website:"nexuscorp.com",contacts:2,openDeals:1,totalValue:85000,location:"San Francisco, CA",color:"#4c8fff",description:"Enterprise workflow automation platform serving Fortune 500 clients."},
  {id:2,name:"DataFlow AI",industry:"FinTech",employees:"51–200",revenue:"$1M–$10M",funding:"Series A",website:"dataflow.ai",contacts:1,openDeals:1,totalValue:42000,location:"Austin, TX",color:"#818cf8",description:"AI-driven financial data pipeline and reporting solutions."},
  {id:3,name:"MedSync",industry:"HealthTech",employees:"201–1,000",revenue:"$10M–$100M",funding:"Series B",website:"medsync.io",contacts:1,openDeals:1,totalValue:120000,location:"Boston, MA",color:"#10d9a0",description:"EHR interoperability and healthcare data integration platform."},
  {id:4,name:"ShipFast",industry:"Logistics",employees:"51–200",revenue:"$1M–$10M",funding:"Seed",website:"shipfast.com",contacts:1,openDeals:0,totalValue:35000,location:"Miami, FL",color:"#f59e0b",description:"Last-mile delivery optimization for e-commerce businesses."},
  {id:5,name:"VaultSec",industry:"Cybersecurity",employees:"11–50",revenue:"$1M–$10M",funding:"Series A",website:"vaultsec.io",contacts:1,openDeals:1,totalValue:65000,location:"New York, NY",color:"#f43f5e",description:"Zero-trust security and compliance auditing for mid-market."},
  {id:6,name:"Quantifi",industry:"FinTech",employees:"51–200",revenue:"$10M–$100M",funding:"Series B",website:"quantifi.com",contacts:2,openDeals:0,totalValue:95000,location:"Chicago, IL",color:"#06b6d4",description:"Real-time treasury analytics and cash flow intelligence platform."},
  {id:7,name:"GreenGrid",industry:"CleanTech",employees:"201–1,000",revenue:"$100M+",funding:"Series C+",website:"greengrid.com",contacts:1,openDeals:1,totalValue:180000,location:"Seattle, WA",color:"#a78bfa",description:"Renewable energy grid optimization and smart infrastructure."},
  {id:8,name:"RetailPlus",industry:"Retail",employees:"201–1,000",revenue:"$10M–$100M",funding:"Bootstrapped",website:"retailplus.com",contacts:1,openDeals:1,totalValue:28000,location:"Dallas, TX",color:"#fb923c",description:"Omnichannel retail analytics and inventory intelligence."},
];
const MONTHLY = [{m:"Sep",deals:8,value:142,won:3,lost:2},{m:"Oct",deals:11,value:198,won:5,lost:1},{m:"Nov",deals:9,value:165,won:4,lost:3},{m:"Dec",deals:14,value:287,won:7,lost:2},{m:"Jan",deals:12,value:234,won:6,lost:2},{m:"Feb",deals:16,value:318,won:8,lost:1}];
const ACTIVITIES = [
  {type:"deal",text:<>New deal <b>Cloud Migration</b> added at <b>GreenGrid</b></>,time:"2 min ago",color:"#4c8fff"},
  {type:"win",text:<><b>Data Pipeline Pro</b> marked as <b>Won</b> — $95,000</>,time:"1 hr ago",color:"#10d9a0"},
  {type:"contact",text:<>New contact <b>Raj Mehta</b> added at CyberShield</>,time:"3 hrs ago",color:"#818cf8"},
  {type:"stage",text:<><b>Enterprise License</b> moved to <b>Negotiation</b></>,time:"5 hrs ago",color:"#f59e0b"},
  {type:"task",text:<>Follow-up scheduled with <b>Dr. Priya Patel</b></>,time:"Yesterday",color:"#a78bfa"},
  {type:"lost",text:<><b>Analytics Pro</b> at MediaHub marked as Lost</>,time:"2 days ago",color:"#f43f5e"},
];
const fmt = (n) => n >= 1000000 ? `$${(n/1000000).toFixed(1)}M` : n >= 1000 ? `$${(n/1000).toFixed(0)}K` : `$${n}`;
const initials = (name) => name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
const fmtSecs = (s) => s < 60 ? s+"s" : s < 3600 ? Math.round(s/60)+"m" : (s/3600).toFixed(1)+"h";
const StageBadge = ({stage}) => { const c = STAGE_COLORS[stage]||"#64748b"; return <span className="s-badge" style={{background:`${c}22`,color:c}}><span className="s-dot" style={{background:c}}/>{stage}</span>; };
const CustomTooltip = ({active,payload,label}) => {
  if (!active||!payload?.length) return null;
  return <div style={{background:"#111928",border:"1px solid rgba(100,160,255,.2)",borderRadius:8,padding:"8px 12px",fontSize:12,fontFamily:"'Sora',sans-serif"}}><div style={{color:"#dde8ff",fontWeight:700,marginBottom:4}}>{label}</div>{payload.map((p,i)=><div key={i} style={{color:p.color||"#6d8ab5"}}>{p.name}: <b style={{color:"#dde8ff"}}>{p.value}</b></div>)}</div>;
};

const Sidebar = ({view,setView,dealCount,currentUser,onUserClick}) => {
  const nav=[{group:"Overview",items:[{id:"dashboard",icon:<LayoutDashboard size={14}/>,label:"Dashboard"},{id:"analytics",icon:<BarChart3 size={14}/>,label:"Analytics"}]},{group:"Sales",items:[{id:"pipeline",icon:<Layers size={14}/>,label:"Pipeline",badge:dealCount},{id:"deals",icon:<Briefcase size={14}/>,label:"Deals"}]},{group:"CRM",items:[{id:"contacts",icon:<Users size={14}/>,label:"Contacts"},{id:"companies",icon:<Building2 size={14}/>,label:"Companies"}]},{group:"Tools",items:[{id:"targets",icon:<Target size={14}/>,label:"Target Finder"},{id:"appanalytics",icon:<Gauge size={14}/>,label:"App Analytics"},{id:"settings",icon:<Settings size={14}/>,label:"Settings"}]}];
  return <div className="sidebar"><div className="logo"><div className="logo-mark"><Zap size={15} color="#fff"/></div><div><div className="logo-name">FlowCRM</div><div className="logo-sub">Pipeline OS</div></div></div><nav className="nav">{nav.map(g=><div key={g.group} className="nav-sect"><div className="nav-label">{g.group}</div>{g.items.map(item=><div key={item.id} className={`ni ${view===item.id?"on":""}`} onClick={()=>setView(item.id)}>{item.icon}{item.label}{item.badge&&<span className="nb">{item.badge}</span>}</div>)}</div>)}</nav><div className="sb-foot"><div className="u-row" onClick={onUserClick}><div className="ava" style={{background:currentUser.color}}>{currentUser.initials}</div><div><div className="un">{currentUser.name}</div><div className="ur">{currentUser.role}</div></div></div></div></div>;
};
const LoginView = ({onLogin}) => <div style={{position:"fixed",inset:0,background:"#0a0f1a",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Sora',sans-serif"}}>
  <div style={{background:"#111928",border:"1px solid rgba(100,160,255,0.2)",borderRadius:16,padding:"40px 48px",width:380,boxShadow:"0 24px 80px rgba(0,0,0,0.6)",display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{background:"#6366f1",borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚡</div>
      <div><div style={{color:"#dde8ff",fontWeight:700,fontSize:16}}>FlowCRM</div><div style={{color:"#6d8ab5",fontSize:10,letterSpacing:".1em",textTransform:"uppercase"}}>Pipeline OS</div></div>
    </div>
    <div style={{textAlign:"center"}}>
      <div style={{color:"#dde8ff",fontWeight:700,fontSize:20,marginBottom:6}}>Welcome back</div>
      <div style={{color:"#6d8ab5",fontSize:13}}>Sign in to continue to FlowCRM</div>
    </div>
    <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12}}>
      <div><label style={{color:"#6d8ab5",fontSize:11,fontWeight:600,display:"block",marginBottom:6}}>EMAIL</label><input type="email" placeholder="you@company.com" style={{width:"100%",boxSizing:"border-box",background:"#0a0f1a",border:"1px solid #334155",borderRadius:8,padding:"10px 12px",color:"#dde8ff",fontSize:13,fontFamily:"'Sora',sans-serif",outline:"none"}}/></div>
      <div><label style={{color:"#6d8ab5",fontSize:11,fontWeight:600,display:"block",marginBottom:6}}>PASSWORD</label><input type="password" placeholder="••••••••" style={{width:"100%",boxSizing:"border-box",background:"#0a0f1a",border:"1px solid #334155",borderRadius:8,padding:"10px 12px",color:"#dde8ff",fontSize:13,fontFamily:"'Sora',sans-serif",outline:"none"}}/></div>
    </div>
    <button onClick={onLogin} style={{width:"100%",background:"#6366f1",color:"#fff",border:"none",borderRadius:8,padding:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>Sign In</button>
    <div style={{color:"#6d8ab5",fontSize:11}}>Demo: click Sign In to continue</div>
  </div>
</div>;
const UserMenu = ({currentUser,onSwitch,onClose,onSignOut}) => <>
  <div style={{position:"fixed",inset:0,zIndex:99}} onClick={onClose}/>
  <div className="user-menu pop">
    <div style={{fontSize:10,fontWeight:700,color:"var(--t3)",padding:"4px 10px 6px",textTransform:"uppercase",letterSpacing:".1em"}}>Switch User</div>
    {USERS.map(u=><div key={u.id} className="user-menu-item" onClick={()=>{onSwitch(u);onClose();}}>
      <div className="ava" style={{width:22,height:22,fontSize:9,background:u.color}}>{u.initials}</div>
      <div><div style={{fontSize:12,fontWeight:600,color:currentUser.id===u.id?"var(--a)":"var(--t1)"}}>{u.name}</div><div style={{fontSize:10,color:"var(--t3)"}}>{u.role}</div></div>
      {currentUser.id===u.id&&<CheckCircle2 size={12} color="var(--a)" style={{marginLeft:"auto"}}/>}
    </div>)}
    <div style={{borderTop:"1px solid var(--b1)",margin:"6px 0 2px"}}/>
    <div className="user-menu-item" onClick={onSignOut} style={{color:"var(--danger)"}}><LogOut size={12}/><span>Sign Out</span></div>
  </div>
</>;
const VIEW_TITLES={dashboard:"Dashboard",analytics:"Analytics",pipeline:"Pipeline Board",deals:"All Deals",contacts:"Contacts",companies:"Companies",targets:"Target Finder",settings:"Settings",appanalytics:"App Analytics"};
const Topbar=({view,search,setSearch,onAdd})=><div className="topbar"><div className="tb-title">{VIEW_TITLES[view]}</div><div className="srch"><Search size={13} color="#3a5078"/><input placeholder="Search deals, contacts…" value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="ib"><Bell size={13}/></div><button className="btn btn-p" onClick={onAdd}><Plus size={12}/> Add Deal</button></div>;

const Dashboard=({deals})=>{
  const open=deals.filter(d=>d.stage!=="Won"&&d.stage!=="Lost");
  const won=deals.filter(d=>d.stage==="Won");
  const totalPipeline=open.reduce((s,d)=>s+d.value,0);
  const wonValue=won.reduce((s,d)=>s+d.value,0);
  const winRate=Math.round(won.length/Math.max(won.length+deals.filter(d=>d.stage==="Lost").length,1)*100);
  const avgDeal=Math.round(deals.reduce((s,d)=>s+d.value,0)/Math.max(deals.length,1));
  const stageData=STAGES.filter(s=>s!=="Lost").map(s=>({stage:s.slice(0,4),count:deals.filter(d=>d.stage===s).length,value:Math.round(deals.filter(d=>d.stage===s).reduce((a,b)=>a+b.value,0)/1000)}));
  const indData=[...new Set(deals.map(d=>d.industry))].slice(0,6).map(ind=>({name:ind,value:deals.filter(d=>d.industry===ind).reduce((s,d)=>s+d.value,0)/1000})).sort((a,b)=>b.value-a.value);
  return <div className="fade">
    <div className="stats-row">{[
      {label:"Total Pipeline",value:fmt(totalPipeline),sub:`${open.length} active deals`,color:"#4c8fff",icon:<DollarSign size={42}/>,trend:"+12%"},
      {label:"Won This Month",value:fmt(wonValue),sub:`${won.length} deals closed`,color:"#10d9a0",icon:<Award size={42}/>,trend:"+8%"},
      {label:"Win Rate",value:`${winRate}%`,sub:"vs 58% last month",color:"#818cf8",icon:<Percent size={42}/>,trend:"+5pts"},
      {label:"Avg Deal Size",value:fmt(avgDeal),sub:"across all deals",color:"#f59e0b",icon:<Activity size={42}/>,trend:"+3%"},
    ].map((s,i)=><div key={i} className="stat" style={{"--ac":s.color}}><div className="stat-l">{s.label}</div><div className="stat-v">{s.value}</div><div className="stat-s"><TrendingUp size={10} color={s.color}/><span style={{color:s.color,fontWeight:700}}>{s.trend}</span><span>{s.sub}</span></div><div className="stat-bg">{s.icon}</div></div>)}</div>
    <div className="g2r" style={{marginBottom:14}}>
      <div className="card"><div className="card-t">Monthly Performance</div>
        <ResponsiveContainer width="100%" height={180}><AreaChart data={MONTHLY} margin={{top:5,right:10,left:-20,bottom:0}}>
          <defs><linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4c8fff" stopOpacity={0.3}/><stop offset="95%" stopColor="#4c8fff" stopOpacity={0}/></linearGradient><linearGradient id="gw" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10d9a0" stopOpacity={0.3}/><stop offset="95%" stopColor="#10d9a0" stopOpacity={0}/></linearGradient></defs>
          <XAxis dataKey="m" tick={{fill:"#3a5078",fontSize:10,fontFamily:"'Sora',sans-serif"}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"#3a5078",fontSize:10,fontFamily:"'Sora',sans-serif"}} axisLine={false} tickLine={false}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Area type="monotone" dataKey="value" stroke="#4c8fff" fill="url(#gv)" strokeWidth={2} name="Value ($K)"/>
          <Area type="monotone" dataKey="won" stroke="#10d9a0" fill="url(#gw)" strokeWidth={2} name="Won"/>
        </AreaChart></ResponsiveContainer>
      </div>
      <div className="card"><div className="card-t">Recent Activity</div>{ACTIVITIES.slice(0,5).map((a,i)=><div key={i} className="act-item"><div className="act-dot" style={{background:a.color}}/><div><div className="act-text">{a.text}</div><div className="act-time">{a.time}</div></div></div>)}</div>
    </div>
    <div className="g2">
      <div className="card"><div className="card-t">Pipeline by Stage</div>
        <ResponsiveContainer width="100%" height={160}><BarChart data={stageData} margin={{top:0,right:10,left:-30,bottom:0}} barSize={28}>
          <XAxis dataKey="stage" tick={{fill:"#3a5078",fontSize:10,fontFamily:"'Sora',sans-serif"}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"#3a5078",fontSize:10,fontFamily:"'Sora',sans-serif"}} axisLine={false} tickLine={false}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Bar dataKey="value" name="Value ($K)" radius={[4,4,0,0]}>{stageData.map((_,i)=><Cell key={i} fill={Object.values(STAGE_COLORS)[i]||"#4c8fff"}/>)}</Bar>
        </BarChart></ResponsiveContainer>
      </div>
      <div className="card"><div className="card-t">Top Industries</div>{indData.map((d,i)=><div key={i} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:"#dde8ff",fontWeight:600}}>{d.name}</span><span style={{fontSize:11,color:"#4c8fff",fontFamily:"monospace",fontWeight:700}}>${d.value.toFixed(0)}K</span></div><div className="pbar"><div className="pfill" style={{width:`${(d.value/indData[0].value)*100}%`,background:PALETTE[i%PALETTE.length]}}/></div></div>)}</div>
    </div>
  </div>;
};

const Pipeline=({deals,setDeals})=>{
  const [dragging,setDragging]=useState(null);
  const [over,setOver]=useState(null);
  const [selectedDeal,setSelectedDeal]=useState(null);
  const onDragStart=(e,deal)=>{setDragging(deal);e.dataTransfer.effectAllowed="move";};
  const onDragOver=(e,stage)=>{e.preventDefault();setOver(stage);};
  const onDrop=(e,stage)=>{e.preventDefault();if(dragging&&dragging.stage!==stage){setDeals(prev=>prev.map(d=>d.id===dragging.id?{...d,stage,daysInStage:0}:d));_analytics.track("deal_stage_change",{dealId:dragging.id,from:dragging.stage,to:stage});}setDragging(null);setOver(null);};
  const onDragEnd=()=>{setDragging(null);setOver(null);};
  return <div className="fade">
    <div style={{marginBottom:10,display:"flex",gap:8,alignItems:"center"}}>
      <span style={{fontSize:12,color:"#6d8ab5"}}>Total Pipeline: <b style={{color:"#4c8fff",fontFamily:"monospace"}}>{fmt(deals.filter(d=>d.stage!=="Won"&&d.stage!=="Lost").reduce((s,d)=>s+d.value,0))}</b></span>
      <span style={{fontSize:12,color:"#3a5078"}}>·</span>
      <span style={{fontSize:12,color:"#6d8ab5"}}>Drag cards to move · Click to view details</span>
    </div>
    <div className="kanban">
      {STAGES.map(stage=>{
        const stagDeals=deals.filter(d=>d.stage===stage);
        const stageValue=stagDeals.reduce((s,d)=>s+d.value,0);
        const color=STAGE_COLORS[stage];
        return <div key={stage} className={`k-col ${over===stage?"over":""}`} onDragOver={e=>onDragOver(e,stage)} onDrop={e=>onDrop(e,stage)}>
          <div className="k-head"><div className="k-hn"><span className="k-title" style={{color}}>{stage}</span><span className="k-cnt">{stagDeals.length}</span></div><div className="k-val">{fmt(stageValue)}</div></div>
          <div className="k-body">{stagDeals.map(deal=><div key={deal.id} className={`dc ${dragging?.id===deal.id?"drag":""}`} draggable onDragStart={e=>onDragStart(e,deal)} onDragEnd={onDragEnd} onClick={()=>{setSelectedDeal(deal);_analytics.track("deal_click",{dealId:deal.id});}}>
            <div className="dc-name">{deal.company}</div>
            <div className="dc-co">{deal.title}</div>
            <div className="dc-val">{fmt(deal.value)}</div>
            <div className="dc-row"><span className={`chip ${deal.priority}`}>{deal.priority.toUpperCase()}</span><span className="chip ind">{deal.industry}</span>{deal.daysInStage>0&&<span className="chip" style={{display:"flex",alignItems:"center",gap:3}}><Clock size={8}/>{deal.daysInStage}d</span>}</div>
            <div style={{marginTop:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2,fontSize:10,color:"#3a5078"}}><span>Probability</span><span style={{color,fontFamily:"monospace",fontWeight:700}}>{deal.probability}%</span></div><div className="pbar"><div className="pfill" style={{width:`${deal.probability}%`,background:color}}/></div></div>
          </div>)}</div>
        </div>;
      })}
    </div>
    {selectedDeal&&<DealDetailDrawer deal={deals.find(d=>d.id===selectedDeal.id)||selectedDeal} onClose={()=>setSelectedDeal(null)} onUpdate={(updated)=>setDeals(prev=>prev.map(d=>d.id===updated.id?updated:d))}/>}
  </div>;
};

const DealDetailDrawer=({deal,onClose,onUpdate})=>{
  const [noteText,setNoteText]=useState("");
  const [notes,setNotes]=useState(deal.notes||[]);
  const addNote=()=>{if(!noteText.trim())return;const newNote={id:Date.now(),text:noteText.trim(),ts:new Date().toLocaleString(),type:"note"};const updated=[...notes,newNote];setNotes(updated);setNoteText("");if(onUpdate)onUpdate({...deal,notes:updated});_analytics.track("note_added",{dealId:deal.id});};
  const color=STAGE_COLORS[deal.stage]||"#64748b";
  return <>
    <div className="drawer-overlay" onClick={onClose}/>
    <div className="detail-drawer fade">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><div style={{fontSize:17,fontWeight:800,color:"var(--t1)",letterSpacing:"-.02em"}}>{deal.title}</div><div style={{fontSize:12,color:"var(--t2)",marginTop:3}}>{deal.company} · {deal.contact}</div></div>
        <div className="ib" onClick={onClose}><X size={13}/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
        {[{l:"Value",v:fmt(deal.value),c:"var(--a)"},{l:"Stage",v:<StageBadge stage={deal.stage}/>,c:null},{l:"Probability",v:deal.probability+"%",c:color},{l:"Close Date",v:deal.expectedClose||"—",c:null},{l:"Priority",v:<span className={`chip ${deal.priority}`}>{deal.priority?.toUpperCase()}</span>,c:null},{l:"Source",v:deal.source,c:null}].map((item,i)=>
          <div key={i} style={{background:"var(--s2)",border:"1px solid var(--b1)",borderRadius:8,padding:"10px 12px"}}>
            <div style={{fontSize:10,color:"var(--t3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>{item.l}</div>
            <div style={{fontSize:13,fontWeight:700,color:item.c||"var(--t1)"}}>{item.v}</div>
          </div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18}}>
        {[{l:"Industry",v:deal.industry},{l:"Employees",v:deal.employees},{l:"Revenue",v:deal.revenue},{l:"Funding",v:deal.funding}].map((item,i)=>
          <div key={i} style={{background:"var(--s2)",border:"1px solid var(--b1)",borderRadius:8,padding:"8px 10px"}}>
            <div style={{fontSize:9.5,color:"var(--t3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:3}}>{item.l}</div>
            <div style={{fontSize:11.5,fontWeight:600,color:"var(--t1)"}}>{item.v||"—"}</div>
          </div>)}
      </div>
      <div style={{marginBottom:18}}>
        <div className="card-t" style={{marginBottom:12,display:"flex",alignItems:"center",gap:6}}><MessageSquare size={12}/> Notes &amp; Meeting Minutes</div>
        {notes.length===0&&<div style={{fontSize:12,color:"var(--t3)",textAlign:"center",padding:"16px 0"}}>No notes yet. Add your first note below.</div>}
        {notes.map((n,i)=><div key={n.id||i} className="note-item"><div className="note-item-text">{n.text}</div><div className="note-item-meta">{n.ts}</div></div>)}
        <textarea className="notes-area" placeholder="Add a note, meeting minute, or comment…" value={noteText} onChange={e=>setNoteText(e.target.value)} style={{flex:1,minHeight:70,marginTop:10,width:"100%"}} onKeyDown={e=>{if(e.key==="Enter"&&e.ctrlKey)addNote();}}/>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:6}}><button className="btn btn-p" onClick={addNote} style={{fontSize:11}}><Plus size={11}/> Add Note</button></div>
      </div>
    </div>
  </>;
};
const Deals=({deals,setDeals,search})=>{
  const [sortCol,setSortCol]=useState("value");
  const [sortDir,setSortDir]=useState(-1);
  const [stageFilter,setStageFilter]=useState("");
  const [selectedDeal,setSelectedDeal]=useState(null);
  const filtered=deals.filter(d=>!search||d.title.toLowerCase().includes(search.toLowerCase())||d.company.toLowerCase().includes(search.toLowerCase())).filter(d=>!stageFilter||d.stage===stageFilter).sort((a,b)=>(a[sortCol]>b[sortCol]?1:-1)*sortDir);
  const total=filtered.reduce((s,d)=>s+d.value,0);
  return <div className="fade">
    <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center"}}>
      <div style={{fontSize:12,color:"#6d8ab5",marginRight:4}}>Filter:</div>
      {["", ...STAGES].map(s=><button key={s} className={`btn ${stageFilter===s?"btn-p":"btn-g"}`} onClick={()=>setStageFilter(s)} style={{padding:"4px 11px",fontSize:11}}>{s||"All"}</button>)}
      <span style={{marginLeft:"auto",fontSize:12,color:"#6d8ab5"}}>{filtered.length} deals · <span style={{color:"#4c8fff",fontFamily:"monospace",fontWeight:700}}>{fmt(total)}</span></span>
    </div>
    <div style={{fontSize:11,color:"var(--t3)",marginBottom:10}}>Click any row to view deal details, notes, and meeting minutes.</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><div className="tbl-wrap"><table>
      <thead><tr>{[["title","Deal"],["company","Company"],["value","Value"],["stage","Stage"],["probability","Prob."],["industry","Industry"],["priority","Priority"],["source","Source"],["expectedClose","Close Date"]].map(([k,l])=><th key={k} style={{cursor:"pointer"}} onClick={()=>{setSortCol(k);setSortDir(sortCol===k?-sortDir:-1);}}>{l}{sortCol===k?(sortDir===-1?" ↓":" ↑"):""}</th>)}</tr></thead>
      <tbody>{filtered.map(d=><tr key={d.id} onClick={()=>{setSelectedDeal(d);_analytics.track("deal_row_click",{dealId:d.id});}}><td>{d.title}</td><td>{d.company}</td><td style={{color:"#4c8fff",fontFamily:"monospace",fontWeight:700}}>{fmt(d.value)}</td><td><StageBadge stage={d.stage}/></td><td style={{fontFamily:"monospace"}}>{d.probability}%</td><td><span className="chip ind">{d.industry}</span></td><td><span className={`chip ${d.priority}`}>{d.priority}</span></td><td>{d.source}</td><td>{d.expectedClose}</td></tr>)}</tbody>
    </table></div></div>
    {selectedDeal&&<DealDetailDrawer deal={deals.find(d=>d.id===selectedDeal.id)||selectedDeal} onClose={()=>setSelectedDeal(null)} onUpdate={(updated)=>setDeals(prev=>prev.map(d=>d.id===updated.id?updated:d))}/>}
  </div>;
};

const ContactDetailModal=({contact,onClose})=><div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
  <div className="modal pop">
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}><div className="ca" style={{width:52,height:52,fontSize:18,background:contact.color}}>{initials(contact.name)}</div><div><div style={{fontSize:18,fontWeight:800,color:"var(--t1)"}}>{contact.name}</div><div style={{fontSize:12,color:"var(--t2)",marginTop:2}}>{contact.title} · {contact.company}</div></div></div>
      <div className="ib" onClick={onClose}><X size={13}/></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
      {[{l:"Email",v:contact.email,icon:<Mail size={11}/>},{l:"Phone",v:contact.phone,icon:<Phone size={11}/>},{l:"Total Value",v:fmt(contact.value),icon:<DollarSign size={11}/>},{l:"Deals",v:contact.deals+" deal"+(contact.deals!==1?"s":""),icon:<Briefcase size={11}/>},{l:"Last Contact",v:contact.lastContact,icon:<Clock size={11}/>},{l:"Lead Score",v:contact.score+" / 100",icon:<Star size={11}/>}].map((item,i)=>
        <div key={i} style={{background:"var(--s2)",border:"1px solid var(--b1)",borderRadius:8,padding:"10px 12px"}}>
          <div style={{fontSize:10,color:"var(--t3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4,display:"flex",alignItems:"center",gap:4}}>{item.icon} {item.l}</div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>{item.v}</div>
        </div>)}
    </div>
    <div style={{height:4,borderRadius:2,background:"var(--s3)",overflow:"hidden",marginBottom:4}}><div style={{height:"100%",width:contact.score+"%",background:contact.score>=80?"#10d9a0":contact.score>=50?"#f59e0b":"#f43f5e",borderRadius:2}}/></div>
    <div style={{fontSize:10,color:"var(--t3)",marginBottom:16}}>Lead Score · {contact.score>=80?"High":contact.score>=50?"Medium":"Low"} Priority</div>
    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><button className="btn btn-g" onClick={onClose}>Close</button><button className="btn btn-p" onClick={()=>window.open(`mailto:${contact.email}`)}><Mail size={11}/> Send Email</button></div>
  </div>
</div>;
const Contacts=({contacts,search})=>{
  const [selected,setSelected]=useState(null);
  const filtered=contacts.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase())||c.company.toLowerCase().includes(search.toLowerCase()));
  return <div className="fade">
    <div style={{fontSize:11,color:"var(--t3)",marginBottom:12}}>Contacts are linked to your CRM deals. Click any card to view full details.</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {filtered.map(c=><div key={c.id} className="cc" onClick={()=>{setSelected(c);_analytics.track("contact_click",{contactId:c.id});}}>
        <div className="ca" style={{background:c.color}}>{initials(c.name)}</div>
        <div style={{flex:1,minWidth:0}}>
          <div className="cn1">{c.name}</div><div className="cn2">{c.title} · {c.company}</div>
          <div style={{display:"flex",gap:10,marginTop:6}}><span style={{display:"flex",alignItems:"center",gap:4,fontSize:10.5,color:"#3a5078"}}><Mail size={10}/>{c.email.split("@")[0]}…</span><span style={{display:"flex",alignItems:"center",gap:4,fontSize:10.5,color:"#3a5078"}}><Clock size={10}/>{c.lastContact}</span></div>
        </div>
        <div className="cm"><div className="cv">{fmt(c.value)}</div><div className="cd">{c.deals} deal{c.deals!==1?"s":""}</div><div style={{marginTop:4,display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end"}}><div style={{fontSize:11,fontWeight:800,color:c.color,fontFamily:"monospace"}}>{c.score}</div><div style={{fontSize:9.5,color:"#3a5078"}}>score</div></div></div>
      </div>)}
    </div>
    {selected&&<ContactDetailModal contact={selected} onClose={()=>setSelected(null)}/>}
  </div>;
};
const CompanyDetailModal=({company,onClose})=><div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
  <div className="modal pop">
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:50,height:50,borderRadius:12,background:company.color,fontSize:18,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>{company.name[0]}</div><div><div style={{fontSize:18,fontWeight:800,color:"var(--t1)"}}>{company.name}</div><div style={{fontSize:12,color:"var(--t2)",marginTop:2}}>{company.industry} · {company.location}</div></div></div>
      <div className="ib" onClick={onClose}><X size={13}/></div>
    </div>
    {company.description&&<div style={{background:"var(--s2)",border:"1px solid var(--b1)",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:12.5,color:"var(--t2)",lineHeight:1.6}}>{company.description}</div>}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
      {[{l:"Employees",v:company.employees},{l:"Revenue",v:company.revenue},{l:"Funding",v:company.funding},{l:"Contacts",v:company.contacts},{l:"Open Deals",v:company.openDeals},{l:"Total Value",v:fmt(company.totalValue)}].map((item,i)=>
        <div key={i} style={{background:"var(--s2)",border:"1px solid var(--b1)",borderRadius:8,padding:"10px 12px"}}>
          <div style={{fontSize:9.5,color:"var(--t3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>{item.l}</div>
          <div style={{fontSize:13,fontWeight:700,color:item.l==="Total Value"?"var(--a)":"var(--t1)",fontFamily:item.l==="Total Value"?"monospace":"inherit"}}>{item.v}</div>
        </div>)}
    </div>
    <div style={{display:"flex",gap:8,alignItems:"center",padding:"8px 0",marginBottom:8}}><Globe size={12} color="var(--t3)"/><a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"var(--a)",textDecoration:"none"}} onClick={e=>e.stopPropagation()}>{company.website}</a><MapPin size={11} color="var(--t3)" style={{marginLeft:12}}/><span style={{fontSize:12,color:"var(--t2)"}}>{company.location}</span></div>
    <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:18}}><button className="btn btn-g" onClick={onClose}>Close</button><button className="btn btn-p" onClick={()=>window.open(`https://${company.website}`,"_blank")}><Globe size={11}/> Visit Website</button></div>
  </div>
</div>;
const Companies=({search})=>{
  const [selected,setSelected]=useState(null);
  const filtered=COMPANIES_DATA.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase()));
  return <div className="fade">
    <div style={{fontSize:11,color:"var(--t3)",marginBottom:10}}>Companies are sourced from your CRM deal data. Click any row to view details.</div>
    <div className="card" style={{padding:0,overflow:"hidden"}}><div className="tbl-wrap"><table>
      <thead><tr><th>Company</th><th>Industry</th><th>Employees</th><th>Revenue</th><th>Funding</th><th>Location</th><th>Contacts</th><th>Open Deals</th><th>Total Value</th></tr></thead>
      <tbody>{filtered.map(c=><tr key={c.id} onClick={()=>{setSelected(c);_analytics.track("company_click",{companyId:c.id});}}>
        <td><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:7,background:c.color,fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0}}>{c.name[0]}</div>{c.name}</div></td>
        <td><span className="chip ind">{c.industry}</span></td><td>{c.employees}</td><td>{c.revenue}</td><td><span className="chip">{c.funding}</span></td>
        <td style={{display:"flex",alignItems:"center",gap:4}}><MapPin size={10}/>{c.location}</td>
        <td style={{textAlign:"center"}}>{c.contacts}</td><td style={{textAlign:"center"}}>{c.openDeals}</td>
        <td style={{color:"#4c8fff",fontFamily:"monospace",fontWeight:700}}>{fmt(c.totalValue)}</td>
      </tr>)}</tbody>
    </table></div></div>
    {selected&&<CompanyDetailModal company={selected} onClose={()=>setSelected(null)}/>}
  </div>;
};

const TargetFinder=({addDeal})=>{
  const [selIndustries,setSelIndustries]=useState([]);
  const [selRevenue,setSelRevenue]=useState([]);
  const [selEmployees,setSelEmployees]=useState([]);
  const [selFunding,setSelFunding]=useState([]);
  const [selRegion,setSelRegion]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const [addedIds,setAddedIds]=useState(new Set());
  const [notification,setNotification]=useState(null);
  const toggle=(setter)=>(val)=>setter(prev=>prev.includes(val)?prev.filter(x=>x!==val):[...prev,val]);
  const buildSearchQuery=(extraTerms="")=>{
    const parts=[];
    if(selIndustries.length) parts.push(selIndustries.join(" OR "));
    if(selRevenue.length) parts.push("revenue "+selRevenue.join(" OR "));
    if(selEmployees.length) parts.push(selEmployees.join(" OR ")+" employees");
    if(selFunding.length) parts.push(selFunding.join(" OR ")+" funding");
    if(selRegion.length) parts.push(selRegion.join(" OR "));
    if(searchTerm) parts.push(searchTerm);
    if(extraTerms) parts.push(extraTerms);
    return (parts.length?parts.join(" "):"B2B SaaS companies")+" companies";
  };
  const openWebSearch=(engine)=>{
    const q=buildSearchQuery();
    if(engine==="google") window.open("https://www.google.com/search?q="+encodeURIComponent(q),"_blank");
    else if(engine==="linkedin") window.open("https://www.linkedin.com/search/results/companies/?keywords="+encodeURIComponent(q),"_blank");
    else if(engine==="crunchbase") window.open("https://www.crunchbase.com/search/organizations/field/organizations/facet_ids/company?q="+encodeURIComponent(q),"_blank");
    _analytics.track("filter_web_search",{engine,query:q});
  };
  const prospects=[
    {id:1,name:"Apex Dynamics",industry:"SaaS",employees:"201–1,000",revenue:"$10M–$100M",funding:"Series B",region:"North America",color:"#6366f1",desc:"AI-powered workflow automation, 340 employees",match:94},
    {id:2,name:"GreenTech Solutions",industry:"CleanTech",employees:"201–1,000",revenue:"$100M+",funding:"Series C+",region:"North America",color:"#06b6d4",desc:"Renewable energy analytics, 600 employees",match:91},
    {id:3,name:"ShopAI",industry:"E-Commerce",employees:"51–200",revenue:"$1M–$10M",funding:"Series A",region:"North America",color:"#f59e0b",desc:"Personalized shopping AI for D2C brands, 120 employees",match:88},
    {id:4,name:"MediSync Health",industry:"HealthTech",employees:"51–200",revenue:"$10M–$100M",funding:"Series B",region:"Europe",color:"#10b981",desc:"EHR interoperability middleware, 180 employees",match:86},
    {id:5,name:"FinFlow Analytics",industry:"FinTech",employees:"201–1,000",revenue:"$10M–$100M",funding:"Series B",region:"North America",color:"#8b5cf6",desc:"Real-time treasury intelligence, 420 employees",match:83},
    {id:6,name:"LogiSmart",industry:"Logistics",employees:"1,000+",revenue:"$100M+",funding:"Series C+",region:"Asia Pacific",color:"#ef4444",desc:"Predictive freight optimization, 2,100 employees",match:79},
    {id:7,name:"CloudSecure",industry:"Cybersecurity",employees:"51–200",revenue:"$1M–$10M",funding:"Series A",region:"North America",color:"#f97316",desc:"Zero-trust access management, 95 employees",match:77},
    {id:8,name:"EduForge",industry:"Education",employees:"11–50",revenue:"< $1M",funding:"Seed",region:"Europe",color:"#14b8a6",desc:"Adaptive learning OS for universities, 38 employees",match:74},
    {id:9,name:"RetailIQ",industry:"Retail",employees:"51–200",revenue:"$10M–$100M",funding:"Series B",region:"North America",color:"#ec4899",desc:"Omnichannel inventory intelligence, 210 employees",match:72},
    {id:10,name:"AgriPrecision",industry:"SaaS",employees:"11–50",revenue:"$1M–$10M",funding:"Series A",region:"Asia Pacific",color:"#84cc16",desc:"Drone-based crop analytics, 45 employees",match:70},
  ];
  const industries=[...new Set(prospects.map(p=>p.industry))];
  const revenues=[...new Set(prospects.map(p=>p.revenue))];
  const employeeRanges=[...new Set(prospects.map(p=>p.employees))];
  const fundings=[...new Set(prospects.map(p=>p.funding))];
  const regions=[...new Set(prospects.map(p=>p.region))];
  const filtered=prospects.filter(p=>{
    if(selIndustries.length&&!selIndustries.includes(p.industry))return false;
    if(selRevenue.length&&!selRevenue.includes(p.revenue))return false;
    if(selEmployees.length&&!selEmployees.includes(p.employees))return false;
    if(selFunding.length&&!selFunding.includes(p.funding))return false;
    if(selRegion.length&&!selRegion.includes(p.region))return false;
    if(searchTerm.trim()){const q=searchTerm.toLowerCase();if(!p.name.toLowerCase().includes(q)&&!p.industry.toLowerCase().includes(q)&&!p.desc.toLowerCase().includes(q))return false;}
    return true;
  });
  const handleAdd=(prospect)=>{
    if(!addDeal)return;
    addDeal({id:Date.now(),title:"New Opportunity",company:prospect.name,contact:"—",value:0,stage:"Lead",industry:prospect.industry,employees:prospect.employees,revenue:prospect.revenue,funding:prospect.funding,probability:Math.round(prospect.match*0.3),daysInStage:0,expectedClose:new Date(Date.now()+90*24*60*60*1000).toISOString().split('T')[0],priority:"warm",notes:[],source:"Target Finder"});
    setAddedIds(prev=>new Set([...prev,prospect.id]));
    setNotification(prospect.name+" added to pipeline!");
    setTimeout(()=>setNotification(null),3000);
    _analytics.track("target_added",{name:prospect.name});
  };
  const FC=({label,options,selected,onToggle})=><div style={{marginBottom:16}}>
    <div style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>{label}</div>
    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{options.map(opt=><button key={opt} onClick={()=>onToggle(opt)} style={{padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:500,cursor:"pointer",border:"1px solid",background:selected.includes(opt)?"#6366f1":"transparent",borderColor:selected.includes(opt)?"#6366f1":"#334155",color:selected.includes(opt)?"#fff":"#94a3b8",transition:"all .15s"}}>{opt}</button>)}</div>
  </div>;
  return <div style={{display:"flex",gap:0,height:"calc(100vh - 56px)",overflow:"hidden"}}>
    <div style={{width:260,flexShrink:0,background:"#0f172a",borderRight:"1px solid #1e293b",padding:20,overflowY:"auto"}}>
      <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:20,display:"flex",alignItems:"center",gap:8}}><Target size={16} color="#6366f1"/> Filters</div>
      <div style={{marginBottom:16}}><input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search companies..." style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}}/></div>
      <FC label="Industry" options={industries} selected={selIndustries} onToggle={toggle(setSelIndustries)}/>
      <FC label="Revenue" options={revenues} selected={selRevenue} onToggle={toggle(setSelRevenue)}/>
      <FC label="Employees" options={employeeRanges} selected={selEmployees} onToggle={toggle(setSelEmployees)}/>
      <FC label="Funding" options={fundings} selected={selFunding} onToggle={toggle(setSelFunding)}/>
      <FC label="Region" options={regions} selected={selRegion} onToggle={toggle(setSelRegion)}/>
      {(selIndustries.length||selRevenue.length||selEmployees.length||selFunding.length||selRegion.length||searchTerm)?<button onClick={()=>{setSelIndustries([]);setSelRevenue([]);setSelEmployees([]);setSelFunding([]);setSelRegion([]);setSearchTerm("");}} style={{marginTop:8,padding:"6px 12px",background:"#1e293b",border:"1px solid #334155",borderRadius:6,color:"#94a3b8",fontSize:12,cursor:"pointer",width:"100%"}}>Clear all filters</button>:null}
      {/* Web Search Section */}
      <div style={{borderTop:"1px solid var(--b1)",paddingTop:16,marginTop:16}}>
        <div style={{fontSize:11,fontWeight:700,color:"#dde8ff",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
          <Globe size={12}/>
          Search Real Companies
        </div>
        <div style={{fontSize:10.5,color:"#6d8ab5",marginBottom:10,lineHeight:1.5}}>
          {(selIndustries.length+selRevenue.length+selEmployees.length+selFunding.length+selRegion.length)>0
            ? `Use your ${selIndustries.length+selRevenue.length+selEmployees.length+selFunding.length+selRegion.length} filter${(selIndustries.length+selRevenue.length+selEmployees.length+selFunding.length+selRegion.length)>1?"s":""} to find real companies online:`
            : "Select filters above, then search the web for real matching companies:"}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          <button className="btn btn-p" style={{width:"100%",justifyContent:"center",gap:6}} onClick={()=>openWebSearch("google")}>
            <Search size={11}/> Search Google
          </button>
          <button className="btn btn-g" style={{width:"100%",justifyContent:"center",gap:6,border:"1px solid #0a66c2",color:"#0a66c2"}} onClick={()=>openWebSearch("linkedin")}>
            <Users size={11}/> Search LinkedIn
          </button>
          <button className="btn btn-g" style={{width:"100%",justifyContent:"center",gap:6}} onClick={()=>openWebSearch("crunchbase")}>
            <BarChart3 size={11}/> Browse Crunchbase
          </button>
        </div>
        {(selIndustries.length+selRevenue.length+selEmployees.length+selFunding.length+selRegion.length)>0&&(
          <div style={{marginTop:10,padding:"8px 10px",background:"var(--s2)",borderRadius:8,border:"1px solid var(--b1)"}}>
            <div style={{fontSize:9.5,color:"#3a5078",marginBottom:4,fontWeight:700}}>SEARCH QUERY PREVIEW</div>
            <div style={{fontSize:10.5,color:"#6d8ab5",wordBreak:"break-word",lineHeight:1.5}}>{buildSearchQuery()}</div>
          </div>
        )}
      </div>
    </div>
    <div style={{flex:1,background:"#0a0f1a",overflowY:"auto",padding:24,position:"relative"}}>
      {notification&&<div style={{position:"fixed",top:20,right:20,background:"#10b981",color:"#fff",padding:"10px 18px",borderRadius:8,fontWeight:600,fontSize:13,zIndex:1000,boxShadow:"0 4px 12px rgba(0,0,0,0.3)"}}>✓ {notification}</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{color:"#fff",margin:0,fontSize:18,fontWeight:700}}>Target Companies</h2><p style={{color:"#64748b",margin:"4px 0 0",fontSize:13}}>{filtered.length} of {prospects.length} match your criteria</p></div>
      </div>
      {filtered.length===0?<div style={{textAlign:"center",padding:60,color:"#475569"}}><Target size={40} style={{marginBottom:12,opacity:0.4}}/><p style={{fontSize:15}}>No companies match filters.</p></div>:
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {filtered.map(p=><div key={p.id} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:12,padding:20,display:"flex",flexDirection:"column",gap:10,borderLeft:"3px solid "+p.color}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{p.name}</div><div style={{fontSize:12,color:"#64748b",marginTop:2}}>{p.industry} · {p.region}</div></div>
            <div style={{background:"#1e293b",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700,color:p.match>=85?"#10b981":p.match>=75?"#f59e0b":"#94a3b8"}}>{p.match}% match</div>
          </div>
          <p style={{fontSize:13,color:"#94a3b8",margin:0,lineHeight:1.5}}>{p.desc}</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[p.employees+" emp",p.revenue,p.funding].map(tag=><span key={tag} style={{background:"#1e293b",borderRadius:6,padding:"3px 8px",fontSize:11,color:"#64748b"}}>{tag}</span>)}</div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>{window.open(`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(p.name)}`,"_blank");_analytics.track("linkedin_search",{name:p.name});}} style={{flex:1,padding:"7px 8px",borderRadius:7,border:"1px solid #334155",cursor:"pointer",background:"#1e293b",color:"#94a3b8",fontWeight:600,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Globe size={11}/> LinkedIn</button>
            <button onClick={()=>{window.open(`https://www.google.com/search?q=${encodeURIComponent(p.name+" "+p.industry)}`,"_blank");_analytics.track("google_search",{name:p.name});}} style={{flex:1,padding:"7px 8px",borderRadius:7,border:"1px solid #334155",cursor:"pointer",background:"#1e293b",color:"#94a3b8",fontWeight:600,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Search size={11}/> Google</button>
            <button onClick={()=>{window.open(`https://www.crunchbase.com/search/organizations/field/organizations/facet_ids/company?q=${encodeURIComponent(p.name)}`,"_blank");_analytics.track("crunchbase_search",{name:p.name});}} style={{flex:1,padding:"7px 8px",borderRadius:7,border:"1px solid #334155",cursor:"pointer",background:"#1e293b",color:"#94a3b8",fontWeight:600,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><BarChart3 size={11}/> Crunchbase</button>
            <button onClick={()=>handleAdd(p)} disabled={addedIds.has(p.id)} style={{flex:1,padding:"7px 8px",borderRadius:7,border:"none",cursor:addedIds.has(p.id)?"not-allowed":"pointer",background:addedIds.has(p.id)?"#1e293b":"#6366f1",color:addedIds.has(p.id)?"#475569":"#fff",fontWeight:600,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:4,transition:"all .2s"}}>{addedIds.has(p.id)?"✓ Added":<><Plus size={11}/> Add to CRM</>}</button>
          </div>
        </div>)}
      </div>}
    </div>
  </div>;
};

const Analytics=({deals})=>{
  const won=deals.filter(d=>d.stage==="Won");
  const lost=deals.filter(d=>d.stage==="Lost");
  const open=deals.filter(d=>d.stage!=="Won"&&d.stage!=="Lost");
  const sourceData=[...new Set(deals.map(d=>d.source))].map(src=>({name:src,value:deals.filter(d=>d.source===src).length,revenue:deals.filter(d=>d.source===src).reduce((s,d)=>s+d.value,0)}));
  const stageConv=[{stage:"Lead→Qual",rate:68},{stage:"Qual→Prop",rate:54},{stage:"Prop→Nego",rate:71},{stage:"Nego→Won",rate:83}];
  const indBreakdown=INDUSTRIES.slice(0,7).map(ind=>({name:ind.slice(0,8),deals:deals.filter(d=>d.industry===ind).length,value:Math.round(deals.filter(d=>d.industry===ind).reduce((s,d)=>s+d.value,0)/1000)})).filter(d=>d.deals>0);
  const forecast=[{m:"Feb",actual:318,forecast:null},{m:"Mar",actual:null,forecast:355},{m:"Apr",actual:null,forecast:398},{m:"May",actual:null,forecast:445},{m:"Jun",actual:null,forecast:502}];
  const empDist=[{label:"1–10",count:2},{label:"11–50",count:4},{label:"51–200",count:5},{label:"201–1K",count:7},{label:"1K+",count:2}];
  const weightedPipeline=open.reduce((s,d)=>s+d.value*d.probability/100,0);
  return <div className="fade">
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:16}}>
      {[{l:"Open Deals",v:open.length,c:"#4c8fff"},{l:"Pipeline Value",v:fmt(open.reduce((s,d)=>s+d.value,0)),c:"#818cf8"},{l:"Deals Won",v:won.length,c:"#10d9a0"},{l:"Deals Lost",v:lost.length,c:"#f43f5e"},{l:"Weighted Value",v:fmt(weightedPipeline),c:"#f59e0b"}].map((k,i)=>
        <div key={i} className="stat" style={{"--ac":k.c}}><div className="stat-l">{k.l}</div><div className="stat-v" style={{fontSize:20}}>{k.v}</div></div>)}
    </div>
    <div className="g2" style={{marginBottom:14}}>
      <div className="card"><div className="card-t">Win/Loss Trend</div>
        <ResponsiveContainer width="100%" height={175}><BarChart data={MONTHLY} margin={{top:5,right:10,left:-30,bottom:0}} barSize={14} barGap={4}>
          <XAxis dataKey="m" tick={{fill:"#3a5078",fontSize:10}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"#3a5078",fontSize:10}} axisLine={false} tickLine={false}/>
          <Tooltip content={<CustomTooltip/>}/><Legend wrapperStyle={{fontSize:10,paddingTop:6}}/>
          <Bar dataKey="won" name="Won" fill="#10d9a0" radius={[3,3,0,0]}/><Bar dataKey="lost" name="Lost" fill="#f43f5e" radius={[3,3,0,0]}/>
        </BarChart></ResponsiveContainer>
      </div>
      <div className="card"><div className="card-t">Revenue Forecast ($K)</div>
        <div className="forecast-info">
          <div className="forecast-info-title"><TrendingUp size={11}/> How this forecast is calculated</div>
          <div className="forecast-info-body">The forecast uses a <b>weighted pipeline model</b>: each open deal's value is multiplied by its probability %, then summed by projected close month. The <b>blue line</b> is actual revenue; the <b>dashed purple</b> projects future months using a <b>12% MoM growth rate</b> based on 6-month performance. Current weighted pipeline: <b>{fmt(weightedPipeline)}</b>.</div>
        </div>
        <ResponsiveContainer width="100%" height={130}><LineChart data={forecast} margin={{top:5,right:15,left:-30,bottom:0}}>
          <XAxis dataKey="m" tick={{fill:"#3a5078",fontSize:10}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"#3a5078",fontSize:10}} axisLine={false} tickLine={false}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Line dataKey="actual" stroke="#4c8fff" strokeWidth={2.5} dot={{fill:"#4c8fff",r:4}} name="Actual" connectNulls={false}/>
          <Line dataKey="forecast" stroke="#818cf8" strokeWidth={2} strokeDasharray="6 3" dot={{fill:"#818cf8",r:3}} name="Forecast" connectNulls={false}/>
        </LineChart></ResponsiveContainer>
      </div>
    </div>
    <div className="g3" style={{marginBottom:14}}>
      <div className="card"><div className="card-t">Deal Sources</div>
        <ResponsiveContainer width="100%" height={160}><PieChart><Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3}>{sourceData.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}</Pie><Tooltip content={<CustomTooltip/>}/><Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:10}}/></PieChart></ResponsiveContainer>
      </div>
      <div className="card"><div className="card-t">Stage Conversion</div>
        {stageConv.map((s,i)=><div key={i} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:"#dde8ff",fontWeight:600}}>{s.stage}</span><span style={{fontSize:11,color:s.rate>=70?"#10d9a0":"#f59e0b",fontFamily:"monospace",fontWeight:700}}>{s.rate}%</span></div><div className="pbar"><div className="pfill" style={{width:`${s.rate}%`,background:s.rate>=70?"#10d9a0":"#f59e0b"}}/></div></div>)}
      </div>
      <div className="card"><div className="card-t">Customer Size Mix</div>
        <ResponsiveContainer width="100%" height={160}><BarChart data={empDist} layout="vertical" margin={{top:0,right:20,left:0,bottom:0}} barSize={10}>
          <XAxis type="number" hide/><YAxis type="category" dataKey="label" tick={{fill:"#6d8ab5",fontSize:10}} axisLine={false} tickLine={false} width={45}/>
          <Tooltip content={<CustomTooltip/>}/><Bar dataKey="count" name="Deals" radius={[0,3,3,0]}>{empDist.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}</Bar>
        </BarChart></ResponsiveContainer>
      </div>
    </div>
    <div className="card"><div className="card-t">Industry Breakdown</div>
      <ResponsiveContainer width="100%" height={150}><BarChart data={indBreakdown} margin={{top:5,right:20,left:-20,bottom:0}} barSize={26}>
        <XAxis dataKey="name" tick={{fill:"#3a5078",fontSize:10}} axisLine={false} tickLine={false}/>
        <YAxis tick={{fill:"#3a5078",fontSize:10}} axisLine={false} tickLine={false}/>
        <Tooltip content={<CustomTooltip/>}/><Bar dataKey="value" name="Value ($K)" radius={[4,4,0,0]}>{indBreakdown.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}</Bar>
      </BarChart></ResponsiveContainer>
    </div>
  </div>;
};

const AppAnalyticsView=()=>{
  const [,setNow]=useState(Date.now());
  useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(t);},[]);
  const pages=["dashboard","analytics","pipeline","deals","contacts","companies","targets","appanalytics","settings"];
  const pageLabels={dashboard:"Dashboard",analytics:"Analytics",pipeline:"Pipeline",deals:"Deals",contacts:"Contacts",companies:"Companies",targets:"Target Finder",appanalytics:"App Analytics",settings:"Settings"};
  const pageTimes=pages.map(p=>({page:pageLabels[p]||p,seconds:_analytics.getPageTime(p)})).filter(p=>p.seconds>0).sort((a,b)=>b.seconds-a.seconds);
  const sessionDur=_analytics.sessionDuration();
  const eventCounts={};
  _analytics.events.forEach(e=>{eventCounts[e.event]=(eventCounts[e.event]||0)+1;});
  const eventList=Object.entries(eventCounts).sort((a,b)=>b[1]-a[1]);
  const loadTime=_perf.getLoadTime();
  const fcp=_perf.getFCP();
  const recentEvents=[..._analytics.events].reverse().slice(0,20);
  return <div className="fade">
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
      {[{l:"Session Duration",v:fmtSecs(sessionDur),sub:"active session",c:"#4c8fff"},{l:"Page Views",v:_analytics.events.filter(e=>e.event==="page_view").length,sub:"this session",c:"#818cf8"},{l:"Actions Taken",v:_analytics.events.filter(e=>e.event!=="page_view").length,sub:"clicks & interactions",c:"#10d9a0"},{l:"Page Load Time",v:loadTime?loadTime+"ms":"N/A",sub:fcp?"FCP: "+fcp+"ms":"performance API",c:"#f59e0b"}].map((s,i)=>
        <div key={i} className="stat" style={{"--ac":s.c}}><div className="stat-l">{s.l}</div><div className="stat-v" style={{fontSize:22,fontFamily:"monospace"}}>{s.v}</div><div className="stat-s"><span>{s.sub}</span></div></div>)}
    </div>
    <div className="g2r" style={{marginBottom:14}}>
      <div className="card"><div className="card-t" style={{display:"flex",alignItems:"center",gap:6}}><Eye size={11}/> Time Spent Per Page</div>
        {pageTimes.length===0?<div style={{fontSize:12,color:"var(--t3)",padding:"20px 0",textAlign:"center"}}>Navigate between pages to start tracking.</div>:
        pageTimes.map((p,i)=><div key={p.page} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:"var(--t1)",fontWeight:600}}>{p.page}</span><span style={{fontSize:11,color:"var(--a)",fontFamily:"monospace",fontWeight:700}}>{fmtSecs(p.seconds)}</span></div><div className="pbar"><div className="pfill" style={{width:`${Math.min(100,(p.seconds/Math.max(pageTimes[0].seconds,1))*100)}%`,background:PALETTE[i%PALETTE.length]}}/></div></div>)}
      </div>
      <div className="card"><div className="card-t" style={{display:"flex",alignItems:"center",gap:6}}><Activity size={11}/> Top Interactions</div>
        {eventList.length===0?<div style={{fontSize:12,color:"var(--t3)",padding:"20px 0",textAlign:"center"}}>No interactions yet.</div>:
        eventList.map(([event,count],i)=><div key={event} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--b1)"}}><span style={{fontSize:12,color:"var(--t2)",fontFamily:"monospace"}}>{event}</span><span style={{fontSize:12,fontWeight:700,color:PALETTE[i%PALETTE.length],fontFamily:"monospace"}}>{count}×</span></div>)}
      </div>
    </div>
    <div className="g2" style={{marginBottom:14}}>
      <div className="card"><div className="card-t" style={{display:"flex",alignItems:"center",gap:6}}><Gauge size={11}/> Performance Metrics</div>
        {[{l:"Page Load Time",v:loadTime?loadTime+" ms":"N/A",good:loadTime&&loadTime<2000,desc:"Time from navigation to load event"},{l:"First Contentful Paint",v:fcp?fcp+" ms":"N/A",good:fcp&&fcp<1800,desc:"Time to first visible content"},{l:"Session Start",v:new Date(_analytics.sessionStart).toLocaleTimeString(),good:true,desc:"When this session began"},{l:"Navigation Count",v:_analytics.navCount,good:true,desc:"Total page navigations"}].map((m,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--b1)"}}><div><div style={{fontSize:12,color:"var(--t1)",fontWeight:600}}>{m.l}</div><div style={{fontSize:10,color:"var(--t3)",marginTop:2}}>{m.desc}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:m.good?"#10d9a0":"#f43f5e",fontFamily:"monospace"}}>{m.v}</div></div></div>)}
      </div>
      <div className="card"><div className="card-t" style={{display:"flex",alignItems:"center",gap:6}}><Clock size={11}/> Recent Activity Log</div>
        <div style={{maxHeight:220,overflowY:"auto"}}>
          {recentEvents.length===0?<div style={{fontSize:12,color:"var(--t3)",padding:"20px 0",textAlign:"center"}}>No events yet.</div>:
          recentEvents.map((e,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid var(--b1)",fontSize:11}}><span style={{color:"var(--a)",fontFamily:"monospace"}}>{e.event}</span><span style={{color:"var(--t3)"}}>{new Date(e.ts).toLocaleTimeString()}</span></div>)}
        </div>
      </div>
    </div>
    <div className="card"><div className="card-t">About App Analytics</div><div style={{fontSize:12.5,color:"var(--t2)",lineHeight:1.8}}><b style={{color:"var(--t1)"}}>User Analytics</b> tracks page visits, time spent per page, and actions taken (opening deals, adding notes, etc.). All data is session-only and resets on refresh. <b style={{color:"var(--t1)"}}>App Performance</b> uses the browser Performance API to measure page load time and First Contentful Paint (FCP). A load time under 2 seconds and FCP under 1.8 seconds are considered good.</div></div>
  </div>;
};

const SettingsView=()=>{
  const [stages,setStages]=useState([...STAGES]);
  const [industries,setIndustries]=useState([...INDUSTRIES]);
  const [newStage,setNewStage]=useState("");
  const [newInd,setNewInd]=useState("");
  const [notifs,setNotifs]=useState([{label:"New deal assigned to you",on:true},{label:"Deal stage changed",on:true},{label:"Deal closes within 7 days",on:true},{label:"Contact activity",on:false},{label:"Weekly pipeline report",on:true}]);
  const [showInvite,setShowInvite]=useState(false);
  const [inviteEmail,setInviteEmail]=useState("");
  const [inviteRole,setInviteRole]=useState("Account Executive");
  const [inviteSent,setInviteSent]=useState(false);
  const toggleNotif=(i)=>{setNotifs(prev=>prev.map((n,idx)=>idx===i?{...n,on:!n.on}:n));_analytics.track("notification_toggle",{index:i});};
  const sendInvite=()=>{if(!inviteEmail.trim())return;setInviteSent(true);_analytics.track("invite_sent",{email:inviteEmail});setTimeout(()=>{setInviteSent(false);setInviteEmail("");setShowInvite(false);},2500);};
  return <div className="fade">
    <div className="g2">
      <div>
        <div className="card" style={{marginBottom:14}}>
          <div className="card-t">Pipeline Stages</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {stages.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,background:"var(--s2)",padding:"8px 12px",borderRadius:8,border:"1px solid var(--b1)"}}><GripVertical size={12} color="#3a5078"/><span className="s-dot" style={{width:8,height:8,borderRadius:"50%",background:STAGE_COLORS[s]||"#4c8fff"}}/><span style={{flex:1,fontSize:12.5,fontWeight:600,color:"#dde8ff"}}>{s}</span><Trash2 size={12} color="#3a5078" style={{cursor:"pointer"}} onClick={()=>setStages(prev=>prev.filter((_,j)=>j!==i))}/></div>)}
          </div>
          <div style={{display:"flex",gap:8}}><input className="fi" placeholder="New stage name…" value={newStage} onChange={e=>setNewStage(e.target.value)} style={{flex:1}}/><button className="btn btn-p" onClick={()=>{if(newStage.trim()){setStages(prev=>[...prev,newStage.trim()]);setNewStage("");}}}><Plus size={12}/>Add</button></div>
        </div>
        <div className="card">
          <div className="card-t">Team Members</div>
          {USERS.map((user,i)=><div key={user.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--b1)"}}><div className="ava" style={{background:user.color}}>{user.initials}</div><div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:600,color:"#dde8ff"}}>{user.name}</div><div style={{fontSize:11,color:"#6d8ab5"}}>{user.role}</div></div><span className="chip ok">Active</span></div>)}
          <button className="btn btn-g" style={{marginTop:12,width:"100%",justifyContent:"center"}} onClick={()=>setShowInvite(true)}><UserPlus size={12}/>Invite Member</button>
        </div>
      </div>
      <div>
        <div className="card" style={{marginBottom:14}}>
          <div className="card-t">Industries</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14}}>
            {industries.map((ind,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,background:"var(--s2)",border:"1px solid var(--b1)",borderRadius:20,padding:"4px 10px"}}><span style={{fontSize:11,fontWeight:600,color:"#c4b5fd"}}>{ind}</span><X size={9} color="#3a5078" style={{cursor:"pointer"}} onClick={()=>setIndustries(prev=>prev.filter(x=>x!==ind))}/></div>)}
          </div>
          <div style={{display:"flex",gap:8}}><input className="fi" placeholder="Add industry…" value={newInd} onChange={e=>setNewInd(e.target.value)} style={{flex:1}}/><button className="btn btn-p" onClick={()=>{if(newInd.trim()){setIndustries(prev=>[...prev,newInd.trim()]);setNewInd("");}}}><Plus size={12}/>Add</button></div>
        </div>
        <div className="card" style={{marginBottom:14}}>
          <div className="card-t">Deal Sources</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{["Referral","Cold Outreach","LinkedIn","Website","Event","Partnership","Inbound"].map((s,i)=><span key={i} className="chip" style={{background:"rgba(76,143,255,.12)",color:"#93c5fd",fontSize:11,padding:"4px 10px"}}>{s}</span>)}</div>
        </div>
        <div className="card">
          <div className="card-t">Notifications</div>
          {notifs.map((n,i)=><div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:i<notifs.length-1?"1px solid var(--b1)":"none"}}><span style={{fontSize:12.5,color:"#dde8ff"}}>{n.label}</span><div onClick={()=>toggleNotif(i)} style={{width:34,height:19,borderRadius:20,background:n.on?"rgba(76,143,255,.5)":"var(--s3)",cursor:"pointer",position:"relative",transition:"all .2s",flexShrink:0}}><div style={{width:13,height:13,borderRadius:"50%",background:n.on?"var(--a)":"#3a5078",position:"absolute",top:3,left:n.on?18:3,transition:"all .2s"}}/></div></div>)}
        </div>
      </div>
    </div>
    {showInvite&&<div className="mb" onClick={e=>e.target===e.currentTarget&&setShowInvite(false)}>
      <div className="modal pop">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}><div className="mt" style={{margin:0}}>Invite Team Member</div><div className="ib" onClick={()=>setShowInvite(false)}><X size={13}/></div></div>
        {inviteSent?<div style={{textAlign:"center",padding:"24px 0"}}><CheckCircle2 size={40} color="#10d9a0" style={{marginBottom:12}}/><div style={{fontSize:15,fontWeight:700,color:"var(--t1)",marginBottom:6}}>Invite Sent!</div><div style={{fontSize:12,color:"var(--t2)"}}>Invitation sent to {inviteEmail}</div></div>:
        <><div className="fr"><label className="fl2">Email Address *</label><input className="fi" type="email" placeholder="teammate@company.com" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)}/></div>
        <div className="fr"><label className="fl2">Role</label><select className="fi" value={inviteRole} onChange={e=>setInviteRole(e.target.value)} style={{appearance:"none"}}>{["Sales Manager","Account Executive","SDR","Marketing","Operations","Viewer"].map(r=><option key={r} value={r}>{r}</option>)}</select></div>
        <div className="fr"><label className="fl2">Message (optional)</label><textarea className="notes-area" placeholder="I'd like to invite you to our FlowCRM workspace…" style={{minHeight:60}}/></div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button className="btn btn-g" onClick={()=>setShowInvite(false)}>Cancel</button><button className="btn btn-p" onClick={sendInvite}><UserPlus size={12}/>Send Invite</button></div></>}
      </div>
    </div>}
  </div>;
};
const AddDealModal=({onClose,onAdd})=>{
  const [form,setForm]=useState({title:"",company:"",contact:"",value:"",stage:"Lead",industry:"SaaS",priority:"warm",source:"Website",probability:30,expectedClose:"",employees:"51–200",revenue:"$1M–$10M",funding:"Series A"});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  return <div className="mb" onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className="modal pop">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}><div className="mt" style={{margin:0}}>New Deal</div><div className="ib" onClick={onClose}><X size={13}/></div></div>
      <div className="fi-row"><div className="fr"><label className="fl2">Deal Title *</label><input className="fi" placeholder="e.g. Enterprise License" value={form.title} onChange={e=>set("title",e.target.value)}/></div><div className="fr"><label className="fl2">Value ($)</label><input className="fi" type="number" placeholder="50000" value={form.value} onChange={e=>set("value",e.target.value)}/></div></div>
      <div className="fi-row"><div className="fr"><label className="fl2">Company</label><input className="fi" placeholder="Company name" value={form.company} onChange={e=>set("company",e.target.value)}/></div><div className="fr"><label className="fl2">Contact</label><input className="fi" placeholder="Contact name" value={form.contact} onChange={e=>set("contact",e.target.value)}/></div></div>
      <div className="fi-row">
        <div className="fr"><label className="fl2">Stage</label><select className="fi" value={form.stage} onChange={e=>set("stage",e.target.value)} style={{appearance:"none"}}>{STAGES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
        <div className="fr"><label className="fl2">Industry</label><select className="fi" value={form.industry} onChange={e=>set("industry",e.target.value)} style={{appearance:"none"}}>{INDUSTRIES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
      </div>
      <div className="fi-row">
        <div className="fr"><label className="fl2">Priority</label><select className="fi" value={form.priority} onChange={e=>set("priority",e.target.value)} style={{appearance:"none"}}>{["hot","warm","cold"].map(s=><option key={s} value={s}>{s.toUpperCase()}</option>)}</select></div>
        <div className="fr"><label className="fl2">Source</label><select className="fi" value={form.source} onChange={e=>set("source",e.target.value)} style={{appearance:"none"}}>{["Referral","Cold Outreach","LinkedIn","Website","Event","Partnership","Inbound"].map(s=><option key={s} value={s}>{s}</option>)}</select></div>
      </div>
      <div className="fi-row">
        <div className="fr"><label className="fl2">Revenue Range</label><select className="fi" value={form.revenue} onChange={e=>set("revenue",e.target.value)} style={{appearance:"none"}}>{REVENUE_RANGES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
        <div className="fr"><label className="fl2">Funding Stage</label><select className="fi" value={form.funding} onChange={e=>set("funding",e.target.value)} style={{appearance:"none"}}>{FUNDING_STAGES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
      </div>
      <div className="fi-row"><div className="fr"><label className="fl2">Probability (%)</label><input className="fi" type="number" min={0} max={100} value={form.probability} onChange={e=>set("probability",+e.target.value)}/></div><div className="fr"><label className="fl2">Expected Close</label><input className="fi" type="date" value={form.expectedClose} onChange={e=>set("expectedClose",e.target.value)}/></div></div>
      <div style={{display:"flex",gap:8,marginTop:18,justifyContent:"flex-end"}}><button className="btn btn-g" onClick={onClose}>Cancel</button><button className="btn btn-p" onClick={()=>{if(!form.title||!form.company)return;onAdd({...form,id:Date.now(),value:+form.value||0,daysInStage:0,notes:[]});_analytics.track("deal_created",{stage:form.stage});onClose();}}><Plus size={12}/>Create Deal</button></div>
    </div>
  </div>;
};
export default function App(){
  const [view,setView]=useState("dashboard");
  const [deals,setDeals]=useState(INIT_DEALS);
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(null);
  const [currentUser,setCurrentUser]=useState(USERS[0]);
  const [showUserMenu,setShowUserMenu]=useState(false);
  useEffect(()=>{_analytics.enterPage("dashboard");_perf.mark("app_ready");_analytics.track("app_loaded",{loadMs:_perf.measure("app_ready","app_init")});},[]);
  const handleSetView=useCallback((v)=>{_analytics.enterPage(v);setView(v);setSearch("");},[]);
  const addDeal=(deal)=>setDeals(prev=>[deal,...prev]);
  return <>
    <style>{CSS}</style>
    <div className="shell" style={{position:"relative"}}>
      {showUserMenu&&<UserMenu currentUser={currentUser} onSwitch={(u)=>{setCurrentUser(u);_analytics.track("user_switch",{userId:u.id});}} onClose={()=>setShowUserMenu(false)} onSignOut={()=>{setShowUserMenu(false);setView("login");}}/>}
      <Sidebar view={view} setView={handleSetView} dealCount={deals.filter(d=>d.stage!=="Won"&&d.stage!=="Lost").length} currentUser={currentUser} onUserClick={()=>setShowUserMenu(v=>!v)}/>
      <div className="main">
        <Topbar view={view} search={search} setSearch={setSearch} onAdd={()=>setModal("add")}/>
        <div className="content">
          {view==="dashboard"&&<Dashboard deals={deals}/>}
          {view==="pipeline"&&<Pipeline deals={deals} setDeals={setDeals}/>}
          {view==="deals"&&<Deals deals={deals} setDeals={setDeals} search={search}/>}
          {view==="contacts"&&<Contacts contacts={CONTACTS} search={search}/>}
          {view==="companies"&&<Companies search={search}/>}
          {view==="targets"&&<TargetFinder addDeal={addDeal}/>}
          {view==="analytics"&&<Analytics deals={deals}/>}
          {view==="appanalytics"&&<AppAnalyticsView/>}
          {view==="login"&&<LoginView onLogin={()=>setView("dashboard")}/>}
    {view==="settings"&&<SettingsView/>}
        </div>
      </div>
      {modal==="add"&&<AddDealModal onClose={()=>setModal(null)} onAdd={addDeal}/>}
    </div>
  </>;
}
