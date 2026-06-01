/* global React, ReactDOM, Nav, Hero, About, Platform, Features, ApiHub, Clients,
   Testimonial, DeepDive, CRMSuite, BiddingExperience, BidderMgmt, Commitment, Payments, Marketing, Security, CTA, useTweaks, TweaksPanel,
   TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useEffect: useEApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "displayFont": "Inter",
  "accent": "#0057FF",
  "ambientMotion": true
}/*EDITMODE-END*/;

const FONT_MAP = {
  "Inter": "var(--font-sans)",
  "Space Grotesk": "'Space Grotesk', var(--font-sans)",
  "Poppins": "'Poppins', var(--font-sans)",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEApp(() => {
    const r = document.documentElement;
    r.style.setProperty("--display-font", FONT_MAP[t.displayFont] || "var(--font-sans)");
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--accent-2", t.accent === "#00AAFF" ? "#0057FF" : "#00AAFF");
    document.body.classList.toggle("no-ambient", !t.ambientMotion);
  }, [t.displayFont, t.accent, t.ambientMotion]);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />
        <About />
        <BiddingExperience />
        <Platform />
        <Features />
        <ApiHub />
        <Clients />
        <Testimonial />
        <DeepDive />
        <Marketing />
        <Security />
        <CTA />
      </main>

      <TweaksPanel>
        <TweakSection label="Typography" />
        <TweakRadio label="Display font" value={t.displayFont}
          options={["Inter", "Space Grotesk", "Poppins"]}
          onChange={(v) => setTweak("displayFont", v)} />
        <TweakSection label="Brand accent" />
        <TweakColor label="Accent" value={t.accent}
          options={["#0057FF", "#00AAFF", "#1B2FF0"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Ambient motion" value={t.ambientMotion}
          onChange={(v) => setTweak("ambientMotion", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
