import React, { useState, useEffect } from "react";
import "./styles.css";
const JokesApp = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setJokes((prevJokes) => [...prevJokes, data]);
    } catch (error) {
      console.error("Error fetching jokes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== id));
  };

  return (
    <div className="container">
      <h1 className="heading">Jokes App</h1>
      <button className="button" onClick={fetchJokes} disabled={loading}>
        Get A Joke
      </button>
      {loading && <p className="loading">Loading...</p>}
      {jokes.map((joke) => (
        <div key={joke.id} className="joke-container">
          <p className="joke-text">{joke.joke}</p>
          <button
            className="delete-button"
            onClick={() => handleDelete(joke.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default JokesApp;
