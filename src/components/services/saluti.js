import axios from 'axios'

class SalutiService {
    getSalutiData = () => {
        return axios.get('http://localhost:8050/api/saluti/echo');
    }
    getSalutiConNome = (nome) => {
        return axios.get(`http://localhost:8050/api/saluti/echo/${nome}`);
    }
}
export default new SalutiService();