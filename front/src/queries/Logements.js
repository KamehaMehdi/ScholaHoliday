import gq from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const logementParameters = `{
  id
  name
  number
  description
  LogementType {
    id
    name
    price
  }
  in_maintenance
  created_at
  deleted_at
}
`

export const Logements = {
  get: () => useQuery(gq`
  {
    Logements ${logementParameters}
  }
  `),
  getOne: (id) => useQuery(gq`
  {
    Logement(id: ${id}) ${logementParameters}
  }
  `),
  addOne: ({name, description, LogementType, number}) => useMutation(gq`
    mutation {
      setLogement(
        name: "${name}",
        description: "${description}",
        number: "${number}"
        LogementType: "${LogementType}",
      ) ${logementParameters}
    }
  `),
  updateOne: (id, input) => useMutation(gq`
    mutation {
      updateLocation(id: ${id}, input: ${input}) ${logementParameters}
    }
  `),
  deleteOne: (id) => useMutation(gq`
    mutation {
      deleteLocation(id: ${id}) { affected_rows }
    }
  `)
}