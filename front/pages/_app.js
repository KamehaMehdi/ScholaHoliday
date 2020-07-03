import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/ToolBar';
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MenuIcon from '@material-ui/icons/menu'
import Typography from '@material-ui/core/Typography'
import { style } from 'typestyle'
import Link from 'next/link'

import PersonIcon from '@material-ui/icons/Person'
import WorkIcon from '@material-ui/icons/Work'
import HotelIcon from '@material-ui/icons/Hotel'
import DescriptionIcon from '@material-ui/icons/Description'

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const closeDrawer = () => setIsDrawerOpen(false)
  const openDrawer = () => setIsDrawerOpen(true)

  const pagesList = [
    {
      name: 'Gestion des Client',
      url: '/client',
      Icon: PersonIcon
    },
    {
      name: 'Gestion des Logement',
      url: '/logement',
      Icon: HotelIcon
    },
    {
      name: 'Gestion des Reservation',
      url: '/reservation',
      Icon: DescriptionIcon
    },
    {
      name: 'Gestion des Personel',
      url: '/personel',
      Icon: WorkIcon
    }
  ]

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Drawer anchor='left' open={isDrawerOpen} onClose={closeDrawer}>
        <List>
          {pagesList.map(({name, url, Icon}) => {
            return (
                <Link key={'page-' + name} href={url}>
                  <ListItem button>
                  <Icon className={style({marginRight: '20px'})} />{name}
                  </ListItem>
                </Link>
            )
          })}
        </List>
      </Drawer>
      <AppBar>
        <Toolbar>
          <IconButton onClick={openDrawer} edge="start" color="inherit">
            <MenuIcon/>
          </IconButton>
          <Typography variant='h6'>
            Schola Holidays
          </Typography>
        </Toolbar>
      </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
