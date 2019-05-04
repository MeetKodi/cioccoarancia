import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Class Home
 * ==========
 *
 * Represents homepage
 */
class Home extends Component {
  /**
   * class constructor
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      color: null,
      name: null
    };

    this.colorSet = this.colorSet.bind(this);
    this.colorReset = this.colorReset.bind(this);
  }

  /**
   * Sets color to store
   *
   * @param color
   * @param name
   */
  colorSet(color, name) {
    this.setState({ color, name });
  }

  /**
   * Unsets color
   */
  colorReset() {
    this.setState({ color: null, name: null });
  }

  /**
   * @inheritDoc
   * @returns {*}
   */
  render() {
    return (
      <div className="page-home">
        <div className="logo" />
        <div className="colors-container">
          <Link
            to={{ pathname: '/m', state: { color: 'red' } }}
            className="cc-red"
            onMouseEnter={() => this.colorSet('red', 'pepe rosa')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'orange' } }}
            className="cc-orange"
            onMouseEnter={() => this.colorSet('orange', 'anamardo')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'violette' } }}
            className="cc-violette"
            onMouseEnter={() => this.colorSet('violette', 'mirtillo')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'brown' } }}
            className="cc-brown"
            onMouseEnter={() => this.colorSet('brown', 'cioccolato')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'rose' } }}
            className="cc-rose"
            onMouseEnter={() => this.colorSet('rose', 'mandarino')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'yellow' } }}
            className="cc-yellow"
            onMouseEnter={() => this.colorSet('yellow', 'limone')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'gray' } }}
            className="cc-gray"
            onMouseEnter={() => this.colorSet('gray', 'liquirizia')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'green' } }}
            className="cc-green"
            onMouseEnter={() => this.colorSet('green', 'pistacchio')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'white' } }}
            className="cc-white"
            onMouseEnter={() => this.colorSet('white', 'non so scegliere')}
            onMouseLeave={() => this.colorReset()}
          />
        </div>
        <div className="colors-text">
          <span className={`ct-${this.state.color}`}>{this.state.name}</span>
        </div>
      </div>
    );
  }
}

export default Home;
