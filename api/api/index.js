const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./typeDefs');
const resolvers = require('./resolvers');

const HTTP_PORT = process.env.HTTP_PORT || 8765;
const HTTP_BIND = process.env.HTTP_BIND || '0.0.0.0';

// Setup Express and Apollo
const app = express();
const apollo = new ApolloServer({ typeDefs, resolvers });

// Auto-configure Apollo
apollo.applyMiddleware({ app, path: '/ql' });

// Configure home route and 404 error message
app.get('/', (_req, res) => {
  res.json({
    code: res.statusCode,
    message: "Welcome on ScholaHoliday's API!",
  });
});

app.use('*', (_req, res) => {
  res
    .status(404)
    .json({ code: res.statusCode, message: 'Endpoint not found.' });
});

// Start Express app
app.listen(HTTP_PORT, HTTP_BIND, () => {
  console.log(`API started on http://${HTTP_BIND}:${HTTP_PORT}/`);
});
