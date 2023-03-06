import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
// STATES

  const [colorsArray, setColorsArray] = useState([])
  const [options, setOptions] = useState('https://www.thecolorapi.com/scheme?hex=000000&mode=analogic&count=6')

// FETCHING COLOR

  function getColorOptions(event, color, scheme){
    event.preventDefault()
    setOptions(`https://www.thecolorapi.com/scheme?hex=${color.replace('#', '')}&mode=${scheme}&count=6`)
  }

  useEffect( () => {
    fetch(options)
      .then(res => res.json())
      .then(data => setColorsArray(data.colors.map((colors) => colors.hex.value)))
  },[options])

//GENERATING COLORS HTML

  function getColorsHtml(){
    return colorsArray.map((color) => (
      <div key={nanoid()} >
        <div className='color' onClick={() => copy(color)} style={{background:color}} key={nanoid()}></div>
        <p onClick={() => copy(color)} className='color-label' key={nanoid()} >{color}</p>
      </div>
    ))
  }

//COPYING TO CLIPBOARD
  
  function copy(text){
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("successfully copied");
      })
      .catch(() => {
        alert("something went wrong");
      });
  }

// RENDER

  return (
    <div className='container'>
      <form className='option-form' onSubmit={(event) => getColorOptions(event, color.value, scheme.value)} >
        <input className='color-input' id='color' type='color'/>
        <select className='color-select' id='scheme'> 
          <option className='option' value="monochrome">Monochrome</option>
          <option className='option' value="monochrome-dark">Monochrome-dark</option>
          <option className='option' value="monochrome-light">Monochrome-light</option>
          <option className='option' value="analogic">Analogic</option>
          <option className='option' value="complement">Complement</option>
          <option className='option' value="analogic-complement">Analogic-complement</option>
          <option className='option' value="triad">Triad</option>
          <option className='option' value="quad">Quad</option>
        </select>
        <button className='btn'>Get Color Scheme</button>
      </form>
      <div className='colors-container'>
        {getColorsHtml()}
      </div>
    </div>
  )
}

export default App