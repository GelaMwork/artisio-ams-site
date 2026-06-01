/* global React, Icon, useReveal */
/* =========================================================================
   CRM · CMS · BDM — front-to-back bento (Huly-style layout, Artisio styling)
   ========================================================================= */
const CRM_CARDS = [
  { ico: "crm", lead: "Full buyer overview", desc: "Every buyer and bidder, unified in a single record.", span: 2, feat: true },
  { ico: "sliders", lead: "Personalised setup", desc: "Customisable client setup and auction-fee management." },
  { ico: "dashboard", lead: "At-a-glance dashboard", desc: "Comprehensive data capture across every auction." },
  { ico: "shield", lead: "Fully audited database", desc: "Every record trackable and audited, end to end." },
  { ico: "gavel", lead: "Bidding & spend history", desc: "Lots won, spend and full underbidder data.", span: 2 },
  { ico: "analytics", lead: "Smart analytics", desc: "Reporting on buying history, interests and bidding preferences." },
  { ico: "coins", lead: "Financial interrogation", desc: "Full view of buyer financial activity and history." },
  { ico: "card", lead: "Payment rating system", desc: "Full buyer payment history with a payment-rating score." },
  { ico: "receipt", lead: "Payments & invoicing", desc: "eCommerce and offline, managed in one place.", span: 2 },
  { ico: "support", lead: "CRM activity log", desc: "Log client activity, assign tasks, set ‘next actions’ and save notes & emails against records.", span: 2, feat: true },
];

const CrmCard = ({ c, i }) => {
  const [ref, inView] = useReveal({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={"crm-card reveal-scale" + (c.feat ? " feat" : "") + (c.span === 2 ? " w2" : "") + (inView ? " in" : "")}
      style={{ "--d": (i % 4) * 60 + "ms" }}
    >
      <div className="crm-ico"><Icon n={c.ico} s={22} /></div>
      <div className="crm-txt"><b>{c.lead}.</b> {c.desc}</div>
    </div>
  );
};

const CRMSuite = () => {
  const [ref, inView] = useReveal();
  return (
    <section className="section crm-section" id="crm-suite">
      <div className="wrap">
        <div className="section-head" ref={ref} style={{ maxWidth: 800 }}>
          <span className="eyebrow">CRM · CMS · BDM</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>
            Complete front-to-back, cloud-based auction management.
          </h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            One system for the whole client relationship — from consignment and cataloguing to settlement, reporting and follow-up.
          </p>
        </div>
        <div className="crm-bento">
          {CRM_CARDS.map((c, i) => <CrmCard key={c.lead} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
};

window.CRMSuite = CRMSuite;
