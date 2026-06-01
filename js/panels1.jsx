/* global React, Icon, MockDashboard */
const { useState: useS1, useEffect: useE1 } = React;

/* ---- Brand logos (official Artisio wordmark; recolor variants per bg) ---- */
const LogoLight = () => (
  <img className="logo-light" src="assets/artisio-logo-white.svg" alt="Artisio" />
);
const LogoDark = () => (
  <img className="logo-dark" src="assets/artisio-logo-navy.svg" alt="Artisio" />
);

const NAV_LINKS = [
  ["Bidding", "bidding"],
  ["Platform", "platform"],
  ["Features", "features"],
  ["Integrations", "integrations"],
  ["Clients", "clients"],
  ["Security", "security"],
];

const Nav = () => {
  const [solid, setSolid] = useS1(false);
  const [open, setOpen] = useS1(false);
  useE1(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: window.PRM ? "auto" : "smooth" });
  };
  return (
    <React.Fragment>
      <nav className={"nav" + (solid ? " solid" : "")}>
        <div className="nav-inner">
          <a className="nav-brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: window.PRM ? "auto" : "smooth" }); }}>
            <LogoLight /><LogoDark />
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(([l, id]) => (
              <button key={id} className="nav-link" onClick={() => go(id)}>{l}</button>
            ))}
          </div>
          <div className="nav-spacer" />
          <div className="nav-cta">
            <button className="nav-burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
              <Icon n={open ? "close" : "menu"} s={20} />
            </button>
          </div>
        </div>
      </nav>
      <div className={"nav-mobile" + (open ? " open" : "")}>
        {NAV_LINKS.map(([l, id]) => <button key={id} onClick={() => go(id)}>{l}</button>)}
      </div>
    </React.Fragment>
  );
};

/* =========================================================================
   PANEL 1 — Hero
   ========================================================================= */
