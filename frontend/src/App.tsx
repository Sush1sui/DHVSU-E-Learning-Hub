import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import HomeContents from "./pages/Home/Home";

import Campuses from "./pages/Home/Campuses/Campuses";
import MainCampus from "./pages/Home/Campuses/MainCampus";
import PoracCampus from "./pages/Home/Campuses/PoracCampus";
import ApalitCampus from "./pages/Home/Campuses/ApalitCampus";
import CandabaCampus from "./pages/Home/Campuses/CandabaCampus";
import LubaoCampus from "./pages/Home/Campuses/LubaoCampus";
import MexicoCampus from "./pages/Home/Campuses/MexicoCampus";
import SanFernandoCampus from "./pages/Home/Campuses/SanFernandoCampus";
import SantoTomaxCampus from "./pages/Home/Campuses/SantoTomasCampus";

import OnlineServices from "./pages/Home/OnlineServices";
import Features from "./pages/Home/Features";

import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";

// Layouts
import Layout from "./pages/Auth/Layout";
import RootLayout from "./layouts/RootLayout";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";
import Profile from "./pages/Profile/Profile";
import Subjects from "./pages/Subjects/Subjects";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/404/not-found";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  if (!context) return <LoadingSpinner loading={!loading} />;

  const { user, token, setToken, setUser } = context;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeContents />} />

            {/* Campuses Route */}
            <Route path="campuses" element={<Campuses />}>
              <Route index element={<MainCampus />} />
              <Route path="main-campus" element={<MainCampus />} />
              <Route path="candaba-campus" element={<CandabaCampus />} />
              <Route path="porac-campus" element={<PoracCampus />} />
              <Route path="apalit-campus" element={<ApalitCampus />} />
              <Route path="lubao-campus" element={<LubaoCampus />} />
              <Route path="mexico-campus" element={<MexicoCampus />} />
              <Route
                path="san-fernando-campus"
                element={<SanFernandoCampus />}
              />
              <Route path="santo-tomas-campus" element={<SantoTomaxCampus />} />
            </Route>

            <Route path="online-services" element={<OnlineServices />} />
            <Route path="features" element={<Features />} />
          </Route>

          {/* Routes for unauthenticated users */}
          {!context.token && (
            <Route path="auth" element={<Layout />}>
              <Route index element={<SignUp />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
          )}

          {/* Protected routes for authenticated users */}
          {token && user && (
            <Route
              path="/"
              element={
                <RootLayout
                  user={user}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="profile" element={<Profile />} />
              <Route path="subjects" element={<Subjects />} />
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
