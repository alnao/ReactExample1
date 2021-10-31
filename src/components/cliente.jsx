//import React,{Component} from 'react';
import React from 'react';

const clienteFunzione = (props) => {return ( //obbligo parentesi se a capo
    <div>
        <p onClick={props.modifica}>{props.nome} 
        - Bollini {props.bollini}
        - Ultimo accesso {props.dataua}
        </p>
        <input type="text" onChange={props.modificaNome} value={props.nome}  ></input>
    </div>
);}
//<p>{props.children}</p>
export default clienteFunzione;
