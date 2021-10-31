import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import ClientiService from '../services/clientiAPI.js';
import {Formik, Form, Field, ErrorMessage} from 'formik';

export default class ClientiComponent extends Component{
    state= { 
        clienti : [ ]
        ,codFid : ''
        ,errorWebApi:false,
        errorMessage:''
        ,numClienti:0
        ,okMessage : null
    }
    componentDidMount(){
        //this.setState({clienti:[]});
        //this.setState({numClienti:0 });
        //this.setState({errorWebApi:false,errorMessage:''});
        ClientiService.getAllClientiData()
            .then(response => this.clientiDataSuccess(response))
            .catch( error => this.clientiDataFail(error));
    }
    loadAllClient(){

    }
    clientiDataSuccess = (response ) => {
        console.log(response);
        this.setState({clienti:this.state.clienti.concat(response.data)});
        this.setState({numClienti:this.state.clienti.length });
    }
    clientiDataFail = (error) => {
        console.log(error);
        //this.setState({errorWebApi:true,errorMessage:error});
        if (error.response){
            if (error.response.data){
                if (error.response.data.message){
                this.setState({errorWebApi:true,errorMessage:error.response.data.message});
        }}}
    }
    gestModificaValoreState = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
    cercaPerCodFid = () => {console.log (this.state.codFid);
        this.setState({clienti:[]});
        this.setState({numClienti:this.state.clienti.length });
        this.setState({errorWebApi:false,errorMessage:''});
        ClientiService.getClienteByCode(this.state.codFid)
            .then(response => this.clientiDataSuccess(response))
            .catch( error => this.clientiDataFail(error));
    }
    elimina = (codFid) => { console.log("Eliminare" + codFid); //log
        this.setState({errorWebApi:false,errorMessage:''});
        ClientiService.delClientiByCod(codFid)
            .then(response => { this.setState({okMessage:`Cliente ${codFid} eliminato`});this.loadAllClient(); } )
            .catch( error => this.clientiDataFail(error));
    }
    modifica = (codFid) => { console.log("Modificare" + codFid); //log
        this.props.history.push('/clienteins/'+codFid);
        /*ClientiService.delClientiByCod(codFid)
            .then(response => { this.setState({okMessage:`Cliente ${codFid} eliminato`});this.loadAllClient(); } )
            .catch( error => this.clientiDataFail(error));*/
    }
    inserisci = () => {
        this.props.history.push('/clienteins/-1');
    }
    render(){
        return (<div className="clientiComponent">
            <h1>Elenco {this.state.numClienti} clienti</h1>
            <ShowErrorMessage errorWebApi={this.state.errorWebApi} errorMessage={this.state.errorMessage }/>
            {this.state.okMessage && <div className="alert alert-success">{this.state.okMessage}</div>}
            <div className="table-filter"><div className="row">
                <div className="col-sm-9">
                    <button className="btn btn-success" onClick={this.inserisci}><i className="fa fa-plus"></i> Nuovo cliente</button>
                </div>
                <div className="col-sm-3">
                    <div className="filter-group">
                        <input name="codFid" type="text"
                            onChange={this.gestModificaValoreState}
                            value={this.state.codFid} />
                        <button type="button" className="btn btn-primary" onClick={this.cercaPerCodFid} >Cerca</button>
                    </div>
                </div>
            </div></div>
            <table className="table table-striped table-bordered table-hower">
                <thead><tr><th>Nome</th><th>Bollini</th><th>Data</th></tr></thead>
                <tbody>
                    { this.state.clienti.map ( (cliente,index) => 
                        <tr key={cliente.id}>
                            <td>{cliente.nominativo} - {cliente.codfid}</td>
                            <td>{cliente.cards && cliente.cards.bollini}</td>
                            <td>{cliente.cards && cliente.cards.ultimaspesa}</td>
                            <td>
                                <button className="btn btn-warning table-buttons" onClick={() => this.modifica(cliente.codfid)}
                                    ><i className="fa fa-edit" aria-hidden="true"></i> Modifica
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger table-buttons" 
                                    onClick={e => window.confirm('Confermi eliminazione?') && this.elimina(cliente.codfid)}
                                    ><i className="fa fa-mimus" aria-hidden="true"></i> Elimina
                                </button>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
            <Link to="/welcome/aaa">Dashboard</Link>
        </div>);
    }
}
function ShowErrorMessage(props){
    if (props.errorWebApi){
        return <div className="alert alert-danger" role="alert"><h3>{props.errorMessage}</h3></div>
    }
    return null;
}

export class ClienteInsComponent extends Component{

    state= {errorWebApi:false,errorMessage:'',
        id:'',codfid:'',nominativo:'',indirizzo:'',comune:'',cap:'',prov:'',attivo:true,cards:null
    }
    
    componentDidMount(){//console.log("Codice"+  this.props.match.params.codfid);
        let codfid=this.props.match.params.codfid;
        if (codfid==="-1"){return;}
        ClientiService.getClienteByCode(codfid)
            .then(response => this.clientiDataSuccess(response))
            .catch(error => this.clientiDataFail(error));
    }
    clientiDataSuccess = (response ) => {
        this.setState({
            id:response.data.id ,
            nominativo:response.data.nominativo,
            codfid:response.data.codfid ,
            indirizzo:response.data.indirizzo ,
            comune:response.data.comune ,
            cap:response.data.cap ,
            prov:response.data.prov ,
            attivo:response.data.attivo ,
            cards:response.data.cards
        });
        console.log(this.state.codfid);
    }
    clientiDataFail = (error) => {
        console.log(error);
        if (error.response){
            if (error.response.data){
                if (error.response.data.message){
                this.setState({errorWebApi:true,errorMessage:error.response.data.message});
        }}}
    }
    annulla = () => {console.log (this.state.codFid);
        if (window.confirm('Annulli?')){
            this.props.history.push('/clienti');
        }
    }
    salva = (values) => {console.log ("SALVA");console.log(values);
        ClientiService.insCliente({
            id:values.id ,
            nominativo:values.nominativo,
            codfid:values.codfid ,
            indirizzo:values.indirizzo ,
            comune:values.comune ,
            cap:values.cap ,
            prov:values.prov ,
            attivo:values.attivo ,
            cards:this.state.cards
        })
        .then( () => { this.props.history.push('/clienti'); } )
        .catch(error => this.clientiDataFail(error));
    }
    valida = (values) => {
        let errors={};
        if (! values.codfid){ 
            errors.codfid='Inserisci il codice fidelity';
        }else if (values.codfid.length !== 7){
            errors.codfid='Il codice deve essere di 7 caratteri';
        }
        if (! values.nominativo){
            errors.nominativo='Il nominativo deve essere valorizzato';
        }
        //errors.nominativo='Il nominativo deve essere valorizzato';
        return errors;
    }
    render(){
        let { id,codfid,nominativo,indirizzo,comune,cap,prov/*,attivo,cards*/} = this.state;
        return (
        <section className="container"><ShowErrorMessage errorWebApi={this.state.errorWebApi} errorMessage={this.state.errorMessage } />
            {!this.state.errorWebApi && <div className="card">
                <div className="card-body">
                    <h3>Modifica Dati cliente {this.props.match.params.codfid}</h3>
                        nota: doppia graffa listaVariabili , i nomi devono essere ai name dei campi input                        
                        <Formik initialValues={{id,codfid,nominativo,indirizzo,comune,cap,prov}} enableReinitialize={true}
                            onSubmit={this.salva}
                            validate={this.valida} validateOnBlur={false} validateOnChange={false}
                        > 
                        {
                            (props) =>  (
                                <Form>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label>Codice fid</label>
                                            <Field type="text" name="codfid" className="form-control"  />
                                            <ErrorMessage name="codfid" component="span" className="alert alert-warning" />
                                        </div>
                                        <div className="col form-group">
                                            <label>Nominativo</label>
                                            <Field type="text" name="nominativo" className="form-control" />
                                            <ErrorMessage name="nominativo" component="span" className="alert alert-warning" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label>Indirizzo</label>
                                            <Field type="text" name="indirizzo" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label>Comune</label>
                                            <Field type="text" name="comune" className="form-control" />
                                        </div>
                                        <div className="col form-group">
                                            <label>Cap</label>
                                            <Field type="text" name="cap" className="form-control" />
                                        </div>
                                        <div className="col form-group">
                                            <label>Provincia</label>
                                            <Field as="select" name="prov" className="form-control" >
                                                    <option value="PD">Padova</option>
                                                    <option value="PA">Palermo</option>
                                                    <option value="PI">Pisa</option>
                                                    <option value="PS">Pistoia</option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <button type="submit" className="btn btn-primary inscku">Salva</button>
                                        <button type="button" onClick={this.annulla} className="btn btn-warning inscli">Annulla</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>}
        </section>
    );}
}