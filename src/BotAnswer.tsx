import React from "react";
import styles from "./BotAnswer.module.css";

interface IAnswer {
  answer: IBotAnswer;
}

const BotAnswer: React.FC<IAnswer> = ({ answer }) => {
  return <div className={styles.container}>
    <p>{answer.answer}</p>

    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>

      {answer.refs.map((url, i) => {
        return <a style={{ textAlign: "left", marginBlock: 2 }} href={url} key={url + i} target="_blank" rel="noreferrer">{url}</a>;
      })
      }
    </div>
  </div>;
};

export default BotAnswer;
