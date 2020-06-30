const { GQLNotFoundByID } = require('../helpers/graphql-errors');
const context = require('../context').createContext();
const prisma = context.prisma;

async function LogementTypeCollection() {
  return await prisma.logementType.findMany();
}

async function getLogementType(args) {
  const result = await prisma.logementType.findOne({
    where: { id: args.id },
  });

  return result === null ? GQLNotFoundByID('LogementType', args.id) : result;
}

module.exports = {
  LogementTypeCollection,
  getLogementType,
};
