import react, { useState, useEffect, useMemo } from "react";

let flag;
let arr = [];
for (let x = 0; x < 3000; x++) {
  arr.push(x);
}
export default function HooksLifeCycle() {
  const [val, setVal] = useState(20);
  const [text, setText] = useState("null");

  useEffect(() => {
    if (!flag) {
      console.log("setting flag");
      flag = setVal;
    } else {
      console.log("Already have flag");
      console.log(flag === setVal);
    }
  });

  let buttons = 
  useMemo(
    () =>
      arr.map((i) => {
        console.log(Butt);
        console.log(Butt({ setVal: { setVal }, val: { i } }));
        return <Butt setVal={setVal} val={i} />;
      })
      ,
    [arr]
  );

  return (
    <div>
      <h2>Hooks LifeCycle</h2>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <p>{val}</p>
      {buttons}
    </div>
  );
}

function Butt({ val, setVal }) {
  // console.log(val)
  return <button onClick={() => setVal(val)}>Click {val}</button>;
}
