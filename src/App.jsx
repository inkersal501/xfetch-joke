import { useState } from "react";
import "./App.css";

export default function App() {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    setJoke(null);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();
      setJoke(data);
    } catch {
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 data-testid="heading">Random Joke</h1>

        <p className="subtitle">
          Click the button to fetch a fresh one.
        </p>

        <button
          data-testid="fetch-button"
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        {error && (
          <>
            <p data-testid="error" className="error">
              {error}
            </p>
            <button
              data-testid="retry-button"
              className="retry"
              onClick={fetchJoke}
            >
              Try again
            </button>
          </>
        )}

        {joke && (
          <div data-testid="joke" className="joke-box">
            <p className="setup">{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </div>
        )}
      </div>
    </div>
  );
}
