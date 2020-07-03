const {
  GQLNotFoundByID,
  GQLRelationNotExists,
} = require('../helpers/graphql-errors');

const context = require('../context').createContext();
const prisma = context.prisma;

async function reservationCollection(){
  const results = await prisma.resevation.findMany({
    where: { deleted_at: null },
  });

  for (idx in results) {
    const clientId = results[idx].client;
    const client = await prisma.client.findOne({
      where: { id: clentId },
    });

    results[idx].Client = client;
  }

  return results;
}
async function getReservation(args){
  const result = await prisma.reservation.findOne({
    where: { id: args.id },
  });

  if (result === null) return GQLNotFoundByID('Resevation', args.id);

  const client = await prisma.Client.findOne({
    where: { id: result.client },
  });

  result.Client = client;

  return result;
}
async function setReservation(args){
  // TODO: for logements eists
  const payload = args;

  // Check if Client exists
  const client = await prisma.Client.findOne({
    where: { id: payload.client },
  });

  if (client === null || client.banned == true)
    return new GQLRelationNotExists('client', payload.Client);

  payload.Client = {
    connect: { id: client.id },
  };
  //check if logements exists
  if (logements in payload){
    payload.logements.forEach((lgt, i) => {
      const logement = await.prisma.logement.findOne({
        where: { id: lgt.id },
      });
      if(logement === null || logement.deleted_at != null){}{
        return new GQLRelationNotExists('Logement', i);
      }
    });
  }
  const result = await prisma.Reservation.create({ data: payload });

  result.Client = client;
  return result;
}
async function updateReservation(args){
  // TODO: for logements eists
  const data = JSON.parse(JSON.stringify(args.input));

  const currentReservation = await prisma.Resevation.findOne({
    where: { id: args.id },
  });

  if (currentReservation === null || currentReservation.deleted_at != null)
    return new GQLRelationNotExists('Resevation', args.id);
    //check if logements exists
    if (logements in payload){
      payload.logements.forEach((lgt, i) => {
        const logement = await.prisma.logement.findOne({
          where: { id: lgt},
        });
        if(logement === null || logement.deleted_at != null){}{
          return new GQLRelationNotExists('Logement', i);
        }
      });
    }
  // Check if Client have been sent in the payload
  if ('Client' in data) {
    var client = await prisma.Client.findOne({
      where: { id: data.Client },
    });

    if (client === null)
      return new GQLRelationNotExists('Client', data.Client);

    data.Client = {
      connect: { id: client.id },
    };
  }else {
    var client = await prisma.client.findOne({
      where: { id: currentReservation.client },
    });
  }

  const editedReservation = await prisma.Resevation.update({
    where: { id: args.id },
    data,
  });

  editedReservation.Client = client;
  return editedReservation;
}
async function deleteReservation(args){

  const currentReservation = await prisma.Reservation.findOne({
  where: { id: args.id },
  });

  if (currentReservation === null || currentReservation.deleted_at != null) return;
  if (currentReservation.check_in < new Date() && currentReservation.check_out === null) {
    return;
  }
  await prisma.Resevation.update({
    where: { id: args.id },
    data: { deleted_at: new Date() },
  });

  return { affected_rows: 1 };
}
async function setReservationCheckIn(args){
  const currentReservation = await prisma.Reservation.findOne({
  where: { id: args.id },
  });

  if (currentReservation === null || currentReservation.deleted_at != null) return;
  if (currentReservation.check_in != null) return;
  const check_in = await prisma.EtatLieu.findOne({
  where: { id: args.check_in },
  });
  if (check_in === null || check_in.deleted_at != null)return;
  await prisma.Resevation.update({
    where: { id: args.id },
    data: { check_in: new Date() },
  });
}
async function setReservationCheckOut(args){
  const currentReservation = await prisma.Reservation.findOne({
  where: { id: args.id },
  });

  if (currentReservation === null || currentReservation.deleted_at != null) return;
  if (currentReservation.check_in === null) return;
  const check_out = await prisma.EtatLieu.findOne({
  where: { id: args.check_in },
  });
  if (check_out === null || check_out.deleted_at != null)return;
  await prisma.Resevation.update({
    where: { id: args.id },
    data: { check_out: new Date() },
  });
}

module.exports = {
  reservationCollection,
  getReservation,
  setReservation,
  updateReservation,
  deleteReservation,
  setReservationCheckIn,
  setReservationCheckOut,
};
