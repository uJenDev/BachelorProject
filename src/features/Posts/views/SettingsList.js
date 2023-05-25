import React from 'react';
import { MdSettingsInputComponent } from 'react-icons/md';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));

const SettingsList = ({ settings }) => {
  return (
    <TableContainer sx={{width: 600}}>
      <div className='mb-2 flex items-center justify-center'>
        <MdSettingsInputComponent className='mr-2 text-2xl' />
        <h1 className='text-2xl font-semibold'>CNC Settings</h1>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Value</StyledTableCell>
            <StyledTableCell>Unit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {settings?.map((setting) => (
            <TableRow key={setting.slug}>
              <TableCell>{setting.name}</TableCell>
              <TableCell>{setting.value}</TableCell>
              <TableCell>{setting.unit ? setting.unit : <p className='opacity-50'>- Not given -</p>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SettingsList;
