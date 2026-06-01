/* global React, useReveal, RepHomepage, RepStorefront, BOCreateSale, BOAssignItems, BOSalesPage, BOInvoices, BOPublish, RepRegister, RepLotBid, BOLivePerf, Icon */
const { useState: useS6 } = React;

const BxStep = ({ n, tone, kicker, title, desc, children, watermark }) => {
  return (
    <div className={"bx2-step " + (tone || "")}>
      {watermark ? <div className="bx2-watermark">{watermark}</div> : null}
      <div className="wrap">
        <div className="bx2-head">
          <span className="bx2-num">{n}</span>
          <div>
            <div className="bx2-kicker">{kicker}</div>
            <h3 className="bx2-title">{title}</h3>
            <div className="bx2-desc">{desc}</div>
          </div>
        </div>
        <div className="bx2-canvas">{children}</div>
      </div>
    </div>);

};

const DocLink = ({ icon, title, url, display }) =>
<a className="bx2-doclink" href={url} target="_blank" rel="noopener noreferrer">
    <span className="di"><Icon n={icon} s={18} sw={1.8} /></span>
    <span className="dmeta">
      <span className="dt">{title}</span>
      <span className="dm">{display}</span>
    </span>
    <span className="dgo"><Icon n="arrow" s={15} sw={2} /></span>
  </a>;


