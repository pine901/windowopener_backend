// Here we include the components which need to be accesses after successful login.
import { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Button, Switch as Switcher } from "antd";
import {
    PieChartOutlined,
    WindowsOutlined,
    FundOutlined,
    HistoryOutlined,
    LoginOutlined,
    UsergroupAddOutlined,
    SettingOutlined
} from "@ant-design/icons";
import actions from "../redux/Authenticate/actions";
import routes from "./routes";
import { useThemeSwitcher } from "react-css-theme-switcher";
import DarkCollapsedLogo from "../../image/dark-collapsed-logo.png";
import LightCollapsedLogo from "../../image/light-collapsed-logo.png";

const { Header, Content, Footer, Sider } = Layout;

function ProtectedRoutes() {
    const { name, logOutLoader, role } = useSelector(
        (state) => state.authenticateReducer
    );

    const [isDarkMode, setIsDarkMode] = useState(true);
    const { switcher, themes, currentTheme } = useThemeSwitcher();

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();

    let onLogout = () => {
        dispatch({
            type: actions.LOGOUT,
        });
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
            >
                <div className={collapsed ? "logo-collapsed" : "logo"}>
                    <img
                        src={
                            currentTheme === "dark"
                                ? DarkCollapsedLogo
                                : LightCollapsedLogo
                        }
                    />
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    {
                        <>
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                <Link to="/dashboard">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
                                <Link to="/users">Users</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<HistoryOutlined />}>
                                <Link to="/user_logs">User Logs</Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<WindowsOutlined />}>
                                <Link to="/devices">Devices</Link>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<FundOutlined />}>
                                <Link to="/device_logs">Device Logs</Link>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<SettingOutlined />}>
                                <Link to="/profile">Settings</Link>
                            </Menu.Item>
                        </>
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                >
                    <div className="header-info">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginRight: "1rem",
                                fontSize: "20pt",
                            }}
                        >
                            <span style={{ fontSize: "20pt", color: "white" }}>
                                ☽
                            </span>
                            <Switcher
                                defaultChecked
                                checked={isDarkMode}
                                onChange={toggleTheme}
                            />
                            ☀
                        </div>
                        <span style={{ color: "white" }}>{name}</span>
                        <Button
                            danger
                            type="primary"
                            icon={<LoginOutlined />}
                            loading={logOutLoader}
                            onClick={onLogout}
                        />
                    </div>
                </Header>
                <Content
                    style={{
                        background: isDarkMode ? "#f8fafc" : "#262626",
                        margin: "16px",
                        maxHeight: "85vh",
                        overflowY: "auto",
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 768, height: "auto" }}
                    >
                        <Switch>
                            {routes.map(
                                (
                                    { component: Component, path, exact },
                                    index
                                ) => (
                                    <Route
                                        path={`/${path}`}
                                        key={index}
                                        exact={exact}
                                    >
                                        <Component />
                                    </Route>
                                )
                            )}
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    @2022 Created by Motion Automated
                </Footer>
            </Layout>
        </Layout>
    );
}

export default ProtectedRoutes;
