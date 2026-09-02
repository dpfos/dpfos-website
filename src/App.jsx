import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import { useDPFAuth, canAccessPremium } from "./core/index.js";
import ProtectedRoute from "./core/access/ProtectedRoute";
import { canAccessClubOS } from "./core/access/accessControl";
import KnowledgeConcept from "./pages/KnowledgeConcept";
import Layout from "./components/layout/Layout";
import ClubStructure from "./features/club-os/pages/ClubStructure";

import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Ecosystem from "./pages/Ecosystem";
import Library from "./pages/Library";
import Research from "./pages/Research";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import BookDetail from "./data/BookDetail";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import ClubAgreement from "./pages/ClubAgreement";
import DataProcessingTerms from "./pages/DataProcessingTerms";
import ServiceLevelAgreement from "./pages/ServiceLevelAgreement";

/* =========================================================
   PREMIUM WORKSPACE
   ========================================================= */

import PremiumLayout from "./features/premium/components/PremiumLayout";
import PremiumDashboard from "./features/premium/pages/PremiumDashboard";
import PremiumLibrary from "./features/premium/pages/PremiumLibrary";
import PremiumBooks from "./features/premium/pages/PremiumBooks";
import PremiumResources from "./features/premium/pages/PremiumResources";
import PremiumWorkspace from "./features/premium/pages/PremiumWorkspace";


/* =========================================================
   CLUB OS
   ========================================================= */

import ClubSelector from "./features/club-os/pages/ClubSelector";
import ClubLayout from "./features/club-os/components/ClubLayout";
import ClubDashboard from "./features/club-os/pages/ClubDashboard";
import ClubModulePage from "./features/club-os/pages/ClubModulePage";

/* =========================================================
   PUBLIC PAGE WRAPPER
   ========================================================= */

function PublicPage({ children }) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const { session, loading } = useDPFAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language?.split("-")[0] || "en";

    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Routes>

      {/* =====================================================
          PUBLIC WEBSITE
          ===================================================== */}

      <Route
        path="/"
        element={
          <PublicPage>
            <Home />
          </PublicPage>
        }
      />

      <Route
        path="/platform"
        element={
          <PublicPage>
            <Platform />
          </PublicPage>
        }
      />

      <Route
        path="/ecosystem"
        element={
          <PublicPage>
            <Ecosystem />
          </PublicPage>
        }
      />

      <Route
        path="/library"
        element={
          <PublicPage>
            <Library />
          </PublicPage>
        }
      />

      <Route
        path="/knowledge/:slug"
        element={
          <PublicPage>
            <KnowledgeConcept />
          </PublicPage>
        }
      />

      <Route
        path="/library/:slug"
        element={
          <PublicPage>
            <BookDetail />
          </PublicPage>
        }
      />

      <Route
        path="/research"
        element={
          <PublicPage>
            <Research />
          </PublicPage>
        }
      />

      <Route
        path="/technology"
        element={
          <PublicPage>
            <Technology />
          </PublicPage>
        }
      />

      <Route
        path="/contact"
        element={
          <PublicPage>
            <Contact />
          </PublicPage>
        }
      />

      <Route
         path="/terms"
         element={
          <PublicPage>
          <Terms />
          </PublicPage>
        }
      />
         <Route
          path="/privacy"
          element={
           <PublicPage>
            <Privacy />
           </PublicPage>
        }
/>

        <Route
          path="/cookies"
          element={
           <PublicPage>
           <Cookies />
           </PublicPage>
  }
/>

      <Route
        path="/get-started"
        element={
          <PublicPage>
            <GetStarted />
          </PublicPage>
        }
      />

      <Route
        path="/auth"
        element={
          <PublicPage>
            <Auth />
          </PublicPage>
        }
      />

      <Route
        path="/reset-password"
        element={
        <PublicPage>
            <ResetPassword />
          </PublicPage>
        }
      />

            <Route
        path="/club-agreement"
        element={
          <PublicPage>
            <ClubAgreement />
          </PublicPage>
        }
      />

      <Route
        path="/data-processing"
        element={
          <PublicPage>
            <DataProcessingTerms />
          </PublicPage>
        }
      />

      <Route
        path="/sla"
        element={
          <PublicPage>
            <ServiceLevelAgreement />
          </PublicPage>
        }
      />

    <Route
     path="/club-agreement"
     element={
    <PublicPage>
      <ClubAgreement />
      </PublicPage>
  }
/>

    <Route
     path="/data-processing"
      element={
    <PublicPage>
      <DataProcessingTerms />
      </PublicPage>
  }
/>

    <Route
     path="/sla"
     element={
    <PublicPage>
      <ServiceLevelAgreement />
      </PublicPage>
  }
/>

      {/* =====================================================
          PREMIUM WORKSPACE
          ===================================================== */}

        <Route
          path="/premium"
          element={
          <ProtectedRoute
          loading={loading}
          allowed={canAccessPremium(session)}
        >
         <PremiumLayout />
         </ProtectedRoute>
        }
>
        <Route
          index
          element={<PremiumDashboard />}
        />

        <Route
          path="library"
          element={<PremiumLibrary />}
        />

        <Route
          path="books"
          element={<PremiumBooks />}
        />

        <Route
          path="resources"
          element={<PremiumResources />}
        />

        <Route
          path="workspace"
          element={<PremiumWorkspace />}
        />
      </Route>


      {/* =====================================================
          CLUB SELECTOR
          ===================================================== */}

      <Route
        path="/club"
        element={
    <ProtectedRoute
      loading={loading}
      allowed={canAccessClubOS(session)}
      >
      <ClubSelector />
      </ProtectedRoute>
   }
    />


      {/* =====================================================
          CLUB OS
          ===================================================== */}

      <Route
         path="/club/:clubId"
         element={
      <ProtectedRoute
         loading={loading}
         allowed={canAccessClubOS(
                session,
                window.location.pathname.split("/")[2]
        )}
    >
        <ClubLayout />
        </ProtectedRoute>
      }
>

        {/* CLUB COMMAND CENTER */}
        <Route
          index
          element={<ClubDashboard />}
        />

        {/* CLUB STRUCTURE */}
        <Route
          path="club"
          element={<ClubStructure />}
        />

        {/* GENERIC MODULE ROUTE */}
        <Route
          path=":module"
          element={<ClubModulePage />}
        />

      </Route>

    </Routes>
  );
}

export default App;
