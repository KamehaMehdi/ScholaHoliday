const validator = require('validator');
const phonenumber = require('google-libphonenumber');
const { ApolloError } = require('apollo-server-express');

const {
  GQLRelationNotExists,
  GQLAlreadyUsed,
} = require('../helpers/graphql-errors');

const context = require('../context').createContext();
const prisma = context.prisma;

async function validateData(payload) {
  if ('email' in payload && !validator.default.isEmail(payload.email)) {
    throw new ApolloError(
      `The e-mail '${payload.email}' is not a valid email address.`,
      'VALIDATION_EMAIL_NOT_VALID'
    );
  }

  const phoneValidator = phonenumber.PhoneNumberUtil.getInstance();
  if ('phone_number' in payload) {
    try {
      var phone = phoneValidator.parse(payload.phone_number);
    } catch (err) {
      throw new ApolloError(err.message, 'VALIDATION_PHONENUMBER_NOT_VALID');
    }

    if (!phoneValidator.isValidNumber(phone)) {
      throw new ApolloError(
        `Phone number '${payload.phone_number}' is not a valid phone number.`,
        'VALIDATION_PHONENUMBER_NOT_VALID'
      );
    }

    if ('name' in payload) {
      const client = await prisma.client.findOne({
        where: { name: payload.name },
      });

      if (client != null) throw new GQLAlreadyUsed('name', payload.name);
    }

    if ('email' in payload) {
      const client = await prisma.client.findOne({
        where: { email: payload.email },
      });

      if (client != null) throw new GQLAlreadyUsed('email', payload.email);
    }
  }
}

async function clientCollection() {
  return await prisma.client.findMany({
    where: { deleted_at: null },
  });
}

async function getClient(args) {
  return await prisma.client.findOne({
    where: { id: args.id },
  });
}

async function setClient(args) {
  const payload = args;

  await validateData(args);

  return await prisma.client.create({ data: payload });
}

async function updateClient(args) {
  const data = JSON.parse(JSON.stringify(args.input));

  const currentClient = await prisma.client.findOne({
    where: { id: args.id },
  });

  if (currentClient === null || currentClient.deleted_at != null)
    return new GQLRelationNotExists('Client', args.id);

  await validateData(data);

  return await prisma.client.update({
    where: { id: args.id },
    data,
  });
}

async function deleteClient(args) {
  const currentCustomer = await prisma.client.findOne({
    where: { id: args.id },
  });

  if (currentCustomer === null || currentCustomer.deleted_at != null) return;

  const reservations = await prisma.reservation.findMany({
    where: {
      client: args.id,
    },
  });

  if (reservations.length != 0)
    return new ApolloError(
      `Customer ${args.id} (${currentCustomer.name}) have reservations ` +
        `planned. Unable to delete it.`
    );

  await prisma.client.update({
    where: { id: args.id },
    data: { deleted_at: new Date() },
  });

  return { affected_rows: 1 };
}

module.exports = {
  clientCollection,
  getClient,
  setClient,
  updateClient,
  deleteClient,
};
