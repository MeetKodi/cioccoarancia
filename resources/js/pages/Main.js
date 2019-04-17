import _ from 'lodash';
import axios from 'axios';
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
      logoTemplate: 'white',
      sideBlockContentNum: 1,
      mainContent: {
        part: 'cmp-1',
        borderedOpen: false
      },
      form: {
        status: 'success',
        message: null
      }
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
    this.toggleBorderedContent = this.toggleBorderedContent.bind(this);
    this.toggleLogoTemplate = this.toggleLogoTemplate.bind(this);
    this.toggleSideBlockContent = this.toggleSideBlockContent.bind(this);
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
    });
  }

  /**
   * @inheritDoc
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== this.props.match.params.page) {
      this.setState({
        page: this.props.match.params.page,
      });
    }
  }

  /**
   * Changes menu content with url
   *
   * @param page
   * @returns {boolean}
   */
  changeContent(page) {
    if (this.state.page === page) {
      return false;
    }

    this.setState({ page });
    if (page === null) {
      this.props.history.push('/m');
    } else {
      this.props.history.push(`/m/${page}`);
    }
  }

  /**
   * Switches main content part (top/bottom)
   *
   * @param part
   */
  switchContentPart(part) {
    this.setState({
      mainContent: {
        ...this.state.mainContent,
        part
      }
    });
  }

  /**
   * Expands or makes compact the bordered block
   * @param open
   */
  toggleBorderedContent(open) {
    this.setState({
      mainContent: {
        ...this.state.mainContent,
        borderedOpen: open
      }
    })
  }

  /**
   * Changes left side block template (background + content)
   */
  toggleLogoTemplate() {
    let bg = 'black';
    if (this.state.logoTemplate === 'black') {
      bg = 'white';
    }

    this.setState({ logoTemplate: bg });
  }

  /**
   * Toggles logo side block content
   */
  toggleSideBlockContent() {
    let num = 1;
    if (this.state.sideBlockContentNum === 1) {
      num = 2;
    }

    this.setState({ sideBlockContentNum: num });
  }

  /**
   * Submits the contact form and sends the message to server
   *
   * @param e
   */
  submitContactForm(e) {
    e.preventDefault();
    const message = e.target[0].value;
    const minLength = 10;
    if (message < minLength) {
      this.setState({
        form: {
          ...this.state.form,
          status: 'error',
          message: `The message length should be more than ${minLength} symbols.`
        }
      });
      return;
    }

    axios.post('/contact', {
      message
    })
      .then(response => {
        console.debug(response);
        this.setState({
          form: {
            ...this.state.form,
            status: 'success',
            message: response.data
          }
        });
      })
      .catch(err => {
        const defaultMessage = err.message || 'Unknown error. Try again later';
        const message = _.get(err, 'response.data.error.message', defaultMessage);

        this.setState({
          form: {
            ...this.state.form,
            status: 'error',
            message
          }
        });
      })
  }

  /**
   * @inheritDoc
   * @returns {*}
   */
  render() {
    const page = this.state.page;
    const item = this.contentPages.findIndex(element => element === page);
    const contentPart = this.state.mainContent.part;
    const borderedOpen = this.state.mainContent.borderedOpen;
    const sideBlockNum = this.state.sideBlockContentNum;

    return (
      <div className="page-main">
        <div className={`side-left sl-${this.state.logoTemplate}`}>
          <div className="template-toggler" onClick={() => this.toggleLogoTemplate()} />
          <div className="side-block sb-1">
            <Link className="logo-black" to="/">
              cioccolato all’arancia
              <div>Indecisi per scelta</div>
            </Link>
            <div className="poster-text">
              <span>prossima data</span>
              9, 10, 11 Maggio Teatro lo Spazio
              <div className="btn btn-block btn-rounded mt-30">acquista bigletti</div>
              {page !== 'more'
              ? (
                  <div className="btn btn-block btn-rounded mt-10" onClick={() => this.changeContent('more')}>
                    scopri di più
                  </div>
                )
              : (
                  <div className="btn btn-block btn-rounded mt-10" onClick={() => this.changeContent(null)}>
                    chiudi
                  </div>
                )}
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
          <div className="side-block sb-2">
            <div className={'sb-content sbc-1' + (sideBlockNum === 2 ? ' d-none' : '')}>
              <div className="sbc-tree-img" />
              <p>
                cioccolato all’arancia e<br />
                uno spettacolo teatrale.
              </p>
              <p>cioccolato all’arancia e un Movimento.</p>
              <p>
                cioccolato all’arancia e la comunita d’indecisi.
              </p>
            </div>
            <div className={'sb-content sbc-2' + (sideBlockNum === 1 ? ' d-none' : '')}>
              <p>
                chi siamo (anche se non<br />
                l’abiamo ancora se ce lo stiamo<br />
                ancora chiedendo)
              </p>
              <div className="sbc-title">Supercat</div>
              <p>
                chi siamo (anche se non<br />
                l’abiamo ancora se ce lo stiamo<br />
                ancora chiedendo)
              </p>
              <div className="sbc-title">Superdafne</div>
              <p>
                chi siamo (anche se non<br />
                l’abiamo ancora se ce lo stiamo<br />
                ancora chiedendo)
              </p>
              <div className="sbc-title">Quello napoletano</div>
              <p>
                chi siamo (anche se non<br />
                l’abiamo ancora se ce lo stiamo<br />
                ancora chiedendo)
              </p>
            </div>
            <div className={`sbc-toggler sbc-type-${sideBlockNum}`}>
              <span onClick={() => this.toggleSideBlockContent()} />
              <span onClick={() => this.toggleSideBlockContent()} />
            </div>
          </div>
        </div>

        <div className="side-right">
          <div className={`content-main ${contentPart}` + (page === 'more' ? ' active' : '')}>
            <div className="cm-part">
              <div className={'cm-bordered' + (borderedOpen ? ' opened' : '')}>
                <div className="cmb-title">Cioccolato Al’arancia</div>
                di e con Martina Gatto<br />
                regia e supervisione drammaturgica Dafne Rubini
                {borderedOpen ? (
                  <div className="press-arrow back" onClick={() => this.toggleBorderedContent(false)}>
                    sinossi
                  </div>
                ) : (
                  <div className="press-arrow" onClick={() => this.toggleBorderedContent(true)}>press</div>
                )}
                <div className="cmb-content">
                  Some content here...
                  <div className="mt-40">
                    manifesto dello<br />
                    spettacolo teatrale<br />
                    <a href="#">download press</a>
                  </div>
                </div>
              </div>
              {!borderedOpen && <div>
                Ci sono momenti nella vita in cui tutto cio che abbiamo attorno sembra cambriare improvvisamente.
              </div>}
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
                    <span className={`form-status ${this.state.form.status}`}>
                      {this.state.form.message}
                    </span>
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
