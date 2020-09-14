import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import Redirect from './components/Redirect';

class App extends Component {

    state = {
        url: '',
        link: '',
        clicks: ''
    };

    handleChange = (e) => {
        this.setState({
            url: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const validURL = validator.isURL(this.state.url, {
            require_protocol: true
        });
        if (!validURL) {
            alert('Please ensure the url is correct and includes the http(s) protocol.');
        } else {
            console.log('URL is: ', this.state.url);
            // Post values
            axios.post('/api/url', {
                url: this.state.url
            })
                .then(res => {
                    this.setState({
                        link: `http://chr.dc/${res.data.hash}`,
                        clicks: `${res.data.clicks}`

                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    render() {
        return (
            <Router>
                <div className="container">
                    <Route path="/" exact render={() => (
                        <div className='container'>
                            <header className='container'>
                                <img src={require('./assets/Logo.png')} alt='logo' className='logo' />
                            </header>
                            <div className='container container-main'>

                                <h1>Encurte seus links.</h1>
                                <p>Links são longos. Encurte os links que você deseja compartilhar,</p>
                                <p>e acompanhe enquanto viajam através da internet.</p>
                                <form onSubmit={this.handleSubmit}>
                                    <input required  type='url' id='url' placeholder='Cole o seu link aqui' onChange={this.handleChange}/>
                                    <input type='submit' value='ENCURTAR' id='button' />
                                    <div><p>{ this.state.link }</p></div>
                                </form>
                            </div>
                            <div className='container container-top5'>
                                <h2>TOP 5</h2>

                                <table>
                                    <tbody>

                                        <tr>
                                            <td><a href="{ this.state.link}"><span id='result'>{ this.state.link }</span></a></td>
                                            <td className='clicks'>{ this.state.clicks}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className='container container-hits'>
                                <h2>HITS</h2>
                                <div className='box-click-links'></div>
                                <h5>Cliques em links</h5>
                            </div>
                            <footer className='container'>
                                <div className='left'>
                                    <label>chr.dc</label>
                                </div>
                                <div className='right'>
                                    <a href='#'><img className='icon' src={require('./assets/Twitter.png')} alt='icon-tt' /></a>
                                    <a href='#'><img className='icon' src={require('./assets/Facebook.png')} alt='icon-fb' /></a>
                                </div>
                            </footer>
                        </div>
                    )} />
                    <Route path="/:hash" component={Redirect} exact />
                </div>
            </Router>
        );
    }
}

export default App;