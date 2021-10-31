import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import ClientiComponent,{ClienteInsComponent} from './Clienti';
import AuthService from './services.js';
import SalutiService from '../services/saluti.js';

export default class gestFidAdd extends Component{
    render(){
        return (
            <div className="gestFidApp">
                <Router>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/logout" component={LogOutComponent} />
                        <AuthRouter path="/welcome/:userid" component={WelcomeComponent} />
                        <AuthRouter path="/clienti" component={ClientiComponent} />
                        <AuthRouter path="/clienteins/:codfid" component={ClienteInsComponent} />
                        <Route component={Error500Component} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export class AuthRouter extends Component{
    render(){
        if (AuthService.isLogged()){
            return <Route {...this.props} ></Route>
        }else{
            return <Redirect to="/login" />
        }
    }
}

export class HeaderComponent extends Component{
    render(){return (
            <div className="HeaderComponent">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/welcome/null" className="navbar-brand">Corso React</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/welcome/null">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/clienti">Clienti</Link>
                            </li>
                            <li className="nav-item">
								<Link className="nav-link" to="/logout">LogOut</Link>
							</li>
                        </ul>
                    </div>
                    {}
                </nav>
            </div>
    );}
}

class WelcomeComponent extends Component{
    render(){
        return (
        <div className="WelcomeComponent">
            <h1>Welcome in GestFiddApp</h1>
            <p>Saluti a {AuthService.getUserInfo()}</p>
            <button type="button" className="btn btn-primary" onClick={this.getSaluti}>Visualizza messaggio</button>
            <h3>{this.state.msg}</h3>
        </div>
    );}
    state = { msg : ''};
    getSaluti = () =>{
        SalutiService.getSalutiConNome(AuthService.getUserInfo())
            .then( response => this.visualizzaMsg(response) )
            .catch( error => this.visualizzaErrore(error) )
        ;
    }
    visualizzaMsg = (response) => {
        this.setState( { msg : response.data } );
    }
    visualizzaErrore = (error) => { 
        this.visualizzaMsg(error.response.data.message);
        console.log( error.response.data.message); 
    }
}
class LogOutComponent extends Component{
    render(){AuthService.clearUserInfo();return (
        <div className="WelcomeComponent">
            <h1>Logoff</h1>
            <Link className="nav-link" to="/login">Login</Link>
        </div>
    );}
}

function Error500Component(){//http://localhost:3000/dasdasda
    return <div>Errore 500. Page not found</div>
}



class LoginComponent extends Component{
    state = { userid:'alnao', password:'bello' , isLogged: false }
    render(){
        return (
            <div> 
                <p>Accedi alla App GestFit</p>
                Nome utente:
                <input type="text" name="userid" 
                    onChange={this.gestioneModificaInput}
                    value={this.state.userid} />
                <br />
                Password:
                <input type="password" name="password" 
                    onChange={this.gestioneModificaInput}
                    value={this.state.password} />
                <br />
                <button type="button" className="btn btn-primary" onClick={this.login}>Accedi</button>
                <ConnectOkMsg isLogged={this.state.isLogged} />
            </div>
        );
    }
    gestioneModificaInput = (event) => {
        this.setState({[event.target.name] : event.target.value});
        //mettendo [event.target.name] tra quadre prende userid e password dal name dell'input
    }
    login = () => {
        if (this.state.userid === 'alnao' && this.state.password === 'bello'){
            AuthService.saveUserInfo(this.state.userid);
            console.log('corrette');
            this.setState({isLogged:true});
            this.setState({notLogged:false});
            this.props.history.push(`/welcome/${this.state.userid}`);
        }else{
            console.log('credenziali non corrette');
            this.setState({isLogged:false});
            this.setState({notLogged:true});
        }
    }
}

function ConnectOkMsg(props){
    if (props.isLogged === true){
        return (<div><h3>Connessione eseguita</h3></div>);
    }else{
        return (<div><h3>Connessione NON eseguita</h3></div>);
    }
}