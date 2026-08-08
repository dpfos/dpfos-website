export default function HeroStats() {
  const stats = [
    {
      value: "10+",
      label: "Knowledge Modules",
    },
    {
      value: "100+",
      label: "Frameworks",
    },
    {
      value: "∞",
      label: "Future Ready",
    },
  ];

  return (
    <div className="hero-stats">
      {stats.map((item) => (
        <div className="hero-stat" key={item.label}>
          <h3>{item.value}</h3>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
