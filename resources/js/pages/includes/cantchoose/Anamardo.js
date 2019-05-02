import React, { Component, Fragment } from 'react';

class Anamardo extends Component {
  render() {
    return (
      <Fragment>
        <div className="ci-cc-title">Anamardo</div>
        <div className="text-center mt-10"><img src="/images/anamardo.png" /></div>
        <div className="text-right">
          <p>
            Vabbè l’anamardo è uno dei nostri gusti preferiti...<br />
            Come non conoscete il gusto Anamardo?<br />
            E’ impossibile!<br />
            Beh, in effetti solo i migliori ce l’hanno...<br />
            chiedete alla vostra gelateria di fiducia! Non ve ne pentirete!
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Anamardo;
