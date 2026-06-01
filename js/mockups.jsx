/* global React, Icon */
/* =========================================================================
   In-product mockups — tiny faithful renders of the Artisio back-office,
   shown inside the tablet frame. Built from the DS dashboard vocabulary.
   ========================================================================= */

const LOGO_ON_NAVY = (
  <img src="assets/artisio-logo-white.svg" alt="Artisio" style={{ height: 15, display: "block" }} />
);

const MkSidebar = ({ active = "Dashboard", items }) => {
  const list = items || [
    { n: "dashboard", l: "Dashboard" },
    { n: "gavel", l: "Sales" },
    { n: "inventory", l: "Inventory" },
    { n: "bidders", l: "Bidders" },
    { n: "card", l: "Payments" },
    { n: "analytics", l: "Reports" },
  ];
  return (
    <div className="mk-sb">
      <div className="mk-sb-brand">{LOGO_ON_NAVY}</div>
      <div className="mk-sb-sec">Operations</div>
      {list.map((it) => (
        <div key={it.l} className={"mk-sb-item" + (it.l === active ? " active" : "")}>
          <Icon n={it.n} s={13} sw={1.9} /> {it.l}
        </div>
      ))}
    </div>
  );
};

const MkTop = ({ title }) => (
  <div className="mk-top">
    <span className="mk-title">{title}</span>
    <span className="mk-search" />
    <span className="mk-av" />
  </div>
);

const Pill = ({ k, children }) => (
  <span className={"mk-pill pill-" + k}><span className="pd" />{children}</span>
);

