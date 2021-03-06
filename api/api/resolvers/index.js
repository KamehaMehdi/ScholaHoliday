const GQLScalars = require('graphql-scalars');

const Client = require('./Client');
const Logement = require('./Logements');
const LogementType = require('./LogementType');
const Role = require('./Role');
const Resevation = require('./Reservations');

module.exports = {
  Query: {
    // Collections
    Logements: () => Logement.LogementCollection(),
    LogementTypes: () => LogementType.LogementTypeCollection(),
    Evenements: () => '',
    Employes: () => '',
    Roles: () => Role.RoleCollection(),
    Reservations: () => Reservation.reservationCollection(),
    EtatsLieux: () => '',
    Clients: () => Client.clientCollection(),

    //Simple queries
    Logement: (_parent, args) => Logement.getLogement(args),
    LogementType: (_parent, args) => LogementType.getLogementType(args),
    Evenement: (_parent, args) => '',
    Employe: (_parent, args) => '',
    Role: (_parent, args) => Role.getRoleByName(args),
    Reservation: (_parent, args) => Reservation.getReservation(args),
    EtatLieu: (_parent, args) => '',
    Client: (_parent, args) => Client.getClient(args),
  },

  // Mutations
  Mutation: {
    setLogement: (_parent, args) => Logement.setLogement(args),
    updateLogement: (_parent, args) => Logement.updateLogement(args),
    deleteLogement: (_parent, args) => Logement.deleteLogement(args),
    setClient: (_parent, args) => Client.setClient(args),
    updateClient: (_parent, args) => Client.updateClient(args),
    deleteClient: (_parent, args) => Client.deleteClient(args),
    setReservation: (_parent, args) => Resevation.setReservation(args),
    updateReservation:(_parent, args) => Resevation.updateReservation(args),
    deleteReservation: (_parent, args) => Resevation.deleteReservation(args),
    setReservationCheckIn: (_parent, args) => Resevation.setReservationCheckIn(args),
    setReservationCheckOut: (_parent, args) => Resevation.setReservationCheckOut(args),
  },

  // Custom Scalars
  DateTime: GQLScalars.DateTimeResolver,
};
