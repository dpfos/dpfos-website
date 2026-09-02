import { Outlet } from "react-router-dom";
import PremiumSidebar from "./PremiumSidebar";
import "../styles/PremiumLayout.css";

export default function PremiumLayout() {
  return (
    <div className="dpf-premium-layout">
      <PremiumSidebar />

      <main className="dpf-premium-main">
        <header className="dpf-premium-topbar">
          <div>
            <span className="dpf-eyebrow">DPF OS</span>
            <span className="dpf-topbar-title">Premium Workspace</span>
          </div>

          <div className="dpf-topbar-status">
            ACTIVE ACCESS
          </div>
        </header>

        <section className="dpf-premium-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
