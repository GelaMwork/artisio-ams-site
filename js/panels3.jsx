/* global React, Icon, useReveal */
const { useState: useS3, useEffect: useE3, useRef: useR3 } = React;

/* =========================================================================
   PANEL 4 — Key features (3 pillars)
   ========================================================================= */
const PILLARS = [
{ cls: "cyan", num: "01", label: "Easy Customization", desc: "Configure sales, fields, terms and workflows to match exactly how your house operates — no code required.",
  ico: <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="9" style={{ "--dash": 60 }} /><path d="M32 6v8M32 50v8M6 32h8M50 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" style={{ "--dash": 220 }} /></svg> },
{ cls: "blue", num: "02", label: "Flexible, Scalable Pricing", desc: "Plans that grow with your volume — from boutique galleries to multi-site international houses.",
  ico: <svg viewBox="0 0 64 64"><path d="M10 54V10M10 54h44" style={{ "--dash": 90 }} /><path d="M20 44V30M32 44V18M44 44V24" style={{ "--dash": 90 }} /></svg> },
{ cls: "navy", num: "03", label: "Seamless 3rd-Party Integration", desc: "Connect payments, accounting, shipping and marketing through a robust, documented API layer.",
  ico: <svg viewBox="0 0 64 64"><path d="M24 8v14M40 8v14M18 22h28v8a14 14 0 0 1-28 0v-8zM32 44v12" style={{ "--dash": 200 }} /></svg> }];


const Pillar = ({ p }) => {
  const [ref, inView] = useReveal({ threshold: 0.3 });
  return (
    <div className={"pillar " + p.cls + (inView ? " in" : "")} ref={ref}>
      <div className="pillar-deco" /><div className="pillar-deco two" />
      <div className="pillar-num">{p.num}</div>
      <div className="pillar-ico">{p.ico}</div>
      <div className="pillar-label">{p.label}</div>
      <div className="pillar-desc">{p.desc}</div>
    </div>);

};

const Features = () => {
  const [ref, inView] = useReveal();
  return (
    <section className="section feat-section" id="features">
      <div className="wrap">
        <div className="section-head" ref={ref}>
          <span className="eyebrow">Why Artisio</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Built around your auction processes.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Three principles guide everything we ship — so the platform adapts to you, not the other way around.
          </p>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => <Pillar key={p.num} p={p} />)}
        </div>
      </div>
    </section>);

};

/* =========================================================================
   PANEL 5 — Seamless API integration (signature hub & spoke)
   ========================================================================= */
const NODES = [
{ l: "Stripe", tip: "Payments & card pre-auth" },
{ l: "Xero", tip: "Accounting sync" },
{ l: "Sage", tip: "ERP & finance" },
{ l: "artbrain", tip: "Art market data" },
{ l: "Mailchimp", tip: "Email campaigns" },
{ l: "UPS", tip: "Shipping & labels" },
{ l: "DHL", tip: "International logistics" },
{ l: "AWS", tip: "Cloud infrastructure" },
{ l: "SSO Website", tip: "Whitelabel storefront" },
{ l: "Custom Apps", tip: "Build on our API" },
{ l: "Databases", tip: "Two-way data sync" },
{ l: "Timed Auction", tip: "Online & timed bidding" }];


