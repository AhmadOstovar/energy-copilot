import { useState } from "react";
import "./App.css";
import BotAnswer from "./BotAnswer";
import logo from "./assets/afry_logo_explainer.png"
//import logo from "./assets/Volvo-Iron-Mark-Black.png"

function App() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [botAnswer, setBotAnswer] = useState<IBotAnswer>({ answer: "", refs: [] });

  const baseUrl = import.meta.env.PROD ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_LOCAL_URL;

  const fetchData = async () => {
    setIsLoading(true);
    const rawResponse = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchWord }),
    });
    const content = await rawResponse.json();

    setBotAnswer(content);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <img src={logo} alt="Logo" width="35%" style={{ marginBottom: "6rem", minWidth: 200 }} />
      <h2>Hi, I am the AFRY X bot. How can I help you?</h2>
      <p style={{ fontSize: 16 }}>Ask a question below and you will receive an answer with references.</p>
      <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "center", gap: 8 }}>
        <input
          style={{
            width: "70%",
            color: "black",
            fontSize: 16,
            paddingLeft: 8,
            backgroundColor: "rgba(238, 235, 235)",
            border: 1,
            borderStyle: "solid",
            borderRadius: 8,
          }}
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
        />
        <button
          style={{ color: searchWord.length === 0 ? "grey" : "black", backgroundColor: "rgba(238, 235, 235)" }}
          disabled={searchWord.length === 0}
          onClick={() => fetchData()}
        >
          Send!
        </button>
      </div>
      {isLoading ? <p>Processing your query...</p> : <BotAnswer answer={botAnswer} />}
    </div>
  );
}

export default App;
