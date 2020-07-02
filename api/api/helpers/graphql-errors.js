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

function GQLRelationNotExists(type, value, is_id = true) {
  return new ApolloError(
    `'${type}' with ${is_id ? 'ID' : 'name'} '${value} not exists.`,
    'RELATION_NOT_EXISTS'
  );
}

module.exports = {
  GQLNotFoundByID,
  GQLNotFoundByName,
  GQLRelationNotExists,
};
