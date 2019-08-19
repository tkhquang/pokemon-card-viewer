import React, { Component } from 'react';
import './Card.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Card extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isOpen: false,
    }
  }
  openModal = () => {
    this.setState({
      isOpen : true
    });
  }
  closeModal = () => {
    this.setState({
      isOpen : false
    });
  }
  render () {
    return (
      <li className="Card">
        <img
          className="imgUrl"
          src={this.props.card.imageUrl}
          onClick={this.openModal}
          alt={this.props.card.name}
          title="Click to View"
        />
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.props.card.imageUrlHiRes}
            onCloseRequest={this.closeModal}
          />
        )}
      </li>
    );
  }

}

export default Card;
