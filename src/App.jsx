import { useState } from 'react';
 
import t from "./assets/thalaV.mp4";
import m from "./assets/moyeV.mp4";

function App() {
  const [search, setSearch] = useState('');
  const [thala, setThala] = useState(null);
  const[whatt,setw]=useState("")
  function evaluateString(input) {
    const numbers = input.split('').map(Number);
  
    function evaluate(index, currentResult, expression) {
      if (index === numbers.length) {
        if (currentResult === 7) {
          setw(expression)
          console.log(expression);  // Log the expression when the result is 7
          return true;
        }
        return false;
      }
  
      const currentNumber = numbers[index];
  
      if (evaluate(index + 1, currentResult + currentNumber, `${expression}+${currentNumber}`)) return true;
      if (evaluate(index + 1, currentResult - currentNumber, `${expression}-${currentNumber}`)) return true;
      if (evaluate(index + 1, currentResult * currentNumber, `${expression}*${currentNumber}`)) return true;
      if (currentNumber !== 0 && currentResult % currentNumber === 0 && evaluate(index + 1, currentResult / currentNumber, `${expression}/${currentNumber}`)) return true;
  
      return false;
    }
  
    if (evaluate(1, numbers[0], `${numbers[0]}`)) {
      setThala(true);
    } else {
      setThala(false);
    }
  }
  
  function checkThala() {
    if (search.length === 7) {
      setw(search.split('').join(' '))
      setThala(true);
    } else if (search) {
      evaluateString(search);
    }
  }


  return (
    <div className="main">
      <div className="card">
        <h2>Check Thala For A Reason</h2>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={checkThala}>Submit</button>
      </div>
      {thala === true && 
        <div>
          <h3>Thala for you</h3>
          <h4>{whatt}=7</h4>
          <video autoPlay loop controls><source src={t} type="video/mp4" /></video>
        </div>}
      {thala === false && 
      <div>
        <h3>No Thala for you</h3>
        <video autoPlay loop controls><source src={m} type="video/mp4" /></video>
      </div>}
    </div>
  );
}

export default App;
