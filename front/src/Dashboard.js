import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


import PersonIcon from '@material-ui/icons/Person'
import WorkIcon from '@material-ui/icons/Work'
import HotelIcon from '@material-ui/icons/Hotel'
import DescriptionIcon from '@material-ui/icons/Description'

import Link from 'next/link'
import { style } from 'typestyle'

import { Clients } from './queries/Clients'
import { Logements } from './queries/Logements';

const CardRow = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around'
})

const CardStyle = {
  root: style({
    // minWidth: 275,
    maxWidth: '30%',
    overflow: 'scroll'
  }),
  bullet: style({
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  }),
  title: style({
    fontSize: 14,
  }),
  pos: style({
  marginBottom: 12,
  }),
};

export const Dashboard = () => {
  return (
    <div className={style({
      display: 'flex',
      flexDirection: 'column',
      width: '80%'
    })}>
      <div className={CardRow}>
        <ClientCard/>
        <LogementCard/>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className={CardRow}>
        <ReservationCard/>
        <PersonelCard/>
      </div>
    </div>
  )
}


const ClientCard = () => {

  const { data } = Clients.get();

  return (
    <Card className={CardStyle.root}>
      <CardContent>
        <PersonIcon/>
        <Typography variant="h5" component="h2">
          Gestion des clients
        </Typography>
        <div className={style({ overflow: 'scroll' })}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Addresse</TableCell>
              <TableCell align="right">Téléphone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Bannie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data !== undefined && data.Clients.filter((client, index) => index < 3).map(client => {
                return (
                  <TableRow key={client.id}>
                    <TableCell align="right" children={client.name} />
                    <TableCell align="right" children={client.address} />
                    <TableCell align="right" children={client.phone_number} />
                    <TableCell align="right" children={client.email} />
                    <TableCell align="right" children={client.created_at} />
                    <TableCell align="right" children={client.banned ? "Oui" : "Non"} />
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
              </div>
      </CardContent>
      <CardActions>
        <Link href='/client'>
          <Button size="small">Accéder</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

const LogementCard = () => {

  const { data } = Logements.get()

  return (
    <Card className={CardStyle.root}>
      <CardContent>
        <HotelIcon/>
        <Typography variant="h5" component="h2">
          Gestion des logements
        </Typography>
        <div className={style({ overflow: 'scroll '})}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Nom</TableCell>
                <TableCell align="right">Type de location</TableCell>
                <TableCell align="right">Nombre disponible</TableCell>
                <TableCell align="right">Maintenance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data !== undefined && data.Logements.filter((logement, index) => index < 3).map(logement => {
                return (
                  <TableRow key={logement.id}>
                    <TableCell align="right" children={logement.name} />
                    <TableCell align="right" children={logement.LogementType.name} />
                    <TableCell align="right" children={logement.number} />
                    <TableCell align="right" children={logement.in_maintenance ? "Oui" : "Non"} />
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardActions>
        <Link href='/logement'>
          <Button size="small">Accéder</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

const ReservationCard = () => {
  return (
    <Card className={CardStyle.root}>
      <CardContent>
        <DescriptionIcon/>
        <Typography variant="h5" component="h2">
          Gestion des réservations
        </Typography>
      </CardContent>
      <CardActions>
        <Link href='/reservation'>
          <Button size="small">Accéder</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

const PersonelCard = () => {
  return (
    <Card className={CardStyle.root}>
      <CardContent>
        <WorkIcon/>
        <Typography variant="h5" component="h2">
          Gestion du personel
        </Typography>
      </CardContent>
      <CardActions>
        <Link href='/personel'>
          <Button size="small">Accéder</Button>
        </Link>
      </CardActions>
    </Card>
  )
}
