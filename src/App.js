import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import Header from "./components/Header";
import OptionSelection from "./components/OptionSelection";
import InputBundle from "./components/InputBundle";
import { optionArray } from "./Data/OptionData";
import Answer from "./components/Answer";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [option, setOption] = useState({});
  const [input, setInput] = useState("");
  const [answer, setanswer] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_Open_AI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  function selectOption(option) {
    setOption(option);
  }

  async function onButtonClick() {
    let obj;
    if (input.trim() === "") {
      obj = { ...option, prompt: "I'm sorry!! You did'nt ask anything." };
    } else {
      obj = { ...option, prompt: input };
    }

    try {
      setLoading(true);
      // console.log(obj);
      const response = await openai.createCompletion(obj);
      setanswer(response.data.choices[0].text);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        setanswer("An error occurred due to invalid api key.");
      } else if (error.response.status === 429) {
        setanswer(
          "You exceeded your current quota, please check your plan and billing details."
        );
      } else {
        setanswer("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  }

  console.log("azarul code has been changed");

  return (
    <>
      <div className="top">
        <Header />
        {Object.values(option).length === 0 ? (
          <OptionSelection
            optionArray={optionArray}
            selectOption={selectOption}
          />
        ) : (
          <>
            <InputBundle
              onButtonClick={onButtonClick}
              setInput={setInput}
              isLoading={loading}
            />
            {answer.length !== 0 ? (
              <>
                <Answer showAnswere={answer} />
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export default App;
