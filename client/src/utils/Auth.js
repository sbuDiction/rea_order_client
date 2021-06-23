import Axios from "axios";

const Auth = {
    isAuthenticated: false,
    isUserName: '',
    token: '',

    async check() {
        let jwt = {
            token: '',
        };

        jwt.token = window.localStorage.getItem('sudo');
        if (jwt.token !== '') {
            await Axios.post('rea_order/api/verify', jwt)
                .then(res => {
                    this.isAuthenticated = res.data.response;
                    this.isUserName = res.data.response;
                    this.token = res.data.response;
                })
        }
    },

    getToken() {
        return this.token;
    },
    getAuth() {
        return this.isAuthenticated;
    },
    getUserName() {
        return this.isUserName;
    }

};

export default Auth;