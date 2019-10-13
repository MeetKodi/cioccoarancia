import _ from 'lodash';
import logger from '../logger';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import {CantChoose, Manifest, Shop, Support} from './includes';

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
            showWhatsappInfo: false,
            mainContent: {
                part: 'cmp-1',
                borderedOpen: false
            },
            form: {
                sent: false,
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
        this.toggleWhatsappInfo = this.toggleWhatsappInfo.bind(this);
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        logger.debug(this.props.location);
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

        this.setState({page});
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
                borderedOpen: open,
                part: 'cmp-1'
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

        this.setState({logoTemplate: bg});
    }

    /**
     * Toggles logo side block content
     */
    toggleSideBlockContent() {
        let num = 1;
        if (this.state.sideBlockContentNum === 1) {
            num = 2;
        }

        this.setState({sideBlockContentNum: num});
    }

    /**
     * Submits the contact form and sends the message to server
     *
     * @param e
     */
    submitContactForm(e) {
        e.preventDefault();
        const email = e.target[1].value;
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
            email,
            message
        })
            .then(response => {
                logger.debug(response);
                this.setState({
                    form: {
                        ...this.state.form,
                        sent: true,
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
            });
    }

    /**
     * Shows/hides Whatsapp number
     */
    toggleWhatsappInfo() {
        this.setState({showWhatsappInfo: !this.state.showWhatsappInfo});
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
            <div className={`page-main template-${this.state.color}`}>
                <div className={`side-left sl-${this.state.logoTemplate}`}>
                    <div className="template-toggler" onClick={() => this.toggleLogoTemplate()}/>
                    <div className="side-block sb-1">
                        <Link className="logo-black" to="/">
                            cioccolato all’arancia
                            <div>Indecisi per scelta</div>
                        </Link>
                        <div className="poster-text">
                            <span>prossima data</span>
                            19 - 20 settembre Teatro Portaportese - Roma
                            {this.state.showWhatsappInfo && <div className="whatsapp-info">
                                <span className="close" onClick={() => this.toggleWhatsappInfo()}>X</span>
                                <a href="https://api.whatsapp.com/send?phone=393932191275&text=%20Hola!"
                                   target="_blank">
                                    +39 351 871 3646
                                </a>
                            </div>}
                            <div className="btn btn-block btn-rounded mt-30" onClick={() => this.toggleWhatsappInfo()}>
                                contattaci
                            </div>
                            {page !== 'more'
                                ? (
                                    <div className="btn btn-block btn-rounded mt-10"
                                         onClick={() => this.changeContent('more')}>
                                        scopri di più
                                    </div>
                                )
                                : (
                                    <div className="btn btn-block btn-rounded mt-10"
                                         onClick={() => this.changeContent(null)}>
                                        chiudi
                                    </div>
                                )}
                        </div>
                        <div className="share-block">
                            assaggiaci
                            <div className="social-icons">
                                <a className="si-im" href="https://www.instagram.com/cioccolatoallarancia/"
                                   target="_blank"/>
                                <a className="si-fb" href="https://www.facebook.com/cioccolatoarancia/"
                                   target="_blank"/>
                                <a className="si-yb" href="https://www.youtube.com/channel/UCECxw0kosM4B43JoxVgKh0g?view_as=subscriber"
                                   target="_blank"/>
                            </div>
                        </div>
                    </div>
                    <div className="side-block sb-2">
                        <div className={'sb-content sbc-1' + (sideBlockNum === 2 ? ' d-none' : '')}>
                            <Link className="sbc-tree-img" to="/"/>
                            <p>cioccolato all’arancia è<br/>uno spettacolo teatrale.</p>
                            <p>indecisi per scelta è<br/>il movimento degli indecisi.</p>
                        </div>
                        <div className={'sb-content sbc-2' + (sideBlockNum === 1 ? ' d-none' : '')}>
                            <div className="sbc-title">chi siamo</div>
                            <p>(anche se ce lo stiamo ancora chiedendo)</p>
                            <div className="sbc-title">Supercat</div>
                            <p>
                                è la responsabile di tutto.<br/>
                                aveva paura di essere l’unica indecisa al mondo.<br/>
                                Ha capito di essere in buona compagnia.
                            </p>
                            <div className="sbc-title">Superdafne</div>
                            <p>
                                è la regista dello spettacolo.<br/>
                                Quando le hanno chiesto di “lavorare” alla regia<br/>
                                di Cioccolato all’Arancia lei aveva capito “mangiare”.
                            </p>
                            <div className="sbc-title">Quello napoletano</div>
                            <p>
                                è l’art director del movimento.<br/>
                                Creativo errante,<br/>
                                possiede camicie e calzini improponibili. E’ drogato di cioccolato.
                            </p>
                        </div>
                        <div className={`sbc-toggler sbc-type-${sideBlockNum}`}>
                            <span onClick={() => this.toggleSideBlockContent()}/>
                            <span onClick={() => this.toggleSideBlockContent()}/>
                        </div>
                    </div>
                </div>

                <div className="side-right">
                    <div className={`content-main ${contentPart}` + (page === 'more' ? ' active' : '')}>
                        <div className="cm-part">
                            <div className={'cm-bordered' + (borderedOpen ? ' opened' : '')}>
                                <div className="cmb-title">Cioccolato All’arancia</div>
                                <p>
                                    di e con Martina Gatto<br/>
                                    regia e supervisione drammaturgica Dafne Rubini
                                </p>
                                <p>
                                    direzione creativa Ivan Specchio<br/>
                                    luci Alessio Pascale<br/>
                                    suono Giulio Gaigher<br/>
                                    ufficio stampa Tommaso Caldarelli
                                </p>
                                {borderedOpen ? (
                                    <div className="press-arrow back" onClick={() => this.toggleBorderedContent(false)}>
                                        sinossi
                                    </div>
                                ) : (
                                    <div className="press-arrow"
                                         onClick={() => this.toggleBorderedContent(true)}>press</div>
                                )}
                                <div className="cmb-content">
                                    <div className="mt-40">
                                        <a href="https://www.dropbox.com/sh/fpuo7iy3wj2xbjt/AAAXujBNa16-yZFnVSrPi6gWa?dl=0"
                                           target="_blank">download press</a>
                                    </div>
                                </div>
                            </div>
                            {!borderedOpen && <div>
                                <p>Ci sono momenti nella vita in cui tutto ciò che abbiamo attorno sembra cambiare
                                    improvvisamente. E’ come se un terremoto aprisse una voragine. Gli interrogativi
                                    prendono il sopravvento e si mette tutto in discussione, ci ritroviamo sballottati
                                    tra i sogni e la realtà, tra il volere e il dovere, tra il cuore e la testa, tra il
                                    dolce del cioccolato e l’amaro dell’arancia.</p>
                                <p>In situazioni come queste, regalarsi una pausa prendendo un gelato che rinfreschi
                                    corpo e mente è quello che ci vuole. Il problema è solo uno: scegliere i gusti e
                                    fare l’abbinamento perfetto. E’ meglio cioccolato normale o provare quello
                                    all’arancia? Per poi abbinarlo con menta o stracciatella? E se poi l’abbinamento non
                                    mi piace? E se volessi provare tutti i gusti? Questi e molti altri sono i dubbi che
                                    tartassano la protagonista di “Cioccolato all’arancia”, una ragazza ossessionata
                                    dall’ansia di prendere la scelta giusta. Per il gelato e per la vita. Perché a
                                    volte, per riconoscere quel che ci piace davvero dobbiamo avere il coraggio di
                                    perderci e anche, forse, di assaggiare quel che non ci piace...</p>
                            </div>}
                            <div className="text-center mt-75">
                <span className="btn btn-brown px-40" onClick={() => this.switchContentPart('cmp-2')}>
                  portaci nella tua città
                </span>
                            </div>
                        </div>
                        <div className="cm-part">
                            <div className="text-center">
                                <span className="press-up"
                                      onClick={() => this.switchContentPart('cmp-1')}>sinossi</span>
                            </div>
                            <div className="brown-block">
                                <div className="bb-title">portaci nella tua città</div>
                                <div className="chairs-bg"/>
                                <div className="bb-text-big">
                                    è la cosa più semplice dopo mangiare il babà a Napoli!
                                </div>
                                <div className="bb-desc">
                                    tutto quello che occorre è un palco, una sedia, una bottiglietta d'acqua, anzi due
                                    (l’attrice beve molto), un camerino, ma anche la macchina it's ok, una pizza da
                                    mangiarci insieme prima e dopo lo spettacolo e ovviamente un gelato!
                                </div>
                                {this.state.form.sent && this.state.form.status === 'success'
                                    ? (
                                        <div className="bb-sent">
                                            <div className="bb-s-title">grazie!</div>
                                            ti risponderemo al più presto
                                            <button className="btn btn-rounded btn-block"
                                                    onClick={() => this.toggleBorderedContent(true)}>hai visitato la
                                                nostra press?</button>
                                        </div>
                                    )
                                    : (
                                        <div className="bb-form">
                                            <form onSubmit={this.submitContactForm}>
                                                <textarea placeholder="il tuo messaggio" required/>
                                                <span className={`form-status ${this.state.form.status}`}>
                      {this.state.form.message}
                    </span>
                                                <div className="bb-f-bottom">
                                                    <input type="email" placeholder="la tua email" required/>
                                                    <button type="submit">invia</button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                <div className="bb-contact-details">
                                    o scrivi a<br/>
                                    <a href="mailto:spettacolo@cioccolatoallarancia.com">spettacolo@cioccolatoallarancia.com</a>
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
                                <Manifest/>
                            </div>
                        </div>
                        <div
                            className={(page === 'cantchoose' ? 'active ' : '') + 'content-item'}
                            onClick={() => this.changeContent('cantchoose')}
                        >
                            <div className="ci-title">#indecisiperscelta</div>
                            <div className="ci-body">
                                <CantChoose/>
                            </div>
                        </div>
                        <div
                            className={(page === 'shop' ? 'active ' : '') + 'content-item'}
                            onClick={() => this.changeContent('shop')}
                        >
                            <div className="ci-body">
                                <Shop/>
                            </div>
                            <div className="ci-title">shop</div>
                        </div>
                        <div
                            className={(page === 'support-us' ? 'active ' : '') + 'content-item'}
                            onClick={() => this.changeContent('support-us')}
                        >
                            <div className="ci-body">
                                <Support/>
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
