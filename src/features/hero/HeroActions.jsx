import { Link } from "react-router-dom";

export default function HeroActions() {
  return (
    <div className="hero-actions">
      <Link to="/platform" className="hero-btn hero-btn-primary">
        Explore Platform
      </Link>

      <Link to="/library" className="hero-btn hero-btn-secondary">
        DPF Library
      </Link>
    </div>
  );
}
