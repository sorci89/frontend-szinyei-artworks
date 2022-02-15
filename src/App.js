import './App.css';
import { useState, useEffect } from 'react';

const axios = require('axios');

function App() {
  const [data, setData] = useState('');
  const [dataList, setDataList] = useState([]);
  const [department, setDepartment] = useState([]);

  const getDatas = async () => {
    const response = await axios.get(
      'https://collectionapi.metmuseum.org/public/collection/v1/objects/?objectID=437133'
    );
    setDataList(response.data);
    console.log('data', dataList);
  };
  const getDepartment = async () => {
    const response = await axios.get(
      'https://collectionapi.metmuseum.org/public/collection/v1/departments'
    );
    setDepartment(response.data);
    console.log(department);
  };

  useEffect(() => {
    getDatas();
    getDepartment();
  }, []);

  return <div>HELLO MET</div>;
}

export default App;
