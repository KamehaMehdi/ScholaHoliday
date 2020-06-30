import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import PersonIcon from '@material-ui/icons/Person'
import WorkIcon from '@material-ui/icons/Work'
import HotelIcon from '@material-ui/icons/Hotel'
import DescriptionIcon from '@material-ui/icons/Description'

import Link from 'next/link'
import { style } from 'typestyle'

const CardRow = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around'
})

const CardStyle = {
  root: style({
    minWidth: 275,
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
      marginTop: 200,
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
  return (
    <Card className={CardStyle.root}>
      <CardContent>
        <PersonIcon/>
        <Typography variant="h5" component="h2">
          Gestion des clients
        </Typography>
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
  return (
    <Card className={CardStyle.root}>
      <CardContent>
        <HotelIcon/>
        <Typography variant="h5" component="h2">
          Gestion des logements
        </Typography>
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
