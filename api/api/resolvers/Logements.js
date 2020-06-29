const context = require('../context').createContext();
const prisma = context.prisma;

async function Logements() {
  const bla = await prisma.logement.findMany();

  return bla;
}

module.exports = {
  Logements,
};
