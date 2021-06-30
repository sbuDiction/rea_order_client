import Axios from "axios";

const Auth = {
    isAuthenticated: false,
    client_id: 0,
    token: '',

    async check() {
        let jwt = {
            token: '',
        };

        jwt.token = window.localStorage.getItem('token');
        if (jwt.token !== '') {
            await Axios.post('http://localhost:5000/api/rea_order/verify', jwt)
                .then(res => {
                    this.isAuthenticated = res.data.response;
                    this.client_id = res.data.client_id;
                    this.token = res.data.token;
                })
        }
    },

    getToken() {
        return this.token;
    },
    getAuth() {
        return this.isAuthenticated;
    },
    getClientId() {
        return this.client_id;
    }

};

export default Auth;