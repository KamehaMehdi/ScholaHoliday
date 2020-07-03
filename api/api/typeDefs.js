const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Custom scalars
  scalar DateTime

  type Query {
    # Collections
    Logements: [Logement]
    LogementTypes: [LogementType]
    Evenements: [Evenement]
    Employes: [Employe]
    Roles: [Role]
    Reservations: [Reservation]
    EtatsLieux: [EtatLieu]
    Clients: [Client]

    # Simple queries
    Logement(id: String!): Logement
    LogementType(id: String!): LogementType
    Evenement(id: String!): Evenement
    Employe(id: String!): Employe
    Role(name: String!): Role
    Reservation(id: String!): Reservation
    EtatLieu(id: String!): EtatLieu
    Client(id: String!): Client
  }

  type Mutation {
    setLogement(
      name: String!
      description: String!
      LogementType: String!
      number: Int!
      in_maintenance: Boolean = false
    ): Logement
    updateLogement(id: String!, input: LogementInput): Logement
    deleteLogement(id: String!): AffectedRows

    setClient(
      name: String!
      address: String!
      phone_number: String!
      email: String!
      banned: Boolean = false
    ): Client
    updateClient(id: String!, input: ClientInput): Client
    deleteClient(id: String!): AffectedRows
    setReservation(input: ReservationInput): Reservation
    updateReservation(id: String!, input: ReservationInput): Reservation
    deleteReservation(id: String!): AffectedRows
    setReservationCheckIn(id: String!, check_in: String!):AffectedRows
    setReservationCheckOut(id: String!, check_out: String!): AffectedRows
  }

  type Logement {
    id: String!
    name: String!
    description: String!
    LogementType: LogementType!
    number: Int!
    in_maintenance: Boolean
    created_at: DateTime!
    deleted_at: DateTime
  }

  type LogementType {
    id: String!
    name: String!
    price: Int!
  }

  type Evenement {
    id: String!
    Logement: Logement!
    Employe: Employe!
    tache: String!
    created_at: DateTime!
    deleted_at: DateTime
  }

  type Employe {
    id: String!
    name: String!
    Role: Role!
    username: String!
    email: String!
    disabled: Boolean!
    created_at: DateTime!
  }

  type Role {
    id: String!
    name: String!
    permissions: [String]!
  }

  type Reservation {
    id: String!
    Client: Client!
    Logement: [Logement]!
    price: Int!
    start_date: DateTime!
    end_date: DateTime!
    check_in: DateTime
    check_out: DateTime
    created_at: DateTime!
    deleted_at: DateTime
  }

  type EtatLieu {
    id: String!
    Reservation: Reservation!
    Logement: Logement!
    Employe: Employe!
    report: String!
    created_at: DateTime!
  }

  type Client {
    id: String!
    name: String!
    address: String
    phone_number: String
    email: String!
    banned: Boolean
    created_at: DateTime!
    deleted_at: DateTime
  }

  type AffectedRows {
    affected_rows: Int!
  }

  # Inputs
  input LogementInput {
    name: String
    description: String
    LogementType: String
    number: Int
    in_maintenance: Boolean
  }

  input ClientInput {
    name: String
    address: String
    phone_number: String
    email: String
    banned: Boolean
  }

  input ReservationInput{
    Client: String
    Logement: [String]
    price: Int
    start_date: DateTime
    end_date: DateTime
  }
`;

module.exports = {
  typeDefs,
};
