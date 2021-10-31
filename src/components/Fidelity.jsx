import React,{Component} from 'react';
import ClienteFunzione from './cliente';

export default class Fidelity extends Component{
    constructor(props){ super(props);
        //di solito si inizializza e basta, per es. gli this.state
        this.state = {//state parola chiave
            clienti: [ //quadra perchè array
                {nome:'Alberto',bollini:101, data:'16/10/84'},
                {nome:'Elena',bollini:25, data:'17/11/82'},
                {nome:'Vale',bollini:25, data:'28/12/81'}
            ]
        }
    }

    modificaDati = (numBollini) => {
        console.log("Click ");
        this.setState({
            clienti: [ //si ricaricano tutti i dati
                {nome:'Andreea',bollini:numBollini, data:'28/10/88'},
                {nome:'Elena',bollini:25, data:'17/11/82'},
                {nome:'Vale',bollini:25, data:'28/12/81'}
            ]
        });
    }
    modificaDati2 = (event) => {
        this.setState({
            clienti: [ //si ricaricano tutti i dati
                {nome:event.target.value,bollini:25, data:'17/11/82'},
                {nome:'Vale',bollini:25, data:'28/12/81'}
            ]
        });
    }

    render(){return(
        <div>
             <ClienteFunzione 
                modifica={this.modificaDati.bind(this,528)} 
                modificaNome={this.modificaDati2}
                nome={this.state.clienti[0].nome}
                bollini={this.state.clienti[0].bollini}
                dataua={this.state.clienti[0].data}
                ></ClienteFunzione>
             <ClienteFunzione 
                modifica={this.modificaDati} 
                modificaNome={this.modificaDati2}
                nome={this.state.clienti[1].nome}
                bollini={this.state.clienti[1].bollini}
                dataua={this.state.clienti[1].data}
                ></ClienteFunzione>
            <button onClick={this.modificaDati.bind(this,0)}>Modifica</button>
        </div>
    );}//<!-- nota modificaDati senza parentesi () -->


    shouldComponentUpdate(){return false;}
    
}