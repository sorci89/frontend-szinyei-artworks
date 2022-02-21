import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Imagebox from '../components/Imagebox';
import ReactPaginate from 'react-paginate';

const queryUrl = 'https://api.harvardartmuseums.org/';
const querySort = '&sort=totalpageviews&sortorder=desc';
const queryApyKey = `&apikey=a8d819ad-b52c-4acb-97b5-88541077022b`;

const classifications = [
  { name: 'ALL', value: '' },
  { name: 'Coins', value: '50' },
  { name: 'Drawings', value: '21' },
  { name: 'Photographs', value: '17' },
  { name: 'Paintings', value: '26' },
  { name: 'Sculpture', value: '30' },
  { name: 'Vessels', value: '57' },
  { name: 'Textile Arts', value: '62' },
  { name: 'Tools and Equipment', value: '32' },
];

const Browser = () => {
  const [dataList, setDataList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [savedList, setSavedList] = useState([]);

  const [searchKeyword, updateSearchKeword] = useState('');
  const [searchClassification, updateSearchClassification] = useState('');
  const [hasimage, setHasimage] = useState('');

  const toggleSetimage = () => {
    if (hasimage === '') {
      setHasimage('&hasimage=1');
    } else {
      setHasimage('');
    }
  };

  const getQuery = () => {
    let queryPage = `object?size=${limit}&page=${page}`;
    let queryClassification = `&classification=${searchClassification}`;
    let queryKeyWord = `&keyword=${searchKeyword}`;
    let queryHasImage = `${hasimage}`;
    return (
      queryUrl +
      queryPage +
      queryClassification +
      queryKeyWord +
      queryHasImage +
      querySort +
      queryApyKey
    );
  };

  const renderData = async () => {
    const query = getQuery();
    const resp = await axios.get(query);
    console.log(resp.data.records);
    setDataList(resp.data.records);
    const total = resp.data.info.totalrecords;
    setPageCount(Math.ceil(total / limit));
  };

  const getSavedImages = async () => {
    let authUsername = localStorage.getItem('user');
    let authPassword = localStorage.getItem('pw');
    console.log('render!render!');
    try {
      const response = await axios.post(
        'http://localhost:3101/api/user/galery',
        {},
        {
          headers: {
            Authorization: authUsername + '&&&' + authPassword,
          },
        }
      );
      setSavedList(response.data);
    } catch (e) {
      console.log('not logged in');
    }
  };

  useEffect(() => {
    renderData();
  }, [page, searchKeyword, searchClassification, hasimage, limit, savedList]);

  useEffect(() => {
    getSavedImages();
  }, []);

  return (
    <div>
      <Navbar />

      <div
        className='page-content'
        style={{
          backgroundImage: `url("/pictures/bg-paper-texture.jpg")`,
        }}
      >
        <div className='search-bar'>
          <input
            type='text'
            value={searchKeyword}
            placeholder='kewords'
            onChange={(e) => {
              updateSearchKeword(e.target.value);
              setPage(1);
            }}
          ></input>
          <select
            value={searchClassification}
            onChange={(e) => {
              updateSearchClassification(e.target.value);
              setPage(1);
            }}
          >
            {classifications.map((type) => (
              <option
                key={Math.floor(Math.random() * 10000)}
                value={type.value}
              >
                {type.name}
              </option>
            ))}
          </select>
          <label>
            <input type='checkbox' onChange={toggleSetimage} />
            with image only
          </label>
        </div>
        {dataList.map((data) => (
          <Imagebox
            data={data}
            savedList={savedList}
            page={''}
            key={Math.floor(Math.random() * 10000)}
          />
        ))}
      </div>
      {/* <AppPagination setPage={setPage} page={numberOfPages} /> */}
      <div className='page-select-container'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={(data) => setPage(data.selected + 1)}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
        <select
          name='page-select'
          id='page-select'
          onChange={(event) => setLimit(event.target.value)}
        >
          <option value='10'>10 / page</option>
          <option value='20'>20 / page</option>
          <option value='50'>50 / page</option>
          <option value='100'>100 / page</option>
        </select>
      </div>
      <div></div>
    </div>
  );
};

export default Browser;