/* ---- Dashboard (hero + CRM tab) ---- */
const MockDashboard = ({ active = "Dashboard", title = "Sales overview", hammer = "£284k", hammerDelta = "▲ 12.4%", liveBid = "£284,150" }) => (
  <div className="mk">
    <MkSidebar active={active} />
    <div className="mk-main">
      <MkTop title={title} />
      <div className="mk-body">
        <div className="mk-stats">
          <div className="mk-stat"><span className="acc" /><div className="lab">Hammer · today</div><div className="val" key={hammer}>{hammer}</div><div className="dl">{hammerDelta}</div></div>
          <div className="mk-stat"><span className="acc sky" /><div className="lab">Bidders</div><div className="val">1,247</div><div className="dl">▲ 88</div></div>
          <div className="mk-stat"><span className="acc suc" /><div className="lab">Sell-through</div><div className="val">82%</div><div className="dl">▲ 1.2%</div></div>
          <div className="mk-stat"><span className="acc wn" /><div className="lab">Avg uplift</div><div className="val">+15%</div><div className="dl">▲ 3.1%</div></div>
        </div>
        <div className="mk-panel">
          <div className="mk-ph"><span>Recent sales</span><span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}>This month</span></div>
          {[
            ["Spring Property Auction", "42 lots", "live", liveBid],
            ["Commercial & Land", "18 lots", "up", "—"],
            ["Residential Collection", "36 lots", "sold", "£12,480,000"],
            ["City Apartments", "24 lots", "sold", "£8,920,000"],
          ].map((r, i) => (
            <div className="mk-row" key={i}>
              <div><div className="rp">{r[0]}</div><div className="rs">{r[1]}</div></div>
              <Pill k={r[2]}>{r[2] === "live" ? "Live" : r[2] === "up" ? "Upcoming" : "Sold"}</Pill>
              <div className="mk-num" key={r[3]}>{r[3]}</div>
              <div className="mk-bar"><i style={{ width: [82, 0, 91, 76][i] + "%" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---- Inventory ---- */
const MockInventory = () => (
  <div className="mk">
    <MkSidebar active="Inventory" />
    <div className="mk-main">
      <MkTop title="Inventory" />
      <div className="mk-body">
        <div className="mk-stats" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          <div className="mk-stat"><span className="acc" /><div className="lab">Listed</div><div className="val">42</div></div>
          <div className="mk-stat"><span className="acc sky" /><div className="lab">Lotted</div><div className="val">28</div></div>
          <div className="mk-stat"><span className="acc suc" /><div className="lab">Valued</div><div className="val">£48.6M</div></div>
        </div>
        <div className="mk-panel">
          <div className="mk-ph"><span>Property register</span><span style={{ color: "var(--accent)", fontWeight: 700 }}>+ Add property</span></div>
          {[
            ["Luxury Penthouse", "Central London · PRP-7741", "£2.8M"],
            ["Mixed-Use Building", "Glasgow · PRP-7740", "£950k"],
            ["3-Bed Semi-Detached", "Surrey · PRP-7739", "£550k"],
            ["Building Plot (1 Acre)", "Kent · PRP-7738", "£250k"],
          ].map((r, i) => (
            <div className="mk-row" key={i} style={{ gridTemplateColumns: "20px 1.8fr .9fr" }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: "var(--action-bg-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n="qr" s={11} sw={2} /></div>
              <div><div className="rp">{r[0]}</div><div className="rs">{r[1]}</div></div>
              <div className="mk-num">{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---- Auction creation ---- */
const MockAuction = () => (
  <div className="mk">
    <MkSidebar active="Sales" />
    <div className="mk-main">
      <MkTop title="Create sale · Spring Property Auction" />
      <div className="mk-body">
        <div style={{ display: "flex", gap: 8 }}>
          {["Details", "Calendar", "Lotting", "Publish"].map((s, i) => (
            <div key={s} style={{ flex: 1, fontSize: 9, fontWeight: 700, textAlign: "center", padding: "7px 0", borderRadius: 6, background: i === 2 ? "var(--accent)" : "#fff", color: i === 2 ? "#fff" : "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>{i + 1}. {s}</div>
          ))}
        </div>
        <div className="mk-panel" style={{ padding: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7 }}>
            {[
              ["Penthouse", "£2.8M–3.2M"],
              ["Semi-detached", "£550k–620k"],
              ["2-bed flat", "£210k–240k"],
              ["Building plot", "£250k–300k"],
              ["Mixed-use", "£950k–1.15M"],
              ["Retail unit", "£500k–600k"],
            ].map((p, i) => (
              <div key={i} style={{ borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                <div style={{ height: 38, background: "linear-gradient(135deg,#0D1F4E,#1B3478)", position: "relative" }}>
                  <span style={{ position: "absolute", top: 4, left: 4, fontSize: 7, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,.3)", padding: "1px 4px", borderRadius: 3 }}>LOT {184 + i}</span>
                </div>
                <div style={{ padding: "5px 6px" }}><div style={{ fontSize: 8, fontWeight: 600 }}>{p[0]}</div><div style={{ fontSize: 7, color: "var(--text-secondary)" }}>{p[1]}</div></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 8, color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Icon n="upload" s={11} sw={2} /> Drag images here · up to 15 per lot</div>
        </div>
      </div>
    </div>
  </div>
);

/* ---- Sale day / live clerking ---- */
const MockSaleDay = () => (
  <div className="mk" style={{ background: "#0A1430" }}>
    <div className="mk-main" style={{ color: "#fff" }}>
      <div className="mk-top" style={{ background: "#0D1F4E", borderColor: "rgba(255,255,255,.1)" }}>
        {LOGO_ON_NAVY}
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9, fontWeight: 700, color: "#FF5A4D" }}><span className="pd" style={{ width: 6, height: 6, borderRadius: 9, background: "#FF3B30", animation: "pulse 1.4s infinite" }} /> LIVE</span>
      </div>
      <div className="mk-body" style={{ background: "#0A1430" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 8, flex: 1 }}>
          <div style={{ background: "linear-gradient(160deg,#13245A,#0D1F4E)", borderRadius: 8, padding: 10, border: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: "#7C8AAE" }}>Lot 5 · on the block</div>
            <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, lineHeight: 1.2 }}>Luxury Penthouse · Central London</div>
            <div style={{ marginTop: "auto" }}>
              <div style={{ fontSize: 8, color: "#9FB0DA" }}>Current bid</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#00AAFF", letterSpacing: "-.02em" }}>£10,400</div>
              <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                <div style={{ flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 5, background: "#0057FF", fontSize: 9, fontWeight: 700 }}>Hammer</div>
                <div style={{ flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 5, background: "rgba(255,255,255,.1)", fontSize: 9, fontWeight: 600 }}>+£200</div>
              </div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ fontSize: 8, letterSpacing: ".08em", textTransform: "uppercase", color: "#7C8AAE", marginBottom: 4 }}>Bid feed</div>
            {[["Paddle 0027", "£10,400", "12s"], ["Online · Berlin", "£10,200", "18s"], ["Phone · Helena", "£9,800", "26s"], ["Paddle 0114", "£9,400", "41s"]].map((b, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: i < 3 ? "1px dashed rgba(255,255,255,.1)" : "none", fontSize: 8.5 }}>
                <span style={{ color: "#DCE6FF" }}>{b[0]}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "#fff" }}>{b[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---- Bidder management ---- */
const MockBidders = () => (
  <div className="mk">
    <MkSidebar active="Bidders" />
    <div className="mk-main">
      <MkTop title="Bidder registration" />
      <div className="mk-body">
        <div className="mk-panel">
          <div className="mk-ph"><span>Registrations · Spring Property Auction</span><span style={{ color: "var(--success)", fontWeight: 700 }}>● 1,247 approved</span></div>
          {[
            ["Helena Rossi", "KYC verified", "sold", "£12k limit"],
            ["M. Okonkwo", "Card pre-auth", "sold", "£8k limit"],
            ["J. van Dijk", "Pending AML", "up", "review"],
            ["S. Bianchi", "KYC verified", "sold", "£25k limit"],
          ].map((r, i) => (
            <div className="mk-row" key={i} style={{ gridTemplateColumns: "1.4fr 1fr .8fr" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 18, height: 18, borderRadius: 9, background: "var(--grad-accent)" }} />
                <div><div className="rp">{r[0]}</div><div className="rs">{r[1]}</div></div>
              </div>
              <Pill k={r[2]}>{r[2] === "sold" ? "Approved" : "Pending"}</Pill>
              <div className="mk-num" style={{ fontSize: 8 }}>{r[3]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---- Payments ---- */
const MockPayments = () => (
  <div className="mk">
    <MkSidebar active="Payments" />
    <div className="mk-main">
      <MkTop title="Payments · Stripe" />
      <div className="mk-body">
        <div className="mk-stats" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
          <div className="mk-stat"><span className="acc suc" /><div className="lab">Settled</div><div className="val">£284,150</div><div className="dl">214 invoices</div></div>
          <div className="mk-stat"><span className="acc wn" /><div className="lab">Awaiting</div><div className="val">£42,600</div><div className="dl" style={{ color: "var(--warning)" }}>18 invoices</div></div>
        </div>
        <div className="mk-panel">
          <div className="mk-ph"><span>Payment requests</span><span style={{ color: "var(--accent)", fontWeight: 700 }}>Batch send</span></div>
          {[["INV-2026-0184", "Helena Rossi", "Paid", "£12,480"], ["INV-2026-0183", "M. Okonkwo", "Paid", "£6,720"], ["INV-2026-0182", "J. van Dijk", "Sent", "£3,150"]].map((r, i) => (
            <div className="mk-row" key={i} style={{ gridTemplateColumns: "1fr 1fr .7fr .8fr" }}>
              <div className="rp mono" style={{ fontSize: 8 }}>{r[0]}</div>
              <div className="rs">{r[1]}</div>
              <Pill k={r[2] === "Paid" ? "sold" : "up"}>{r[2]}</Pill>
              <div className="mk-num">{r[3]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---- Marketing / analytics ---- */
const MockMarketing = () => (
  <div className="mk">
    <MkSidebar active="Reports" />
    <div className="mk-main">
      <MkTop title="Performance" />
      <div className="mk-body">
        <div className="mk-panel" style={{ padding: 12, flex: "none" }}>
          <div style={{ fontSize: 9, fontWeight: 700, marginBottom: 8 }}>Hammer by category · last 6 sales</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 70 }}>
            {[42, 68, 55, 90, 73, 84].map((h, i) => (
              <div key={i} style={{ flex: 1, height: h + "%", borderRadius: "4px 4px 0 0", background: i === 3 ? "var(--accent)" : "var(--action-bg-soft)" }} />
            ))}
          </div>
        </div>
        <div className="mk-panel">
          <div className="mk-ph"><span>Mailchimp campaigns</span><span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}>Open rate</span></div>
          {[["Spring preview", "12,480 sent", "38%"], ["Watches lookbook", "8,200 sent", "44%"], ["VIP early access", "1,150 sent", "61%"]].map((r, i) => (
            <div className="mk-row" key={i} style={{ gridTemplateColumns: "1.2fr 1fr .6fr" }}>
              <div className="rp">{r[0]}</div>
              <div className="rs">{r[1]}</div>
              <div className="mk-num" style={{ color: "var(--success)" }}>{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---- Support / training ---- */
const MockSupport = () => (
  <div className="mk">
    <MkSidebar active="Reports" items={[{ n: "support", l: "Support" }, { n: "academy", l: "Academy" }, { n: "monitor", l: "Status" }, { n: "web", l: "Releases" }]} />
    <div className="mk-main">
      <MkTop title="Customer success" />
      <div className="mk-body">
        <div className="mk-stats" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          <div className="mk-stat"><span className="acc suc" /><div className="lab">Uptime</div><div className="val">99.99%</div></div>
          <div className="mk-stat"><span className="acc" /><div className="lab">Releases</div><div className="val">Monthly</div></div>
          <div className="mk-stat"><span className="acc sky" /><div className="lab">Engineers</div><div className="val">10 FT</div></div>
        </div>
        <div className="mk-panel">
          <div className="mk-ph"><span>Training library</span><span style={{ color: "var(--accent)", fontWeight: 700 }}>Book onsite</span></div>
          {[["Getting started with sales", "Video · 8 min"], ["Live clerking masterclass", "Video · 14 min"], ["Inventory & lotting", "Video · 11 min"]].map((r, i) => (
            <div className="mk-row" key={i} style={{ gridTemplateColumns: "26px 1fr" }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: "var(--action-bg-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n="play" s={11} sw={2} /></div>
              <div><div className="rp">{r[0]}</div><div className="rs">{r[1]}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MOCKS = {
  crm: MockDashboard,
  inventory: MockInventory,
  auction: MockAuction,
  saleday: MockSaleDay,
  bidders: MockBidders,
  payment: MockPayments,
  marketing: MockMarketing,
  support: MockSupport,
};

Object.assign(window, {
  MockDashboard, MockInventory, MockAuction, MockSaleDay,
  MockBidders, MockPayments, MockMarketing, MockSupport, MOCKS, LOGO_ON_NAVY,
});
