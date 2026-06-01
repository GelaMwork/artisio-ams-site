/* global React, Icon */
/* =========================================================================
   Bidding-experience wireframes (real-estate edition)
   Frontend = Reportage white-label brand · Back office = Artisio app.
   ========================================================================= */
const { useState: useBState, useEffect: useBEffect } = React;

/* Live countdown — ticks every second, resets to the base every 5 minutes.
   `mode="full"` → "1d 10h 24m 58s"; `mode="short"` → "1d 10h 24m". */
const BASE_SECS = 1 * 86400 + 10 * 3600 + 24 * 60; // 1d 10h 24m 00s
function RepCountdown({ mode = "full", offset = 0 }) {
  const [elapsed, setElapsed] = useBState(0);
  useBEffect(() => {
    if (window.PRM) return;
    const t = setInterval(() => setElapsed((e) => (e + 1) % 300), 1000); // loop every 5 min
    return () => clearInterval(t);
  }, []);
  let rem = BASE_SECS + offset - elapsed;
  if (rem < 0) rem = 0;
  const d = Math.floor(rem / 86400);
  const h = Math.floor((rem % 86400) / 3600);
  const m = Math.floor((rem % 3600) / 60);
  const s = rem % 60;
  const p = (n) => String(n).padStart(2, "0");
  if (mode === "short") {
    return <React.Fragment>◷ {d}d {h}h {p(m)}m</React.Fragment>;
  }
  if (mode === "card") {
    return <React.Fragment>◷ {d}d {h}h {p(m)}m <span className="cd-s">{p(s)}s</span></React.Fragment>;
  }
  return (
    <React.Fragment>
      {d}d {p(h)}h {p(m)}m <span className="cd-s">{p(s)}s</span>
    </React.Fragment>
  );
}

const REP_LOGO_DARK = "https://reportagegroup.com/wp-content/uploads/logo.svg";
const REP_LOGO_WHITE = "https://reportagegroup.com/wp-content/uploads/white-reportage-logo.svg";

/* Reportage logo — exact hosted SVG, typographic fallback if it can't load */
const RepLogo = ({ variant = "dark" }) => {
  const [err, setErr] = useBState(false);
  const src = variant === "light" ? REP_LOGO_WHITE : REP_LOGO_DARK;
  return (
    <span className="rep-logo">
      {err
        ? <span className={"rep-word" + (variant === "light" ? " on-dark" : "")}>Reportage</span>
        : <img src={src} alt="Reportage" onError={() => setErr(true)} />}
    </span>
  );
};

const AMark = ({ h = 16, light = true }) => (
  <img src={light ? "assets/artisio-mark-white.svg" : "assets/artisio-mark-navy.svg"} alt="Artisio" style={{ height: h, display: "block" }} />
);
const ArtisioWord = ({ light = true }) => (
  <img className="wf-appbar-brand" src={light ? "assets/artisio-logo-white.svg" : "assets/artisio-logo-navy.svg"} alt="Artisio" style={{ height: 16, display: "block" }} />
);

const PropPhoto = ({ type = "home", h, label = true, cls = "" }) => (
  <div className={"wf-photo " + cls} style={h ? { height: h } : undefined}>
    <Icon n={type} s={40} sw={1.4} />
    {label ? <span className="pl">Property photo</span> : null}
  </div>
);
const Thumb = ({ type }) => (
  <div className="thumb wf-photo sm" style={{ display: "flex" }}><Icon n={type} s={18} sw={1.5} /></div>
);
const PhotoThumb = ({ photo, pos }) => (
  <div className="thumb thumb-img"><img src={photo} alt="" style={{ objectPosition: pos || "50% 50%" }} /></div>
);

