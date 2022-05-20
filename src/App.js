import { React, useState } from 'react'
import './App.css'
import Main from './components/Main/Main';
import Navbar from './components/Navbar/Navbar';



function App() {

  const [input, setInput] = useState("")
  const [Finalinput, setFinalInput] = useState("")

  function handleChange(e) {
    setInput(e.target.value)
  }
  function handleClick() {
    setFinalInput(input)
  }


  return (
    <>
      <Navbar
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <Main search={Finalinput} />
    </>
  );
}

export default App;
