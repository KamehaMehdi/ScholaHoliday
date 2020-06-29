const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    Role(id: String!): Role
    Reservation(id: String!): Reservation
    EtatLieu(id: String!): EtatLieu
    Client(id: String!): Client
  }

  #   type Mutation {
  #     addClient(
  #       name: String!
  #       phone_number: String!
  #       email: String!
  #       address: String
  #     ): Client
  #   }

  type Logement {
    id: String!
    name: String!
    Logement: Logement!
    location: String!
    default_price: Int!
    in_maintenance: Boolean
  }

  type LogementType {
    id: String!
    name: String!
  }

  type Evenement {
    id: String!
    Logement: Logement!
    Employe: Employe!
    tache: String!
    created_at: String!
  }

  type Employe {
    id: String!
    name: String!
    Role: Role!
    username: String!
    email: String!
    disabled: Boolean!
    created_at: String!
  }

  type Role {
    id: String!
    name: String!
    permission: String!
  }

  type Reservation {
    id: String!
    Client: Client!
    Logement: Logement!
    price: Int!
    start_date: String!
    end_date: String!
    check_in: String
    check_out: String
  }

  type EtatLieu {
    id: String!
    Reservation: Reservation!
    Logement: Logement!
    Employe: Employe!
    report: String!
    created_at: String!
  }

  type Client {
    id: String!
    name: String!
    address: String
    phone_number: String
    email: String!
    banned: Boolean
    created_at: String!
  }
`;

module.exports = {
  typeDefs,
};
