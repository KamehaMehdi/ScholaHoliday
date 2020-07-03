import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(client, logement, start_date,end_date,check_in,check_out) {
  return {client, logement, start_date,end_date,check_in,check_out};
}

const rows = [
  createData('2',1, "20-12-2020","30-12-2020", "20-12-2020","30-12-2020"),
  createData("4" ,3, "25-02-2020","03-03-2020", "25-02-2020","03-03-2020"),
  createData('5',2, "20-12-2020","30-12-2020", "20-12-2020","30-12-2020"),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell align="right">Logement</TableCell>
            <TableCell align="right">Date début</TableCell>
            <TableCell align="right">Date de fin</TableCell>
            <TableCell align="right">Check in</TableCell>
            <TableCell align="right">Check out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.client}>
              <TableCell component="th" scope="row">{row.client}</TableCell>
              <TableCell align="right">{row.logement}</TableCell>
              <TableCell align="right">{row.start_date}</TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
              <TableCell align="right">{row.check_in}</TableCell>
              <TableCell align="right">{row.check_out}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}