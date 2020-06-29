import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
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


export default () => {

  const [isConnected, setIsConnected] = React.useState(true);

  return (
    <div>
        { isConnected ? <Index/> : <Connection/> }
    </div>
  );
}

const Index = () => {
  return (
    <div className={style({
      display: 'flex',
      flexDirection: 'column'
    })}>
      <div className={CardRow}>
        <ClientCard/>
        <LogementCard/>
      </div>
      <hr/>
      <div className={CardRow}>
        <ReservationCard/>
        <PersonelCard/>
      </div>
    </div>
  )
}

const Connection = () => {
  return (
    <div>

    </div>
  )
}

const ClientCard = () => {
  return (
    <Card className={CardStyle.root}>
      <CardContent>
        <Typography className={CardStyle.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          Bonsoir
        </Typography>
        <Typography className={CardStyle.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

const LogementCard = () => {
  return (
    <Card className={CardStyle}>
      logement
    </Card>
  )
}

const ReservationCard = () => {
  return (
    <Card className={CardStyle}>
      reservation
    </Card>
  )
}

const PersonelCard = () => {
  return (
    <Card className={CardStyle}>
      personelcard
    </Card>
  )
}
