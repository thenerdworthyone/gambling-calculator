import { useState } from "react";
import "./App.css";


function App() {
  // useState<number>(int) where int is the placeholder when the user first open the website/localfile
  const [reels, setReels] = useState<number>(3);
  const [symbols, setSymbols] = useState<number>(20);
  const [probs, setProbs] = useState<number | null>(null);
  const [specific, setSpecific] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");

  const calculateProbs = (): void => {
    if (symbols <= 0 || reels <= 0) return;

    let prob: number;

    if (!specific) {
      // ANY matching symbol (etc any triple symbols)
      prob = 1 / Math.pow(symbols, reels - 1);
      setMode("any");
    } else {
      // IF looking for specific symbol 
      prob = Math.pow(1 / symbols, reels);
      setMode("specific");
    }

    setProbs(prob);
  };

  return (
    <div className="App">
      <h1>🎰 Slot Machine Probability Calculator 🎰</h1>
      <h2>Let's go gambling!</h2>

      <div className="inputs">
        <label>Reels:</label>
        <input
          type="number"
          value={reels}
          min={1}
          onChange={(e) => setReels(Number(e.target.value))}
        />
      </div>

      <div className="inputs">
        <label>Symbols per Reel:</label>
        <input
          type="number"
          value={symbols}
          min={1}
          onChange={(e) => setSymbols(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>
          <input
            type="checkbox"
            checked={specific}
            onChange={(e) => setSpecific(e.target.checked)}
          />{" "}
          Looking for a specific Symbol to show up?
        </label>
      </div>

      <button onClick={calculateProbs}>Calculate now!</button>
   

      {probs !== null && (
        <p>
          {mode === "specific"
            ? `Chance of hitting your desired symbol`
            : `Chance of hitting ANY ${reels} matching symbols`}
          :{" "}
          <strong>
            1 in {Math.round(1 / probs).toLocaleString()}
          </strong>{" "}
          ({(probs * 100).toFixed(6)}%)
          {1 / probs > 10000 && (
            <span
              style={{
                display: "block",
                color: "red",
                fontSize: "0.9em",
                marginTop: "4px",
              }}
            >
              At this point, just quit. Its nearly impossible to win. The house ALWAYS wins.
            </span>
          )}
        </p>
)}

      <p className="disclaimer">Don't gamble, kids.</p>
    </div>
  );
}

export default App;