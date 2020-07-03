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

function createData(name, role, username,password,disable) {
  return {name, role, username,password,disable};
}

const rows = [
  createData('james',1, "jamesF","2377HGDJQ!!3", false),
  createData("james" ,1,  "jamesF","2377HGDJQ!!3", false),
  createData('james',1, "jamesF","2377HGDJQ!!3", true),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.disable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}