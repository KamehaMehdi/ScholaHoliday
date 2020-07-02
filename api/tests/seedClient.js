const faker = require('faker');

const { LogementTypes } = require('./seedLogementType');
const context = require('../api/context').createContext();
const prisma = context.prisma;

(async () => {
  console.log('Seeding database with new data...');
  const name = {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
  };
  const data = {
    name: `${name.first} ${name.last}`,
    address:
      `${faker.address.streetAddress(true)}, ${faker.address.zipCode()} ` +
      `${faker.address.city()}, ${faker.address.country()}`,
    phone_number: faker.phone.phoneNumber(),
    email: faker.internet.email(name.first, name.last),
    banned: Boolean(Math.round(Math.random())),
  };

  console.log('Creating new Client with: ', data);

  try {
    await prisma.client.create({ data });

    console.log(`Client '${data.name}' created.`);
  } catch (err) {
    console.error(err);
  }

  console.log('Done!');
  process.exit(0);
})();
