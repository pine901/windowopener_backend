import { useThemeSwitcher } from "react-css-theme-switcher";
import DarkLogo from "../../image/dark-logo.png";
import LightLogo from "../../image/light-logo.png";

export function LogoBox() {
  const { currentTheme } = useThemeSwitcher();
  return (
    <div className="auth-logo">
      <img
        src={
          currentTheme === "dark"
            ? DarkLogo
            : LightLogo
        }
        alt="Window-Opener"
      />
    </div>
  );
}
