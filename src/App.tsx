import { useEffect, useMemo, useState } from "react";

type Screen =
  | "home"
  | "explore"
  | "labs"
  | "progress"
  | "profile"
  | "quantum"
  | "quantum-result"
  | "spark"
  | "spark-result"
  | "physics"
  | "studio"
  | "lesson"
  | "achievements"
  | "welcome"
  | "mentors";

type IconName =
  | "home"
  | "compass"
  | "flask"
  | "chart"
  | "user"
  | "bell"
  | "arrow"
  | "play"
  | "clock"
  | "bolt"
  | "star"
  | "book"
  | "trophy"
  | "settings"
  | "bookmark"
  | "check"
  | "lock"
  | "back"
  | "atom"
  | "wave"
  | "plus";

const iconPaths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.8 12 3l9 7.8" />
      <path d="M5.5 9.5V21h13V9.5M9 21v-7h6v7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6l-5.8 9.2A1.8 1.8 0 0 0 5.7 21h12.6a1.8 1.8 0 0 0 1.5-2.8L14 9V3" />
      <path d="M7.2 15h9.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </>
  ),
  play: <path d="m9 6 9 6-9 6V6Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bolt: <path d="m13.5 2-8 12h6L10.5 22l8-12h-6l1-8Z" />,
  star: (
    <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
  ),
  book: (
    <>
      <path d="M4 4.5A3.5 3.5 0 0 1 7.5 8H12v12H7.5A3.5 3.5 0 0 0 4 23V4.5ZM20 4.5A3.5 3.5 0 0 0 16.5 8H12v12h4.5a3.5 3.5 0 0 1 3.5 3V4.5Z" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM10 13v4M14 13v4M7 21h10M9 17h6" />
      <path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  back: (
    <>
      <path d="m15 18-6-6 6-6" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
    </>
  ),
  wave: <path d="M2 12c2.5-7 5 7 7.5 0s5 7 7.5 0 5 7 7.5 0" />,
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
};

