const context = require('../api/context').createContext();
const prisma = context.prisma;

const permissionsList = {
  god: [
    'Logement:view',
    'Logement:add',
    'Logement:edit',
    'Logement:delete',
    'Evenement:view',
    'Evenement:add',
    'Employe:view',
    'Employe:add',
    'Employe:edit',
    'Employe:delete',
    'LogementType:view',
    'Role:view',
    'Reservation:view',
    'Reservation:add',
    'Reservation:edit',
    'Reservation:delete',
    'EtatLieu:view',
    'EtatLieu:add',
    'Client:view',
    'Client:add',
    'Client:edit',
    'Client:delete',
  ],
  employee: [
    'Logement:view',
    'Logement:edit',
    'Evenement:view',
    'Evenement:add',
    'Employe:view',
    'Employe:add',
    'Employe:edit',
    'LogementType:view',
    'Role:view',
    'Reservation:view',
    'Reservation:add',
    'Reservation:edit',
    'EtatLieu:view',
    'EtatLieu:add',
    'Client:view',
  ],
  manager: [
    'Logement:view',
    'Logement:add',
    'Logement:edit',
    'Logement:delete',
    'Evenement:view',
    'Evenement:add',
    'Evenement:delete',
    'Employe:view',
    'Employe:add',
    'Employe:edit',
    'Employe:delete',
    'LogementType:view',
    'Role:view',
    'Reservation:view',
    'Reservation:add',
    'Reservation:edit',
    'Reservation:delete',
    'EtatLieu:view',
    'EtatLieu:add',
    'Client:view',
    'Client:add',
    'Client:edit',
    'Client:delete',
  ],
};

(async () => {
  console.log('Seeding database with new data...');

  for (scope in permissionsList) {
    try {
      await prisma.role.deleteMany({
        where: { name: scope },
      });
    } catch (err) {
      console.error(err);
    }

    for (idx in permissionsList[scope]) {
      const permission = permissionsList[scope][idx];

      try {
        await prisma.role.create({
          data: {
            name: scope,
            permission,
          },
        });

        console.log(`Role '${scope}' with permission '${permission}' created.`);
      } catch (err) {
        console.error(err);
      }
    }
  }

  console.log('Done!');
  process.exit(0);
})();
