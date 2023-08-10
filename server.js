const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./json/data.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { API_USER, API_PASSWORD, SECRET, KEY } = process.env;
const port = process.env.PORT || 3500;

// // request
// server.use('/request-key', (req, res) => {
//  try {
//   const { user, password } = req.headers;
//   if (user === API_USER && password === API_PASSWORD) {
//    const accessKey = jwt.sign({ secret: SECRET }, KEY);
//    return res.send({ accessKey });
//   }
//   throw new Error('Authorization failed');
//  } catch (err) {
//   console.log(err);
//   res.status(500).json({
//    error: err.message
//   });
//  }
// });

// //middleware
// server.use('/', (req, res, next) => {
//  try {
//   const { authorization } = req.headers;
//   jwt.verify(authorization, KEY, function (err, decoded) {
//    if (err) throw new Error(err);
//    else if (decoded.secret === SECRET) return next();
//    else throw new Error('Authorization failed');
//   });
//  } catch (err) {
//   console.log(err);
//   return res.status(500).json({
//    error: err.message
//   });
//  }
// });

server.use('/', (req, res, next) => {
 try {
  const { authorization } = req.headers;
  if (authorization === KEY) return next();
  throw new Error('Authorization failed');
 } catch (err) {
  console.log(err);
  return res.status(500).json({
   error: err.message
  });
 }
});

server.use(middlewares);
server.use(router);
server.listen(port, () => {
 console.log(port);
});
