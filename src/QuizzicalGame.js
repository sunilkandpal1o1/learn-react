import { useState, useEffect } from "react";

import "./App.css";
import "./quizzicalStyles.css";

function Quizzical() {
  const [startGame, setStartGame] = useState(false);
  const [category, setCategory] = useState("General Knowledge");
  const [questions, setQuestions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const categories = {
    "General Knowledge": 9,
    "Science & Nature": 17,
    "Science: Computers": 18,
    Geography: 22,
    History: 23,
  };

  const selectCategory = (event) => {
    setCategory(event.target.value);
  };

  const goBack = () => {
    setStartGame(false);
    setQuizSubmitted(false);
    setScore(0);
  };
  const fetchQuiz = () => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${categories[category]}&type=multiple`
    )
      .then((res) => res.json())
      .then((res) => {
        const ques = res.results.map((result) => {
          const allOptions = result.incorrect_answers.concat(
            result.correct_answer
          );

          return {
            ...result,
            options: shuffle(allOptions),
          };
        });
        console.log(ques);
        setQuestions(ques);
      });
  };

  const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const temp = arr[i];
      arr[i] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
    return arr;
  };
  useEffect(() => {
    if (startGame) {
      setCategory(category);
      fetchQuiz();
      console.log("fsf", questions);
    }
  }, [startGame]);

  const selectAnswer = (id, selectedAns) => {
    console.log(id, selectedAns);
    setQuestions((prevQues) =>
      prevQues.map((prevQue, index) => {
        return index == id ? { ...prevQue, selectedAns } : prevQue;
      })
    );
  };

  const setBackground = (id, value) => {
    if (quizSubmitted && questions[id].correct_answer == value) {
      return {
        backgroundColor: "#94D7A2",
      };
    }
    if (questions[id].selectedAns == value) {
      if (
        quizSubmitted &&
        questions[id].selectedAns != questions[id].correct_answer
      ) {
        return {
          backgroundColor: "#F8BCBC",
        };
      } else
        return {
          backgroundColor: "#D6DBF5",
          border: "1px solid #D6DBF5",
        };
    }
  };

  const checkAnswers = () => {
    // setQuestions( prevQues => prevQues.map( prevQue => {
    //   return { ...prevQue, checked: true }
    // }))
    setQuizSubmitted(true);
    setScore(0);
    questions.forEach((question) => {
      if (question.selectedAns == question.correct_answer) {
        setScore((prev) => prev + 1);
      }
    });
  };

  const startNewQuiz = () => {
    setQuizSubmitted(false);
    setScore(0);
    fetchQuiz();
  };

  const questionsElements = questions.map((question, index) => (
    <div key={index} className="ques-section">
      <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
      <div className="ques-options">
        {question.options.map((ans, i) => (
          <div
            key={i}
            className="ques-option"
            style={setBackground(index, ans)}
            onClick={() => selectAnswer(index, ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
          ></div>
        ))}
      </div>
    </div>
  ));
  return (
    // <main>
    <div className="quizzical-container">
      {!startGame ? (
        <div className="quizzical-info">
          <div>
            <h1 className="quizzical-info--heading">Quizzical</h1>
            <h3>A quiz trivia game</h3>
          </div>
          <select className="dropdown" onChange={selectCategory}>
            <option>General Knowledge</option>
            <option>Science & Nature</option>
            <option>Science: Computers</option>
            <option>History</option>
            <option>Geography</option>
          </select>
          <button className="qz-btn" onClick={() => setStartGame(true)}>
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          {questionsElements ? questionsElements : ""}
          <div className="flex-center">
            <div className="back-btn" onClick={goBack}>
              {/* <button>Back</button> */}
            </div>
            {quizSubmitted ? (
              <>
                <p className="result-text">
                  You scored {score} / {questions.length} correct answers
                </p>
                <button className="qz-btn" onClick={() => startNewQuiz()}>
                  Play Again
                </button>
              </>
            ) : (
              <button className="qz-btn" onClick={() => checkAnswers()}>
                Check Answers
              </button>
            )}
          </div>
        </div>
      )}
    </div>
    // </main>
  );
}

export default Quizzical;
