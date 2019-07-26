import React, { Component, Fragment } from 'react';

class Scegli extends Component {
  render() {
    return (
      <Fragment>
        <div className="ci-cc-title">Scegli<br />tu per me</div>
        <div className="text-center mt-10"><img src="/images/scegli.png" /></div>
        <div className="text-right">
          <p>E’ in atto una rivoluzione nel mondo dell’indecisio...<br />
            quando sei nel panico e non sai scegliere il gusto della pizza, il gelato o la ragazza della tua vita, c’è solo una cosa da fare… estrai la carta #ScegliTuPerMe , passala a qualcuno intorno a te, sarà lui a prendere la decisione al tuo posto! Non dovrai più affannarti ad essere indeciso, rilassati!
          </p>
          <p>
            come si può richiedere?<br />
            Scrivici a <a href="mailto:movimento@cioccolatoallarancia.com">movimento@cioccolatoallarancia.com</a>
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Scegli;
