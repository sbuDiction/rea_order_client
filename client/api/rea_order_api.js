const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (dbQueries, tokenHandler) => {

    const getStock = async (req, res) => {
        const data = await dbQueries.getDbStock();
        if (data.rows.length === 0) {
            res.json({
                status: 'no stock available',
                data: data.rows,
                isTrue: false
            })
        } else {
            res.json({
                counter: data.rows.length,
                status: 'success',
                data: data.rows,
                isTrue: true
            })
        }
    }

    const getOrder = async (req, res) => {
        const { id } = req.body
        let results = await dbQueries.getOrder(id)
        res.json({
            status: 'got it',
            data: results,
        })
    }


    const CreateAccount = async (req, res) => {
        const { input_name, input_surname, input_password, input_email, input_phone } = req.body;
        if (input_name === '' | input_surname === '' | input_password === '' | input_email | input_name === '') {
            res.json({
                status: 'failed',
                data: false,
            });
        } else {
            bcrypt.hash(input_password, saltRounds, async (err, hash) => {
                let results = await dbQueries.createAccount(input_name, input_surname, hash, input_email, input_phone);
                const { id } = results[0];
                const token = tokenHandler.access(id);
                res.json({
                    status: 'success',
                    data: true,
                    token: token
                });
            })

        }
    }

    const login = async (req, res) => {
        const { input_password, input_email } = req.body;
        if (input_password === '' | input_email === '') {
            res.json({
                status: 'No input was provided!',
                data: false,
            });
        } else {
            let userData = await dbQueries.signIn(input_email);
            bcrypt.compare(input_password, userData.password, (err, results) => {
                const token = tokenHandler.access(userData.id);
                console.log(token);
                if (results) {
                    res.json({
                        status: 'success',
                        data: results,
                        token: token
                    });
                } else {
                    res.json({
                        status: 'Password is incorrect',
                        data: results,
                    });
                }
            })
        }
    }

    const verify = async (req, res) => {
        const { token } = req.body;
        if (token) {
            let verified = tokenHandler.verifyToken(token);
            res.json({
                status: 'Token verified',
                client_id: verified.data,
                response: true,
                token: token

            })
        }
    }

    const fetchUser = async (req, res) => {
        let results = await dbQueries.getUser(req.id);
        console.log(results);
        res.json({
            status: 'success',
            data: results
        })
    }

    const fetchAllUsers = async (req, res) => {
        let results = await dbQueries.getAllusers();
        res.json({
            status: 'success',
            data: results,
            isTrue: true
        })
    }

    const getPastOrders = async (req, res) => {
        const orders = await dbQueries.getPastOrders(req.id);
        res.json({
            status: 'success',
            data: orders
        })
    }

    const getActiveOrders = async (req, res) => {
        const activeOrder = await dbQueries.getUserPlacedOrders(req.id);
        res.json({
            status: 'success',
            data: activeOrder
        })
    }

    const addStock = async (req, res) => {
        const { qty, name, description, price } = req.body;
        const results = await dbQueries.addDbStock(name, description, price, qty);
        console.log(results);
        if (results) {
            res.json({
                status: 'Stock was successfuly updated.'
            })
        } else {
            res.json({
                status: 'Stock quantity successfuly updated.'
            })
        }
    }

    return {
        get: getStock,
        order: getOrder,
        create: CreateAccount,
        login,
        verify,
        fetchUser,
        fetchAllUsers,
        getPastOrders,
        getActiveOrders,
        addStock
    }
}