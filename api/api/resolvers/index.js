const GQLScalars = require('graphql-scalars');

const Logement = require('./Logements');
const LogementType = require('./LogementType');
const Role = require('./Role');

module.exports = {
  Query: {
    // Collections
    Logements: () => Logement.LogementCollection(),
    LogementTypes: () => LogementType.LogementTypeCollection(),
    Evenements: () => '',
    Employes: () => '',
    Roles: () => Role.RoleCollection(),
    Reservations: () => '',
    EtatsLieux: () => '',
    Clients: () => '',

    //Simple queries
    Logement: (_parent, args) => Logement.getLogement(args),
    LogementType: (_parent, args) => LogementType.getLogementType(args),
    Evenement: (_parent, args) => '',
    Employe: (_parent, args) => '',
    Role: (_parent, args) => Role.getRoleByName(args),
    Reservation: (_parent, args) => '',
    EtatLieu: (_parent, args) => '',
    Client: (_parent, args) => '',
  },

  // Mutations
  Mutation: {
    setLogement: (_parent, args) => Logement.setLogement(args),
    updateLogement: (_parent, args) => Logement.updateLogement(args),
    deleteLogement: (_parent, args) => Logement.deleteLogement(args),
  },

  // Custom Scalars
  DateTime: GQLScalars.DateTimeResolver,
};
