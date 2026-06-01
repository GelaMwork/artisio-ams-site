/* global React, Icon, useReveal, useMobile, LogoLight, MockMarketing, MockPayments, MockBidders */

/* =========================================================================
   PANEL 9 — Infrastructure / Security by design
   ========================================================================= */
const SEC_COLS = [
{ ico: "database", h: "Encryption & Hosting", p: "Hosted across two independent AWS regions with automatic failover and always-on availability. Every byte is encrypted in transit and at rest with AES-256, so your catalogue, bids and bidder data are protected end to end.",
  chips: ["2× AWS regions", "AES-256", "Always-on"] },
{ ico: "shield", h: "Certifications", p: "Independently audited and certified against the standards your compliance team expects — ISO 27001 and ISO 27018 for information and cloud-privacy management, SOC 1/2/3 reporting, and PCI-DSS Level 1 for card handling.",
  chips: ["ISO 27001", "ISO 27018", "SOC 1/2/3", "PCI-DSS L1"] },
{ ico: "monitor", h: "Monitoring", p: "A dedicated team monitors the platform 24/7, with active vigilance against threats and anomalies. Regular third-party penetration testing keeps defences ahead of emerging risks, all year round.",
  chips: ["24/7 SOC", "Threat vigilance", "Pen-tested"] },
{ ico: "lock", h: "Data Privacy & GDPR", p: "Fully GDPR-compliant, with data held across multiple datacentres. Multi-factor authentication and granular, role-based access control govern every login, backed by complete KYC and AML5 onboarding for bidders.",
  chips: ["GDPR", "MFA", "Granular access", "KYC / AML5"] }];


const SecCol = ({ c }) => {
  const [ref, inView] = useReveal({ threshold: 0.3 });
  return (
    <div className={"sec-col" + (inView ? " in" : "")} ref={ref}>
      <div className="sec-ico"><Icon n={c.ico} s={24} /></div>
      <h3>{c.h}</h3>
      <p>{c.p}</p>
      <div className="sec-chips">
        {c.chips.map((ch, i) =>
        <span className="sec-chip" key={ch} style={{ "--d": 250 + i * 110 + "ms" }}>
            <span className="vk"><Icon n="check" s={9} sw={3.5} /></span>{ch}
          </span>
        )}
      </div>
    </div>);

};

/* Mobile accordion card — shows icon + title, expands to reveal description + chips */
const SecAccordion = ({ c }) => {
  const [open, setOpen] = React.useState(false);
  const bodyRef = React.useRef(null);
  const [bodyH, setBodyH] = React.useState(0);
  React.useEffect(() => {
    if (bodyRef.current) setBodyH(bodyRef.current.scrollHeight);
  }, [open]);
  return (
    <div className={"sec-acc" + (open ? " sec-acc-open" : "")} onClick={() => setOpen(!open)}>
      <div className="sec-acc-header">
        <div className="sec-ico"><Icon n={c.ico} s={20} /></div>
        <h3>{c.h}</h3>
        <span className="sec-acc-chevron"><Icon n="arrow" s={14} /></span>
      </div>
      <div className="sec-acc-body" ref={bodyRef} style={{ maxHeight: open ? bodyH + 20 : 0 }}>
        <p>{c.p}</p>
        <div className="sec-chips">
          {c.chips.map((ch) =>
            <span className="sec-chip" key={ch}>
              <span className="vk"><Icon n="check" s={9} sw={3.5} /></span>{ch}
            </span>
          )}
        </div>
      </div>
    </div>);
};

const Security = () => {
  const [ref, inView] = useReveal();
  const mobile = useMobile();
  return (
    <section className="section sec-section" id="security">
      <div className="sec-scan" />
      <div className="wrap">
        <div className="section-head" ref={ref} style={{ maxWidth: 720 }}>
          <span className="eyebrow on-dark">Infrastructure</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Security by design — protected at all times.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Your data and your bidders' trust are non-negotiable. Artisio is built on hardened,
            independently certified infrastructure.
          </p>
        </div>
        {mobile ? (
          <div className="sec-acc-list">
            {SEC_COLS.map((c) => <SecAccordion key={c.h} c={c} />)}
          </div>
        ) : (
          <div className="sec-grid">
            {SEC_COLS.map((c) => <SecCol key={c.h} c={c} />)}
          </div>
        )}
      </div>
    </section>);

};

/* =========================================================================
   PANEL 10 — CTA + footer
   ========================================================================= */
const FOOTER = [
["Platform", ["Overview", "Inventory", "Sale day", "Payments", "Mobile apps"]],
["Company", ["About", "Clients", "Security", "Careers", "Contact"]],
["Resources", ["API docs", "Integrations", "Training library", "Status", "Release notes"]]];


