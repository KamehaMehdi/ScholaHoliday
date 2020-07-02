const GQLScalars = require('graphql-scalars');

const Logements = require('./Logements');
const LogementType = require('./LogementType');
const Role = require('./Role');

module.exports = {
  Query: {
    // Collections
    Logements: () => Logements.Logements(),
    LogementTypes: () => LogementType.LogementTypeCollection(),
    Evenements: () => '',
    Employes: () => '',
    Roles: () => Role.RoleCollection(),
    Reservations: () => '',
    EtatsLieux: () => '',
    Clients: () => '',

    //Simple queries
    Logement: (_parent, args) => '',
    LogementType: (_parent, args) => LogementType.getLogementType(args),
    Evenement: (_parent, args) => '',
    Employe: (_parent, args) => '',
    Role: (_parent, args) => Role.getRoleByName(args),
    Reservation: (_parent, args) => '',
    EtatLieu: (_parent, args) => '',
    Client: (_parent, args) => '',
  },

  // Custom Scalars
  DateTime: GQLScalars.DateTimeResolver,
};
