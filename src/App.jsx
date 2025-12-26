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
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Random Joke</h2>

        <p className="subtitle">
          Click the button to fetch a fresh joke
        </p>

        <button onClick={fetchJoke} disabled={loading}>
          {loading ? "Loading..." : "Fetch Joke"}
        </button>

        {error && <p className="error">{error}</p>}

        {joke && (
          <div className="joke-box">
            <p className="setup">{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </div>
        )}
      </div>
    </div>
  );
}
