// client/src/pages/Error.jsx
import { useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Error() {
  const error = useRouteError();
  console.error("Route Error Details:", error);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Oops! Something went wrong.</h1>
        <p>We're sorry, an unexpected error has occurred.</p>

        {import.meta.env.DEV && (
          <details
            style={{
              whiteSpace: "pre-wrap",
              textAlign: "left",
              margin: "20px auto",
              maxWidth: "600px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <summary>Error Details (for developers)</summary>
            <code>
              Status: {error?.status ?? "N/A"}
              <br />
              Status Text: {error?.statusText ?? "N/A"}
              <br />
              Message: {error?.message ?? "N/A"}
              <br />
              {error?.data && `Data: ${JSON.stringify(error.data, null, 2)}`}
            </code>
          </details>
        )}
      </main>
    </>
  );
}
