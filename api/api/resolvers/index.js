const Logements = require('./Logements');
const LogementType = require('./LogementType');

module.exports = {
  Query: {
    // Collections
    Logements: () => Logements.Logements(),
    LogementTypes: () => LogementType.LogementTypeCollection(),
    Evenements: () => '',
    Employes: () => '',
    Roles: () => '',
    Reservations: () => '',
    EtatsLieux: () => '',
    Clients: () => '',

    //Simple queries
    Logement: (_parent, args) => '',
    LogementType: (_parent, args) => LogementType.getLogementType(args),
    Evenement: (_parent, args) => '',
    Employe: (_parent, args) => '',
    Role: (_parent, args) => '',
    Reservation: (_parent, args) => '',
    EtatLieu: (_parent, args) => '',
    Client: (_parent, args) => '',
  },
};
