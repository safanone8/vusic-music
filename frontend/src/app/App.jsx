import React, { useEffect } from "react";
import "./App.scss";
import Home from "../components/Pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login2 from "../components/Pages/Login2";
import { ThemeContext, themes } from "../api/Theme";
import anime from "animejs";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../actions/actions";
// import Login from "../components/Pages/Login";
// import Signup from "../components/Pages/Register";

const App = () => {
  const { language } = useSelector((state) => state.musicReducer);
  const theme = themes.light; // single theme mode

  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      let url = process.env.REACT_APP_API_BASE || "http://localhost:3001";
      let query = "";
      if (language && !language.includes("any")) {
        query = `?lang=${encodeURIComponent(
          language.join ? language.join(",") : language
        )}`;
      }
      try {
        const res = await fetch(`${url}/songs${query}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        // Handle both array (legacy) and object with data property (paginated)
        dispatch(setPlaylist(Array.isArray(data) ? data : data.data || []));
      } catch (e) {
        console.error("Failed to load songs", e);
      }
    }
    load();
    return () => controller.abort();
  }, [dispatch, language]);

  // Apply base theme colors + subtle intro background animation once
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--app-bg", theme.component.backgroundColor);
    root.style.setProperty("--app-fg", theme.component.color);
    root.style.setProperty("--app-accent", theme.theme);
    root.style.setProperty("--app-sub", theme.subTheme);
    anime({ targets: root, opacity: [0,1], duration: 500, easing: 'easeOutQuad' });
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <Router>
    <div className="app-root">
          <Switch>
            <Route path="/" exact component={Login2} />
      <Route path="/home" component={Home} />
          </Switch>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
