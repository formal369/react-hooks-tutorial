import { useContext, useEffect, useMemo, useReducer, useRef, useState, useCallback } from 'react'
import './App.css'
import ShinCodeContext from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './useLocalStorage';

const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

function App() {
  const [count, setCount] = useState(0);
  const shincodeInfo = useContext(ShinCodeContext);
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = () => {
    setCount(count + 1);
  }
  
  useEffect(() => {
    console.log("Hello hooks")
  },[count]);

  const handleRef = () => [
    console.log(ref.current.value)
  ]

  // useMemo
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   let i = 0;
  //   while(i < 2000000000) {
  //     i++;
  //   }
  //   return count02 * count02;
  // }
  
  const square = useMemo(() => {
    let i = 0;
    while(i < 2000000000) {
      i++;
    }
    return count02 * count02;
  },[count02]);

  // useCallback
  const [counter, setCounter] = useState(0);

  // const showCount = () => {
  //   alert("이것은 무거운 처리입니다.")
  // }

  const showCount = useCallback(() => {
    alert("이것은 무거운 처리입니다.")
  }, [counter]);

  // Custom Hook
  const [age, setAge] = useLocalStorage("age", 24);


  return (
    <div className="App">
      <h1>UseState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>UseRef</button>

      <hr />
      <h1>useReducer</h1>
      <p>COUNT : {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>

      <hr />
      <h1>useMemo</h1>
      <div>COUNT1 : {count01}</div>
      <div>COUNT2 : {count02}</div>
      <div>RESULT : {square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 1)}>+</button>
    
      <hr />
      <h1>useCallBack</h1>
      <SomeChild showCount={showCount} />

      <hr />
      <h1>Custom Hook</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>setting Age</button>
    </div>
  )
}

export default App
