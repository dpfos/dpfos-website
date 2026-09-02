import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  allowed = false,
  loading = false,
  children,
  fallback = "/auth",
}) {
  const location = useLocation();

  if (loading) {
    return (
      <div className="app-loading">
        Loading DPF OS...
      </div>
    );
  }

  if (!allowed) {
    return (
      <Navigate
        to={fallback}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}
