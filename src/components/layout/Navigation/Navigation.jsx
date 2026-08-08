import "./Navigation.css";

import Logo from "./Logo";
import NavMenu from "./NavMenu";
import CTAButton from "./CTAButton";

export default function Navigation() {
  return (
    <header className="navigation">
      <div className="navigation-container">
        <Logo />

        <NavMenu />

        <CTAButton />
      </div>
    </header>
  );
}
