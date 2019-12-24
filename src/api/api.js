import axios from 'axios'

import  {apiPrefix} from '../configAPI/configAPI.json';

export default {
    CreateAccount(data) {
        console.log('hi im post');
        return axios.post(`${apiPrefix}registration`, data);
    },

    Auth(data){
        return axios.post(`${apiPrefix}auth`, data);
    }
}