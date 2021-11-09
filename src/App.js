import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import './App.css';


function App() {
  const [state, setState] = useState({
    date: new Date(),
    optionSelected: 0,
  });

  const browserLocale =
    navigator.languages === undefined
    ? navigator.language
    : navigator.languages[0];

  const options = [
    {
      codeLetter: "d",
      label: "Date only",
      example: state.date.toLocaleString(browserLocale, {day: 'numeric', month: 'numeric', year: 'numeric'}),
    },
    {
      codeLetter: "f",
      label: "Date and time",
      example: state.date.toLocaleString(browserLocale, {hourCyle: 12, day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'}),
    },
    {
      codeLetter: "t",
      label: "Time only",
      example: state.date.toLocaleString(browserLocale, {hourCyle: 12, hour: 'numeric', minute: '2-digit'}),
    },
    {
      codeLetter: "D",
      label: "Month name",
      example: state.date.toLocaleString(browserLocale, {day: 'numeric', month: 'long', year: 'numeric'}),
    },
    {
      codeLetter: "F",
      label: "Weekday and Month name",
      example: state.date.toLocaleString(browserLocale, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}),
    },
    {
      codeLetter: "R",
      label: "Relative time",
      example: "35 minutes ago",
    },
    {
      codeLetter: "T",
      label: "Time with seconds",
      example: state.date.toLocaleString(browserLocale, {hourCyle: 12, hour: 'numeric', minute: '2-digit', second: '2-digit'}),
    },

  ];

  const discordTimeCode = "<t: " + state.date.getTime() + ":" + options[state.optionSelected].codeLetter + ">";

  const copyTimeCode = () => {
    navigator.clipboard.writeText(discordTimeCode);
  };

  const radio = options.map((option, index) => {
    const isSelected = index === state.optionSelected;
    const onNewSelection = () => { setState({...state, optionSelected: index}) }

    return (
      <li
        key={index}
        onClick={onNewSelection}
      >
        <label>
          <input
            type="radio"
            name={"date-format"}
            checked={isSelected}
            onChange={onNewSelection}
          >
          </input>
          {option.label + ": "} <b>{option.example}</b>
        </label>
      </li>
    )
  });

  return (
    <div className="App">
      <h1>
        Discord Time Codes
      </h1>
      <main>
        <p>
          This is a simple tool to help you schedule things with your
          discord pals in different time zones. These will show the specified
          time converted to everyone's timezone.
        </p>
        <DateTimePicker
          onChange={(value) => setState({...state, date: value})}
          value={state.date}
          disableClock={true}
        />
        <div>
          <ul className="radioList">
            {radio}
          </ul>
        </div>
        <div>
          <h2>Discord Code</h2>
          <p>Copy and paste this into discord</p>
          <p>{discordTimeCode}</p>
          <button onClick={copyTimeCode}>Copy</button>
        </div>
      </main>
    </div>
  );
}

export default App;
