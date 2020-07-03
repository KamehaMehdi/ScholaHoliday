import gq from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const clientParameters = `{
  id
  name
  address
  phone_number
  email
  banned
  created_at
  deleted_at
}`

export const Clients = {
  get: () => useQuery(gq`
  {
    Clients ${clientParameters}
  }
  `),
  getOne: (id) => useQuery(gq`
  {
    Client(id: ${id}) ${clientParameters}
  }
  `),
  addOne: ({name, address, phone_number, email}) => useMutation(gq`
  mutation {
    setClient(
      name: "${name}",
      address: "${address}",
      phone_number: "${phone_number}",
      email: "${email}"
    ) ${clientParameters}
  }
  `),
  updateOne: (id, input) => useMutation(gq`
  mutation {
    updateClient(id: ${id}, input: ${input}) ${clientParameters}
  }
  `),
  deleteOne: (id) => useMutation(gq`
  mutation {
    deleteClient(id: ${id}) {
      affected_rows
    }
  }
  `)
}