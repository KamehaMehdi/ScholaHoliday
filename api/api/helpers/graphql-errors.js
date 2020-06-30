const { ApolloError } = require('apollo-server-express');

function GQLNotFoundByID(type, id) {
  return new ApolloError(
    `${type} with ID '${id}' cannot be fetched.`,
    'CAN_NOT_FETCH_BY_ID'
  );
}

function GQLNotFoundByName(type, name) {
  return new ApolloError(
    `${type} with name '${name}' cannot be fetched.`,
    'CAN_NOT_FETCH_BY_NAME'
  );
}

module.exports = {
  GQLNotFoundByID,
  GQLNotFoundByName,
};
