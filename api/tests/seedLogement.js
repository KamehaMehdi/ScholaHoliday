const faker = require('faker');

const { LogementTypes } = require('./seedLogementType');
const context = require('../api/context').createContext();
const prisma = context.prisma;

(async () => {
  console.log('Seeding database with new data...');

  const randomType =
    LogementTypes[Math.floor(Math.random() * LogementTypes.length)];
  const logementType = await prisma.logementType.findOne({
    where: { name: randomType.name },
  });

  const data = {
    name: `${
      randomType.name
    } ${faker.name.lastName()} ${faker.commerce.color()}`,
    description: faker.lorem.paragraph(2),
    LogementType: {
      connect: { id: logementType.id },
    },
    number: faker.random.number(50),
    in_maintenance: Boolean(Math.round(Math.random())),
  };

  console.log('Creating new logement with: ', data);

  try {
    await prisma.logement.create({ data });

    console.log(`Logement '${data.name}' created.`);
  } catch (err) {
    console.error(err);
  }

  console.log('Done!');
  process.exit(0);
})();
