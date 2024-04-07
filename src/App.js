import './App.css';
import React , {useState,useEffect} from  'react';//the useState is the constructor.
import Axios from 'axios';

function App() {
  const[counter,setCounter]= useState(0); //give a name to the variable and a set , that is a component that let me change the value of the variable
  const[department, setDepartments]=useState([]);
  const[selectedDepartment, setSelectedDepartment]=useState('');
  useEffect(()=>{
    const obtainDepartments = async () =>{
      const response = await Axios({
        url: `http://localhost:1337/api/listdepartment`
      });
      const listDeparments = Object.keys(response.data).map(i => response.data[i]);
      console.log(listDeparments);
      setDepartments(listDeparments.flat());
    }

    obtainDepartments();
    
  },[]);
  function handleClick(){
    setCounter(counter+1);
  }
  function handleDecrease(){
    setCounter(counter-1);
  }
  return (
    <div>
      <label>Counter {counter}</label>
      <div>
      <button onClick={handleClick}>Increase Counter</button>
      </div>
     <div>
      <button onClick={handleDecrease}>Decrease Counter</button>
    </div>
    </div>
  );
}

export default App;
