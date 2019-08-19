import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';

const initialState = {
  isFetching: false,
  data: [],
  totalPages: 0,
  currentPage: 1,
  pageSize: 20
};

export const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk));