const ApiHub = () => {
  const stageRef = useR3(null);
  const [dims, setDims] = useS3({ w: 0, h: 0 });
  const [ref, inView] = useReveal({ threshold: 0.25 });

  useE3(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  const cx = w / 2,cy = h / 2;
  const rx = Math.max(w * 0.40, 120);
  const ry = Math.max(h * 0.40, 120);
  const n = NODES.length;

  const pts = NODES.map((nd, i) => {
    const a = (-90 + 360 / n * i) * (Math.PI / 180);
    return { ...nd, x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
  });

  return (
    <section className="section api-section" id="integrations">
      <div className="wrap">
        <div className="section-head" ref={ref} style={{ maxWidth: 760 }}>
          <span className="eyebrow on-dark">Seamless API integration</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Plug Artisio into your whole stack.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms" }}>
            Artisio sits at the centre of your auction operation, exchanging data in real time with
            the payment, accounting, shipping and marketing tools you already rely on.
          </p>
        </div>

        <div className={"api-stage" + (inView ? " in" : "")} ref={(el) => {stageRef.current = el;ref.current = el;}}>
          {w > 0 &&
          <svg className="wires" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
              {pts.map((p, i) => {
              const len = Math.hypot(p.x - cx, p.y - cy);
              return (
                <line key={i} className="api-wire" x1={cx} y1={cy} x2={p.x} y2={p.y}
                style={{ strokeDasharray: len, strokeDashoffset: inView ? 0 : len, transition: `stroke-dashoffset .9s var(--ease-out) ${250 + i * 70}ms` }} />);

            })}
            </svg>
          }

          {/* packets */}
          {w > 0 && !window.PRM && pts.map((p, i) =>
          <span key={"pk" + i} className="api-packet"
          style={{
            offsetPath: `path('M ${cx} ${cy} L ${p.x} ${p.y}')`,
            WebkitOffsetPath: `path('M ${cx} ${cy} L ${p.x} ${p.y}')`,
            animationDelay: 900 + i * 240 + "ms",
            animationDuration: 2600 + i % 3 * 400 + "ms"
          }} />
          )}

          {/* hub */}
          <div className="api-hub">
            <div className="api-hub-orbit orbit-slow" style={{ animationDuration: "16s" }} />
            <div className="api-hub-core">
              <img src="assets/artisio-logo-white.svg" alt="Artisio" style={{ width: 90, display: "block" }} />
              <span className="lbl">AMS</span>
            </div>
          </div>

          {/* nodes */}
          {pts.map((p, i) =>
          <div key={i} className="api-node"
          style={{ left: p.x, top: p.y, transitionDelay: (inView ? 700 + i * 70 : 0) + "ms" }}>
              <span className="ndot" />{p.l}
              <span className="tip">{p.tip}</span>
            </div>
          )}
        </div>

        <div className="api-legend">
          <span><span className="k" /> Live API connector</span>
          <span><span style={{ width: 8, height: 8, borderRadius: 9, background: "var(--artisio-sky)", display: "inline-block", boxShadow: "0 0 8px var(--artisio-sky)" }} /> Real-time data exchange</span>
        </div>
      </div>
    </section>);

};

/* =========================================================================
   PANEL 6 — Client wall
   ========================================================================= */
const CLIENTS = [
  ["Aguttes", "assets/clients/aguttes.svg"],
  ["Stanley Gibbons", "assets/clients/stanley-gibbons.svg"],
  ["BPI Auctions", "assets/clients/bpi.svg"],
  ["Winefield's", "assets/clients/winefields.svg"],
  ["Vendu Rotterdam", "assets/clients/vendu-rotterdam.png"],
  ["DickHaut Maastricht", "assets/clients/dickhaut.png"],
  ["Julien's", "assets/clients/juliens.jpg"],
  ["Venduehuis", "assets/clients/venduehuis.svg"],
  ["Lyon & Turnbull", "assets/clients/lyon-turnbull.svg"],
  ["Burnley Auctioneers", "assets/clients/logo1.svg"]];


const ClientCell = ({ c, i }) => {
  const [ref, inView] = useReveal({ threshold: 0.4 });
  return (
    <div className={"logo-cell" + (inView ? " in" : "")} ref={ref} style={{ transitionDelay: i % 5 * 60 + "ms" }}>
      <img className="logo-img" src={c[1]} alt={c[0]} />
    </div>);

};

const Clients = () => {
  const [ref, inView] = useReveal();
  return (
    <section className="section clients-section" id="clients">
      <div className="wrap">
        <div className="section-head" ref={ref} style={{ textAlign: "center", margin: "0 auto", maxWidth: 680 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Meet our key clients</span>
          <h2 className={"panel-h reveal" + (inView ? " in" : "")} style={{ "--d": "60ms" }}>Trusted by houses worldwide.</h2>
          <p className={"panel-sub reveal" + (inView ? " in" : "")} style={{ "--d": "140ms", margin: "18px auto 0" }}>
            From historic European auction houses to specialist galleries — Artisio runs sales of
            every size and category.
          </p>
        </div>
        <div className="logo-wall">
          {CLIENTS.map((c, i) => <ClientCell key={c[0]} c={c} i={i} />)}
        </div>
      </div>
    </section>);

};

window.Features = Features;
window.ApiHub = ApiHub;
window.Clients = Clients;