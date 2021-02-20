const http = require('http');
const userController = require('./controllers/userController');

require('dotenv').config();

const server = http.createServer( (req, res) => {
   if(req.url === '/api/create' && req.method === 'POST') {
      req.on('data',userData => {
         userController.createUser(JSON.parse(userData.toString()), res);
      });
      return;
   }

   if(req.url === '/api/getAll' && req.method === 'GET') {
      userController.getAllUsers(res);
      return;
   }

   if(req.url.startsWith('/api/update/') && req.method === 'PUT') {
      let id = userController.getSearchKey(req.url, true, false);
      if(id) {
         req.on('data',userData => {
            userController.updateUser(id, JSON.parse(userData.toString()), res);
         });
      }
      return;
   }

   if(req.url.startsWith('/api/delete/') && req.method === 'DELETE') {
      let id = userController.getSearchKey(req.url, true, false);
      if(id) {
         userController.deleteUser(id, res);
      }
      return;
   }

   if(req.url.startsWith('/api/get/') && req.method === 'GET') {
      let searchKey = userController.getSearchKey(req.url, true, true);

      if(typeof searchKey === "number") {
         userController.getById(searchKey, res);
         return;
      }
      if(typeof searchKey === "string") {
         userController.getByName(searchKey, res);
         return;
      }
   }

   res.statusCode = 404;
   return res.end(JSON.stringify({
      message: "Invalid endpoint"
   }));

   });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log("Server is running");
});