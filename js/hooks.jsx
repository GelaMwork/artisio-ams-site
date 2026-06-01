/* global React */
/* =========================================================================
   Animation hooks — IntersectionObserver reveal, count-up, parallax,
   prefers-reduced-motion. Lightweight, dependency-free.
   ========================================================================= */
const { useState, useEffect, useRef, useCallback } = React;

const PRM = typeof window !== "undefined" &&
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
window.PRM = PRM;

/* Adds .in to the element when it scrolls into view (once). */
function useReveal(opts = {}) {
  const { threshold = 0.18, once = true, rootMargin = "0px 0px -8% 0px" } = opts;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (PRM) { setInView(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.unobserve(e.target);
        } else if (!once) {
          setInView(false);
        }
      });
    }, { threshold, rootMargin });
    io.observe(el);
    // Fallback: if already within (or above) the viewport on mount — e.g. a
    // deep-link or jump-scroll where IO may not emit — reveal immediately.
    const checkNow = () => {
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 0) * 0.95 && r.bottom > 0) {
        setInView(true);
        if (once) io.unobserve(el);
      }
    };
    checkNow();
    const raf = requestAnimationFrame(checkNow);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [threshold, once, rootMargin]);
  return [ref, inView];
}

/* Count up from 0 -> end when `run` becomes true. Returns formatted string. */
function useCountUp(end, run, { dur = 1500, decimals = 0, prefix = "", suffix = "", group = true } = {}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    if (PRM) { setVal(end); return; }
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, end, dur]);
  const num = Number(val).toLocaleString("en-GB", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: group,
  });
  return prefix + num + suffix;
}

/* Scroll progress (0..1) of the page, throttled via rAF. */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { setY(window.scrollY); raf = null; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/* Tilt a card toward the cursor (returns handlers + style). */
function useTilt(max = 8) {
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = useCallback((e) => {
    if (PRM) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * max, ry: px * max });
  }, [max]);
  const onLeave = useCallback(() => setT({ rx: 0, ry: 0 }), []);
  const style = { transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` };
  return { onMouseMove: onMove, onMouseLeave: onLeave, style };
}

/* Returns true when viewport width <= breakpoint (default 460px). Updates on resize. */
function useMobile(breakpoint = 460) {
  const mq = useRef(null);
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= breakpoint);
  useEffect(() => {
    if (typeof window === "undefined") return;
    mq.current = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setMobile(e.matches);
    setMobile(mq.current.matches);
    mq.current.addEventListener("change", handler);
    return () => mq.current.removeEventListener("change", handler);
  }, [breakpoint]);
  return mobile;
}

window.useReveal = useReveal;
window.useCountUp = useCountUp;
window.useScrollY = useScrollY;
window.useTilt = useTilt;
window.useMobile = useMobile;
