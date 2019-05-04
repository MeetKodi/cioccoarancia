import React, { Component, Fragment } from 'react';
import axios from 'axios';
import _ from "lodash";

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sent: false,
      message: null
    };

    this.registerMail = this.registerMail.bind(this);
  }

  registerMail(e) {
    e.preventDefault();
    const email = e.target[0].value;

    if (email.length > 5 && !this.state.sent) {
      axios.post('/register', { email })
        .then(() => {
          this.setState({ sent: true, message: null });
        })
        .catch(err => {
          const message = _.get(err, 'response.data.error.message') || err.message;
          this.setState({ message })
        });
    }
  }

  render() {
    let buttonTitle = 'ricevi';
    if (this.state.sent) {
      buttonTitle = 'grazie!'
    }

    return (
      <Fragment>
        <div className="ci-shop">
          <div className="ci-sh-text">
            <p>
              Saranno magliette bianche.<br />
              No , scusate nere!<br />
              Sia bianche che nere.<br />
              ma forse anche colorate!
            </p>
            <p>Siamo indecisi ancora sulle taglie.</p>
            <p>
              La verità è che Il nostro Art Director ce ne ha proposte troppe,<br />
              dobbiamo ancora scegliere quelle definitive.<br />
              Ma arriveranno e saranno bellissime.<br />
              Forse.<br />
              Forse che arrivano, non che non saranno bellissime!
            </p>
          </div>
          <div className="ci-sh-mail">
            <form onSubmit={this.registerMail}>
              <input type="email" placeholder="digita email" required /><br />
              <button className="btn btn-rounded">{buttonTitle}</button>
            </form>
            {this.state.message && <div className="text-danger">{this.state.message}</div>}
            <p>
              sii furbo. registrati oggi<br />
              e avrai il 15 per cento di sconto<br />
              sul primo ordine
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Shop;
