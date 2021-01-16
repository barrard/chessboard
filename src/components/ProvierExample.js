import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
  theme: 'light'

});




export default function ProviderExample() {


  
  return (

      <Parent />

  );
}

function Parent() {
  return (
    <>
      <h4>Parent Component</h4>
      <Child/>
    </>
  );
}

function Child() {
  return (
    <>
      <h4>Child Component</h4>
      <GrandChild />
    </>
  );
}





function GrandChild() {
  const context = useContext(ThemeContext)
  console.log(context)

  const handleClick = () => {
    // context.updateContext('dark')
    console.log('Click')
  }

  return (
    <>

      <h4>GrandChild Component</h4>
      <button onClick={handleClick} >Click</button>
      {context.theme}
    </>
  );
}