const Hero = () => {
  const [sy, setSy] = useS1(0);
  const [loaded, setLoaded] = useS1(false);
  useE1(() => {
    const r = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(r);
  }, []);
  useE1(() => {
    if (window.PRM) return;
    let raf = null;
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { setSy(window.scrollY); raf = null; }); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const words = ["From", "listing", "to", "sold.", "All", "in", "Artisio."];
  const go = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: window.PRM ? "auto" : "smooth" }); };

  return (
    <header className={"hero" + (loaded ? " loaded" : "")} id="top">
      <div className="hero-bg">
        <div className="hero-numeral" style={{ transform: `translateY(${sy * 0.18}px)` }}>AMS</div>
        <svg className="hero-rings" viewBox="0 0 800 800" style={{ transform: `translateY(${sy * -0.06}px)` }}>
          <circle cx="400" cy="400" r="180" /><circle cx="400" cy="400" r="280" />
          <circle cx="400" cy="400" r="380" strokeDasharray="3 8" />
        </svg>
        <div className="hero-grid-glow" style={{ transform: `translateY(${sy * 0.1}px)` }} />
      </div>
      <div className="wrap hero-inner">
        <div>
          <span className="hero-eyebrow hero-load" style={{ "--wd": "60ms" }}>
            <span className="dot" /> End-to-end auction management. Live since 2021.
          </span>
          <h1 className="hero-title">
            {words.map((w, i) => (
              <span className="word" key={i} style={{ "--wd": 200 + i * 85 + "ms" }}>
                {i >= 4 ? <span className="grad">{w}</span> : w}{" "}
              </span>
            ))}
          </h1>
          <p className="hero-lead hero-load" style={{ "--wd": "760ms" }}>
            Artisio AMS is the cloud-native, front-to-back platform that digitises the entire
            auction lifecycle — inventory, sale day, bidders, payments and reporting — for the
            world's leading auction houses.
          </p>
          <div className="hero-actions hero-load" style={{ "--wd": "860ms" }}>
            <a className="btn btn-primary btn-lg" href="https://www.artisio.co/book-a-demo" target="_blank" rel="noopener noreferrer">Book a demo <Icon n="arrow" s={17} /></a>
          </div>
          <div className="hero-trust hero-load" style={{ "--wd": "960ms" }}>
            <div><b>35+</b><span className="tlabel">clients</span></div>
            <span className="sep" />
            <div><b>99.9998%</b><span className="tlabel">server uptime</span></div>
            <span className="sep" />
            <div><b>Cloud</b><span className="tlabel">native</span></div>
          </div>
        </div>
        <div className="hero-device hero-load" style={{ "--wd": "520ms" }}>
          <div className="device-float">
            <div className="hero-stack">
              <div className="tablet hero-scr-bo">
                <div className="tablet-glow" />
                <div className="tablet-screen"><HeroBackoffice /></div>
              </div>
              <div className="hero-scr-store"><HeroFrontend /></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

/* Live back-office dashboard — hammer ticks up as bids land */
const HeroBackoffice = () => {
  const [hammer, setHammer] = useS1(284000);
  const [live, setLive] = useS1(284150);
  useE1(() => {
    if (window.PRM) return;
    const t = setInterval(() => {
      const bump = (Math.floor(Math.random() * 9) + 2) * 1000;
      setHammer((h) => h + bump);
      setLive((v) => v + bump);
    }, 2400);
    return () => clearInterval(t);
  }, []);
  const fmtK = "£" + Math.round(hammer / 1000) + "k";
  const fmtFull = "£" + live.toLocaleString("en-GB");
  return <MockDashboard hammer={fmtK} liveBid={fmtFull} />;
};

/* Live frontend storefront (Reportage auctions) — countdown ticks, bids land */
const HeroFrontend = () => {
  const props = (window.PROPS || []).slice(0, 6);
  const toNum = (s) => parseInt(String(s).replace(/[^0-9]/g, ""), 10) || 0;
  const [secs, setSecs] = useS1(8048);
  const [bids, setBids] = useS1(() => props.map((p) => toNum(p.start)));
  const [counts, setCounts] = useS1(() => props.map(() => 0));
  const [flash, setFlash] = useS1(-1);

  useE1(() => {
    if (window.PRM) return;
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useE1(() => {
    if (window.PRM) return;
    const incrs = props.map((p) => toNum(p.incr) || 5000);
    const t = setInterval(() => {
      const i = Math.floor(Math.random() * props.length);
      setBids((b) => { const n = [...b]; n[i] += incrs[i]; return n; });
      setCounts((c) => { const n = [...c]; n[i] += 1; return n; });
      setFlash(i);
      setTimeout(() => setFlash((f) => (f === i ? -1 : f)), 750);
    }, 2100);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const hh = pad(Math.floor(secs / 3600));
  const mm = pad(Math.floor((secs % 3600) / 60));
  const ss = pad(secs % 60);
  const fmt = (n) => "£" + n.toLocaleString("en-GB");

  return (
    <div className="hf">
      <div className="hf-bar">
        <span className="hf-dots"><i /><i /><i /></span>
        <span className="hf-url">yourbrand.com<b>/auctions</b></span>
      </div>
      <div className="hf-nav">
        <span className="hf-brand"><span className="hf-mark" /><span className="hf-wm"><i /><i /></span></span>
        <span className="hf-link">Browse</span>
        <span className="hf-link on">Auctions</span>
        <span className="hf-link">How it works</span>
        <span className="hf-acct" />
      </div>
      <div className="hf-accent" />
      <div className="hf-body">
        <div className="hf-head">
          <div>
            <span className="hf-title">May Property Auction</span>
            <span className="hf-sub">12 lots · Timed online auction</span>
          </div>
          <span className="hf-live"><span className="d" /> Live · ends in <b className="hf-clock">{hh}:{mm}:{ss}</b></span>
        </div>
        <div className="hf-chips">
          <span className="hf-chip on">All lots</span>
          <span className="hf-chip">Residential</span>
          <span className="hf-chip">Commercial</span>
          <span className="hf-chip">Land</span>
        </div>
        <div className="hf-grid">
          {props.map((p, i) => (
            <div className={"hf-card" + (flash === i ? " bidflash" : "")} key={p.lot}>
              <div className="hf-photo">
                <img src={p.photo} alt="" style={{ objectPosition: p.pos }} />
                <span className="hf-lot">Lot {p.lot}</span>
                {counts[i] > 0 ? <span className="hf-badge">{counts[i]} {counts[i] === 1 ? "bid" : "bids"}</span> : null}
              </div>
              <div className="hf-cb">
                <div className="hf-ct">{p.title}</div>
                <div className="hf-cg">Guide {p.guide}</div>
                <div className="hf-bidrow">
                  <span className="hf-bid">Current bid<b key={bids[i]}>{fmt(bids[i])}</b></span>
                  <span className="hf-bidbtn">Bid</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.HeroFrontend = HeroFrontend;
window.HeroBackoffice = HeroBackoffice;
window.Hero = Hero;
window.LogoLight = LogoLight;
window.LogoDark = LogoDark;