const CTA = () => {
  const [ref, inView] = useReveal({ threshold: 0.3 });
  const go = (id) => {const el = document.getElementById(id);if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: window.PRM ? "auto" : "smooth" });};
  return (
    <React.Fragment>
      <section className="cta-section" id="contact" style={{ paddingTop: "var(--section-pad)" }}>
        <div className="cta-band gradient-shift" ref={ref}>
          <div className="deco-ring" style={{ width: 320, height: 320, right: -80, top: -120 }} />
          <div className="deco-ring" style={{ width: 180, height: 180, right: 140, bottom: -90 }} />
          <div className="deco-ring" style={{ width: 90, height: 90, left: "44%", bottom: 30, borderColor: "rgba(255,255,255,.18)" }} />
          <div className="cta-inner">
            <span className="eyebrow on-dark" style={{ color: "#fff" }}>Ready when you are</span>
            <h2 className={"cta-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms", marginTop: 16 }}>Implement auctions in your business now.</h2>
            <p className={"cta-p reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>See Artisio AMS run a sale end to end. Book a 1 hour demo with our team and we'll tailor it to your categories and workflow.


            </p>
            <div className={"cta-actions reveal" + (inView ? " in" : "")} style={{ "--d": "220ms" }}>
              <a className="btn btn-white btn-lg btn-glow" href="https://www.artisio.co/book-a-demo" target="_blank" rel="noopener noreferrer">Book a demo <Icon n="arrow" s={17} /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <LogoLight />
              <p>The cloud-native auction management system digitising the auction industry, front to back.</p>
            </div>
            <nav className="footer-nav">
              {[["Bidding", "bidding"], ["Platform", "platform"], ["Features", "features"], ["Integrations", "integrations"], ["Clients", "clients"], ["Security", "security"], ["Book a demo", "demo"]].map(([l, id]) =>
              <a key={l} href={id === "demo" ? "https://www.artisio.co/book-a-demo" : "#" + id}
              target={id === "demo" ? "_blank" : undefined} rel="noopener noreferrer"
              onClick={(e) => {if (id !== "demo") {e.preventDefault();go(id);}}}>{l}</a>
              )}
            </nav>
          </div>
          <div className="footer-badges">
            {[
            ["assets/badges/cyber-essentials.webp", "Cyber Essentials Certified"],
            ["assets/badges/startup-world-cup.webp", "Startup World Cup"],
            ["assets/badges/capterra.webp", "Capterra rated 5"],
            ["assets/badges/business-award.webp", "Winner — TBC Business Award 2022"],
            ["assets/badges/gdpr.webp", "GDPR Certified"],
            ["assets/badges/pts.webp", "The Philatelic Traders' Society"]].
            map((b) =>
            <span className="cert" key={b[0]}><img src={b[0]} alt={b[1]} title={b[1]} /></span>
            )}
          </div>
          <div className="footer-bot">
            <span>© 2026 Artisio Ltd. All rights reserved. · Registered in England &amp; Wales · Company No. 12706184</span>
          </div>
        </div>
      </footer>
    </React.Fragment>);

};

