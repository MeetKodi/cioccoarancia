import React, { Component, Fragment } from 'react';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <p>Sì, tutto molto bello, ma... cosa fa un Indeciso per Scelta?</p>
        <p>Semplice! Non spreca neanche un secondo per essere deciso.<br />
          Analizza tutte le millemila possibilità e, solo all’ultimo secondo, compie la sua scelta.
          (In effetti è molto più coraggioso di quello che si pensi)
        </p>
        <p>E poi…</p>
        <p>
          partecipa agli <a href="#" onClick={(e) => this.props.changePage(2, e)}>#AperiGelato</a><br />
          ci segue sui social<br />
          ogni giovedì legge <a href="#" onClick={(e) => this.props.changePage(3, e)}>#Slurp</a><br />
          è iscritto alla newsletter<br />
          utilizza la carta <a href="#" onClick={(e) => this.props.changePage(4, e)}>#ScegliTuPerMe</a><br />
          indossa delle bellissime t-shirt<br />
          sceglie il gusto <a href="#" onClick={(e) => this.props.changePage(5, e)}>#Anamardo</a><br />
          va a teatro<br />
          ascolta playlist cioccolatose
        </p>
        <p>Per entrare a far parte della più grande community di Indecisi seguici sui social e iscriviti alla nostra newsletter<br />
          (Tranquillo, ti manderemo poche email. Forse.)
        </p>
      </Fragment>
    );
  }
}

export default Main;
