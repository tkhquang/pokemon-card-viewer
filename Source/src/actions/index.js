import axios from 'axios';
import { API } from '../API';

const getData = (payload) => ({
  type: "getData",
  payload
});

const fetchData = (params) => {
  return (dispatch) => {
    dispatch({
      type: "setQueries",
      queries: { ...params }
    });
    dispatch({
      type: "setFetchState",
      isFetching: true
    });
    axios.get(`${API}cards`, {
      params
    }).then(res => {
        dispatch({
          type: "setFetchState",
          isFetching: false
        });
        dispatch(getData(res));
      }).catch((error) => {
        console.error(error);
        alert("Error getting Data, please try again!");
      });
  };
};

export { fetchData };
