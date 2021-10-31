import axios from 'axios';

class ClientiService {
    state = {
        server: "http://localhost:5071",
        baseUrl: "/api/clienti"
    }
    getAllClientiData = () => {
        return axios.get (`${this.state.server}${this.state.baseUrl}/cerca/all`);
    }
    getClienteByCode = (codFid) => {
        return axios.get (`${this.state.server}${this.state.baseUrl}/findByCodFid/${codFid}`);
    }
    delClientiByCod = (codFid) => {
        return axios.delete (`${this.state.server}${this.state.baseUrl}/eliminaCodFid/${codFid}`);
    }
    insCliente = (cliente) => {
        return axios.post (`${this.state.server}${this.state.baseUrl}/inserisci`,cliente);
    }
}
export default new ClientiService();