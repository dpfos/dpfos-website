const stats = [
  {
    id: "knowledge",
    value: "10+",
    label: "KNOWLEDGE",
    sublabel: "VOLUMES",
    icon: "layers",
    tone: "gold",
  },
  {
    id: "frameworks",
    value: "100+",
    label: "FRAMEWORKS &",
    sublabel: "CONCEPTS",
    icon: "cube",
    tone: "cyan",
  },
  {
    id: "evolution",
    value: "∞",
    label: "SYSTEM",
    sublabel: "EVOLUTION",
    icon: "infinity",
    tone: "cyan",
  },
];

function StatIcon({ type }) {
  if (type === "layers") {
    return (
      <span className="hero-stat__icon hero-stat__icon--layers">
        <span />
        <span />
        <span />
      </span>
    );
  }

  if (type === "cube") {
    return (
      <span className="hero-stat__icon hero-stat__icon--cube">
        <span />
      </span>
    );
  }

  return (
    <span className="hero-stat__icon hero-stat__icon--infinity">
      ∞
    </span>
  );
}

function StatItem({
  value,
  label,
  sublabel,
  icon,
  tone,
}) {
  return (
    <div className={`hero-stat hero-stat--${tone}`}>

      <StatIcon type={icon} />

      <div className="hero-stat__content">

        <strong className="hero-stat__value">
          {value}
        </strong>

        <span className="hero-stat__label">
          {label}
        </span>

        <span className="hero-stat__label">
          {sublabel}
        </span>

      </div>

    </div>
  );
}

export default function HeroStats() {
  return (
    <div className="hero-stats">
      {stats.map((stat) => (
        <StatItem
          key={stat.id}
          value={stat.value}
          label={stat.label}
          sublabel={stat.sublabel}
          icon={stat.icon}
          tone={stat.tone}
        />
      ))}
    </div>
  );
}