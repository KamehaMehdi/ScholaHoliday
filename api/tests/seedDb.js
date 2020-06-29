const faker = require('faker');

const context = require('../api/context').createContext();
const prisma = context.prisma;

async function fillLogementType() {
  const types = ['vila', 'bungalow', 'terrain'];

  for (idx in types) {
    const name = types[idx];
    const val = await prisma.logementType.findOne({
      where: { name },
    });

    if (val === null) {
      try {
        await prisma.logementType.create({
          data: { name },
        });

        console.log(`LogementType '${name}' created.`);
      } catch(err) {
        console.error(err);
      }
    }
  }
}

async function fillLogement() {

}

async function main() {
  console.log('Seeding database with new data...');
  await fillLogementType();

  console.log('Done!');
  process.exit(0);
}

(async () => main())();
