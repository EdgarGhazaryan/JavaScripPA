module.exports = (authenticationService, userService) => {
    return {register, login};

    async function register(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const user = {username, email, password};

            let validationMessage = await authenticationService.validate(user);
            if (validationMessage) {
                return next({statusCode: 400, message: validationMessage});
            }

            await userService.saveUser(user);

            return res.status(201).json({
                message: `${username}, you are successfully registered.`
            });
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async function login(req, res, next) {
        try {
            const { email, password } = req.body;

            const loginResult = await authenticationService.login(email, password);
            const {message, token, loggedIn} = loginResult;

            if(loggedIn) {
                return res.status(200).json({message, token});
            }

            return next({statusCode: 400, message});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }
}