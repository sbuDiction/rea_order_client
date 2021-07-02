const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (dbQueries, tokenHandler) => {

    const getStock = async (req, res) => {
        try {
            const data = await dbQueries.getDbStock();
            if (data.rows.length === 0) {
                res.json({
                    status: 'no stock available',
                    data: data.rows,
                    isTrue: false
                });
            } else {
                res.json({
                    counter: data.rows.length,
                    status: 'success',
                    data: data.rows,
                    isTrue: true
                });
            };
        } catch (error) {

        }
    }

    const getOrder = async (req, res) => {
        try {
            const { id } = req.body
            let results = await dbQueries.getOrder(id);
            res.json({
                status: 'got it',
                data: results,
            });
        } catch (error) {

        };
    }


    const CreateAccount = (req, res) => {
        try {
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
                });

            };
        } catch (error) {

        };
    }

    const login = async (req, res) => {
        const { input_password, input_email } = req.body;
        try {
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
        } catch (error) {
            console.log(error);
        }

    }

    const verify = async (req, res) => {
        try {
            const { token } = req.body;
            if (token) {
                let verified = tokenHandler.verifyToken(token);
                res.json({
                    status: 'Token verified',
                    client_id: verified.data,
                    response: true,
                    token: token
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    const fetchUser = async (req, res) => {
        try {
            let results = await dbQueries.getUser(req.id);
            res.json({
                status: 'success',
                data: results
            });
        } catch (error) {
            console.log(error);
        };
    }

    const fetchAllUsers = async (req, res) => {
        try {
            let results = await dbQueries.getAllusers();
            res.json({
                status: 'success',
                data: results,
                isTrue: true
            });
        } catch (error) {

        }
    }

    const getPastOrders = async (req, res) => {
        try {
            const orders = await dbQueries.getPastOrders(req.id);
            res.json({
                status: 'success',
                data: orders
            });
        } catch (error) {

        };
    }

    const getActiveOrders = async (req, res) => {
        try {
            const activeOrder = await dbQueries.getUserPlacedOrders(req.id);
            res.json({
                status: 'success',
                data: activeOrder
            });
        } catch (error) {

        };
    }

    const addStock = async (req, res) => {
        try {
            const { qty, name, description, price } = req.body;
            const results = await dbQueries.addDbStock(name, description, price, qty);
            if (results) {
                res.json({
                    status: 'Stock was successfuly updated.'
                });
            } else {
                res.json({
                    status: 'Stock quantity successfuly updated.'
                });
            };
        } catch (error) {

        };
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