function Icon({
  name,
  size = 20,
  fill = "none",
}: {
  name: IconName;
  size?: number;
  fill?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const mentors = {
  nova: { name: "Nova", role: "Quantum guide", tone: "#8B7CF6", hair: "#44396C", coat: "#F3EFFF" },
  spark: {
    name: "Spark",
    role: "Electronics inventor",
    tone: "#F5A9C7",
    hair: "#84455F",
    coat: "#FFF0F5",
  },
  luna: {
    name: "Luna",
    role: "Physics explorer",
    tone: "#77B5F8",
    hair: "#2E5278",
    coat: "#EBF5FF",
  },
  mira: {
    name: "Mira",
    role: "Experiment designer",
    tone: "#68D4B0",
    hair: "#275E58",
    coat: "#E9FFF7",
  },
  zoe: {
    name: "Zoe",
    role: "Engineering maker",
    tone: "#F3C65A",
    hair: "#704D3A",
    coat: "#FFF8DA",
  },
};

type MentorKey = keyof typeof mentors;

function getSavedMentor(): MentorKey {
  const saved = localStorage.getItem("qgc:mentor");
  return saved && saved in mentors ? (saved as MentorKey) : "nova";
}

function announce(message: string) {
  window.dispatchEvent(new CustomEvent("qgc:toast", { detail: message }));
}

function getDayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function getStardust() {
  const saved = Number(localStorage.getItem("qgc:stardust"));
  return Number.isFinite(saved) && saved >= 0 ? saved : 240;
}

function getSavedInterests() {
  try {
    const saved = localStorage.getItem("qgc:interests");
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed : ["Quantum computing", "Robotics", "Physics"];
  } catch {
    return ["Quantum computing", "Robotics", "Physics"];
  }
}

function Character({
  id = "nova",
  size = 128,
  className = "",
}: {
  id?: MentorKey;
  size?: number;
  className?: string;
}) {
  const m = mentors[id];
  return (
    <svg
      className={`character ${className}`}
      viewBox="0 0 150 180"
      width={size}
      aria-label={`${m.name}, ${m.role}`}
      role="img"
    >
      <defs>
        <linearGradient id={`coat-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={m.coat} />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      <path
        d="M32 175c3-41 16-57 43-57s41 16 44 57"
        fill={`url(#coat-${id})`}
        stroke={m.tone}
        strokeWidth="3"
      />
      <path d="M61 114v16l14 9 14-9v-18" fill="#F4BDAA" />
      <path
        d="M42 67c0-31 15-48 36-48 23 0 36 19 34 48l-3 34c-3 20-18 31-33 31s-31-12-33-31Z"
        fill={m.hair}
      />
      <ellipse cx="76" cy="81" rx="29" ry="37" fill="#FFD7C6" />
      <path
        d="M47 71c2-34 17-47 36-45 17 2 28 17 27 39-17-5-27-15-31-27-7 16-17 26-32 33Z"
        fill={m.hair}
      />
      <path
        d="M60 82c3-3 7-3 10 0M86 82c3-3 7-3 10 0"
        fill="none"
        stroke="#443549"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="65" cy="86" rx="3.5" ry="5" fill={m.tone} />
      <ellipse cx="91" cy="86" rx="3.5" ry="5" fill={m.tone} />
      <circle cx="66" cy="84.5" r="1" fill="#fff" />
      <circle cx="92" cy="84.5" r="1" fill="#fff" />
      <path
        d="M70 103c5 5 11 5 16 0"
        fill="none"
        stroke="#C56E79"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="56" cy="97" r="5" fill="#F7A9AC" opacity=".35" />
      <circle cx="100" cy="97" r="5" fill="#F7A9AC" opacity=".35" />
      <path
        d="M43 148 28 133M109 148l15-16"
        stroke={m.tone}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M53 127 75 142l23-15 8 48H45Z"
        fill={`url(#coat-${id})`}
        stroke={m.tone}
        strokeWidth="2"
      />
      <path d="m70 140 5 8 6-8" fill="none" stroke={m.tone} strokeWidth="2" />
      {id === "nova" && (
        <>
          <ellipse cx="119" cy="48" rx="11" ry="4.5" fill="none" stroke={m.tone} strokeWidth="2" />
          <circle cx="119" cy="48" r="2.5" fill={m.tone} />
        </>
      )}
      {id === "spark" && (
        <path
          d="m119 34-7 13h7l-4 12 13-17h-8l4-8Z"
          fill="#FDE68A"
          stroke="#D89A25"
          strokeWidth="1.5"
        />
      )}
      {id === "luna" && <path d="M118 38a12 12 0 1 0 11 17 10 10 0 0 1-11-17Z" fill="#FDE68A" />}
      {id === "mira" && (
        <path d="M112 56h18l-5-8v-9h-8v9Z" fill="#A7F3D0" stroke="#318B76" strokeWidth="1.5" />
      )}
      {id === "zoe" && (
        <>
          <circle cx="120" cy="47" r="11" fill="#FDE68A" stroke="#C7982B" strokeWidth="2" />
          <path d="M120 30v5M120 59v5M103 47h5M132 47h5" stroke="#C7982B" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

function Header({
  title,
  subtitle,
  back,
  onNavigate,
}: {
  title: string;
  subtitle?: string;
  back?: Screen;
  onNavigate: (s: Screen) => void;
}) {
  return (
    <header className="page-header">
      {back ? (
        <button className="icon-button" onClick={() => onNavigate(back)} aria-label="Go back">
          <Icon name="back" />
        </button>
      ) : (
        <div className="brand-mark">
          <Icon name="atom" size={22} />
        </div>
      )}
      <div className="header-copy">
        <span>{subtitle}</span>
        <h1>{title}</h1>
      </div>
      <button
        className="icon-button"
        aria-label="Open notifications"
        onClick={() => window.dispatchEvent(new Event("qgc:notifications"))}
      >
        <Icon name="bell" />
        <i />
      </button>
    </header>
  );
}

function Pill({ children, color = "lavender" }: { children: React.ReactNode; color?: string }) {
  return <span className={`pill pill-${color}`}>{children}</span>;
}

function ScienceSprinkles({ tone = "lavender" }: { tone?: string }) {
  return (
    <div className={`science-sprinkles sprinkles-${tone}`} aria-hidden="true">
      <i className="sprinkle sparkle s1" />
      <i className="sprinkle dot s2" />
      <i className="sprinkle ring s3" />
      <i className="sprinkle plus s4" />
      <i className="sprinkle sparkle s5" />
      <i className="sprinkle dot s6" />
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "light" | "dark" | "ghost";
  icon?: IconName;
  disabled?: boolean;
}) {
  return (
    <button
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
      {icon && <Icon name={icon} size={18} />}
    </button>
  );
}

function SectionTitle({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-title">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action && (
        <button onClick={onAction}>
          {action} <Icon name="arrow" size={14} />
        </button>
      )}
    </div>
  );
}

const worlds = [
  {
    id: "quantum" as Screen,
    title: "Quantum Lab",
    desc: "Build circuits with qubits",
    icon: "atom" as IconName,
    color: "purple",
    stat: "4 missions",
  },
  {
    id: "spark" as Screen,
    title: "Spark Labs",
    desc: "Make electricity flow",
    icon: "bolt" as IconName,
    color: "pink",
    stat: "6 missions",
  },
  {
    id: "physics" as Screen,
    title: "Physics Playground",
    desc: "Play with forces & waves",
    icon: "wave" as IconName,
    color: "blue",
    stat: "5 missions",
  },
  {
    id: "studio" as Screen,
    title: "Experiment Studio",
    desc: "Test your own big ideas",
    icon: "flask" as IconName,
    color: "mint",
    stat: "Open studio",
  },
];

function DailyQuest({ nav }: { nav: (s: Screen) => void }) {
  const [challengeDone, setChallengeDone] = useState(
    () => localStorage.getItem("qgc:cnot-complete") === getDayStamp(),
  );
  const [claimed, setClaimed] = useState(
    () => localStorage.getItem("qgc:daily-reward") === getDayStamp(),
  );
  const completed = challengeDone ? 3 : 2;

  useEffect(() => {
    const syncQuest = () => {
      setChallengeDone(localStorage.getItem("qgc:cnot-complete") === getDayStamp());
    };
    window.addEventListener("qgc:quest-update", syncQuest);
    return () => window.removeEventListener("qgc:quest-update", syncQuest);
  }, []);

  const handleAction = () => {
    if (!challengeDone) {
      nav("quantum");
      return;
    }
    if (!claimed) {
      localStorage.setItem("qgc:daily-reward", getDayStamp());
      localStorage.setItem("qgc:stardust", String(getStardust() + 50));
      window.dispatchEvent(new Event("qgc:stardust-update"));
      setClaimed(true);
      announce("Quest complete — 50 Stardust added to your collection");
    }
  };

  return (
    <section className={`quest-board ${claimed ? "quest-claimed" : ""}`}>
      <div className="quest-top">
        <div>
          <span>DAILY QUEST</span>
          <h2>Curiosity combo</h2>
        </div>
        <div className="quest-reward">
          <Icon
            name={claimed ? "check" : "star"}
            size={18}
            fill={claimed ? "none" : "currentColor"}
          />
          <b>{claimed ? "DONE" : "+50"}</b>
          <small>{claimed ? "TODAY" : "STARDUST"}</small>
        </div>
      </div>
      <div className="quest-meter">
        <i style={{ width: `${(completed / 3) * 100}%` }} />
        <span>{completed}/3 complete</span>
      </div>
      <div className="quest-steps">
        <div className="complete">
          <span>
            <Icon name="check" size={14} />
          </span>
          <small>Visit</small>
        </div>
        <i />
        <div className="complete">
          <span>
            <Icon name="check" size={14} />
          </span>
          <small>Learn</small>
        </div>
        <i className={challengeDone ? "complete" : ""} />
        <div className={challengeDone ? "complete" : "current"}>
          <span>
            <Icon name={challengeDone ? "check" : "atom"} size={14} />
          </span>
          <small>Experiment</small>
        </div>
      </div>
      <button className="quest-action" onClick={handleAction} disabled={claimed}>
        <span>
          {claimed
            ? "Reward collected"
            : challengeDone
              ? "Claim my reward"
              : "Finish quantum challenge"}
        </span>
        <Icon name={claimed ? "check" : "arrow"} size={16} />
      </button>
    </section>
  );
}

function StardustBalance({ nav }: { nav: (s: Screen) => void }) {
  const [balance, setBalance] = useState(getStardust);

  useEffect(() => {
    const updateBalance = () => setBalance(getStardust());
    window.addEventListener("qgc:stardust-update", updateBalance);
    return () => window.removeEventListener("qgc:stardust-update", updateBalance);
  }, []);

  return (
    <button
      className="stardust-balance"
      onClick={() => nav("achievements")}
      aria-label={`${balance} Stardust. Open achievement collection`}
    >
      <span>
        <Icon name="star" size={13} fill="currentColor" />
      </span>
      <b>{balance}</b>
      <small>STARDUST</small>
      <Icon name="arrow" size={13} />
    </button>
  );
}

function AdventurePath({ nav }: { nav: (s: Screen) => void }) {
  const stops: Array<{
    title: string;
    state: "complete" | "current" | "bonus" | "locked";
    icon: IconName;
    target?: Screen;
  }> = [
    { title: "Bright Start", state: "complete", icon: "check", target: "lesson" },
    { title: "Qubit Quest", state: "current", icon: "atom", target: "quantum" },
    { title: "Bonus Lab", state: "bonus", icon: "star", target: "spark" },
    { title: "Entangle!", state: "locked", icon: "lock" },
  ];

  return (
    <section className="adventure-path">
      <div className="path-heading">
        <div>
          <span>YOUR ADVENTURE PATH</span>
          <h2>Quantum trail</h2>
        </div>
        <Pill color="lavender">2 OF 6</Pill>
      </div>
      <div className="path-map">
        <div className="path-line">
          <i />
        </div>
        {stops.map((stop, index) => (
          <button
            className={`path-stop ${stop.state}`}
            key={stop.title}
            onClick={() => stop.target && nav(stop.target)}
            disabled={!stop.target}
            aria-label={`${stop.title}, ${stop.state}`}
          >
            {stop.state === "current" && <small>PLAY</small>}
            {stop.state === "bonus" && <small>BONUS</small>}
            <span>
              <Icon
                name={stop.icon}
                size={index === 1 ? 22 : 17}
                fill={stop.state === "bonus" ? "currentColor" : "none"}
              />
            </span>
            <b>{stop.title}</b>
          </button>
        ))}
      </div>
      <button className="path-continue" onClick={() => nav("quantum")}>
        <span>
          <b>Continue: Superposition starter</b>
          <small>Mission 2 • +120 XP</small>
        </span>
        <Icon name="play" size={17} />
      </button>
    </section>
  );
}

function Home({ nav }: { nav: (s: Screen) => void }) {
  const [companion, setCompanion] = useState<MentorKey>(getSavedMentor);

  useEffect(() => {
    const updateCompanion = () => setCompanion(getSavedMentor());
    window.addEventListener("qgc:mentor", updateCompanion);
    return () => window.removeEventListener("qgc:mentor", updateCompanion);
  }, []);

  return (
    <div className="page home-page">
      <header className="home-header">
        <div>
          <div className="mini-brand">
            <span>
              <Icon name="atom" size={16} />
            </span>{" "}
            QUANTUM GIRLS CLUB
          </div>
          <p>Hey, Scientist!</p>
          <div className="greeting-line">
            <h1>Ready to discover?</h1>
            <span className="streak-chip">
              <Icon name="bolt" size={12} /> 8 days
            </span>
          </div>
        </div>
        <div className="home-actions">
          <button
            className="icon-button"
            aria-label="Open notifications"
            onClick={() => window.dispatchEvent(new Event("qgc:notifications"))}
          >
            <Icon name="bell" />
            <i />
          </button>
          <button
            className="avatar-button"
            onClick={() => nav("profile")}
            aria-label="Open scientist profile"
          >
            <Character id={companion} size={54} />
            <i />
          </button>
        </div>
      </header>

      <section className="hero-card">
        <ScienceSprinkles />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <code className="hero-formula">|ψ⟩</code>
        <div className="hero-copy">
          <Pill color="yellow">TODAY'S ADVENTURE</Pill>
          <h2>
            Big ideas.
            <br />
            <em>Brave experiments.</em>
          </h2>
          <p>Your next scientific adventure is waiting!</p>
          <Button variant="dark" onClick={() => nav("labs")} icon="arrow">
            Explore the lab
          </Button>
        </div>
        <Character id={companion} size={172} className="hero-character" />
      </section>

      <section className="level-card">
        <div className="level-ring">
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" />
            <circle className="level-value" cx="22" cy="22" r="18" />
          </svg>
          <b>7</b>
        </div>
        <div className="level-info">
          <div>
            <div>
              <span>RISING SCIENTIST</span>
              <h3>Level 7</h3>
            </div>
            <strong>
              1,840 <small>XP</small>
            </strong>
          </div>
          <div className="progress-track">
            <i style={{ width: "72%" }} />
          </div>
          <p>
            360 XP until <b>Quantum Thinker</b>
          </p>
          <StardustBalance nav={nav} />
        </div>
      </section>

      <DailyQuest nav={nav} />

      <SectionTitle
        eyebrow="CONTINUE YOUR JOURNEY"
        title="Next mission"
        action="All missions"
        onAction={() => nav("explore")}
      />
      <section className="mission-card">
        <div className="mission-visual">
          <ScienceSprinkles tone="blue" />
          <div className="robot">
            <span />
            <i />
            <b />
          </div>
          <Character id="zoe" size={108} />
          <div className="xp-bubble">+120 XP</div>
          <div className="mission-sticker">
            <Icon name="star" size={13} fill="currentColor" /> NEW
          </div>
        </div>
        <div className="mission-content">
          <div className="meta-row">
            <Pill color="blue">ENGINEERING</Pill>
            <span>
              <Icon name="clock" size={14} /> 12 min
            </span>
          </div>
          <h2>Maya's First Robot</h2>
          <p>Help Maya wire a tiny robot and bring her invention to life.</p>
          <Button onClick={() => nav("lesson")} icon="play">
            Start mission
          </Button>
        </div>
      </section>

      <section className="challenge-card">
        <div className="challenge-icon">
          <Icon name="atom" size={28} />
        </div>
        <div>
          <span>TODAY'S TINY CHALLENGE</span>
          <h3>Can you create a CNOT gate?</h3>
          <button onClick={() => nav("quantum")}>
            Try it now <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="challenge-xp">
          +30<small>XP</small>
        </div>
      </section>

      <SectionTitle
        title="Explore the workshops"
        action="See all"
        onAction={() => nav("explore")}
      />
      <div className="world-scroll">
        {worlds.map((w) => (
          <button key={w.title} className={`world-card world-${w.color}`} onClick={() => nav(w.id)}>
            <span className="world-icon">
              <Icon name={w.icon} size={28} />
            </span>
            <small>{w.stat}</small>
            <h3>{w.title}</h3>
            <p>{w.desc}</p>
            <i>
              <Icon name="arrow" size={16} />
            </i>
          </button>
        ))}
      </div>
      <div className="quote-card">
        <Character id="mira" size={70} />
        <p>
          “Every brilliant discovery begins with a curious question.”<b>— Mira</b>
        </p>
      </div>
    </div>
  );
}

function Explore({ nav }: { nav: (s: Screen) => void }) {
  const [filter, setFilter] = useState("All worlds");
  return (
    <div className="page">
      <Header title="Explore" subtitle="YOUR STEM UNIVERSE" onNavigate={nav} />
      <div className="explore-banner">
        <div>
          <Pill color="yellow">DISCOVER YOUR SPARK</Pill>
          <h2>Where will your curiosity take you?</h2>
          <p>Every world is filled with ideas to test and things to build.</p>
        </div>
        <div className="planet">
          <span />
          <i />
          <b />
        </div>
        <ScienceSprinkles tone="pink" />
      </div>
      <AdventurePath nav={nav} />
      <div className="filter-row">
        {["All worlds", "Quantum", "Engineering", "Physics"].map((x) => (
          <button key={x} onClick={() => setFilter(x)} className={filter === x ? "active" : ""}>
            {x}
          </button>
        ))}
      </div>
      <SectionTitle title={filter === "All worlds" ? "Learning worlds" : filter} />
      <div className="world-list">
        {worlds
          .filter(
            (w) =>
              filter === "All worlds" ||
              w.title.includes(filter) ||
              (filter === "Engineering" && w.id === "spark"),
          )
          .map((w, i) => (
            <button
              key={w.title}
              className={`world-list-card world-${w.color}`}
              onClick={() => nav(w.id)}
            >
              <div className="world-scene">
                <span>
                  <Icon name={w.icon} size={35} />
                </span>
                <i className="scene-orbit" />
                {i === 0 && <b>|0⟩</b>}
              </div>
              <div className="world-list-copy">
                <div>
                  <Pill color={w.color === "purple" ? "lavender" : w.color}>
                    {i === 0 ? "FEATURED" : w.stat.toUpperCase()}
                  </Pill>
                  <span>{i === 0 ? "34%" : ""}</span>
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}. Learn through playful, hands-on missions.</p>
                <small>
                  {i === 0 ? "2 of 6 missions" : w.stat}
                  <Icon name="arrow" size={16} />
                </small>
              </div>
            </button>
          ))}
      </div>
      <SectionTitle title="More ways to create" />
      <div className="mini-grid">
        {[
          ["Inventor Studio", "bolt"],
          ["Orbit Observatory", "star"],
          ["Learning Cards", "book"],
          ["Career Studio", "user"],
        ].map(([name, icon]) => (
          <button key={name} onClick={() => nav(name === "Learning Cards" ? "lesson" : "studio")}>
            <span>
              <Icon name={icon as IconName} />
            </span>
            <b>{name}</b>
            <Icon name="arrow" size={15} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Labs({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="page">
      <Header title="Your labs" subtitle="CHOOSE A WORKSPACE" onNavigate={nav} />
      <section className="lab-intro">
        <ScienceSprinkles tone="mint" />
        <div>
          <h2>
            Make. Test.
            <br />
            <em>Discover.</em>
          </h2>
          <p>Your ideas belong in the lab.</p>
        </div>
        <Character id="spark" size={120} />
      </section>
      <SectionTitle title="Active laboratories" />
      <div className="lab-choices">
        <button className="lab-choice quantum-choice" onClick={() => nav("quantum")}>
          <span className="lab-big-icon">
            <Icon name="atom" size={40} />
          </span>
          <div>
            <Pill color="lavender">NOVA'S LAB</Pill>
            <h3>Quantum Circuit Lab</h3>
            <p>Place gates, run a simulation, and watch probability come alive.</p>
            <small>Continue mission • 34%</small>
          </div>
          <Icon name="arrow" />
        </button>
        <button className="lab-choice spark-choice" onClick={() => nav("spark")}>
          <span className="lab-big-icon">
            <Icon name="bolt" size={40} />
          </span>
          <div>
            <Pill color="pink">SPARK'S WORKSHOP</Pill>
            <h3>Electronics Lab</h3>
            <p>Build an RLC circuit and inspect its electric rhythm.</p>
            <small>New experiment • +150 XP</small>
          </div>
          <Icon name="arrow" />
        </button>
      </div>
      <SectionTitle title="Open studio" />
      <button className="open-studio" onClick={() => nav("studio")}>
        <div>
          <Icon name="plus" size={28} />
        </div>
        <span>
          <b>Start a blank experiment</b>
          <small>Follow your own question</small>
        </span>
        <Icon name="arrow" />
      </button>
    </div>
  );
}

const gates = [
  { id: "H", name: "Hadamard", color: "gate-purple" },
  { id: "X", name: "Pauli-X", color: "gate-pink" },
  { id: "Y", name: "Pauli-Y", color: "gate-blue" },
  { id: "Z", name: "Pauli-Z", color: "gate-mint" },
  { id: "●", name: "CNOT", color: "gate-yellow" },
  { id: "M", name: "Measure", color: "gate-dark" },
];

function QuantumLab({ nav }: { nav: (s: Screen) => void }) {
  const [selected, setSelected] = useState("H");
  const [placed, setPlaced] = useState<(string | null)[]>(["H", null, "M"]);
  const [running, setRunning] = useState(false);
  const place = (i: number) => setPlaced((p) => p.map((x, j) => (j === i ? selected : x)));
  const run = () => {
    setRunning(true);
    window.setTimeout(() => nav("quantum-result"), 850);
  };
  return (
    <div className="page lab-page">
      <Header title="Quantum Lab" subtitle="NOVA'S WORKSPACE" back="labs" onNavigate={nav} />
      <div className="mentor-note">
        <Character id="nova" size={78} />
        <div>
          <b>Mission 2 of 6</b>
          <p>Place a Hadamard gate to create a superposition, then measure it.</p>
        </div>
      </div>
      <div className="mission-progress">
        <i style={{ width: "34%" }} />
        <span>34%</span>
      </div>
      <section className={`quantum-workspace ${running ? "is-running" : ""}`}>
        <div className="workspace-head">
          <div>
            <span>QUANTUM CIRCUIT</span>
            <h2>Superposition starter</h2>
          </div>
          <button onClick={() => setPlaced([null, null, null])}>Clear</button>
        </div>
        {[0, 1].map((row) => (
          <div className="qubit-row" key={row}>
            <code>|{row}⟩</code>
            <div className="wire" />
            {[0, 1, 2].map((_, i) => (
              <button
                key={i}
                className={`gate-slot ${placed[i] && row === 0 ? gates.find((g) => g.id === placed[i])?.color : ""}`}
                onClick={() => row === 0 && place(i)}
                aria-label={`Circuit position ${i + 1}`}
              >
                {row === 0 && placed[i] ? placed[i] : <Icon name="plus" size={15} />}
              </button>
            ))}
          </div>
        ))}
        <div className="state-preview">
          <span>LIVE STATE</span>
          <code>{running ? "|ψ⟩ → H|0⟩" : "|ψ⟩ = |0⟩"}</code>
          <div className="state-orb" />
        </div>
      </section>
      <SectionTitle eyebrow="TAP A GATE, THEN TAP THE CIRCUIT" title="Quantum gates" />
      <div className="gate-tray">
        {gates.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelected(g.id)}
            className={selected === g.id ? "selected" : ""}
          >
            <span className={g.color}>{g.id}</span>
            <small>{g.name}</small>
          </button>
        ))}
      </div>
      <Button onClick={run} icon="play">
        {running ? "Running simulation…" : "Run experiment"}
      </Button>
      <p className="science-note">
        <Icon name="atom" size={17} /> This is a simulator. Results show predicted probabilities,
        not physical hardware measurements.
      </p>
    </div>
  );
}

function QuantumResult({ nav }: { nav: (s: Screen) => void }) {
  useEffect(() => {
    if (localStorage.getItem("qgc:cnot-complete") !== getDayStamp()) {
      localStorage.setItem("qgc:cnot-complete", getDayStamp());
      window.dispatchEvent(new Event("qgc:quest-update"));
      announce("Quantum challenge complete — your daily quest is ready to claim");
    }
  }, []);

  return (
    <div className="page result-page">
      <Header
        title="Experiment result"
        subtitle="SIMULATION COMPLETE"
        back="quantum"
        onNavigate={nav}
      />
      <div className="success-burst">
        <ScienceSprinkles tone="celebrate" />
        <div className="result-orb">
          <Icon name="atom" size={52} />
        </div>
        <Pill color="mint">
          <Icon name="check" size={13} /> CIRCUIT COMPLETE
        </Pill>
        <h2>
          You made a<br />
          <em>superposition!</em>
        </h2>
        <p>Your qubit now has an equal chance of being measured as 0 or 1.</p>
      </div>
      <section className="probability-card">
        <div className="prob-head">
          <div>
            <span>MEASUREMENT PROBABILITIES</span>
            <h3>Predicted outcomes</h3>
          </div>
          <code>1,000 shots</code>
        </div>
        <div className="prob-row">
          <code>|0⟩</code>
          <div>
            <i style={{ width: "50%" }} />
          </div>
          <b>50%</b>
        </div>
        <div className="prob-row one">
          <code>|1⟩</code>
          <div>
            <i style={{ width: "50%" }} />
          </div>
          <b>50%</b>
        </div>
        <div className="mini-chart">
          {Array.from({ length: 18 }).map((_, i) => (
            <i key={i} style={{ height: `${22 + ((i * 17) % 42)}px` }} />
          ))}
        </div>
      </section>
      <div className="explanation-card">
        <Character id="nova" size={88} />
        <div>
          <span>NOVA EXPLAINS</span>
          <p>
            The Hadamard gate spreads one definite state into two equal possibilities. Measurement
            chooses just one outcome.
          </p>
        </div>
      </div>
      <div className="reward-row">
        <span>
          <Icon name="star" size={24} fill="currentColor" />
        </span>
        <div>
          <small>MISSION REWARD</small>
          <b>+120 XP earned</b>
        </div>
        <Icon name="check" />
      </div>
      <Button onClick={() => nav("lesson")} icon="arrow">
        Continue learning
      </Button>
    </div>
  );
}

function SparkLab({ nav }: { nav: (s: Screen) => void }) {
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(220);
  const [component, setComponent] = useState("resistor");
  const [connected, setConnected] = useState(false);
  return (
    <div className="page lab-page">
      <Header title="Spark Labs" subtitle="ELECTRONICS WORKSHOP" back="labs" onNavigate={nav} />
      <div className="mentor-note spark-note">
        <Character id="spark" size={78} />
        <div>
          <b>Build an RLC rhythm</b>
          <p>Connect the components, then tune the voltage and resistance.</p>
        </div>
      </div>
      <section className={`circuit-board ${connected ? "connected" : ""}`}>
        <div className="workspace-head">
          <div>
            <span>ENGINEERING GRID</span>
            <h2>Series RLC circuit</h2>
          </div>
          <Pill color={connected ? "mint" : "yellow"}>{connected ? "READY" : "BUILDING"}</Pill>
        </div>
        <div className="circuit-loop">
          <div className="c-wire top" />
          <div className="c-wire right" />
          <div className="c-wire bottom" />
          <div className="c-wire left" />
          <button className="component battery">
            <i />
            <i />
            <small>{voltage}V</small>
          </button>
          <button className="component resistor">
            <span>⌁⌁</span>
            <small>{resistance}Ω</small>
          </button>
          <button className="component capacitor">
            <span>┃ ┃</span>
            <small>10µF</small>
          </button>
          <button className="component inductor">
            <span>∿∿∿</span>
            <small>25mH</small>
          </button>
          {connected && (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i} className={`electron e${i}`} />
              ))}
            </>
          )}
        </div>
        <button className="connect-button" onClick={() => setConnected(!connected)}>
          <Icon name={connected ? "check" : "plus"} size={17} />
          {connected ? "Circuit connected" : "Connect circuit"}
        </button>
      </section>
      <SectionTitle eyebrow="SELECT A COMPONENT" title="Component tray" />
      <div className="component-tray">
        {[
          ["battery", "Battery", "+ −"],
          ["resistor", "Resistor", "⌁"],
          ["capacitor", "Capacitor", "┃┃"],
          ["inductor", "Inductor", "∿"],
          ["switch", "Switch", "／"],
          ["scope", "Scope", "∿"],
        ].map(([id, name, symbol]) => (
          <button
            className={component === id ? "selected" : ""}
            onClick={() => setComponent(id)}
            key={id}
          >
            <span>{symbol}</span>
            <small>{name}</small>
          </button>
        ))}
      </div>
      <div className="controls-card">
        <label>
          <div>
            <span>Voltage</span>
            <code>{voltage}.0 V</code>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            value={voltage}
            onChange={(e) => setVoltage(+e.target.value)}
          />
        </label>
        <label>
          <div>
            <span>Resistance</span>
            <code>{resistance} Ω</code>
          </div>
          <input
            type="range"
            min="100"
            max="500"
            step="10"
            value={resistance}
            onChange={(e) => setResistance(+e.target.value)}
          />
        </label>
      </div>
      <Button onClick={() => nav("spark-result")} icon="play" disabled={!connected}>
        {connected ? "Run circuit simulation" : "Complete circuit first"}
      </Button>
    </div>
  );
}

function SparkResult({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="page result-page">
      <Header title="Oscilloscope" subtitle="SIMULATION RESULTS" back="spark" onNavigate={nav} />
      <div className="success-burst spark-success">
        <ScienceSprinkles tone="celebrate" />
        <Pill color="mint">
          <Icon name="check" size={13} /> STABLE CIRCUIT
        </Pill>
        <h2>
          Your circuit has
          <br />
          <em>found its rhythm.</em>
        </h2>
        <p>The capacitor and inductor are exchanging stored energy.</p>
      </div>
      <section className="scope-card">
        <div className="scope-head">
          <div>
            <span>CHANNEL 1</span>
            <h3>Voltage over time</h3>
          </div>
          <i>● LIVE</i>
        </div>
        <div className="scope-screen">
          <div className="scope-grid" />
          <svg viewBox="0 0 340 130" preserveAspectRatio="none">
            <path
              d="M0 65 C12 5 24 5 36 65 S60 125 72 65 96 5 108 65s24 60 36 0 24-60 36 0 24 60 36 0 24-60 36 0 24 60 36 0 24-60 36 0 24 60 36 0"
              fill="none"
              stroke="#A7F3D0"
              strokeWidth="3"
            />
          </svg>
          <code>5 ms/div</code>
        </div>
        <div className="measure-grid">
          <div>
            <span>Peak voltage</span>
            <b>5.84 V</b>
          </div>
          <div>
            <span>Frequency</span>
            <b>1.21 kHz</b>
          </div>
          <div>
            <span>Current</span>
            <b>26.5 mA</b>
          </div>
          <div>
            <span>Phase</span>
            <b>+12.4°</b>
          </div>
        </div>
      </section>
      <div className="explanation-card">
        <Character id="spark" size={88} />
        <div>
          <span>SPARK EXPLAINS</span>
          <p>
            That smooth wave means energy is moving between the electric field and magnetic field
            again and again.
          </p>
        </div>
      </div>
      <div className="reward-row">
        <span>
          <Icon name="trophy" size={24} />
        </span>
        <div>
          <small>NEW ACHIEVEMENT</small>
          <b>Circuit Composer</b>
        </div>
        <Icon name="arrow" />
      </div>
      <Button onClick={() => nav("progress")} icon="arrow">
        See my progress
      </Button>
    </div>
  );
}

function Physics({ nav }: { nav: (s: Screen) => void }) {
  const [gravity, setGravity] = useState(62);
  return (
    <div className="page">
      <Header title="Physics Playground" subtitle="LUNA'S WORLD" back="explore" onNavigate={nav} />
      <section className="physics-hero">
        <ScienceSprinkles tone="blue" />
        <div>
          <Pill color="blue">PLAY WITH GRAVITY</Pill>
          <h2>
            What goes up…
            <br />
            <em>comes down beautifully.</em>
          </h2>
        </div>
        <Character id="luna" size={132} />
        <div className="planet-ball" />
      </section>
      <SectionTitle title="Gravity sandbox" />
      <section className="gravity-card">
        <div className="gravity-space">
          <div className="moon" />
          <div className="trajectory" />
          <div
            className="satellite"
            style={{ left: `${22 + gravity / 2}%`, top: `${62 - gravity / 2}%` }}
          >
            <span />
          </div>
        </div>
        <label>
          <div>
            <span>Gravity strength</span>
            <code>{((gravity / 100) * 9.8).toFixed(1)} m/s²</code>
          </div>
          <input type="range" value={gravity} onChange={(e) => setGravity(+e.target.value)} />
        </label>
        <div className="segmented">
          <button>Moon</button>
          <button className="active">Earth</button>
          <button>Jupiter</button>
        </div>
      </section>
      <SectionTitle title="Choose an experiment" />
      <div className="lesson-list">
        <button onClick={() => nav("lesson")}>
          <span className="blue-icon">
            <Icon name="wave" />
          </span>
          <div>
            <small>MISSION 1 • 8 MIN</small>
            <b>Make waves dance</b>
            <p>Explore frequency and amplitude</p>
          </div>
          <Icon name="arrow" />
        </button>
        <button onClick={() => nav("lesson")}>
          <span className="yellow-icon">
            <Icon name="star" />
          </span>
          <div>
            <small>MISSION 2 • 12 MIN</small>
            <b>Orbit maker</b>
            <p>Balance speed and gravity</p>
          </div>
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}

function Studio({ nav }: { nav: (s: Screen) => void }) {
  const [question, setQuestion] = useState("");
  return (
    <div className="page">
      <Header
        title="Experiment Studio"
        subtitle="MIRA'S CREATIVE LAB"
        back="explore"
        onNavigate={nav}
      />
      <div className="studio-hero">
        <Character id="mira" size={118} />
        <div>
          <Pill color="mint">OPEN LAB</Pill>
          <h2>Your question is the beginning.</h2>
          <p>Turn a “what if?” into your own experiment.</p>
        </div>
      </div>
      <section className="notebook-card">
        <span>MY RESEARCH QUESTION</span>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="I wonder what would happen if…"
        />
        <div className="prompt-chips">
          {["Light", "Motion", "Circuits", "Sound"].map((x) => (
            <button
              onClick={() => setQuestion(`How does ${x.toLowerCase()} change when…?`)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
      </section>
      <SectionTitle title="Build your experiment" />
      <div className="experiment-steps">
        {[
          ["1", "Ask a question", "You are here"],
          ["2", "Make a hypothesis", "Predict what may happen"],
          ["3", "Test your idea", "Collect observations"],
          ["4", "Tell the story", "What did you discover?"],
        ].map(([n, t, d], i) => (
          <button className={i === 0 ? "active" : ""} key={n}>
            <span>{i === 0 ? <Icon name="check" size={16} /> : n}</span>
            <div>
              <b>{t}</b>
              <small>{d}</small>
            </div>
            {i > 0 && <Icon name="lock" size={15} />}
          </button>
        ))}
      </div>
      <Button onClick={() => nav("lesson")} icon="arrow">
        {question ? "Shape my experiment" : "Explore a guided idea"}
      </Button>
      <SectionTitle title="Saved notebooks" />
      <div className="saved-note">
        <span>
          <Icon name="bookmark" />
        </span>
        <div>
          <b>Can a lemon light an LED?</b>
          <small>3 observations • Edited yesterday</small>
        </div>
        <Icon name="arrow" />
      </div>
    </div>
  );
}

function Lesson({ nav }: { nav: (s: Screen) => void }) {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const sections = ["Discover", "Try it", "Check"];
  return (
    <div className="page lesson-page">
      <Header title="Electric ideas" subtitle="MICRO-LESSON • 8 MIN" back="home" onNavigate={nav} />
      <div className="lesson-tabs">
        {sections.map((s, i) => (
          <button className={step === i ? "active" : ""} onClick={() => setStep(i)} key={s}>
            <i>{i < step ? <Icon name="check" size={13} /> : i + 1}</i>
            {s}
          </button>
        ))}
      </div>
      {step === 0 && (
        <>
          <div className="lesson-mentor">
            <Character id="zoe" size={110} />
            <div>
              <span>ZOE SAYS</span>
              <h2>Let's give a robot its first heartbeat.</h2>
            </div>
          </div>
          <section className="concept-card">
            <div className="simple-circuit">
              <span className="battery-cell">+ &nbsp; −</span>
              <i />
              <b className="tiny-bulb" />
              <i />
            </div>
            <Pill color="yellow">KEY CONCEPT</Pill>
            <h2>A circuit needs a complete path.</h2>
            <p>
              Electric charge can only keep moving when the path loops all the way back to its
              source.
            </p>
          </section>
        </>
      )}
      {step === 1 && (
        <>
          <section className="try-card">
            <Pill color="pink">TRY IT YOURSELF</Pill>
            <h2>Close the switch</h2>
            <p>Tap the switch to complete the circuit and light the bulb.</p>
            <div className={`try-circuit ${answer === "closed" ? "on" : ""}`}>
              <div className="try-wire" />
              <span className="try-battery">+ −</span>
              <button onClick={() => setAnswer(answer === "closed" ? "" : "closed")}>
                {answer === "closed" ? "━" : "╱"}
              </button>
              <div className="try-bulb" />
            </div>
            {answer === "closed" && (
              <div className="feedback">
                <Icon name="check" /> You completed the path! Charge can now flow.
              </div>
            )}
          </section>
        </>
      )}
      {step === 2 && (
        <>
          <section className="quiz-card">
            <span>KNOWLEDGE CHECK</span>
            <h2>What does a circuit need for current to flow?</h2>
            {["A complete, closed path", "Only a very large battery", "A path with a gap"].map(
              (a) => (
                <button
                  className={answer === a ? "selected" : ""}
                  onClick={() => setAnswer(a)}
                  key={a}
                >
                  <i>{answer === a ? <Icon name="check" size={15} /> : ""}</i>
                  {a}
                </button>
              ),
            )}
            {answer && (
              <div className={answer.startsWith("A complete") ? "feedback" : "feedback incorrect"}>
                {answer.startsWith("A complete")
                  ? "Exactly! A closed loop lets charge keep moving."
                  : "Not quite. Look for the answer that makes a full loop."}
              </div>
            )}
          </section>
        </>
      )}
      <Button onClick={() => (step < 2 ? setStep(step + 1) : nav("progress"))} icon="arrow">
        {step < 2 ? "Next step" : "Complete lesson"}
      </Button>
    </div>
  );
}

function Progress({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="page">
      <Header title="My progress" subtitle="YOUR SCIENTIST STORY" onNavigate={nav} />
      <section className="progress-hero">
        <div className="big-ring">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" />
            <circle className="ring-fill" cx="50" cy="50" r="42" />
          </svg>
          <div>
            <b>7</b>
            <span>LEVEL</span>
          </div>
        </div>
        <div>
          <Pill color="yellow">RISING SCIENTIST</Pill>
          <h2>1,840 XP</h2>
          <p>360 XP to Quantum Thinker</p>
          <div className="progress-track">
            <i style={{ width: "72%" }} />
          </div>
        </div>
      </section>
      <div className="stat-grid">
        <div>
          <span>
            <Icon name="bolt" />
          </span>
          <b>12</b>
          <small>Experiments</small>
        </div>
        <div>
          <span>
            <Icon name="star" />
          </span>
          <b>8</b>
          <small>Day streak</small>
        </div>
        <div>
          <span>
            <Icon name="trophy" />
          </span>
          <b>6</b>
          <small>Badges</small>
        </div>
      </div>
      <SectionTitle title="This week's discoveries" />
      <div className="week-chart">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={`${d}${i}`}>
            <span>
              <i style={{ height: `${[44, 68, 31, 76, 55, 20, 64][i]}%` }} />
            </span>
            <small>{d}</small>
          </div>
        ))}
      </div>
      <SectionTitle eyebrow="FRIENDLY WEEKLY CHALLENGE" title="Comet League" />
      <section className="league-card">
        <div className="league-heading">
          <div className="league-emblem">
            <Icon name="star" size={25} fill="currentColor" />
          </div>
          <div>
            <span>COMET LEAGUE</span>
            <h3>You're in the top 5!</h3>
            <p>Keep experimenting to reach the next orbit.</p>
          </div>
          <Pill color="yellow">2 DAYS LEFT</Pill>
        </div>
        <div className="league-list">
          {[
            ["1", "Mina", "luna", "2,480"],
            ["2", "Aria", "spark", "2,210"],
            ["3", "You", "nova", "1,840"],
            ["4", "Sofia", "mira", "1,720"],
          ].map(([rank, name, mentor, xp]) => (
            <div className={name === "You" ? "is-you" : ""} key={name}>
              <b>{rank}</b>
              <span>
                <Character id={mentor as MentorKey} size={45} />
              </span>
              <p>
                <strong>{name}</strong>
                <small>{name === "You" ? "Rising Scientist" : "Curious Creator"}</small>
              </p>
              <code>{xp} XP</code>
              {name === "You" && <i>+2</i>}
            </div>
          ))}
        </div>
      </section>
      <SectionTitle title="Your STEM constellation" />
      <section className="skill-tree">
        <div className="skill-path" />
        {[
          ["Quantum", "atom", "unlocked"],
          ["Electronics", "bolt", "unlocked"],
          ["Physics", "wave", "current"],
          ["Engineering", "settings", "locked"],
          ["Research", "flask", "locked"],
        ].map(([name, icon, state], i) => (
          <button key={name} className={state} style={{ "--i": i } as React.CSSProperties}>
            <span>
              <Icon name={state === "locked" ? "lock" : (icon as IconName)} />
            </span>
            <b>{name}</b>
          </button>
        ))}
      </section>
      <SectionTitle title="Achievements" action="View all" onAction={() => nav("achievements")} />
      <div className="badge-row">
        {[
          ["First Spark", "bolt"],
          ["Quantum Explorer", "atom"],
          ["Curious Mind", "star"],
        ].map(([n, i]) => (
          <button onClick={() => nav("achievements")} key={n}>
            <span>
              <Icon name={i as IconName} />
            </span>
            <b>{n}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function Achievements({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="page">
      <Header
        title="Achievements"
        subtitle="YOUR DISCOVERY CABINET"
        back="progress"
        onNavigate={nav}
      />
      <section className="achievement-hero">
        <ScienceSprinkles tone="yellow" />
        <div>
          <Pill color="yellow">6 OF 18 UNLOCKED</Pill>
          <h2>
            Look how far your
            <br />
            <em>curiosity has taken you.</em>
          </h2>
        </div>
        <div className="trophy-orb">
          <Icon name="trophy" size={44} />
        </div>
      </section>
      <div className="achievement-grid">
        {[
          ["First Circuit Built", "bolt", "Build your first circuit", true],
          ["Quantum Explorer", "atom", "Run a quantum simulation", true],
          ["Physics Discovery", "wave", "Complete a physics mission", true],
          ["Experiment Designer", "flask", "Create a hypothesis", true],
          ["Engineering Star", "settings", "Build five inventions", false],
          ["STEM Superstar", "star", "Reach scientist level 10", false],
        ].map(([name, icon, desc, open]) => (
          <div className={open ? "" : "locked"} key={name as string}>
            <span>
              <Icon name={(open ? icon : "lock") as IconName} />
            </span>
            <h3>{name}</h3>
            <p>{desc}</p>
            {open ? <Pill color="mint">EARNED</Pill> : <small>Keep exploring</small>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile({ nav }: { nav: (s: Screen) => void }) {
  const [sound, setSound] = useState(() => localStorage.getItem("qgc:sound") !== "off");
  const [motion, setMotion] = useState(() => localStorage.getItem("qgc:motion") !== "off");
  const [companion, setCompanion] = useState<MentorKey>(getSavedMentor);
  const [interests, setInterests] = useState<string[]>(getSavedInterests);

  useEffect(() => {
    localStorage.setItem("qgc:sound", sound ? "on" : "off");
    document.documentElement.dataset.sound = sound ? "on" : "off";
  }, [sound]);

  useEffect(() => {
    localStorage.setItem("qgc:motion", motion ? "on" : "off");
    document.documentElement.classList.toggle("reduce-motion", !motion);
  }, [motion]);

  useEffect(() => {
    const updateCompanion = () => setCompanion(getSavedMentor());
    window.addEventListener("qgc:mentor", updateCompanion);
    return () => window.removeEventListener("qgc:mentor", updateCompanion);
  }, []);

  const toggleInterest = (interest: string) => {
    const next = interests.includes(interest)
      ? interests.filter((item) => item !== interest)
      : [...interests, interest];
    setInterests(next);
    localStorage.setItem("qgc:interests", JSON.stringify(next));
    announce(
      next.includes(interest)
        ? `${interest} added to your interests`
        : `${interest} removed from your interests`,
    );
  };
  return (
    <div className="page">
      <Header title="My universe" subtitle="SCIENTIST PROFILE" onNavigate={nav} />
      <section className="profile-card">
        <div className="profile-art">
          <Character id={companion} size={140} />
          <button onClick={() => nav("mentors")}>
            <Icon name="settings" size={15} />
          </button>
        </div>
        <div>
          <Pill color="lavender">LEVEL 7</Pill>
          <h2>Quantum Thinker</h2>
          <p>
            Exploring with {mentors[companion].name}, your {mentors[companion].role.toLowerCase()}.
          </p>
          <div>
            <span>1,840 XP</span>
            <span>8 day streak</span>
          </div>
        </div>
      </section>
      <SectionTitle title="My interests" />
      <div className="interest-row">
        {["Quantum computing", "Robotics", "Physics", "Inventing"].map((interest) => (
          <button
            className={interests.includes(interest) ? "active" : ""}
            key={interest}
            onClick={() => toggleInterest(interest)}
            aria-pressed={interests.includes(interest)}
          >
            {interests.includes(interest) && <Icon name="check" size={13} />} {interest}
          </button>
        ))}
      </div>
      <SectionTitle title="My collection" />
      <div className="profile-links">
        <button onClick={() => nav("achievements")}>
          <span className="yellow-icon">
            <Icon name="trophy" />
          </span>
          <div>
            <b>Achievement cabinet</b>
            <small>6 badges unlocked</small>
          </div>
          <Icon name="arrow" />
        </button>
        <button onClick={() => nav("studio")}>
          <span className="mint-icon">
            <Icon name="bookmark" />
          </span>
          <div>
            <b>Saved experiments</b>
            <small>3 research notebooks</small>
          </div>
          <Icon name="arrow" />
        </button>
      </div>
      <SectionTitle title="Learning preferences" />
      <div className="settings-card">
        <label>
          <span>
            <Icon name="wave" />
            <div>
              <b>Sound & feedback</b>
              <small>Lab sounds and celebrations</small>
            </div>
          </span>
          <input
            type="checkbox"
            checked={sound}
            onChange={() => {
              setSound(!sound);
              announce(!sound ? "Sound and feedback turned on" : "Sound and feedback turned off");
            }}
            aria-label="Sound and feedback"
          />
        </label>
        <label>
          <span>
            <Icon name="star" />
            <div>
              <b>Gentle animations</b>
              <small>Reduce motion when turned off</small>
            </div>
          </span>
          <input
            type="checkbox"
            checked={motion}
            onChange={() => {
              setMotion(!motion);
              announce(!motion ? "Gentle animations turned on" : "Animations reduced");
            }}
            aria-label="Gentle animations"
          />
        </label>
        <button onClick={() => nav("welcome")}>
          <span>
            <Icon name="settings" />
            <div>
              <b>Restart welcome tour</b>
              <small>Meet the scientist mentors again</small>
            </div>
          </span>
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}

function Welcome({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="onboarding welcome-page">
      <div className="onboarding-brand">
        <span>
          <Icon name="atom" />
        </span>
        QUANTUM GIRLS CLUB
      </div>
      <div className="welcome-universe">
        <div className="welcome-orbit" />
        <Character id="nova" size={166} />
        <Character id="spark" size={118} />
        <Character id="luna" size={112} />
      </div>
      <Pill color="yellow">YOUR STEM ADVENTURE STARTS HERE</Pill>
      <h1>
        Welcome to a universe of <em>big ideas.</em>
      </h1>
      <p>
        Build circuits, explore quantum worlds, and invent things that have never existed before.
      </p>
      <Button onClick={() => nav("mentors")} icon="arrow">
        Meet your mentors
      </Button>
      <button className="skip" onClick={() => nav("home")}>
        I’ve been here before
      </button>
      <div className="page-dots">
        <i className="active" />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function Mentors({ nav }: { nav: (s: Screen) => void }) {
  const [selected, setSelected] = useState<MentorKey>(getSavedMentor);
  const mentor = mentors[selected];
  const chooseMentor = () => {
    localStorage.setItem("qgc:mentor", selected);
    window.dispatchEvent(new Event("qgc:mentor"));
    announce(`${mentor.name} is now your science companion`);
    nav("home");
  };
  return (
    <div className="onboarding mentors-page">
      <div className="onboard-top">
        <button onClick={() => nav("welcome")}>
          <Icon name="back" />
        </button>
        <span>CHOOSE YOUR COMPANION</span>
        <small>2 of 4</small>
      </div>
      <div className="mentor-stage" style={{ "--tone": mentor.tone } as React.CSSProperties}>
        <Character id={selected} size={195} />
        <div className="mentor-specialty">
          <Icon
            name={
              selected === "nova"
                ? "atom"
                : selected === "spark"
                  ? "bolt"
                  : selected === "luna"
                    ? "wave"
                    : selected === "mira"
                      ? "flask"
                      : "settings"
            }
          />
        </div>
      </div>
      <div className="mentor-description">
        <Pill color="lavender">{mentor.role.toUpperCase()}</Pill>
        <h1>{mentor.name}</h1>
        <p>
          {selected === "nova"
            ? "“The universe is full of possibilities. Let’s discover them together!”"
            : selected === "spark"
              ? "“Every brilliant invention begins with one tiny spark!”"
              : selected === "luna"
                ? "“Physics is the secret language of everything that moves.”"
                : selected === "mira"
                  ? "“Ask brave questions, then test every possibility.”"
                  : "“If you can imagine it, we can find a way to build it.”"}
        </p>
      </div>
      <div className="mentor-picker">
        {(Object.keys(mentors) as MentorKey[]).map((id) => (
          <button
            className={selected === id ? "selected" : ""}
            onClick={() => setSelected(id)}
            key={id}
          >
            <Character id={id} size={62} />
            <span>{mentors[id].name}</span>
          </button>
        ))}
      </div>
      <Button onClick={chooseMentor} icon="arrow">
        Explore with {mentor.name}
      </Button>
      <p className="choice-note">You can change your companion anytime.</p>
    </div>
  );
}

const navItems: { id: Screen; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "explore", label: "Explore", icon: "compass" },
  { id: "labs", label: "Lab", icon: "flask" },
  { id: "progress", label: "Progress", icon: "chart" },
  { id: "profile", label: "Me", icon: "user" },
];

function BottomNav({ active, nav }: { active: Screen; nav: (s: Screen) => void }) {
  const current =
    active === "quantum" || active === "spark" || active.includes("result")
      ? "labs"
      : active === "achievements"
        ? "progress"
        : active;
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={current === item.id ? "active" : ""}
          onClick={() => nav(item.id)}
          aria-current={current === item.id ? "page" : undefined}
          aria-label={item.label}
        >
          <span>
            <Icon name={item.icon} />
          </span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}

function NotificationSheet({
  open,
  onClose,
  nav,
}: {
  open: boolean;
  onClose: () => void;
  nav: (s: Screen) => void;
}) {
  if (!open) return null;
  return (
    <div className="sheet-layer" role="presentation" onClick={onClose}>
      <section
        className="notification-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />
        <div className="sheet-heading">
          <div>
            <span>YOUR LAB UPDATES</span>
            <h2 id="notification-title">Notifications</h2>
          </div>
          <button onClick={onClose} aria-label="Close notifications">
            <Icon name="plus" />
          </button>
        </div>
        <button
          className="notification-item unread"
          onClick={() => {
            onClose();
            nav("quantum");
          }}
        >
          <span className="notification-symbol quantum-symbol">
            <Icon name="atom" />
          </span>
          <div>
            <b>Nova has a new challenge</b>
            <p>Try using a CNOT gate to connect two qubits.</p>
            <small>2 minutes ago</small>
          </div>
          <i />
        </button>
        <button
          className="notification-item unread"
          onClick={() => {
            onClose();
            nav("achievements");
          }}
        >
          <span className="notification-symbol achievement-symbol">
            <Icon name="trophy" />
          </span>
          <div>
            <b>Achievement unlocked</b>
            <p>You earned the Curious Mind badge.</p>
            <small>Today</small>
          </div>
          <i />
        </button>
        <button
          className="notification-item"
          onClick={() => {
            onClose();
            nav("progress");
          }}
        >
          <span className="notification-symbol streak-symbol">
            <Icon name="bolt" />
          </span>
          <div>
            <b>Your streak is glowing</b>
            <p>One tiny experiment keeps your 8-day streak going.</p>
            <small>Yesterday</small>
          </div>
        </button>
        <Button
          variant="ghost"
          onClick={() => {
            onClose();
            nav("explore");
          }}
        >
          Explore something new
        </Button>
      </section>
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className="app-toast" role="status">
      <span>
        <Icon name="check" size={15} />
      </span>
      {message}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [transitioning, setTransitioning] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const nav = (next: Screen) => {
    setTransitioning(true);
    window.setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
      window.scrollTo(0, 0);
      document.querySelector(".app-scroll")?.scrollTo(0, 0);
    }, 120);
  };
  const standalone = screen === "welcome" || screen === "mentors";
  const content = useMemo(() => {
    const props = { nav };
    switch (screen) {
      case "home":
        return <Home {...props} />;
      case "explore":
        return <Explore {...props} />;
      case "labs":
        return <Labs {...props} />;
      case "quantum":
        return <QuantumLab {...props} />;
      case "quantum-result":
        return <QuantumResult {...props} />;
      case "spark":
        return <SparkLab {...props} />;
      case "spark-result":
        return <SparkResult {...props} />;
      case "physics":
        return <Physics {...props} />;
      case "studio":
        return <Studio {...props} />;
      case "lesson":
        return <Lesson {...props} />;
      case "progress":
        return <Progress {...props} />;
      case "achievements":
        return <Achievements {...props} />;
      case "profile":
        return <Profile {...props} />;
      case "welcome":
        return <Welcome {...props} />;
      case "mentors":
        return <Mentors {...props} />;
    }
  }, [screen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !["home", "welcome"].includes(screen)) nav("home");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen]);

  useEffect(() => {
    const openNotifications = () => setNotificationsOpen(true);
    window.addEventListener("qgc:notifications", openNotifications);
    return () => window.removeEventListener("qgc:notifications", openNotifications);
  }, []);

  useEffect(() => {
    let timeout = 0;
    const showToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      window.clearTimeout(timeout);
      setToast(message);
      timeout = window.setTimeout(() => setToast(""), 2600);
    };
    window.addEventListener("qgc:toast", showToast);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("qgc:toast", showToast);
    };
  }, []);

  useEffect(() => {
    if (!notificationsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNotificationsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [notificationsOpen]);

  return (
    <main className="stage">
      <div className={`phone-shell ${standalone ? "standalone" : ""}`}>
        <div className={`navigation-progress ${transitioning ? "active" : ""}`} />
        <div className={`app-scroll ${transitioning ? "transitioning" : ""}`}>{content}</div>
        {!standalone && <BottomNav active={screen} nav={nav} />}
        <NotificationSheet
          open={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
          nav={nav}
        />
        {toast && <Toast message={toast} />}
        <div className="sr-only" aria-live="polite">
          {transitioning ? "Loading screen" : `Showing ${screen.replace("-", " ")}`}
        </div>
      </div>
    </main>
  );
}
