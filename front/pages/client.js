import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import { style } from 'typestyle'
import { Clients } from '../src/queries/Clients'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default () => {
  const client = new ApolloClient({
    uri: 'http://127.0.0.1:8765/ql'
  })

  return (
    <ApolloProvider client={client}>
      <SimpleTable />
    </ApolloProvider>
  )
}
const SimpleTable = () => {
  const classes = useStyles();

  const { data } = Clients.get()

  const [clientToModify, setClientToModify] = React.useState()
  const [isModifyClientOpen, setIsModifyClientOpen] = React.useState(false);
  const openModifyClient = () => setIsModifyClientOpen(true)
  const closeModifyClient = () => setIsModifyClientOpen(false)

  const [isCreateClientOpen, setIsCreateClientOpen] = React.useState(false)
  const openCreateClient = () => setIsCreateClientOpen(true)
  const closeCreateClient = () => setIsCreateClientOpen(false)

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Addresse</TableCell>
            <TableCell align="right">Téléphone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Bannie</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data !== undefined && data.Clients.map((row) => (
            <TableRow onClick={() => {
              openModifyClient()
              setClientToModify(row)
            }} className={style({
              $nest: {
                "&:hover": {
                  backgroundColor: 'lightgrey',
                  cursor: 'pointer'
                }
              }
            })} key={row.name}>
              <TableCell component="th" scope="row"> {row.name}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phone_number}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.banned ? "Oui" : "Non"}</TableCell>
              <TableCell align="right">{new Date(row.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal className={style({
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center'
      })} onClose={closeModifyClient} open={isModifyClientOpen}>
        <ModifyClient clientToModify={clientToModify} />
      </Modal>
    </TableContainer>
          <Button onClick={openCreateClient} variant='contained' color='primary'>
          Ajouter
        </Button>
        <Modal className={style({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })} onClose={closeCreateClient} open={isCreateClientOpen}>
          <AddClient/>
        </Modal>
        </>
  );
}

const AddClient = () => {

  const reducer = (state, change) => {
    switch (change.type) {
      case 'name':
        return {...state, name: change.payload}
      case 'address':
        return {...state, address: change.payload}
      case 'phone_number':
        return {...state, phone_number: change.payload}
      case 'email':
        return {...state, email: change.payload}
    }
  }
  const [client, dispatch] = React.useReducer(reducer, { client: "", address: "", phone_number: "", email: "" })
  const [createClient] = Clients.addOne(client)

  return (
    <Card className={style({
      width: '50%'
    })}>
      <CardHeader title={`Ajouter un client`} />
      <CardContent className={style({
        display: 'flex',
        flexDirection: 'column'
      })}>
        <TextField onChange={el => dispatch({type: 'name', payload:el.target.value})} value={client.name} label='Nom' />
        <TextField onChange={el => dispatch({type: 'address', payload:el.target.value})} value={client.address} label='Adresse' />
        <TextField onChange={el => dispatch({type: 'phone_number', payload:el.target.value})} value={client.phone_number} label='Numéro de téléphone' />
        <TextField onChange={el => dispatch({type: 'email', payload:el.target.value})} value={client.email} label='Email' />
      </CardContent>
      <CardActions>
        <Button onClick={() => {
          createClient()
          window.location.reload()
          }} variant='contained' color='primary'> Ajouter </Button>
      </CardActions>
    </Card>
  )
}

const ModifyClient = ({clientToModify}) => {

  const reducer = (state, change) => {
    switch (change.type) {
      case 'banned':
        return {...state, banned: !state.banned}
      case 'name':
        return {...state, name: change.payload}
      case 'address':
        return {...state, address: change.payload}
      case 'phone_number':
        return {...state, phone_number: change.payload}
      case 'email':
        return {...state, email: change.payload}
    }
  }
  const [client, dispatch] = React.useReducer(reducer, {
    name: clientToModify.name,
    address: clientToModify.address,
    phone_number: clientToModify.phone_number,
    email: clientToModify.email,
    banned: clientToModify.banned
  });

  const [queryToSend, setQueryToSend] = React.useState("")

  React.useEffect(() => {
    const nameString = `name: "${client.name}", `
    const addressString = `address: "${client.address}", `
    const phoneNumberString = `phone_number: "${client.phone_number}", `
    const emailString = `email: "${client.email}",`
    const bannedString = `banned: ${client.banned}`

    let query = ""

    if (client.name !== clientToModify.name) {
      query = query + nameString
    } else if (client.address !== clientToModify.address) {
      query = query + addressString
    } else if (client.phone_number !== clientToModify.phone_number) {
      query = query + phoneNumberString
    } else if (client.email !== clientToModify.email) {
      query = query + emailString
    } else if (client.banned !== clientToModify.banned) {
      query = query + bannedString
    }
    setQueryToSend(query)

  }, [client])

  const modifyClient = () => {

    if (queryToSend.string !== "") {
      console.log({queryToSend})
      updateClient()
    }

  }

  const [updateClient] = Clients.updateOne(clientToModify.id, queryToSend)
  const [deleteClient] = Clients.deleteOne(clientToModify.id)

  return (
    <Card className={style({
      width: '50%'
    })}>
      <CardHeader action={
                <FormControlLabel
                onChange={() => dispatch({type: 'banned'})}
                value='banned'
                label="Banni"
                labelPlacement="left"
                control={<Switch defaultChecked={clientToModify.banned} checked={client.banned} color='secondary'/>}
              />
      } title={`Modifier ${client.name}`} />
      <CardContent className={style({
        display: 'flex',
        flexDirection: 'column'
      })}>
        <TextField onChange={el => dispatch({type: 'name', payload:el.target.value})} value={client.name} label='Nom' />
        <TextField onChange={el => dispatch({type: 'address', payload:el.target.value})} value={client.address} label='Adresse' />
        <TextField onChange={el => dispatch({type: 'phone_number', payload:el.target.value})} value={client.phone_number} label='Numéro de téléphone' />
        <TextField onChange={el => dispatch({type: 'email', payload:el.target.value})} value={client.email} label='Email' />
      </CardContent>
      <CardActions>
        <Button onClick={() => {
          deleteClient()
          window.location.reload()
          }} color='secondary'> Supprimer </Button>
        <Button onClick={modifyClient} variant='contained' color='primary'> Modifier </Button>
      </CardActions>
    </Card>
  )

}