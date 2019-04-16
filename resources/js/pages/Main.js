import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Class Main
 * ==========
 *
 * Represents the main page
 */
class Main extends React.Component {
  /**
   * class constructor
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      page: null,
      color: 'white',
      foldContentItems: false,
      mainContentPart: 'cmp-1'
    };

    this.contentPages = [
      'manifest',
      'cantchoose',
      'shop',
      'support-us'
    ];

    this.changeContent = this.changeContent.bind(this);
    this.switchContentPart = this.switchContentPart.bind(this);
    this.submitContactForm = this.submitContactForm.bind(this);
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    console.debug(this.props.location);
    console.debug(this.props.match.params.page);
    this.setState({
      page: this.props.match.params.page,
      color: _.get(this.props.location, 'state.color', 'white'),
      foldContentItems: _.includes(this.contentPages, this.props.match.params.page)
    });
  }

  /**
   * @inheritDoc
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.debug('componentDidUpdate');
    if (this.state.page !== this.props.match.params.page) {
      this.setState({
        page: this.props.match.params.page,
        foldContentItems: _.includes(this.contentPages, this.props.match.params.page)
      });
    }
  }

  changeContent(page) {
    if (this.state.page === page) {
      return false;
    }

    this.setState({ page, foldContentItems: true });
    this.props.history.push(`/m/${page}`);
  }

  switchContentPart(part) {
    this.setState({ mainContentPart: part });
  }

  submitContactForm(e) {
    e.preventDefault();
    console.debug(e.target.value);
  }

  /**
   * @inheritDoc
   * @returns {*}
   */
  render() {
    const page = this.state.page;
    const item = this.contentPages.findIndex(element => element === page);
    const contentPart = this.state.mainContentPart;

    return (
      <div className="page-main">
        <div className="side-left">
          <Link className="logo-black" to="/">
            cioccolato all’arancia
            <div>Indecisi per scelta</div>
          </Link>
          <div className="poster-text">
            <span>prossima data</span>
            9, 10, 11 Maggio Teatro lo Spazio
            <div className="btn btn-block btn-rounded mt-30">acquista bigletti</div>
            <div className="btn btn-block btn-rounded mt-10" onClick={() => this.changeContent('more')}>
              scopri di più
            </div>
          </div>
          <div className="share-block">
            assaggiaci
            <div className="social-icons">
              <a className="si-tw" href="#" target="_blank" />
              <a className="si-im" href="#" target="_blank" />
              <a className="si-fb" href="#" target="_blank" />
            </div>
          </div>
        </div>

        <div className="side-right">
          <div className={`content-main ${contentPart}` + (page === 'more' ? ' active' : '')}>
            <div className="cm-part">
              <div className="cm-bordered">
                <div className="cmb-title">Cioccolato Al’arancia</div>
                di e con Martina Gatto<br />
                regia e supervisione drammaturgica Dafne Rubini
                <div className="press-arrow">press</div>
              </div>
              Ci sono momenti nella vita in cui tutto cio che abbiamo attorno sembra cambriare improvvisamente.
              <div className="text-center mt-75">
                <span className="btn btn-brown px-40" onClick={() => this.switchContentPart('cmp-2')}>
                  portalo nella tua città
                </span>
              </div>
            </div>
            <div className="cm-part">
              <div className="text-center">
                <span className="press-up" onClick={() => this.switchContentPart('cmp-1')}>sinossi</span>
              </div>
              <div className="brown-block">
                <div className="bb-title">portaci nella tua città</div>
                <div className="chairs-bg" />
                <div className="bb-text-big">
                  portaci nella tua città e la cosa piu semplice dopo mangiare il babà a Napoli
                </div>
                <div className="bb-desc">
                  tutto quello che occore e un palco, una sedia, una bottiglietta d'acqua, un camerino, ma anche la macchina it's ok una pizza da mangiarci insieme prima e dopo lo spettacolo
                </div>
                <div className="bb-form">
                  <form onSubmit={this.submitContactForm}>
                    <textarea placeholder="il tuo messagio" />
                    <button type="submit">invia</button>
                  </form>
                </div>
                <div className="bb-contact-details">
                  o scrivi a<br />
                  <a href="mailto:">stefaniamartuscelli@cioccolatollarancia.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className={`content-items ci-${item}`}>
            <div
              className={(page === 'manifest' ? 'active ' : '') + 'content-item'}
              onClick={() => this.changeContent('manifest')}
            >
              <div className="ci-title">manifesto</div>
              <div className="ci-body">
                Al tavolino di un bar con il menu in mano,<br />
                di quelli che uno come te, girando e rigirando le pagine, li consuma durante una semplice ordinazione /<br />
                di fronte
              </div>
            </div>
            <div
              className={(page === 'cantchoose' ? 'active ' : '') + 'content-item'}
              onClick={() => this.changeContent('cantchoose')}
            >
              <div className="ci-title">#nonsoscegliere</div>
              <div className="ci-body">
                Some content here...
              </div>
            </div>
            <div
              className={(page === 'shop' ? 'active ' : '') + 'content-item'}
              onClick={() => this.changeContent('shop')}
            >
              <div className="ci-body">
                Some content here...
              </div>
              <div className="ci-title">shop</div>
            </div>
            <div
              className={(page === 'support-us' ? 'active ' : '') + 'content-item'}
              onClick={() => this.changeContent('support-us')}
            >
              <div className="ci-body">
                Some content here...
              </div>
              <div className="ci-title">sostienici</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
