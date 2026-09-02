import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getClubs,
} from "../../../core/index.js";

export default function ClubSelector() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadClubs() {
      setLoading(true);
      setError(null);

      try {
        const records =
          await getClubs();

        if (!active) return;

        setClubs(records);
      } catch (runtimeError) {
        if (!active) return;

        console.error(
          "[DPF Club Selector]",
          runtimeError
        );

        setClubs([]);
        setError(
          runtimeError.message ||
            "Unable to load club environments."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadClubs();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050811",
        color: "#fff",
        padding: "60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            color: "#f5c84c",
            fontSize: "10px",
            letterSpacing: ".2em",
            fontWeight: 800,
          }}
        >
          DPF OS
        </span>

        <h1
          style={{
            fontSize: "42px",
            margin: "12px 0",
          }}
        >
          Club Operating System
        </h1>

        <p
          style={{
            color: "#7d8798",
            maxWidth: "700px",
            lineHeight: 1.7,
          }}
        >
          Select a demo club environment to enter the DPF OS Club Workspace.
        </p>

        {loading && (
          <div
            style={{
              marginTop: "40px",
              color: "#7d8798",
              fontSize: "13px",
            }}
          >
            Loading club environments...
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: "40px",
              color: "#ff8f8f",
              fontSize: "13px",
            }}
          >
            Unable to load club environments.
          </div>
        )}

        {!loading &&
          !error &&
          clubs.length === 0 && (
            <div
              style={{
                marginTop: "40px",
                color: "#7d8798",
                fontSize: "13px",
              }}
            >
              No club environments available.
            </div>
          )}

        {!loading &&
          !error &&
          clubs.length > 0 && (
            <div
              style={{
                marginTop: "40px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {clubs.map((club) => (
                <Link
                  key={club.id}
                  to={`/club/${club.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    background:
                      "rgba(255,255,255,.025)",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    borderRadius: "10px",
                    padding: "25px",
                  }}
                >
                  <span
                    style={{
                      color: "#f5c84c",
                      fontSize: "9px",
                      letterSpacing: ".14em",
                    }}
                  >
                    {club.metadata?.code ??
                      club.id}
                  </span>

                  <h2
                    style={{
                      fontSize: "18px",
                      margin: "10px 0",
                    }}
                  >
                    {club.name}
                  </h2>

                  <p
                    style={{
                      color: "#7c8698",
                      fontSize: "12px",
                      lineHeight: 1.6,
                    }}
                  >
                    {club.metadata?.description ??
                      "DPF OS Club Environment"}
                  </p>

                  <div
                    style={{
                      marginTop: "20px",
                      color: "#f5c84c",
                      fontSize: "10px",
                      letterSpacing: ".12em",
                    }}
                  >
                    ENTER CLUB →
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}