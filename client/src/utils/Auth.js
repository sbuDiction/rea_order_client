import Axios from "axios";

const Auth = {
    isAuthenticated: false,
    client_id: 0,
    token: '',

    async check() {
        try {
            let jwt = {
                token: '',
            };
            jwt.token = window.localStorage.getItem('token');
            const getToken = window.localStorage.getItem('token');
            console.log(jwt.token !== '');
            console.log(getToken + " getting token");
            if (jwt.token !== '') {
                await Axios.post('/api/rea_order/verify', jwt)
                    .then(res => {
                        console.log(res);
                        this.isAuthenticated = res.data.response;
                        this.client_id = res.data.client_id;
                        this.token = res.data.token;
                    });
            };
        } catch (error) {

        };
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