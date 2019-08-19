const reducers = (state, action) => {
  switch (action.type) {
    case "setFetchState":
      return {
        ...state,
        isFetching: action.isFetching
      }
    case "setQueries":
      return {
        ...state,
        queries: { ...action.queries }
      };
    case "getData":
      const { payload } = action
      return {
        ...state,
        data: [...payload.data.cards],
        totalPages: Math.ceil(payload.headers["total-count"] / state.pageSize),
        currentPage: payload.config.params.page,
      };
    default:
      return state;
  }
};

export default reducers;
