import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import './Buttons.css';
import { fetchData } from '../actions';

const Buttons = (props) => {
  const handlePageClick = data => {
    const selected = data.selected;
    props.fetchData({
      ...props.queries,
      pageSize: props.pageSize,
      page: selected + 1
    });
  };
  return (
    <div className="Buttons">
      {
        props.totalPages > 1 && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={props.totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            {...props.currentPage === 1 && { forcePage: 0 }}
          />
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  pageSize: state.pageSize,
  totalPages: state.totalPages,
  currentPage: state.currentPage,
  queries: state.queries,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (params) => dispatch(fetchData(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buttons);
