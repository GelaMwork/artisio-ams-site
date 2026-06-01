/* global React, Icon, useReveal, MOCKS */
const { useState: useS4, useEffect: useE4, useRef: useR4, useLayoutEffect: useL4 } = React;

/* =========================================================================
   PANEL 7 — Testimonial carousel
   ========================================================================= */
const QUOTES = [
  {
    text: "Artisio has transformed how we run our sales. What used to take three systems and a spreadsheet now lives in one place — and our clerks love it.",
    name: "Rob Holroyd", role: "Marketing Director — BPI Auctions", logo: "BPI",
  },
  {
    text: "The move to Artisio was the smoothest software migration we've ever done. Sale day is calmer, faster and completely auditable.",
    name: "Operations Lead", role: "Fine Art & Antiques House", logo: "FA",
  },
  {
    text: "Bidder registration, KYC and settlement used to be our biggest headache. Now it's automated end to end — we just run the auction.",
    name: "Head of Sales", role: "International Auction House", logo: "IA",
  },
];

const Testimonial = () => {
  const [i, setI] = useS4(0);
  const [ref, inView] = useReveal({ threshold: 0.35 });
  useE4(() => {
    if (window.PRM) return;
    const t = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 7000);
    return () => clearInterval(t);
  }, []);
  const q = QUOTES[i];
  const groups = q.text.split(" ").reduce((acc, w, idx) => {
    const g = Math.floor(idx / 3);
    (acc[g] = acc[g] || []).push(w);
    return acc;
  }, []);
  return (
    <section className="section tst-section">
      <div className="wrap">
        <div className="tst-card" ref={ref}>
          <div className={"tst-quote-mark" + (inView ? " in" : "")}>“</div>
          <blockquote className={"tst-quote" + (inView ? " in" : "")} key={i}>
            {groups.map((g, gi) => (
              <span className="wg" key={gi} style={{ "--d": gi * 90 + "ms" }}>{g.join(" ")} </span>
            ))}
          </blockquote>
          <div className="tst-foot">
            <div className="tst-logo">{q.logo}</div>
            <div>
              <div className="tst-name">{q.name}</div>
              <div className="tst-role">{q.role}</div>
            </div>
          </div>
        </div>
        <div className="tst-dots">
          {QUOTES.map((_, di) => (
            <button key={di} className={"tst-dot" + (di === i ? " active" : "")} aria-label={"Quote " + (di + 1)} onClick={() => setI(di)} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   PANEL 8 — Feature deep-dive (tabbed)
   ========================================================================= */
const TABS = [
  { id: "crm", ico: "crm", tab: "CRM · CMS · BDM", eyebrow: "Buyer management", title: "A full overview of every buyer.",
    mock: "crm", bullets: [["Full buyer overview", " with dashboards and a complete activity log."], ["Audited database", " — every change tracked and reversible."], ["Bidding, purchase & watchlist history", " on every buyer record."]] },
  { id: "inventory", ico: "inventory", tab: "Inventory Management", eyebrow: "Property control", title: "Your portfolio, at a glance.",
    mock: "inventory", bullets: [["Property intake & terms", " captured the moment a listing is added."], ["Categories, tags & reference IDs", " for instant traceability across the portfolio."], ["Centralised media & legal packs", " — photos, floorplans and documents on every listing."], ["Connect your existing platform", " — sync third-party inventory systems so everything is tracked in one centralised place."]] },
  { id: "auction", ico: "calendar", tab: "Auction Creation", eyebrow: "Set up sales", title: "Build a property sale in minutes.",
    mock: "auction", bullets: [["Customisable timed sales", " with Outlook & Google calendar sync."], ["Drag-drop property photos", " — full galleries, floorplans and legal packs per lot."], ["Multi-currency guides", ", then push &  publish to your branded site."]] },
  { id: "saleday", ico: "gavel", tab: "Sale Day", eyebrow: "Go live", title: "Run the sale with confidence.",
    mock: "saleday", bullets: [["Live & timed online bidding", " in one console."], ["SSO bidder registration", " straight from your website."], ["Real-time bids & reserve dashboard", " as the sale unfolds."]] },
  { id: "bidders", ico: "bidders", tab: "Bidder Management & Security", eyebrow: "Trust & compliance", title: "Onboard bidders, safely.",
    mock: "bidders", bullets: [["Secure registration & GDPR storage", " by default."], ["KYC / AML onboarding", " with card pre-auth and bidding limits."], ["A web-app one-stop-shop", " for bidders to register, bid and pay."]] },
  { id: "payment", ico: "card", tab: "Payment Solution", eyebrow: "Get paid", title: "Settlement, simplified.",
    mock: "payment", bullets: [["Stripe-powered payments", " out of the box."], ["Batch or individual invoices", " sent to successful bidders in a click."], ["Pay online via the web app", " — no friction for buyers."]] },
  { id: "marketing", ico: "marketing", tab: "Marketing & Performance", eyebrow: "Grow", title: "Know what sells, and why.",
    mock: "marketing", bullets: [["Smart analytics & exportable data", " for every sale."], ["Mailchimp campaigns", " driven by your live property catalogue."], ["PowerBI & BI integration", " for deeper reporting."]] },
  { id: "support", ico: "support", tab: "Customer Commitment & Training", eyebrow: "Partnership", title: "We're with you, always.",
    mock: "support", bullets: [["UK & international account management", " and 99.995% uptime."], ["10 full-time developers", " shipping monthly releases."], ["Onsite training", " plus an on-demand video library."]] },
];

const DeepBullets = ({ bullets, tabId }) => {
  const [show, setShow] = useS4(false);
  useE4(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, [tabId]);
  return (
    <ul className="deep-list">
      {bullets.map((b, i) => (
        <li key={i} className={show ? "show" : ""} style={{ transitionDelay: (show ? i * 110 : 0) + "ms" }}>
          <span className="ck"><Icon n="check" s={12} sw={3} /></span>
          <b>{b[0]}</b>{b[1]}
        </li>
      ))}
    </ul>
  );
};

const DeepDive = () => {
  const [active, setActive] = useS4(0);
  const [ref, inView] = useReveal();
  const tabsRef = useR4(null);
  const btnRefs = useR4([]);
  const [ind, setInd] = useS4({ left: 0, width: 0 });

  useL4(() => {
    const btn = btnRefs.current[active];
    if (btn) setInd({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active]);

  useE4(() => {
    const onResize = () => {
      const btn = btnRefs.current[active];
      if (btn) setInd({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const t = TABS[active];
  const Mock = MOCKS[t.mock];

  return (
    <section className="section deep-section" id="deep">
      <div className="wrap">
        <div className="section-head" ref={ref}>
          <span className="eyebrow">Feature deep-dive</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Explore the platform, module by module.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "120ms" }}>Select a module below to see it in action.</p>
        </div>
        <div className="deep-tabhint"><Icon n="arrow" s={15} sw={2.2} /> Tap a module to switch</div>
        <div className="deep-tabbar" ref={tabsRef}>
          <div className="deep-tab-ind" style={{ transform: `translateX(${ind.left}px)`, width: ind.width }} />
          {TABS.map((tb, i) => (
            <button key={tb.id} ref={(el) => (btnRefs.current[i] = el)}
              className={"deep-tab" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}>
              <Icon n={tb.ico} s={17} sw={1.9} /> {tb.tab}
            </button>
          ))}
        </div>
        <div className="deep-panel" key={active}>
          <div className="deep-copy">
            <div className="deep-eyebrow">{t.eyebrow}</div>
            <h3 className="deep-h">{t.title}</h3>
            <DeepBullets bullets={t.bullets} tabId={t.id} />
          </div>
          <div className="deep-visual">
            <div className="tablet deep-mock-fade">
              <div className="tablet-glow" />
              <div className="tablet-screen">{Mock ? <Mock /> : null}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Testimonial = Testimonial;
window.DeepDive = DeepDive;