const Commitment = () => {
  const [ref, inView] = useReveal();
  const points = [
  ["users", "UK & international account management", "Dedicated customer and account management for auction houses at home and abroad."],
  ["monitor", "24-hour cloud support", "Round-the-clock support that keeps the platform at 99.995% server uptime."],
  ["support", "An 'always-on' technical team", "10 full-time Artisio developers delivering a continuous technical support service."],
  ["bolt", "Monthly product releases", "Regular monthly product and feature releases that constantly improve functionality."],
  ["graduation", "Onsite & virtual training", "Onsite software training as standard, supported with virtual sessions delivered by the Artisio team."]];

  return (
    <section className="section commit-section" id="commitment">
      <div className="wrap">
        <div className="section-head" ref={ref} style={{ maxWidth: 760 }}>
          <span className="eyebrow">Customer commitment &amp; training</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>We're with you — front to back.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Artisio Ltd backs every auctioneer with hands-on account management, always-on support and continuous training.
          </p>
        </div>

        <div className="commit-stats">
          <div className="cstat"><b>99.995%</b><span>Server uptime</span></div>
          <div className="cstat"><b>10 FT</b><span>Artisio developers</span></div>
          <div className="cstat"><b>Monthly</b><span>Product releases</span></div>
          <div className="cstat"><b>UK &amp; Int'l</b><span>Account management</span></div>
        </div>

        <div className="commit-grid">
          {points.map((p) =>
          <div className="commit-card" key={p[1]}>
              <div className="commit-ico"><Icon n={p[0]} s={22} /></div>
              <div>
                <h3>{p[1]}</h3>
                <p>{p[2]}</p>
              </div>
            </div>
          )}
          <div className="commit-card commit-new">
            <div className="commit-ico"><Icon n="play" s={22} /></div>
            <div>
              <span className="commit-badge">New</span>
              <h3>A video training library</h3>
              <p>A reference library of video training modules for remote, ongoing learning — covering every front-to-back process. Viewing is audited, so managers can track user engagement and progress.</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

const Marketing = () => {
  const [ref, inView] = useReveal();
  const points = [
  ["Data capture & smart analytics", " delivers marketing data to support buyer campaigns."],
  ["Full buyer history", " — bidding, purchase and watchlist history available for every buyer."],
  ["Fully searchable & exportable", " — auction data can be interrogated across all verticals."],
  ["Mailchimp-integrated email", " campaigns are built, supported and run straight from your catalogue."],
  ["Open to your BI tools", " — Artisio data sets can be interrogated by any business-intelligence or analytics product."]];

  return (
    <section className="section mkt-section" id="marketing-perf">
      <div className="wrap mkt-grid">
        <div ref={ref}>
          <span className="eyebrow">Marketing &amp; performance</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Know what sells — and why.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Turn every sale into insight, then act on it — from campaign data to live exports and BI.
          </p>
          <ul className="mkt-list">
            {points.map((p, i) =>
            <li key={i} className={"reveal" + (inView ? " in" : "")} style={{ "--d": 220 + i * 80 + "ms" }}>
                <span className="ck"><Icon n="check" s={13} sw={3} /></span>
                <span><b>{p[0]}</b>{p[1]}</span>
              </li>
            )}
          </ul>
        </div>
        <div className={"mkt-visual reveal-r" + (inView ? " in" : "")} style={{ "--d": "200ms" }}>
          <div className="tablet">
            <div className="tablet-glow" />
            <div className="tablet-screen"><MockMarketing /></div>
          </div>
        </div>
      </div>
    </section>);

};

const Payments = () => {
  const [ref, inView] = useReveal();
  const points = [
  ["Powered by Stripe", " — payments are provided by Artisio via our dedicated payment partner, Stripe Ltd."],
  ["Batch or individual requests", " — post-sale payment requests delivered by email to successful bidders."],
  ["Quick & secure", " payment options throughout."],
  ["Pay online via the web app", ", or directly with the auctioneer's preferred payment partner."]];

  return (
    <section className="section mkt-section pay-section" id="payments-sol">
      <div className="wrap mkt-grid">
        <div className={"mkt-visual reveal-l" + (inView ? " in" : "")} style={{ "--d": "200ms" }}>
          <div className="tablet">
            <div className="tablet-glow" />
            <div className="tablet-screen"><MockPayments /></div>
          </div>
        </div>
        <div ref={ref}>
          <span className="eyebrow">Payment solution</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Settlement, simplified.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Get paid faster with Stripe-powered payments built right into every sale.
          </p>
          <ul className="mkt-list">
            {points.map((p, i) =>
            <li key={i} className={"reveal" + (inView ? " in" : "")} style={{ "--d": 220 + i * 80 + "ms" }}>
                <span className="ck"><Icon n="check" s={13} sw={3} /></span>
                <span><b>{p[0]}</b>{p[1]}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

};

const BidderMgmt = () => {
  const [ref, inView] = useReveal();
  const points = [
  ["Safe, secure registration", " — bidder registration and data management, end to end."],
  ["High GDPR standard", " — all bidder and buyer data stored to a high GDPR standard."],
  ["Automated pre-auction checks", " on bidders via credit/debit card automated deposit."],
  ["KYC & AML onboarding", " — a comprehensive secure facility with ID and supporting-photo minimum standards."],
  ["Pre-authorisation & bidding limits", " applied at both auction and bidder level."],
  ["A one-stop-shop web app", " — bidders register, leave bids and pay, all in one place."]];

  return (
    <section className="section mkt-section" id="bidder-mgmt">
      <div className="wrap mkt-grid">
        <div ref={ref}>
          <span className="eyebrow">Bidder management &amp; security</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Onboard bidders, safely.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Verified, compliant bidder onboarding — with the controls to manage risk at every level.
          </p>
          <ul className="mkt-list mkt-list-2">
            {points.map((p, i) =>
            <li key={i} className={"reveal" + (inView ? " in" : "")} style={{ "--d": 200 + i * 70 + "ms" }}>
                <span className="ck"><Icon n="check" s={13} sw={3} /></span>
                <span><b>{p[0]}</b>{p[1]}</span>
              </li>
            )}
          </ul>
        </div>
        <div className={"mkt-visual reveal-r" + (inView ? " in" : "")} style={{ "--d": "200ms" }}>
          <div className="tablet">
            <div className="tablet-glow" />
            <div className="tablet-screen"><MockBidders /></div>
          </div>
        </div>
      </div>
    </section>);

};

window.BidderMgmt = BidderMgmt;
window.Payments = Payments;
window.Marketing = Marketing;
window.Commitment = Commitment;
window.Security = Security;
window.CTA = CTA;