const BiddingExperience = () => {
  const [ref, inView] = useReveal();
  return (
    <section className="bx2-section" id="bidding">
      <div className="section" style={{ paddingBottom: 24 }}>
        <div className="wrap bx2-intro" ref={ref} style={{ width: "880px", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>The bidding experience</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>From backoffice to your website, fully connected.

          </h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Run timed property auctions on your own branded site — your logo, your domain, entirely your experience. 
            <strong style={{ color: "var(--text-primary)" }}></strong>
          </p>
          <div className={"bx2-loop reveal" + (inView ? " in" : "")} style={{ "--d": "220ms", display: "flex", flexWrap: "nowrap", width: "max-content", maxWidth: "none", marginTop: "28px", marginLeft: "50%", transform: "translateX(-50%)" }}>
            <span className="step"><b>1</b> Embed</span><span className="arr">→</span>
            <span className="step"><b>2</b> Customize</span><span className="arr">→</span>
            <span className="step"><b>3</b> Create Auction</span><span className="arr">→</span>
            <span className="step"><b>4</b> Register Bidders</span><span className="arr">→</span>
            <span className="step"><b>5</b> Bidding Process</span><span className="arr">→</span>
            <span className="step"><b>6</b> Monitor</span><span className="arr">→</span>
            <span className="step"><b>7</b> Invoice</span>
          </div>
        </div>
      </div>

      {/* STEP 1 — embed Auctions on the homepage */}
      <BxStep
        n="01" tone="tint" watermark="01"
        kicker="Step 01 · Embed Artisio timed auctions on your existing website"
        title="Run timed auctions directly on your website."
        desc={<React.Fragment>
          A single page and one embed connect your website to Artisio's timed auction platform.
          No rebuild, no migration — but everything behind that page is a <strong>full-scale property
          auction engine running as your own</strong>.
        </React.Fragment>}>
        
        <div className="bx-glow" />
        <div className="bx2-frame"><RepHomepage /></div>
        <div className="bx2-paths-intro">Two ways to add it — both stay on your domain</div>
        <div className="bx2-paths">
          <div className="bx2-path feat">
            <span className="bx2-path-tag rec"><Icon n="bolt" s={14} sw={2} /> Recommended</span>
            <h4 className="bx2-path-title">White-label webapp</h4>
            <p className="bx2-path-desc">Paste JavaScript snippets from our docs — the auctions webapp renders right inside your site, in your logo, colours and domain. The fastest path to live.</p>
            <div className="bx2-codeblock">
              <code className="cl"><span className="c-com">{"<!-- Paste once, anywhere on your site -->"}</span></code>
              <code className="cl">{"<"}<span className="c-tag">script</span> <span className="c-attr">src</span>{"="}<span className="c-str">{"\"https://cdn.artisio.co/webapp/embed.js\""}</span> <span className="c-attr">defer</span>{"></"}<span className="c-tag">script</span>{">"}</code>
              <code className="cl">{"<"}<span className="c-tag">div</span> <span className="c-attr">data-artisio-webapp</span> <span className="c-attr">data-client</span>{"="}<span className="c-str">{"\"reportage\""}</span>{"></"}<span className="c-tag">div</span>{">"}</code>
            </div>
            <a className="bx2-doclink" href="https://docs.artisio.co/webapp/#full-example" target="_blank" rel="noopener noreferrer">
              <span className="di"><Icon n="doc" s={18} sw={1.8} /></span>
              <span className="dmeta"><span className="dt">Webapp embed guide</span><span className="dm">docs.artisio.co/webapp</span></span>
              <span className="dgo"><Icon n="arrow" s={15} sw={2} /></span>
            </a>
          </div>
          <div className="bx2-path">
            <span className="bx2-path-tag"><Icon n="code" s={14} sw={2} /> Full control</span>
            <h4 className="bx2-path-title">Headless via REST API</h4>
            <p className="bx2-path-desc">Want something bespoke? Build a fully custom auctions frontend on your own stack with our REST API — still entirely within your domain.</p>
            <div className="bx2-rest">
              <div className="bx2-rest-row"><span className="mth get">GET</span><span className="ep">/api/auctions</span></div>
              <div className="bx2-rest-row"><span className="mth get">GET</span><span className="ep">/api/lots</span></div>
              <div className="bx2-rest-row"><span className="mth post">POST</span><span className="ep">/api/bids</span></div>
              <div className="bx2-rest-row"><span className="mth get">GET</span><span className="ep">/api/bidders</span></div>
            </div>
            <a className="bx2-doclink" href="https://rest.artisio.co/docs/static/index.html" target="_blank" rel="noopener noreferrer">
              <span className="di"><Icon n="code" s={18} sw={1.8} /></span>
              <span className="dmeta"><span className="dt">REST API reference</span><span className="dm">rest.artisio.co/docs</span></span>
              <span className="dgo"><Icon n="arrow" s={15} sw={2} /></span>
            </a>
          </div>
        </div>
      </BxStep>

      {/* STEP 2 — branded auctions listing */}
      <BxStep
        n="02" watermark="02"
        kicker="Step 02 · Customize your branded auctions"
        title="A full auctions site, in your own brand."
        desc={<React.Fragment>
          Once embedded, the <strong>Auctions</strong> page opens a complete catalogue on your domain — filters, lots and live
          countdowns — styled entirely as your brand. Buyers browse and bid without ever leaving your website.
        </React.Fragment>}>
        
        <div className="bx-glow" />
        <div className="bx2-frame"><RepStorefront /></div>
      </BxStep>

      {/* STEP 3 — create + publish */}
      <BxStep
        n="03" tone="tint" watermark="03"
        kicker="Step 03 · Create an auction in the back office"
        title="It all happens in your back office."
        desc={<React.Fragment>
          Everything is run from the <strong>Artisio AMS back office</strong>. Open the <strong>Create Sale</strong> dialog
          to set the rules and upload images, <strong>choose your real-estate properties and assign lot numbers</strong>,
          then hit Publish — and the catalogue appears on your branded site instantly.
        </React.Fragment>}>
        
        <div className="bx-glow" />
        <div className="bx2-twostack">
          <div className="bx2-substep"><span className="slab">1 · Create the sale — in the back office</span><span className="sline" /></div>
          <BOShell page="Sales" cta="Create New Sale"><BOCreateSale /></BOShell>
          <div className="bx2-substep"><span className="slab">2 · Assign properties &amp; lot numbers — in the back office</span><span className="sline" /></div>
          <BOShell page="Sales" cta="Create New Sale"><BOAssignItems /></BOShell>
          <div className="bx2-substep"><span className="slab">3 · Publish to your site — from the Sales screen</span><span className="sline" /></div>
          <BOSalesPage />
          <div className="bx2-connect">
            <span className="cl" />
            <span className="cc"><Icon n="check" s={16} sw={3} /> Published → live on reportagegroup.com</span>
            <span className="cl r" />
          </div>
        </div>
      </BxStep>

      {/* STEP 4 — register */}
      <BxStep
        n="04" watermark="04"
        kicker="Step 04 · Bidder onboarding"
        title="Bidders register with the checks you choose."
        desc={<React.Fragment>
          The <strong>bidder restrictions</strong> you ticked when creating the sale become the bidder's registration steps —
          <strong> identity verification, refundable deposit, credit-card pre-auth and manual approval.</strong>
        </React.Fragment>}>
        
        <div className="bx-glow" />
        <div className="bx2-frame"><RepRegister /></div>
        <div className="bx2-secure">
          <div className="bx2-secure-head"><Icon n="shield" s={16} sw={1.9} /> Verified, compliant onboarding — controls to manage risk at every level</div>
          <div className="bx2-secure-grid">
            {[
              ["Safe, secure registration", "bidder registration and data management, end to end."],
              ["High GDPR standard", "all bidder and buyer data stored to a high GDPR standard."],
              ["Automated pre-auction checks", "on bidders via credit/debit card automated deposit."],
              ["KYC & AML onboarding", "secure ID and supporting-photo verification."],
              ["Pre-authorisation & bidding limits", "applied at both auction and bidder level."],
              ["A one-stop-shop web app", "bidders register, leave bids and pay, all in one place."],
            ].map((p) => (
              <div className="bx2-secure-item" key={p[0]}>
                <span className="ck"><Icon n="check" s={11} sw={3} /></span>
                <span><b>{p[0]}</b> — {p[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </BxStep>

      {/* STEP 5 — bid */}
      <BxStep
        n="05" tone="tint" watermark="05"
        kicker="Step 05 · The bidding process"
        title="Bidders can place a bid, set a max bid, or use a buy now option."
        desc={<React.Fragment>
          Registered bidders <strong>place a live bid</strong>, leave an <strong>automatic maximum bid</strong> that runs on their behalf,
          or skip the wait with <strong>Buy&nbsp;Now</strong> — all from the property's lot page on your site.
        </React.Fragment>}>
        
        <div className="bx-glow" />
        <div className="bx2-frame"><RepLotBid /></div>
      </BxStep>

      {/* STEP 6 — back office real-time */}
      <BxStep
        n="06" tone="dark" watermark="06"
        kicker="Step 06 · Back in Artisio"
        title="Every bid mirrored in the back office, in real time."
        desc={<React.Fragment>
          All bid and bidder data streams straight back into Artisio. <strong>Live Lot Performance</strong> updates current bids,
          leading bidders, reserves and max-bid exposure the instant they happen on your site.
        </React.Fragment>}>
        
        <div className="bx-glow" />
        <div className="bx2-frame"><BOLivePerf /></div>
      </BxStep>

      {/* STEP 7 — invoicing */}
      <BxStep
        n="07" tone="tint" watermark="07"
        kicker="Step 07 · Settlement in the back office"
        title="Generate and send invoices in a click."
        desc={<React.Fragment>
          Once a lot sells, raise the buyer's invoice straight from the sale. <strong>Generate unpaid invoices</strong> in
          a batch, preview the PDF and <strong>send them by email</strong> — payments, reminders and settlement all tracked in Artisio.
        </React.Fragment>}>
        
        <div className="bx-glow" />
        <BOInvoices />
      </BxStep>
    </section>);

};

window.BiddingExperience = BiddingExperience;