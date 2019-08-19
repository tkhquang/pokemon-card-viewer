import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';
import axios from 'axios';
import { API } from '../API';
import './SearchBar.css';

class SearchBar extends Component {
  constructor (props) {
    super (props);
    this.state = {
      name: "",
      sets: [{name: ""}],
      set: "",
      rarities: ["Common", "Uncommon", "Rare", "Rare Holo"],
      rarity: "",
      types: [""],
      type: "",
      subtypes: [""],
      subtype: "",
      supertypes: [""],
      supertype: "",
      isLoaded: false
    };
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSearch = (e) => {
    e.preventDefault();
    const { fetchData, pageSize } = this.props;
    const queries = [
      "name", "set", "rarity", "type", "subtype", "supertype"
    ];
    const params = {}
    queries.forEach((query) => {
      if (this.state[query].length > 0) {
        // Add extra's' for types
        params[query + (query === "type" ? "s" : "")] = this.state[query];
      }
    });
    fetchData({
      ...params,
      pageSize,
      page: 1
    });
  }
  componentDidMount () {
    const fetchList = [
      `${API}sets`,
      `${API}types`,
      `${API}subtypes`,
      `${API}supertypes`
    ];
    Promise.all(fetchList.map(async (url) => {
      const res = await axios.get(url);
      return res.data;
    }))
      .then(results => {
        results.forEach((result) => {
          this.setState({
            ...result
          });
        });
        this.setState({
          isLoaded: true
        })
      })
      .catch((error) => {
        console.error(error);
        alert("Error getting Data, please try reloading!");
      });
  }
  render () {
    const {
      sets,
      types,
      subtypes,
      supertypes,
      rarities,
      name,
      isLoaded
    } = this.state;
    const entries = {
      rarity: rarities,
      type: types,
      subtype: subtypes,
      supertype: supertypes
    };
    const mapItems = (array) => array.map((item) => {
      return (
        <option
          value={item}
          key={item.replace(/\s+/g,"")}
        >
          {item}
        </option>
      );
    });
    const searchEntries = Object.entries(entries).map(([sing, plu]) => {
      const label = sing.charAt(0).toUpperCase() + sing.slice(1)
      return (
        <Fragment key={sing}>
          <label htmlFor={sing}>{label}: </label>
          <select
            id={sing}
            name={sing}
            onChange={this.handleInputChange}
          >
            <option value="">
              All
            </option>
            {plu.length > 1 && mapItems(plu)}
          </select>
        </Fragment>
      );
    });
    return (
      <div className="SearchBar">
        <form action="" onSubmit={this.handleSearch}>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Card Name..."
          />
          <label htmlFor="set">Set: </label>
          <input
            id="set"
            name="set"
            list="sets"
            onChange={this.handleInputChange}
            placeholder="From Card Set..."
          />
          <datalist id="sets" name="sets">
            {
              sets.map(item => (
                <option
                  value={item.name}
                  key={item.name.replace(/\s/g,"")}
                >
                  {item.name}
                </option>
              ))
            }
          </datalist>
          {searchEntries}
          <input
            type="submit"
            value={!isLoaded && !this.props.isFetching ? "LOADING..." : "SEARCH"}
            disabled={
              isLoaded && !this.props.isFetching ? false : true
            }
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  pageSize: state.pageSize
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (params) => dispatch(fetchData(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
