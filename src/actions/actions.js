
import api from "../api/api";

const Actions = {
    CreateAccount(account) {
        console.log('hi im registration');
        api.CreateAccount(account)
    },

    auth(account) {
        api.Auth(account)
    }
};

export default Actions;