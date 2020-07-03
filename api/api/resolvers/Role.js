const { GQLNotFoundByName } = require('../helpers/graphql-errors');
const context = require('../context').createContext();
const prisma = context.prisma;

async function RoleCollection() {
  const results = await prisma.role.findMany();
  const scopes = {};

  for (Result in results) {
    const result = results[Result];
    const scope = result.name;

    if (
      Object.keys(scopes).includes(scope) &&
      !scopes[scope].permissions.includes(result.permission)
    ) {
      scopes[scope].permissions.push(result.permission);
    } else {
      scopes[scope] = {
        id: result.id,
        name: scope,
        permissions: [result.permission],
      };
    }
  }

  return Object.values(scopes);
}

async function getRoleByName(args) {
  const results = await prisma.role.findMany({
    where: { name: args.name },
  });

  if (results.length == 0) return GQLNotFoundByName('Role', args.name);

  const permissions = [];

  for (Result in results) {
    const result = results[Result];
    permissions.push(result.permission);
  }

  return {
    id: results[0].id,
    name: results[0].name,
    permissions,
  };
}

module.exports = {
  RoleCollection,
  getRoleByName,
};
