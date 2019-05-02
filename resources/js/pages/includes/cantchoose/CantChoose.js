import React, { Fragment, Component } from 'react';
import Main from './Main';
import Aperi from './Aperi';
import Slurp from './Slurp';
import Scegli from './Scegli';
import Anamardo from './Anamardo';

class CantChoose extends Component {
  constructor(props) {
    super(props);

    this.totalPages = 5;

    this.state = {
      page: 1
    };

    this.setPage = this.setPage.bind(this);
  }

  setPage(page, e = null) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ page });
  }

  render() {
    const state = this.state;
    const totalPages = this.totalPages;

    return (
      <div className="ci-body-cc">
        {state.page !== 1 && <div className="ci-cc-page-up" onClick={() => this.setPage(state.page - 1)} />}
        <div className={'ci-cc' + (state.page === 1 ? ' active' : '')}>
          <Main changePage={this.setPage} />
        </div>
        <div className={'ci-cc' + (state.page === 2 ? ' active' : '')}>
          <Aperi changePage={this.setPage} />
        </div>
        <div className={'ci-cc' + (state.page === 3 ? ' active' : '')}>
          <Slurp changePage={this.setPage} />
        </div>
        <div className={'ci-cc' + (state.page === 4 ? ' active' : '')}>
          <Scegli changePage={this.setPage} />
        </div>
        <div className={'ci-cc' + (state.page === 5 ? ' active' : '')}>
          <Anamardo changePage={this.setPage} />
        </div>
        {state.page !== totalPages && <div className="ci-cc-page-down" onClick={() => this.setPage(state.page + 1)} />}
      </div>
    );
  }
}

export default CantChoose;
