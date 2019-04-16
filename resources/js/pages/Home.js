import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';

/**
 * Class Home
 * ==========
 *
 * Represents homepage
 */
class Home extends React.Component {
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
            to={{ pathname: '/m', state: { color: 'blue' } }}
            className="cc-blue"
            onMouseEnter={() => this.colorSet('blue', 'blue')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'yellow' } }}
            className="cc-yellow"
            onMouseEnter={() => this.colorSet('yellow', 'yellow')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'green' } }}
            className="cc-green"
            onMouseEnter={() => this.colorSet('green', 'pistacchio')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'rose' } }}
            className="cc-rose"
            onMouseEnter={() => this.colorSet('rose', 'rose')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'red' } }}
            className="cc-red"
            onMouseEnter={() => this.colorSet('red', 'red')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'cherry' } }}
            className="cc-cherry"
            onMouseEnter={() => this.colorSet('cherry', 'cherry')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'gray' } }}
            className="cc-gray"
            onMouseEnter={() => this.colorSet('gray', 'gray')}
            onMouseLeave={() => this.colorReset()}
          />
          <Link
            to={{ pathname: '/m', state: { color: 'purple' } }}
            className="cc-purple"
            onMouseEnter={() => this.colorSet('purple', 'purple')}
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
