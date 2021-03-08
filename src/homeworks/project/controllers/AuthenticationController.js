class AuthenticationController {
    constructor(authenticationService, userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    async register(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const user = {username, email, password};

            let validationMessage = await this.authenticationService.validate(user);
            if (validationMessage) {
                return next({statusCode: 400, message: validationMessage});
            }

            await this.userService.saveUser(user);

            return res.status(201).json({
                message: `${username}, you are successfully registered.`
            });
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const loginResult = await this.authenticationService.login(email, password);
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


module.exports = AuthenticationController;