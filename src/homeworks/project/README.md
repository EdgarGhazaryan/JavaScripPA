# Configuring Project

### To run the application you need to
1. #### Clone the repository

2. #### Install dependences

```
npm install 
```

3. #### Fill variables values in .env file

4. #### Run the application

```
npm start
```

# Description

```
Title - Get posts without authorization 
URL - /api/posts/public
METHOD - GET
Parameters 
    offset - query parameter, optional
    limit - query parameter, optional
______________________________

Title - Register in the system
URL - /api/register
Method - POST
______________________________

Title - Login in the system
URL - /api/login
Method - POST
______________________________

Title - Edit user information
URL - /api/users
Method - PUT
______________________________

Title - Get users by name
URL - /api/users?userame=
METHOD - GET
Parameters 
    username - query parameter, required
______________________________

Title - Get users by id
URL - /api/users/:id
METHOD - GET
Parameters 
    id - params parameter, required
______________________________

Title - Get users posts 
URL - /api/users/:id/posts
METHOD - GET
Parameters 
    id - params parameter, required
    offset - query parameter, optional
    limit - query parameter, optional
______________________________

Title - Create post
URL - /api/posts
METHOD - POST
______________________________

Title - Edit post
URL - /api/posts/:id
METHOD - PUT
Parameters 
    id - params parameter, required
______________________________

Title - Delete post 
URL - /api/posts/:id
METHOD - DELETE
Parameters 
    id - params parameter, required
______________________________

Title - Get posts by description
URL - /api/posts?description=
METHOD - GET
Parameters 
    description - query parameter, required
    offset - query parameter, optional
    limit - query parameter, optional
______________________________

Title - Get posts
URL - /api/posts
METHOD - GET
Parameters 
    offset - query parameter, optional
    limit - query parameter, optional
______________________________

Title - Get top posts
URL - /api/posts/top
METHOD - GET
Parameters 
    offset - query parameter, optional
    limit - query parameter, optional
______________________________

Title - Get post by id
URL - /api/posts/:id
METHOD - GET
Parameters 
    id - params parameter, required

```