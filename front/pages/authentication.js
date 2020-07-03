import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Authentication() {
    const classes = useStyles();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function login(){
      if(password == "admin" && username == "admin"){
        console.log("connected");
        document.cookie = "connected=true";
        document.cookie = "prenom = " + username;
        document.cookie = "nom =" + password;
        var date = new Date();
        date.setHours(date.getHours() + 1);
        document.cookie = "expire =" + date.toUTCString();
      } else{
        console.log("error in login");
      }
    }

    
    

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.paper}>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              ScholaHoliday
              </Typography>
              <form className={classes.form} onSubmit={login}>
                <TextField id="username" name="username" value={username} label="Login" variant="outlined" margin="normal" required fullWidth autoFocus onChange={e => setUsername(e.target.value)}></TextField>
                <TextField id="password" name="password" value={password} label="Password" variant="outlined" type="password" margin="normal" required fullWidth autoFocus onChange={e => setPassword(e.target.value)}></TextField>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Se souvenir de moi."/>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Login</Button>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                    Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    
                  </Grid>
                </Grid>
              </form>
            </Container>
            </div>
        </React.Fragment>
    );
}