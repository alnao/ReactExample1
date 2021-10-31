import React,{Component} from 'react';
import Bottone from './Bottone'
import './Contatore.css';

class contatore extends Component {
    state = {//state cioè posto delle variabili 
        contatore:0 //senza ; perchè json
    }
    render(){
        return (
            <div className="Contatore">
                <Bottone valore={1} 
                    modifica={this.incrementa.bind(this,1)} 
                    decrementa={this.decrementa.bind(this,1)}
                />
                <Bottone valore={5}  
                    modifica={this.incrementa.bind(this,5)}
                    decrementa={this.decrementa.bind(this,5)}
                />
                <Bottone valore={42}  modifica={this.incrementa.bind(this,42)}
                    decrementa={this.decrementa.bind(this,42)}
                />
                <span className="valore">{this.state.contatore}</span>
            </div>
        );
    }
    incrementa = (valore) => {
        console.log("incrementa");
        this.setState( (prevState) => { //usato il => meglio perchè parametri tipo il prevState
            return {contatore : prevState.contatore + valore} 
        });
    }
    decrementa = (valore) => {
        console.log("incrementa");
        this.setState( (prevState) => { //usato il => meglio perchè parametri tipo il prevState
            return {contatore : prevState.contatore - valore} 
        });
    }
    
}
export default contatore;