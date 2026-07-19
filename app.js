// Calculator Pro Max Ultra Universe AI++ — SMP Studios
// Vanilla JS, no build tools. 100% parodi.
(() => {
  const MAX_USES = 5;
  const STORAGE_KEY = "smp-calc-user";
  const PLANS = [
    {
      id: "pro", name: "PRO PACK", price: "$20,000", emoji: "💸",
      tagline: "Cara termurah meyakinkan kalkulator kalau kamu penting.",
      perks: ["Unlocks advanced math", "Zero life improvement", "Ronaldo SIUUUU (imaginary)"],
      accent: "linear-gradient(90deg,#38bdf8,#6366f1)",
    },
    {
      id: "ultimate", name: "ULTIMATE PACK", price: "$50,000", emoji: "👑",
      tagline: "Disetujui pakar bola & banker yang bingung.",
      perks: ["Premium numbers included", "Unlimited fake confidence", "Certified Messi carry"],
      accent: "linear-gradient(90deg,#fcd34d,#f97316)",
    },
    {
      id: "universe", name: "UNIVERSE PACK", price: "$1,000,000,000", emoji: "🌌",
      tagline: "NASA tertarik tapi gagal paham harganya.",
      perks: ["Quantum Mathematics", "Banana Physics", "Alien Calculator DLC", "Infinite fake IQ"],
      accent: "linear-gradient(90deg,#e879f9,#7c3aed)",
    },
  ];
  const RANDOM_EVENTS = [
    "⚽ VAR sedang mengecek persamaan kamu...",
    "🥅 GOAL! Kalkulasi disetujui.",
    "🚨 Penalty karena kalkulasi salah!",
    "🐐 Ronaldo menyetujui jawaban ini. SIUUUU!",
    "🎯 Messi carry kalkulasi ini.",
    "⛏️ Menambang angka diamond...",
    "🧱 Crafting kalkulator...",
    "🎮 Premium gamepass required.",
    "🔥 Booyah! Safe zone menyusut.",
    "🍌 Terdeteksi pisang di input kamu.",
    "🌌 Multiverse math activated.",
  ];
  const EASTER_EGGS = [
    "👻 Herobrine mengecek persamaan kamu.",
    "🐹 Hamster Roblox kabur.",
    "👽 Alien calculator terdeteksi.",
    "🧑‍💻 Developer nggak sengaja bikin premium math.",
    "🍕 Sepiring pizza baru saja menyelesaikan ini untukmu.",
  ];
  const ACHIEVEMENTS = {
    first: { emoji: "⚽", title: "First Goal", desc: "Kalkulasi pertama" },
    miner: { emoji: "⛏️", title: "Miner", desc: "20 kalkulasi" },
    gamer: { emoji: "🎮", title: "Gamer", desc: "Trigger event gaming" },
    goat: { emoji: "🐐", title: "GOAT", desc: "Beli Ultimate Pack" },
    multiverse: { emoji: "🌌", title: "Multiverse", desc: "Beli Universe Pack" },
  };
  const KEYS = [
    ["AC","DEL","%","÷"],
    ["7","8","9","×"],
    ["4","5","6","−"],
    ["1","2","3","+"],
    ["0",".","="],
  ];
  // ---------- state ----------
  const state = {
    user: null,
    expr: "0",
    uses: 0,
    total: 0,
    premium: false,
    achievements: new Set(),
    payingPlan: null,
  };
  // ---------- helpers ----------
  const $ = (s) => document.querySelector(s);
  const on = (el, ev, fn) => el.addEventListener(ev, fn);
  function safeEval(expr) {
    const clean = expr.replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-");
    if (!/^[0-9+\-*/%.() ]+$/.test(clean)) throw new Error("bad");
    // eslint-disable-next-line no-new-func
    const v = Function('"use strict"; return (' + clean + ")")();
    if (typeof v !== "number" || !isFinite(v)) throw new Error("bad");
    return v;
  }
  function display(e) {
    return e.replace(/\*/g,"×").replace(/\//g,"÷").replace(/-/g,"−");
  }
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.add("hidden"), 2400);
  }
  function flashEvent(msg) {
    const el = $("#event");
    el.textContent = msg;
    clearTimeout(flashEvent._t);
    flashEvent._t = setTimeout(() => {
      el.textContent = "Calculator Pro Max Ultra Universe AI++";
    }, 1800);
  }
  function unlock(key) {
    if (state.achievements.has(key)) return;
    state.achievements.add(key);
    const a = ACHIEVEMENTS[key];
    toast(`${a.emoji} Achievement unlocked: ${a.title}`);
    renderAchievements();
  }
  // ---------- render ----------
  function renderKeys() {
    const grid = $("#keys");
    grid.innerHTML = "";
    KEYS.flat().forEach((k) => {
      const b = document.createElement("button");
      b.className = "key";
      if (["÷","×","−","+","="].includes(k)) b.classList.add("op");
      if (["AC","DEL","%"].includes(k)) b.classList.add("fn");
      if (k === "0") b.classList.add("wide");
      b.textContent = k;
      on(b, "click", () => handleKey(k));
      grid.appendChild(b);
    });
  }
  function renderUsage() {
    $("#usage-text").textContent = state.premium ? "∞ / ∞" : `${state.uses} / ${MAX_USES}`;
    const pct = state.premium ? 100 : Math.min(100, (state.uses / MAX_USES) * 100);
    const fill = $("#bar-fill");
    fill.style.width = pct + "%";
    fill.classList.toggle("gold", state.premium);
    const note = $("#usage-note");
    if (state.premium) note.textContent = "👑 Premium unlocked — infinite math activated.";
    else if (state.uses >= MAX_USES) note.textContent = "Locked. Please upgrade, mortal.";
    else note.textContent = `${MAX_USES - state.uses} kalkulasi legendaris tersisa.`;
    const m = $("#mascot");
    m.textContent = state.premium ? "😎" : state.uses >= MAX_USES ? "😱" : "🐐";
  }
  function renderExpr() { $("#expr").textContent = display(state.expr); }
  function renderAchievements() {
    const list = $("#ach-list");
    list.innerHTML = "";
    Object.entries(ACHIEVEMENTS).forEach(([key, a]) => {
      const d = document.createElement("div");
      d.className = "chip" + (state.achievements.has(key) ? " on" : "");
      d.title = a.desc;
      d.textContent = `${a.emoji} ${a.title}`;
      list.appendChild(d);
    });
  }
  function renderPlans() {
    const wrap = $("#plans");
    wrap.innerHTML = "";
    PLANS.forEach((p) => {
      const el = document.createElement("button");
      el.className = "plan";
      el.innerHTML = `
        <span class="plan-badge" style="background:${p.accent}">${p.emoji} ${p.name}</span>
        <div class="plan-price">${p.price}</div>
        <div class="plan-tag">${p.tagline}</div>
        <ul>${p.perks.map(x => `<li>${x}</li>`).join("")}</ul>
        <div class="buy">Pay Imaginary Money</div>
      `;
      on(el, "click", () => startPayment(p));
      wrap.appendChild(el);
    });
  }
  // ---------- interactions ----------
  function handleKey(k) {
    if (!state.premium && state.uses >= MAX_USES && k === "=") {
      openPremium();
      return;
    }
    if (k === "AC") { state.expr = "0"; return renderExpr(); }
    if (k === "DEL") {
      state.expr = state.expr.length <= 1 ? "0" : state.expr.slice(0, -1);
      return renderExpr();
    }
    if (k === "%") {
      try { state.expr = String(safeEval(state.expr) / 100); }
      catch { state.expr = "Error"; }
      return renderExpr();
    }
    if (k === "=") {
      try {
        const v = safeEval(state.expr);
        state.expr = String(Math.round(v * 1e10) / 1e10);
        state.total++;
        if (!state.premium) {
          state.uses++;
          if (state.uses >= MAX_USES) setTimeout(openPremium, 400);
        }
        unlock("first");
        if (state.total >= 20) unlock("miner");
        if (Math.random() < 0.35) {
          const msg = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
          flashEvent(msg);
          if (/🎮|Booyah|Menambang|Mining/.test(msg)) unlock("gamer");
        }
        if (Math.random() < 0.08) {
          flashEvent(EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)]);
        }
      } catch {
        state.expr = "Error";
        flashEvent("🚨 Penalty karena kalkulasi salah!");
      }
      renderExpr(); renderUsage();
      return;
    }
    // digit / op / dot
    const ops = "+-*/×÷−";
    if (state.expr === "Error" || state.expr === "0") {
      state.expr = ops.includes(k) || k === "." ? state.expr.replace("Error","0") + k : k;
    } else {
      const last = state.expr[state.expr.length - 1];
      if (ops.includes(k) && ops.includes(last)) state.expr = state.expr.slice(0, -1) + k;
      else state.expr += k;
    }
    renderExpr();
  }
  // ---------- login ----------
  function showApp() {
    $("#login").classList.add("hidden");
    $("#app").classList.remove("hidden");
    $("#who").textContent = state.user;
    renderUsage(); renderExpr(); renderAchievements();
  }
  function showLogin() {
    $("#app").classList.add("hidden");
    $("#login").classList.remove("hidden");
  }
  // ---------- modals ----------
  function openPremium() { renderPlans(); $("#premium").classList.remove("hidden"); }
  function closePremium() { $("#premium").classList.add("hidden"); }
  function startPayment(plan) {
    state.payingPlan = plan;
    $("#pay-emoji").textContent = plan.emoji;
    $("#pay-name").textContent = plan.name;
    $("#pay-price").textContent = plan.price;
    $("#pay-confirm").classList.remove("hidden");
    $("#pay-processing").classList.add("hidden");
    $("#pay-success").classList.add("hidden");
    $("#pay").classList.remove("hidden");
  }
  const PAY_STEPS = [
    "🏦 Connecting to bank...",
    "🖨️ Printing fake money...",
    "🧑‍⚖️ Asking FIFA referee...",
    "🚀 Contacting NASA...",
    "🧠 Downloading Premium Brain...",
    "👽 Negotiating with aliens...",
    "📦 Installing Calculator DLC...",
    "🍌 Searching for bananas...",
    "⛏️ Mining premium numbers...",
    "🎮 Joining calculator server...",
    "🔥 Booyah! Safe zone shrinking...",
    "🐐 Messi is signing your receipt...",
  ];
  function runPayment() {
    $("#pay-confirm").classList.add("hidden");
    $("#pay-processing").classList.remove("hidden");
    let step = 0, progress = 0;
    const stepEl = $("#pay-step"), bar = $("#pay-bar");
    stepEl.textContent = PAY_STEPS[0]; bar.style.width = "0%";
    const iStep = setInterval(() => {
      step = (step + 1) % PAY_STEPS.length;
      stepEl.textContent = PAY_STEPS[step];
    }, 700);
    const iBar = setInterval(() => {
      progress += Math.random() * 6 + 3;
      if (progress >= 100) {
        progress = 100; bar.style.width = "100%";
        clearInterval(iBar); clearInterval(iStep);
        setTimeout(() => {
          $("#pay-processing").classList.add("hidden");
          $("#pay-success").classList.remove("hidden");
        }, 400);
      } else bar.style.width = progress + "%";
    }, 180);
  }
  function finishPayment() {
    state.premium = true; state.uses = 0;
    if (state.payingPlan?.id === "ultimate") unlock("goat");
    if (state.payingPlan?.id === "universe") unlock("multiverse");
    state.payingPlan = null;
    $("#pay").classList.add("hidden");
    closePremium();
    renderUsage();
  }
  // ---------- init ----------
  function init() {
    renderKeys();
    renderAchievements();
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { state.user = saved; showApp(); } else { showLogin(); }
    on($("#login-form"), "submit", (e) => {
      e.preventDefault();
      const name = $("#login-name").value.trim();
      if (!name) return;
      state.user = name;
      localStorage.setItem(STORAGE_KEY, name);
      showApp();
    });
    on($("#logout"), "click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state.user = null; state.expr = "0"; state.uses = 0;
      state.total = 0; state.premium = false;
      showLogin();
    });
    on($("#pay-cancel"), "click", () => { state.payingPlan = null; $("#pay").classList.add("hidden"); });
    on($("#pay-go"), "click", runPayment);
    on($("#pay-done"), "click", finishPayment);
    // keyboard
    on(window, "keydown", (e) => {
      if ($("#app").classList.contains("hidden")) return;
      const map = { Enter: "=", "=": "=", Backspace: "DEL", Escape: "AC",
                    "*": "×", "/": "÷", "-": "−" };
      const k = map[e.key] ?? e.key;
      if (/^[0-9.+%×÷−]$|^AC$|^DEL$|^=$/.test(k)) {
        e.preventDefault();
        handleKey(k);
      }
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
