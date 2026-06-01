/* global React, Icon, useReveal, useCountUp, useMobile */
const { useState: useS2 } = React;

/* =========================================================================
   PANEL 2 — What is Artisio
   ========================================================================= */
const AboutBadge = () => {
  const [ref, inView] = useReveal({ threshold: 0.3 });
  return (
    <div className="about-badge" ref={ref}>
      <div className="ring orbit-slow">
        <div className="orbit-dot" style={{ transform: "translate(180px,0)" }} />
      </div>
      <div className="ring r2" />
      <div className="ring r3 orbit-slow" style={{ animationDirection: "reverse", animationDuration: "18s" }}>
        <div className="orbit-dot" style={{ width: 8, height: 8, margin: -4, background: "var(--artisio-sky)", transform: "translate(0,90px)" }} />
      </div>
      <div className="about-core">
        <img src="assets/artisio-mark-badge.svg" alt="Artisio" className={"about-mark" + (inView ? " in" : "")} />
      </div>
    </div>);

};

const AboutStat = ({ end, decimals, prefix, suffix, unit, label, group }) => {
  const [ref, inView] = useReveal({ threshold: 0.5 });
  const v = useCountUp(end, inView, { decimals, prefix, suffix, group });
  return (
    <div className="about-stat" ref={ref}>
      <div className="stat-num">{v}<span className="unit">{unit}</span></div>
      <div className="lbl">{label}</div>
    </div>);

};

const About = () => {
  const [ref, inView] = useReveal({ threshold: 0.25 });
  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <AboutBadge />
        <div ref={ref}>
          <span className="eyebrow">What is Artisio</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>One platform for the whole auction business.</h2>
          <p className={"about-para reveal" + (inView ? " in" : "")} style={{ marginTop: 22, "--d": "180ms" }}>
            <strong>Artisio is the best-in-class auction software solution</strong>, purpose-built to
            digitise the auction industry end to end. We replace fragmented spreadsheets and legacy
            tools with one cloud-native system — connecting listing, cataloguing, sale day and
            invoicing.
          </p>
          <div className="about-stats">
            <AboutStat end={15} suffix="+" label="Countries across the world" />
            <AboutStat end={2021} group={false} label="Live in production since 2021" />
            <AboutStat end={100} suffix="%" label="Cloud native — nothing to install" />
          </div>
        </div>
      </div>
    </section>);

};

/* =========================================================================
   PANEL 3 — The platform (capability cards)
   ========================================================================= */
const CAPS = [
{ ico: "ai", title: "Artisio AI", desc: "Your AI guide to Artisio. Ask questions, explore features and get instant answers about what Artisio can do for your business.", tag: "New", feat: true },
{ ico: "web", title: "Web App", desc: "Build and run timed auctions from any browser — no installs, no delays, live the moment you need it." },
{ ico: "inventory", title: "Property Inventory", desc: "Manage your entire property portfolio in one place. Intake, categorise and tag every lot — built for real estate, ready for auction." },
{ ico: "plug", title: "Open API", desc: "Connect Artisio to the tools you already use. A fully documented API to build, integrate and extend however your business needs." },
{ ico: "analytics", title: "Analytics & Reports", desc: "Live dashboards, detailed reports and exportable data for every sale — everything you need to make better decisions, faster." },
{ ico: "support", title: "Onboarding & Success", desc: "Dedicated onboarding and a customer success team that stays with you — from day one through every sale." },
{ ico: "shield", title: "Secure Infrastructure", desc: "Enterprise-grade security by design. Encrypted, multi-region and monitored around the clock so your data is always protected." },
{ ico: "crm", title: "CRM · CMS · BDM", desc: "Full client overview, audited database and business-development tooling." }];


const CapCard = ({ c, i }) => {
  const [ref, inView] = useReveal({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={"cap-card reveal-scale" + (c.feat ? " feat" : "") + (inView ? " in" : "")}
      style={{ "--d": i % 4 * 70 + Math.floor(i / 4) * 90 + "ms" }}>
      
      {c.tag ? <span className="cap-tag">{c.tag}</span> : null}
      <div className="cap-ico"><Icon n={c.ico} s={23} /></div>
      <h3 className="cap-title">{c.title}</h3>
      <p className="cap-desc">{c.desc}</p>
    </div>);

};

const Platform = () => {
  const [ref, inView] = useReveal();
  const mobile = useMobile();
  const [showAll, setShowAll] = useS2(false);
  const visibleCaps = (mobile && !showAll) ? CAPS.slice(0, 4) : CAPS;
  const hasMore = mobile && !showAll && CAPS.length > 4;
  return (
    <section className="section" id="platform">
      <div className="wrap">
        <div className="section-head" ref={ref}>
          <span className="eyebrow">MORE ON ARTISIO</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Front-to-back, by design.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Every capability an auction house needs — CRM, CMS and business development — unified
            in a single, always-on cloud platform.
          </p>
        </div>
        <div className="cap-grid">
          {visibleCaps.map((c, i) => <CapCard key={c.title} c={c} i={i} />)}
        </div>
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button className="btn btn-outline show-more-btn" onClick={() => setShowAll(true)}>
              Show all {CAPS.length} capabilities <Icon n="arrow" s={14} />
            </button>
          </div>
        )}
      </div>
    </section>);

};

window.About = About;
window.Platform = Platform;