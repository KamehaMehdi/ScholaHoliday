const {
  GQLNotFoundByID,
  GQLRelationNotExists,
} = require('../helpers/graphql-errors');

const context = require('../context').createContext();
const prisma = context.prisma;

async function LogementCollection() {
  const results = await prisma.logement.findMany({
    where: { deleted_at: null },
  });

  for (idx in results) {
    const logementTypeId = results[idx].type;
    const logementType = await prisma.logementType.findOne({
      where: { id: logementTypeId },
    });

    results[idx].LogementType = logementType;
  }

  return results;
}

async function getLogement(args) {
  const result = await prisma.logement.findOne({
    where: { id: args.id },
  });

  if (result === null) return GQLNotFoundByID('Logement', args.id);

  const logementType = await prisma.logementType.findOne({
    where: { id: result.type },
  });

  result.LogementType = logementType;

  return result;
}

async function setLogement(args) {
  const payload = args;

  // Check if LogementType exists
  const logementType = await prisma.logementType.findOne({
    where: { id: payload.LogementType },
  });

  if (logementType === null)
    return new GQLRelationNotExists('LogementType', payload.LogementType);

  payload.LogementType = {
    connect: { id: logementType.id },
  };

  const result = await prisma.logement.create({ data: payload });

  result.LogementType = logementType;
  return result;
}

async function updateLogement(args) {
  const data = JSON.parse(JSON.stringify(args.input));

  const currentLogement = await prisma.logement.findOne({
    where: { id: args.id },
  });

  if (currentLogement === null || currentLogement.deleted_at != null)
    return new GQLRelationNotExists('Logement', args.id);

  // Check if LogementType have been sent in the payload
  if ('LogementType' in data) {
    var logementType = await prisma.logementType.findOne({
      where: { id: data.LogementType },
    });

    if (logementType === null)
      return new GQLRelationNotExists('LogementType', data.LogementType);

    data.LogementType = {
      connect: { id: logementType.id },
    };
  } else {
    var logementType = await prisma.logementType.findOne({
      where: { id: currentLogement.type },
    });
  }

  const editedLogement = await prisma.logement.update({
    where: { id: args.id },
    data,
  });

  editedLogement.LogementType = logementType;
  return editedLogement;
}

async function deleteLogement(args) {
  // TODO: Check if the logement is still used or not by reservations

  const currentLogement = await prisma.logement.findOne({
    where: { id: args.id },
  });

  if (currentLogement === null || currentLogement.deleted_at != null) return;

  await prisma.logement.update({
    where: { id: args.id },
    data: { deleted_at: new Date() },
  });

  return { affected_rows: 1 };
}

module.exports = {
  LogementCollection,
  getLogement,
  setLogement,
  updateLogement,
  deleteLogement,
};
