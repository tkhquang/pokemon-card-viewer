import React from 'react';
import { connect } from 'react-redux';
import './CardListContainer.css';
import Card from '../components/Card';
import Loading from '../components/Loading';
import notfoundimg from '../images/unhappy.png';

const CardListContainer = (props) => {
    const [
      data,
      fetch
    ] = [
      props.data,
      props.isFetching
    ];
    const JSX =(
      <ul className="CardListContainer">
        {
          fetch && <li><Loading /></li>
        }
        {
          data.length === 0 && !fetch && (
            <li className="not-found">
              <img src={notfoundimg} alt="No Results" />
            </li>
          )
        }
        {data.length > 0 && !fetch && data.map((card) => (
          <Card
            key={card.id}
            card={card}
          />
        ))}
      </ul>
    );
    return JSX;
};

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  data: state.data,
});

export default connect(
  mapStateToProps,
  null
)(CardListContainer);