/* shared property data — matches the back-office screenshots (stock PRP380) */
const PROPS = [
  { lot: 1, stock: "PRP380 / 1", title: "3-Bedroom Semi-Detached House", loc: "Surrey", type: "home", beds: "3 bed", area: "1,240 sq ft", guide: "£550,000 – £620,000", reserve: "£550,000", start: "£550,000", incr: "£10,000", photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", pos: "50% 50%" },
  { lot: 2, stock: "PRP380 / 15", title: "2-Bedroom Flat", loc: "Liverpool", type: "building", beds: "2 bed", area: "720 sq ft", guide: "£210,000 – £240,000", reserve: "£210,000", start: "£210,000", incr: "£5,000", photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", pos: "50% 60%" },
  { lot: 3, stock: "PRP380 / 14", title: "Building Plot (1 Acre)", loc: "Kent", type: "map", beds: "Land", area: "1 acre", guide: "£250,000 – £300,000", reserve: "£250,000", start: "£250,000", incr: "£10,000", photo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", pos: "50% 50%" },
  { lot: 4, stock: "PRP380 / 6", title: "Mixed-Use Building", loc: "Glasgow", type: "building", beds: "Commercial", area: "4,500 sq ft", guide: "£950,000 – £1,150,000", reserve: "£950,000", start: "£950,000", incr: "£25,000", photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", pos: "50% 40%" },
  { lot: 5, stock: "PRP380 / 2", title: "Luxury Penthouse", loc: "Central London", type: "building", beds: "3 bed", area: "2,100 sq ft", guide: "£2,800,000 – £3,200,000", reserve: "£2,800,000", start: "£2,800,000", incr: "£50,000", photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", pos: "50% 50%" },
  { lot: 6, stock: "PRP380 / 5", title: "Retail Shopfront", loc: "Brighton", type: "building", beds: "Commercial", area: "1,800 sq ft", guide: "£500,000 – £600,000", reserve: "£500,000", start: "£500,000", incr: "£10,000", photo: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80", pos: "50% 50%" },
];

/* =========================================================================
   STEP 01 — Reportage homepage (exact) with embeddable Auctions button
   ========================================================================= */
const RepHomepage = () => (
  <div className="wf wf-rep rh">
    <div className="wf-chrome">
      <div className="wf-dots"><i /><i /><i /></div>
      <div className="wf-url"><Icon n="lock" s={13} sw={2} /> <b>reportagegroup.com</b></div>
    </div>
    <div className="rh-nav">
      <RepLogo variant="dark" />
      <div className="rh-menu" aria-hidden="true">
        <span className="ml-abs" style={{ width: 56 }} />
        <span className="ml-abs" style={{ width: 84 }} />
        <span className="ml-abs" style={{ width: 64 }} />
        <span className="ml-abs" style={{ width: 122 }} />
        <span className="ml-abs" style={{ width: 138 }} />
      </div>
      <div className="rh-right">
        <span className="rh-auctions">
          <span className="rh-live"><span className="r r1" /><span className="r r2" /><span className="d" /></span>
          Auctions
        </span>
        <span className="rh-burger"><i /><i /><i /></span>
      </div>
    </div>
    <div className="rh-hero">
      <div className="rh-stage">
        <div className="rh-oval">
          <img className="rh-oval-img" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80" alt="" />
        </div>
        <div className="rh-circle">
          <div className="glass" />
          <span className="rh-c-loc">Abu Dhabi</span>
          <span className="rh-c-name">Sensational<br />Living</span>
          <span className="rh-c-sub">Luxury residences from AED 1.2M</span>
          <span className="rh-explore">
            <span className="rh-exp-t">Explore</span>
            <span className="c"><Icon n="arrow" s={16} sw={2} /></span>
          </span>
        </div>
        <div className="rh-float">
          <span className="fb"><Icon n="chat" s={18} sw={1.8} /></span>
          <span className="fb"><Icon n="phone" s={17} sw={1.8} /></span>
          <span className="fb"><Icon n="support" s={18} sw={1.8} /></span>
        </div>
      </div>
      <div className="rh-indicator">
        <div className="rh-slide act"><span className="tk" style={{ height: 42 }} /><span className="bar" /></div>
        <div className="rh-slide"><span className="tk" style={{ height: 22 }} /><span className="bar" /></div>
        <div className="rh-slide"><span className="tk" style={{ height: 31 }} /><span className="bar" /></div>
        <div className="rh-slide"><span className="tk" style={{ height: 18 }} /><span className="bar" /></div>
      </div>
    </div>
    <div className="rh-lots">
      <div className="rh-lots-head">
        <div className="rh-lots-left">
          <h3>Upcoming Auction</h3>
          <span className="rh-lots-meta">May Property Auction · 13 lots</span>
        </div>
        <div className="rh-lots-right">
          <span className="rh-lots-live">
            <span className="sf2-dot" />
            <span className="sf2-live-label">Live</span>
            <span className="sf2-live-sep" />
            <span className="sf2-live-time"><RepCountdown mode="full" /></span>
          </span>
          <span className="rh-lots-viewall">View all lots <Icon n="arrow" s={13} sw={2} /></span>
        </div>
      </div>
      <div className="rh-lots-grid">
        {PROPS.slice(0, 3).map((p) => (
          <div className="sf2-card" key={p.lot}>
            <div className="sf2-img">
              <img src={p.photo} alt="" style={{ objectPosition: p.pos || "50% 50%" }} />
              <span className="sf2-lot">Lot {p.lot}</span>
              <span className="sf2-cd"><RepCountdown mode="card" offset={p.lot * 37} /></span>
            </div>
            <div className="sf2-body">
              <div className="sf2-ti">{p.title}</div>
              <div className="sf2-loc"><Icon n="pin" s={11} sw={1.8} /> {p.loc}</div>
              <div className="sf2-specs">
                <span><Icon n="bed" s={12} sw={1.7} /> {p.beds}</span>
                <span><Icon n="ruler" s={12} sw={1.7} /> {p.area}</span>
              </div>
              <div className="sf2-foot">
                <div className="sf2-price">
                  <span className="sf2-gl">Guide</span>
                  <span className="sf2-gv">{p.guide.split(" – ")[0]}</span>
                </div>
                <span className="sf2-view">View <Icon n="arrow" s={13} sw={2} /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* =========================================================================
   STEP 02 — Reportage white-label storefront (inside reportagegroup.com)
   ========================================================================= */
const RepStorefront = () => (
  <div className="wf wf-rep sf2">
    <div className="wf-chrome">
      <div className="wf-dots"><i /><i /><i /></div>
      <div className="wf-url"><Icon n="lock" s={13} sw={2} /> <b>reportagegroup.com</b>/auctions</div>
    </div>
    <div className="rep-nav">
      <RepLogo variant="dark" />
      <span className="nl">Developments</span>
      <span className="nl act">Auctions</span>
      <span className="nl">Buy</span>
      <span className="nl">Sell</span>
      <span className="nl">About</span>
      <span className="right">
        <span className="rep-btn solid sm">Register to bid</span>
        <span className="acct"><span className="av" /> Sign in</span>
      </span>
    </div>
    <div className="sf2-hero">
      <div className="sf2-hero-left">
        <h2>May Property Auction</h2>
        <div className="meta"><span>13 lots</span><span className="dot" /><span>Timed online</span><span className="dot" /><span>Ends 30 May 2026</span></div>
      </div>
      <div className="sf2-live-pill">
        <span className="sf2-dot" />
        <span className="sf2-live-label">Live</span>
        <span className="sf2-live-sep" />
        <span className="sf2-live-time"><RepCountdown mode="full" /></span>
      </div>
    </div>
    <div className="sf2-bar">
      <div className="sf2-pills">
        <span className="sf2-pill on">All lots</span>
        <span className="sf2-pill">House</span>
        <span className="sf2-pill">Apartment</span>
        <span className="sf2-pill">Land</span>
        <span className="sf2-pill">Commercial</span>
      </div>
      <div className="sf2-count"><b>6</b> properties</div>
    </div>
    <div className="sf2-grid">
      {PROPS.map((p) => (
        <div className="sf2-card" key={p.lot}>
          <div className="sf2-img">
            <img src={p.photo} alt="" style={{ objectPosition: p.pos || "50% 50%" }} />
            <span className="sf2-lot">Lot {p.lot}</span>
            <span className="sf2-cd"><RepCountdown mode="card" offset={p.lot * 37} /></span>
          </div>
          <div className="sf2-body">
            <div className="sf2-ti">{p.title}</div>
            <div className="sf2-loc"><Icon n="pin" s={11} sw={1.8} /> {p.loc}</div>
            <div className="sf2-specs">
              <span><Icon n="bed" s={12} sw={1.7} /> {p.beds}</span>
              <span><Icon n="ruler" s={12} sw={1.7} /> {p.area}</span>
            </div>
            <div className="sf2-foot">
              <div className="sf2-price">
                <span className="sf2-gl">Guide</span>
                <span className="sf2-gv">{p.guide.split(" – ")[0]}</span>
              </div>
              <span className="sf2-view">View <Icon n="arrow" s={13} sw={2} /></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* =========================================================================
   Back-office SHELL — Artisio AMS app, darkened, with a modal floating on top
   (implies the action is happening inside the back office)
   ========================================================================= */
const BOShellBg = ({ page = "Sales", cta = "Create New Sale" }) => (
  <div className="bo-app">
    <div className="wf-appbar">
      <ArtisioWord light />
      <span className="right">
        <span>Reportage Saleroom</span>
        <span className="av" />
      </span>
    </div>
    <div className="bo-split">
      <div className="bo-sidebar">
        {[["dashboard", "Dashboard"], ["gavel", "Sales"], ["home", "Properties"], ["bidders", "Bidders"], ["card", "Invoices"], ["analytics", "Reports"]].map((it) => (
          <span className={"bo-side-item" + (it[1] === page ? " active" : "")} key={it[1]}><Icon n={it[0]} s={15} sw={1.9} /> {it[1]}</span>
        ))}
      </div>
      <div className="bo-main">
        <div className="bo-pagehead">
          <h3>{page}</h3>
          <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="wf-btn ghost">Actions <Icon n="down" s={13} sw={2.2} /></span>
            <span className="wf-btn ghost">More <Icon n="down" s={13} sw={2.2} /></span>
            <span className="wf-btn pri"><Icon n="plus" s={15} sw={2.4} /> {cta}</span>
          </span>
        </div>
        <table className="bo-table">
          <thead><tr><th>Sale No</th><th>Title</th><th>Type</th><th>Lots</th><th className="ctr">Status</th></tr></thead>
          <tbody>
            {[
              ["SALE-0042", "May Property Auction", "Timed", "13", "draft"],
              ["SALE-0041", "Spring Land & Plots", "Timed", "28", "pub"],
              ["SALE-0040", "Commercial Portfolio", "Timed", "9", "pub"],
              ["SALE-0039", "Residential Collection", "Timed", "41", "pub"],
              ["SALE-0038", "March Mixed-Use Sale", "Timed", "17", "pub"],
            ].map((r) => (
              <tr key={r[0]}>
                <td className="bo-link wf-mono">{r[0]}</td>
                <td style={{ fontWeight: 600 }}>{r[1]}</td>
                <td style={{ color: "var(--text-secondary)" }}>{r[2]}</td>
                <td className="wf-mono">{r[3]}</td>
                <td className="ctr"><span className={"wf-pill " + r[4]}>{r[4] === "pub" ? "Published" : "Draft"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const BOShell = ({ children, page, cta }) => (
  <div className="bo-shell">
    <div className="bo-shell-bg" aria-hidden="true"><BOShellBg page={page} cta={cta} /></div>
    <div className="bo-shell-scrim" aria-hidden="true" />
    <span className="bo-shell-tag"><AMark h={13} light /> Artisio AMS · Back office</span>
    <div className="bo-shell-modal">{children}</div>
  </div>
);

/* Full Artisio AMS — Sales / sale-detail (Lots tab) with the More ▸ Publish dropdown open */
const BOSalesPage = () => (
  <div className="wf bo-salespage">
    <div className="wf-appbar">
      <ArtisioWord light />
      <span className="right">
        <span>Scan QR</span>
        <span>Reportage Saleroom</span>
        <span className="av" />
      </span>
    </div>
    <div className="bo-split">
      <div className="bo-sidebar">
        {[["inventory", "Stock"], ["receipt", "Receipts"], ["gavel", "Sales"], ["bolt", "Auction Console"], ["graduation", "LLP"], ["marketing", "Marketing"], ["bidders", "Customers"], ["coins", "Finance"], ["analytics", "Reports"], ["support", "Setup"]].map((it) => (
          <span className={"bo-side-item" + (it[1] === "Sales" ? " active" : "")} key={it[1]}><Icon n={it[0]} s={15} sw={1.9} /> {it[1]}</span>
        ))}
      </div>
      <div className="bo-main">
        <div className="bo-sales-top">
          <div className="bo-crumb"><span className="bo-link">Sales</span><span className="sep">/</span><span className="cur">May Property Auction</span><span className="wf-pill draft">Draft</span></div>
          <div className="bo-sales-actions">
            <span className="wf-btn pri"><Icon n="plus" s={14} sw={2.4} /> New Sale</span>
            <span className="wf-btn ghost">Auction Providers <Icon n="down" s={13} sw={2.2} /></span>
            <span className="bo-more">
              <span className="wf-btn ghost on">More <Icon n="down" s={13} sw={2.2} /></span>
              <div className="bo-more-menu">
                <div className="opt">Edit Sale</div>
                <div className="opt active">Publish <Icon n="check" s={13} sw={3} /></div>
                <div className="mdiv" />
                <div className="opt">View Catalog</div>
                <div className="opt">Regenerate Catalog</div>
                <div className="mdiv" />
                <div className="opt">Export CSV</div>
                <div className="opt">Export PDF</div>
                <div className="opt">Export Excel</div>
              </div>
            </span>
          </div>
        </div>
        <div className="bo-subtabs">
          {["Dashboard", "Lots", "Bidders", "Bids", "Max Bids", "Sale Settings", "Invoices", "Vendors", "Settlements", "Attachments", "Notes"].map((t) => (
            <span className={"bo-stab" + (t === "Lots" ? " active" : "")} key={t}>{t}</span>
          ))}
        </div>
        <div className="bo-toolbar">
          <span className="wf-btn pri" style={{ height: 30 }}>Actions <Icon n="down" s={12} sw={2.2} /></span>
          <span className="wf-btn ghost" style={{ height: 30 }}>Export Images <Icon n="down" s={12} sw={2.2} /></span>
          <span className="wf-btn" style={{ height: 30, background: "var(--destructive-bg)", color: "var(--destructive)", border: "1px solid var(--destructive-border)" }}>Delete</span>
          <span className="sp" />
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Selected 0 of 6 on this page</span>
        </div>
        <div className="wf-table-scroll">
          <table className="bo-table">
            <thead>
              <tr>
                <th className="ctr" style={{ width: 32 }}></th>
                <th className="ctr" style={{ width: 48 }}>Lot</th>
                <th style={{ width: 56 }}>Image</th>
                <th>Stock</th>
                <th>Title</th>
                <th className="num">Reserve</th>
                <th className="ctr">Status</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map((p) => (
                <tr key={p.lot}>
                  <td className="ctr"><span className="wf-cb" style={{ margin: "0 auto" }} /></td>
                  <td className="ctr"><span className="bo-lotno" style={{ minWidth: 26, height: 24, fontSize: 12 }}>{p.lot}</span></td>
                  <td><PhotoThumb photo={p.photo} pos={p.pos} /></td>
                  <td className="bo-link wf-mono">{p.stock}</td>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td className="num wf-mono">{p.reserve}</td>
                  <td className="ctr"><span className="wf-pill pub">Lotted</span></td>
                  <td className="bo-link">Johnson, Emma</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

/* Full Artisio AMS — Invoices tab: generate & send property invoices */
const BOInvoices = () => {
  const rows = [
    { inv: "INV-2026-0184", buyer: "Helena Rossi", lot: "Luxury Penthouse · Lot 5", total: "£2,940,000", paid: "£2,940,000", out: "£0", status: "Paid" },
    { inv: "INV-2026-0183", buyer: "M. Okonkwo", lot: "Mixed-Use Building · Lot 4", total: "£1,008,000", paid: "£0", out: "£1,008,000", status: "Unpaid" },
    { inv: "INV-2026-0182", buyer: "J. van Dijk", lot: "3-Bed Semi-Detached · Lot 1", total: "£588,000", paid: "£0", out: "£588,000", status: "Unpaid" },
    { inv: "INV-2026-0181", buyer: "S. Bianchi", lot: "Retail Shopfront · Lot 6", total: "£567,000", paid: "£567,000", out: "£0", status: "Paid" },
    { inv: "INV-2026-0180", buyer: "L. Marchetti", lot: "Building Plot · Lot 3", total: "£294,000", paid: "£0", out: "£294,000", status: "Unpaid" },
    { inv: "INV-2026-0179", buyer: "A. Petrov", lot: "2-Bedroom Flat · Lot 2", total: "£231,000", paid: "£231,000", out: "£0", status: "Paid" },
  ];
  return (
    <div className="wf bo-salespage">
      <div className="wf-appbar">
        <ArtisioWord light />
        <span className="right">
          <span>Scan QR</span>
          <span>Reportage Saleroom</span>
          <span className="av" />
        </span>
      </div>
      <div className="bo-split">
        <div className="bo-sidebar">
          {[["inventory", "Stock"], ["receipt", "Receipts"], ["gavel", "Sales"], ["bolt", "Auction Console"], ["graduation", "LLP"], ["marketing", "Marketing"], ["bidders", "Customers"], ["coins", "Finance"], ["analytics", "Reports"], ["support", "Setup"]].map((it) => (
            <span className={"bo-side-item" + (it[1] === "Sales" ? " active" : "")} key={it[1]}><Icon n={it[0]} s={15} sw={1.9} /> {it[1]}</span>
          ))}
        </div>
        <div className="bo-main">
          <div className="bo-sales-top">
            <div className="bo-crumb"><span className="bo-link">Sales</span><span className="sep">/</span><span className="cur">May Property Auction</span><span className="wf-pill pub">Published</span></div>
            <div className="bo-sales-actions">
              <span className="bo-more">
                <span className="wf-btn pri on">Actions <Icon n="down" s={13} sw={2.2} /></span>
                <div className="bo-more-menu" style={{ right: 0, left: "auto", width: 220 }}>
                  <div className="opt">New Invoice</div>
                  <div className="opt active">Generate Unpaid Invoices <Icon n="check" s={13} sw={3} /></div>
                  <div className="mdiv" />
                  <div className="opt">Preview PDF(s)</div>
                  <div className="opt">Pay Invoice(s)</div>
                  <div className="mdiv" />
                  <div className="opt">Send Unpaid Email(s)</div>
                  <div className="opt">Resend Invoice(s)</div>
                </div>
              </span>
            </div>
          </div>
          <div className="bo-subtabs">
            {["Dashboard", "Lots", "Bidders", "Bids", "Sale Settings", "Invoices", "Vendors", "Settlements", "Notes"].map((t) => (
              <span className={"bo-stab" + (t === "Invoices" ? " active" : "")} key={t}>{t}</span>
            ))}
          </div>
          <div className="bo-toolbar">
            <span className="wf-btn ghost" style={{ height: 30 }}>Send Unpaid Email(s)</span>
            <span className="wf-btn ghost" style={{ height: 30 }}>Generate Batch Payments</span>
            <span className="sp" />
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>6 invoices · 3 unpaid</span>
          </div>
          <div className="wf-table-scroll">
            <table className="bo-table">
              <thead>
                <tr>
                  <th className="ctr" style={{ width: 32 }}></th>
                  <th>Invoice</th>
                  <th>Buyer</th>
                  <th>Property</th>
                  <th className="num">Total / Paid / Outstanding</th>
                  <th className="ctr">Status</th>
                  <th className="ctr">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.inv}>
                    <td className="ctr"><span className="wf-cb" style={{ margin: "0 auto" }} /></td>
                    <td className="bo-link wf-mono">{r.inv}</td>
                    <td style={{ fontWeight: 600 }}>{r.buyer}</td>
                    <td className="bo-link">{r.lot}</td>
                    <td className="num wf-mono">{r.total} / {r.paid} / {r.out}</td>
                    <td className="ctr"><span className={"wf-pill " + (r.status === "Paid" ? "pub" : "up")}>{r.status}</span></td>
                    <td className="ctr"><span className="wf-btn ghost" style={{ height: 26, fontSize: 11, padding: "0 9px" }}>Send</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Small panel: created auction in AMS with a status dropdown — Publish highlighted */
const BOPublish = () => (
  <div className="bo-publish">
    <div className="bo-pub-head"><AMark h={13} light={false} /> Artisio AMS · Sales</div>
    <div className="bo-pub-row">
      <div className="bo-pub-info">
        <span className="bo-lotno" style={{ minWidth: 30, height: 28, fontSize: 12 }}>42</span>
        <div>
          <div className="t">May Property Auction</div>
          <div className="s">6 lots · Timed · AED · draft</div>
        </div>
      </div>
      <button className="bo-pub-trigger">Draft <Icon n="down" s={14} sw={2.2} /></button>
    </div>
    <div className="bo-pub-menu">
      <div className="opt">Save as draft</div>
      <div className="opt active">Publish to website <Icon n="check" s={13} sw={3} /></div>
      <div className="opt">Schedule…</div>
    </div>
  </div>
);

/* =========================================================================
   STEP 2a — Artisio back office: Create New Sale modal
   ========================================================================= */
const BOCreateSale = () => {
  const checks = [
    ["Request Deposit", true, "Deposit"],
    ["Listed", false, null],
    ["Published", true, "Frontend"],
    ["Eligible for Online Payments", true, null],
    ["Require Bidder Approval", true, "Manual"],
    ["Use Images From Lots", true, null],
    ["Require Credit Card Verification", true, "Card"],
    ["Require Identity Verification", true, "ID"],
  ];
  return (
    <div className="bo-modal">
      <div className="bo-modal-head">
        <h4>Create New Sale</h4>
        <span className="x"><Icon n="close" s={18} /></span>
      </div>
      <div className="bo-modal-body bo-grid2">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <span className="wf-label">Sale No</span>
            <div className="wf-field">Auto-generated</div>
            <div className="bo-hint">Leave blank to generate automatically</div>
          </div>
          <div><span className="wf-label">Title <span className="rq">*</span></span><div className="wf-field req">May Property Auction</div></div>
          <div><span className="wf-label">Description</span><div className="wf-field" style={{ height: 44 }}>Residential & commercial property — timed online sale</div></div>
          <div className="bo-row3">
            <div><span className="wf-label">Department <span className="rq">*</span></span><div className="wf-field req">Residential Property</div></div>
            <div><span className="wf-label">Currency <span className="rq">*</span></span><div className="wf-field req">AED (د.إ)</div></div>
            <div><span className="wf-label">Type <span className="rq">*</span></span><div className="wf-field req">Timed</div></div>
          </div>
          <div className="bo-row2">
            <div><span className="wf-label">Starts <span className="rq">*</span></span><div className="wf-field req"><Icon n="calendar" s={14} sw={1.9} style={{ marginRight: 8, color: "var(--accent)" }} />28 May 2026, 10:00</div></div>
            <div><span className="wf-label">Ends <span className="rq">*</span></span><div className="wf-field req"><Icon n="calendar" s={14} sw={1.9} style={{ marginRight: 8, color: "var(--accent)" }} />30 May 2026, 10:00</div></div>
          </div>
          <div>
            <span className="wf-label" style={{ marginBottom: 8 }}>Bidder restrictions &amp; publishing</span>
            <div className="bo-checks">
              {checks.map((c) => (
                <div className={"bo-check" + (c[1] && c[2] ? " hot" : "")} key={c[0]}>
                  <span className={"wf-cb" + (c[1] ? " on" : "")}>{c[1] ? <Icon n="check" s={11} sw={3.5} /> : null}</span>
                  {c[0]}
                  {c[2] ? <span className="wf-pill req tagm">{c[2]}</span> : null}
                </div>
              ))}
            </div>
            <div className="bo-hint" style={{ marginTop: 10 }}>Ticked restrictions become the bidder's required steps when they register on your site →</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <span className="wf-label">Auction Images</span>
            <div className="bo-thumbs">
              {[PROPS[0].photo, PROPS[1].photo, PROPS[4].photo, PROPS[3].photo].map((src, i) => (
                <div className="bo-thumb" key={i}>
                  <img src={src} alt="" style={{ objectPosition: "50% 50%" }} />
                  {i === 0 ? <span className="cover">Cover</span> : null}
                  <span className="rm"><Icon n="close" s={10} sw={2.6} /></span>
                </div>
              ))}
              <div className="bo-thumb add"><Icon n="plus" s={20} sw={2} /><span>Add</span></div>
            </div>
            <div className="bo-hint">4 auction images added · shown on this sale's frontend listing. Hold &amp; drag to reorder.</div>
          </div>
          <div>
            <span className="wf-label">Catalogue</span>
            <div className="bo-catfile">
              <span className="fic"><Icon n="doc" s={16} sw={1.8} /></span>
              <div className="fmeta"><div className="fn">May-Property-Auction.pdf</div><div className="fs">2.4 MB · uploaded</div></div>
              <span className="rm"><Icon n="close" s={11} sw={2.6} /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="bo-modal-foot">
        <span className="wf-btn ghost">Cancel</span>
        <span className="wf-btn pri">Submit</span>
      </div>
    </div>
  );
};

/* =========================================================================
   STEP 2b — Artisio back office: Assign properties + lot numbers
   ========================================================================= */
const BOAssignItems = () => (
  <div className="bo-modal">
    <div className="bo-modal-head">
      <h4>Assign Properties to Sale — May Property Auction</h4>
      <span className="x"><Icon n="close" s={18} /></span>
    </div>
    <div className="bo-toolbar">
      <span style={{ fontSize: 13, fontWeight: 600 }}>Selected <b style={{ color: "var(--accent)" }}>6</b> of 173</span>
      <span className="sp" />
      <span className="wf-field" style={{ width: 180 }}>Search properties…</span>
      <span className="wf-btn pri">Search</span>
    </div>
    <div className="wf-table-scroll">
      <table className="bo-table">
        <thead>
          <tr>
            <th className="ctr" style={{ width: 36 }}></th>
            <th>Stock</th>
            <th>Property</th>
            <th>Estimate</th>
            <th className="ctr" style={{ width: 92 }}>Lot No</th>
            <th className="num">Reserve</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>
          {PROPS.map((p) => (
            <tr className="sel" key={p.lot}>
              <td className="ctr"><span className="wf-cb on" style={{ margin: "0 auto" }}><Icon n="check" s={11} sw={3.5} /></span></td>
              <td className="bo-link">{p.stock}</td>
              <td>
                <div className="bo-prop">
                  <PhotoThumb photo={p.photo} pos={p.pos} />
                  <div>
                    <div className="pt">{p.title}</div>
                    <div className="ps"><Icon n="pin" s={11} sw={1.8} /> {p.loc} · {p.beds}</div>
                  </div>
                </div>
              </td>
              <td className="wf-mono" style={{ color: "var(--text-secondary)" }}>{p.guide}</td>
              <td className="ctr"><span className="bo-lotno">{p.lot}</span></td>
              <td className="num wf-mono">{p.reserve}</td>
              <td className="wf-mono" style={{ color: "var(--text-secondary)" }}>27/05/2026</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="bo-modal-foot" style={{ justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}><Icon n="pin" s={13} sw={1.8} style={{ verticalAlign: "-2px", color: "var(--accent)" }} /> Assign each property a <b style={{ color: "var(--text-primary)" }}>lot number</b> — this orders the sale on your site.</span>
      <span style={{ display: "flex", gap: 10 }}><span className="wf-btn ghost">Cancel</span><span className="wf-btn pri">Next</span></span>
    </div>
  </div>
);

/* =========================================================================
   STEP 3 — Reportage register page with bidder restrictions
   ========================================================================= */
const RepRegCard = () => {
  const reqs = [
    ["idcard", "Identity verification", "Government ID checked automatically", "ok", "Verified"],
    ["card", "Credit card verification", "Card pre-authorised, no charge", "ok", "Verified"],
    ["coins", "Refundable deposit", "£5,000 hold, released after the sale", "warn", "Pending"],
    ["support", "Manual approval", "Reviewed by the Reportage saleroom team", "req", "In review"],
  ];
  return (
    <div className="rep-modal">
      <div className="rep-modal-head">
        <div>
          <h3>Register to bid</h3>
          <div className="sub">Complete the steps required for the May Property Auction.</div>
        </div>
        <span className="rep-modal-x"><Icon n="close" s={18} /></span>
      </div>
      <div className="rep-reg">
        <div className="form">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div><span className="rep-lbl">Full name</span><div className="rep-input">Helena Rossi</div></div>
            <div><span className="rep-lbl">Email</span><div className="rep-input">h.rossi@email.com</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span className="rep-lbl" style={{ marginBottom: 0 }}>Verification required</span>
            <span className="wf-pill neutral">Set by the saleroom</span>
          </div>
          {reqs.map((r) => (
            <div className="rep-req" key={r[1]}>
              <span className="ic"><Icon n={r[0]} s={18} sw={1.8} /></span>
              <div style={{ flex: 1 }}>
                <div className="rt">{r[1]}</div>
                <div className="rd">{r[2]}</div>
              </div>
              <span className={"wf-pill badge " + r[3]}>{r[3] === "ok" ? <Icon n="check" s={10} sw={3.5} /> : <span className="d" />}{r[4]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rep-modal-foot">
        <span className="foot-help">Your details are saved to your Reportage account.</span>
        <span className="foot-actions">
          <span className="rep-btn outline">Close</span>
          <span className="rep-btn solid lg">Register as a bidder</span>
        </span>
      </div>
    </div>
  );
};

/* Registration modal floating over the (darkened) auctions storefront */
const RepRegister = () => (
  <div className="rep-shell">
    <div className="rep-shell-bg" aria-hidden="true"><RepStorefront /></div>
    <div className="rep-shell-scrim" aria-hidden="true" />
    <div className="rep-shell-modal"><RepRegCard /></div>
  </div>
);

/* =========================================================================
   STEP 4 — Reportage lot detail with bid / max bid / buy now
   ========================================================================= */
const RepLotBid = () => {
  const p = PROPS[4]; // Luxury Penthouse
  const heroImgs = [
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", pos: "50% 50%" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", pos: "50% 45%" },
    { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", pos: "50% 50%" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", pos: "50% 40%" },
  ];
  const [active, setActive] = useBState(0);
  const specs = [
    ["building", "Type", "Penthouse"],
    ["bed", "Bedrooms", "3"],
    ["home", "Bathrooms", "3"],
    ["ruler", "Area", p.area],
    [null, "Tenure", "Leasehold · 992 yrs"],
    [null, "EPC rating", "B (84)"],
    [null, "Council tax", "Band H"],
    [null, "Year built", "2021"],
    [null, "Parking", "2 secure spaces"],
    [null, "Outdoor space", "Private terrace · 380 sq ft"],
    [null, "Service charge", "£6,200 / yr"],
    [null, "Floor", "24th · penthouse level"],
  ];
  const features = ["Panoramic city views", "Private terrace", "24/7 concierge", "Full vacant possession"];
  return (
    <div className="wf wf-rep">
      <div className="wf-chrome">
        <div className="wf-dots"><i /><i /><i /></div>
        <div className="wf-url"><Icon n="lock" s={13} sw={2} /> <b>reportagegroup.com</b>/auctions/lot/{p.lot}</div>
      </div>
      <div className="rep-nav" style={{ padding: "12px 22px" }}>
        <RepLogo variant="dark" />
        <span className="nl">Developments</span><span className="nl act">Auctions</span><span className="nl">Sell</span>
        <span className="right"><span className="acct"><span className="av" /> Helena Rossi</span></span>
      </div>
      <div className="rep-lot">
        <div className="gal">
          <div className="hero"><img src={heroImgs[active].src} alt="" style={{ objectPosition: heroImgs[active].pos }} /></div>
          <div className="thumbs">
            {heroImgs.map((im, i) => (
              <button key={i} className={"t" + (i === active ? " on" : "")} onClick={() => setActive(i)}>
                <img src={im.src} alt="" style={{ objectPosition: im.pos }} />
              </button>
            ))}
          </div>
          <div className="desc">A rare three-bedroom penthouse with panoramic city views, private terrace and concierge. Sold with full vacant possession.</div>
          <div className="specs">
            {specs.map((s) => (
              <div className="f" key={s[1]}>
                <div className="fl">{s[1]}</div>
                <div className="fv">{s[0] ? <Icon n={s[0]} s={15} sw={1.7} /> : null}{s[2]}</div>
              </div>
            ))}
          </div>
          <div className="keyfeat">
            <div className="kt">Key features</div>
            <ul>
              {features.map((f) => (
                <li key={f}><Icon n="check" s={14} sw={2.4} /> {f}</li>
              ))}
            </ul>
          </div>
          <div className="legal">
            <Icon n="doc" s={14} sw={1.8} /> Viewings by appointment · Legal pack available on request
          </div>
        </div>
        <div className="bidrail">
          <div className="lotcaps">Lot {p.lot} · May Property Auction</div>
          <div className="lottitle">{p.title}, {p.loc}</div>
          <span className="reserve-tag"><Icon n="shield" s={13} sw={2} /> Reserve not yet met</span>
          <div className="bidbox">
            <div className="crow">
              <span className="cl">Current bid</span>
              <span style={{ fontSize: 11, color: "var(--rep-muted)" }}>8 bids</span>
            </div>
            <div className="cv">£2,750,000</div>
            <div className="nb">Guide {p.guide} · Reserve {p.reserve}</div>
          </div>
          <div style={{ marginTop: 14 }}>
            <span className="rep-lbl">Your bid</span>
            <div className="rep-input wf-mono" style={{ fontWeight: 600, color: "var(--rep-ink)" }}>£ 2,800,000</div>
          </div>
          <div style={{ marginTop: 10 }}><span className="rep-btn solid block lg">Place bid</span></div>
          <div style={{ marginTop: 12 }}>
            <span className="rep-lbl">Set a maximum bid (auto-bid)</span>
            <div className="rep-input" style={{ color: "var(--rep-muted)" }}>£ We'll bid up to this for you</div>
          </div>
          <div className="rep-divider"><span className="l" /><span className="t">or</span><span className="l" /></div>
          <div className="rep-btn outline block lg rep-buynow"><span>Buy now</span><span className="wf-mono" style={{ letterSpacing: 0 }}>£3,200,000</span></div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   STEP 5 — Artisio back office: Live Lot Performance (real-time)
   ========================================================================= */
const BOLivePerf = () => {
  const live = [
    { ...PROPS[4], cur: "£2,750,000", bids: 8, bidder: "Paddle 0042", under: false },
    { ...PROPS[3], cur: "£975,000", bids: 5, bidder: "Online · Leeds", under: false },
    { ...PROPS[0], cur: "£560,000", bids: 6, bidder: "Paddle 0017", under: false },
    { ...PROPS[5], cur: "£480,000", bids: 3, bidder: "Phone · M. Khan", under: true },
    { ...PROPS[1], cur: "£205,000", bids: 2, bidder: "Online · Berlin", under: true },
  ];
  const stats = [
    ["Lots Over Reserve", "3 lots", false],
    ["Lots Under Reserve", "2 lots", false],
    ["Total Highest Bids", "£4.97M", false],
    ["Total Max Bids", "£6.20M", false],
    ["Unrealized Max Bids", "£1.23M", true],
  ];
  return (
    <div className="wf">
      <div className="wf-appbar">
        <ArtisioWord light />
        <span className="right">
          <span className="wf-realtime"><span className="d" /> Live · syncing</span>
          <span>Auction Console</span>
          <span className="av" />
        </span>
      </div>
      <div className="bo-pagehead" style={{ padding: "12px 16px" }}>
        <div className="bo-crumb"><span>Sales</span><span className="sep">/</span><span className="cur">May Property Auction</span><span className="wf-pill pub" style={{ marginLeft: 6 }}>Published</span></div>
        <span className="wf-btn ghost" style={{ height: 32 }}>Export</span>
      </div>
      <div className="bo-tabs">
        {[["dashboard", "Dashboard"], ["home", "Lots"], ["bidders", "Bidders"], ["gavel", "Bids"], ["bolt", "Live Lot Performance"], ["card", "Invoices"]].map((t, i) => (
          <span className={"bo-tab" + (i === 4 ? " active" : "")} key={t[1]}><Icon n={t[0]} s={14} sw={1.9} /> {t[1]}</span>
        ))}
      </div>
      <div className="bo-stat-row">
        {stats.map((s) => (
          <div className={"bo-stat" + (s[2] ? " alert" : "")} key={s[0]}>
            <span className="live-dot" />
            <div className="sl">{s[0]}</div>
            <div className="sv">{s[1]}</div>
          </div>
        ))}
      </div>
      <div className="wf-table-scroll">
        <table className="bo-table">
          <thead>
            <tr>
              <th className="ctr" style={{ width: 56 }}>Lot</th>
              <th>Property</th>
              <th className="ctr">Status</th>
              <th className="num">Current Bid</th>
              <th className="ctr">Bids</th>
              <th>Leading Bidder</th>
              <th className="ctr">Time Left</th>
              <th className="num">Reserve</th>
            </tr>
          </thead>
          <tbody>
            {live.map((r) => (
              <tr key={r.lot}>
                <td className="ctr"><span className="bo-lotno" style={{ minWidth: 28, height: 26, fontSize: 13 }}>{r.lot}</span></td>
                <td>
                  <div className="bo-prop">
                    <PhotoThumb photo={r.photo} pos={r.pos} />
                    <div>
                      <div className="pt">{r.title}</div>
                      <div className="ps"><Icon n="pin" s={11} sw={1.8} /> {r.loc}</div>
                    </div>
                  </div>
                </td>
                <td className="ctr"><span className="wf-pill live"><span className="d" /> Live</span></td>
                <td className="num wf-mono" style={{ fontWeight: 700, color: r.under ? "var(--text-primary)" : "var(--success)" }}>{r.cur}</td>
                <td className="ctr wf-mono">{r.bids}</td>
                <td><span className="wf-realtime" style={{ color: "var(--text-secondary)" }}><span className="d" style={{ background: "var(--accent)" }} /> {r.bidder}</span></td>
                <td className="ctr wf-mono">1d 10h</td>
                <td className="num"><span className={"wf-pill " + (r.under ? "warn" : "ok")} style={{ fontWeight: 600 }}>{r.under ? "Under" : "Met"} · {r.reserve}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Object.assign(window, {
  RepLogo, RepHomepage, RepStorefront, BOShell, BOShellBg, BOSalesPage, BOInvoices, BOPublish, BOCreateSale, BOAssignItems, RepRegCard, RepRegister, RepLotBid, BOLivePerf, AMark, PROPS,
});
