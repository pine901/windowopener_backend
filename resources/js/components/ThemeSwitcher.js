import { Switch } from 'antd';
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useState } from 'react';

function ThemeSwitcher() {
    const [isDarkMode, setIsDarkMode] = useState();
    const { switcher, themes } = useThemeSwitcher();

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginRight: '1rem', fontSize: '20pt'}}><span style={{fontSize: '20pt', color: 'white'}}>☽</span><Switch defaultChecked checked={isDarkMode} onChange={toggleTheme} />☀</div>
    );
}

export default ThemeSwitcher;
