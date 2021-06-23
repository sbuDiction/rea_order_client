module.exports = (dbQueries) => {

    const getStock = async (req, res) => {
        const data = await dbQueries.getDbStock();
        if (data.rows.length === 0) {
            res.json({
                status: 'no stock available',
                data: data.rows,
            })
        } else {
            res.json({
                counter: data.rows.length,
                status: 'success',
                data: data.rows,
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
            let results = await dbQueries.createAccount(input_name, input_surname, input_password, input_email, input_phone);
            res.json({
                status: 'success',
                data: results,
            });
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
            let results = await dbQueries.signIn(input_password, input_email);
            if (results) {
                res.json({
                    status: 'success',
                    data: results,
                });
            } else {
                res.json({
                    status: 'Account not found!',
                    data: results,
                });
            }
        }
    }

    return {
        get: getStock,
        order: getOrder,
        create: CreateAccount,
        login,
    }
}