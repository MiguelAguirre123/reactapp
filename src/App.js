import './App.css';
import React , {useState,useEffect} from  'react';//the useState is the constructor.
import Axios from 'axios';

function App() {
  const [restaurantData, setRestaurantData] = useState({
    restaurantName: '',
    restaurantNit: '',
    restaurantAddress: '',
    restaurantPhone: '',
    cityId: 0
  });
  //const[counter,setCounter]= useState(0); //give a name to the variable and a set , that is a component that let me change the value of the variable
  const[departments, setDepartments]=useState([]);
  const[departmentSelected, setDepartmentSelected]=useState('');
  const[cities, setCities]=useState([]);
  const[citySelected, setCitySelected]=useState('');

  useEffect(()=>{

    const obtainDepartments = async () =>{
      const response = await Axios({
        url: `http://localhost:1337/api/listdepartment`
      });
      const listDeparments = Object.keys(response.data).map(i => response.data[i]);
      setDepartments(listDeparments.flat());
    }

    const obtainCities = async (deparmentId) =>{
      const response = await Axios({
        url: `http://localhost:1337/api/listcity/${deparmentId}`
      });
      const listCities = Object.keys(response.data).map(i => response.data[i]);
      setCities(listCities.flat());
    }

    obtainDepartments();

    if(departmentSelected !== "")
      obtainCities(departmentSelected);
    
  },[departmentSelected]);
  /*
  function handleClick(){
    setCounter(counter+1);
  }
  function handleDecrease(){
    setCounter(counter-1);
  }
  */
  function handleDepartmentSelected(event){
    setDepartmentSelected(event.target.value);
  }
  function handleCitySelected(event){
    setCitySelected(event.target.value);
    setRestaurantData({
      ...restaurantData,
      cityId : event.target.value
    });
  }
  function handleChange(event){
    //console.log(event.target) //solo es para ver como funciona
    const { name, value} = event.target;
    //console.log( name + ": " + value); //solo es para ver como funciona
    setRestaurantData({
      ...restaurantData,
      [name]: value
    });
  }
  const handleSubmit = async(event) => {
    try{
      const response = await Axios.post('http://localhost:1337/api/createrestaurant', restaurantData);
    }
    catch (error){
      console.log(error);
    }
  } 
  return (
    <div>
      <h2>Formulario Restaurante</h2>
      {/*
      <label>Counter {counter}</label>
      <div>
        <button onClick={handleClick}>Increase Counter</button>
      </div>
      <div>
        <button onClick={handleDecrease}>Decrease Counter</button>
      </div>
      */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del restaurante: </label>
          <input type='text' id="restaurantName" name="restaurantName" value={restaurantData.restaurantName} onChange={handleChange}></input>
        </div>
        <div>
          <label>NIT del restaurante: </label>
          <input type='text' id="restaurantNit" name="restaurantNit" value={restaurantData.restaurantNit} onChange={handleChange}></input>
        </div>
        <div>
          <select id="opcionesDepartamentos" value={departmentSelected} onChange={handleDepartmentSelected}>
            <option value="">Seleccione un Departamento</option>
            {departments.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
            }
          </select>
        </div>
        <div>
          <select id="opcionesCiudades" value={citySelected} onChange={handleCitySelected}>
            <option value="">Seleccione una Ciudad</option>
            {cities.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
            }
          </select>
        </div>
        <div>
          <label>Direccion del restaurante: </label>
          <input type='text' id="restaurantAddress" name="restaurantAddress" value={restaurantData.restaurantAddress} onChange={handleChange}></input>
        </div>
        <div>
          <label>Telefono del restaurante: </label>
          <input type='text' id="restaurantPhone" name="restaurantPhone" value={restaurantData.restaurantPhone} onChange={handleChange}></input>
        </div>
        <div>
          <button type='submit'> Guardar </button>
        </div>
      </form>
    </div>
  );
}

export default App;
