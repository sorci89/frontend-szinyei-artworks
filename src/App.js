import './App.css';
import { useState, useEffect } from 'react';

const axios = require('axios');

function App() {
  const [data, setData] = useState('');
  const [dataList, setDataList] = useState([]);
  const [department, setDepartment] = useState([]);
  const [search, setSearch] = useState([]);

  const getDatas = async () => {
    const response = await axios.get(
      'https://api.harvardartmuseums.org/image?apikey=a3ea6ad7-34cb-4507-a771-21efbcd15181&q=name:18th century BCE'
    );
    setDataList(response.data);
    console.log('data', dataList);
  };
  // const getDepartment = async () => {
  //   const response = await axios.get(
  //     'https://collectionapi.metmuseum.org/public/collection/v1/departments'
  //   );
  //   setDepartment(response.data);
  //   console.log(department);
  // };

  const getSearch = async () => {
    const response = await axios.get();
    setSearch(response.data);
    console.log(search);
  };

  useEffect(() => {
    getDatas();
    console.log(dataList);
    // getDepartment();
    // getSearch();
  }, []);

  return <div>HELLO MET</div>;
}

export default App;
