const Logements = require('./Logements');

module.exports = {
  Query: {
    // Collections
    Logements: () => Logements.Logements(),
    LogementTypes: () => '',
    Evenements: () => '',
    Employes: () => '',
    Roles: () => '',
    Reservations: () => '',
    EtatsLieux: () => '',
    Clients: () => '',

    //Simple queries
    Logement: (id) => '',
    LogementType: (id) => '',
    Evenement: (id) => '',
    Employe: (id) => '',
    Role: (id) => '',
    Reservation: (id) => '',
    EtatLieu: (id) => '',
    Client: (id) => '',
  },
};
