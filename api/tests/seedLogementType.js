const context = require('../api/context').createContext();
const prisma = context.prisma;

const LogementTypes = [
  { name: 'Premium', price: 1500.0 },
  { name: 'VIP', price: 2000.0 },
];

(async () => {
  console.log('Seeding database with new data...');

  for (idx in LogementTypes) {
    const name = LogementTypes[idx].name;
    const val = await prisma.logementType.findOne({
      where: { name },
    });

    if (val === null) {
      try {
        await prisma.logementType.create({
          data: LogementTypes[idx],
        });

        console.log(`LogementType '${name}' created.`);
      } catch (err) {
        console.error(err);
      }
    }
  }

  console.log('Done!');
  process.exit(0);
})();

module.exports = {
  LogementTypes,
};
