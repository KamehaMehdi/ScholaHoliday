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

function createData(name, address, phone_number, email, banned, date) {
  return { name, address, phone_number, email, banned, date };
}

const rows = [
  createData('james', "50 rue nashville", "01 51 45 67 21", "2tes4@SpeechGrammarList.com", false,"13-02-2020"),
  createData('toto', "50 rue nashville", "01 51 45 67 21", "2tes4@SpeechGrammarList.com", false,"13-05-2020"),
  createData('Jack', "50 rue nashville", "01 51 45 67 21", "2tes4@SpeechGrammarList.com", false,"13-07-2020"),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Addresse</TableCell>
            <TableCell align="right">Téléphone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Banned</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phone_number}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.banned}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}