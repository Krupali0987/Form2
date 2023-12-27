import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [records, setRecords] = useState([])


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        console.log(res.data);
        setRecords(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])


  return (
    <div className="App">
      <h1>React API</h1>
      {
        records?.map((item) => {
          return (
            <div style={{ display: 'flex', gap: "20px" }}>
              <h1>{item?.id}</h1>
              <h1>{item?.name}</h1>
              <h1>{item?.address.city}</h1>
              <h1>{item?.address.geo.lat}</h1>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
