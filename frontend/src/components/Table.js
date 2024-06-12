import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

export default function TableData({ data }) {
  const columns = Object.keys(data[0] || {});

  return (
    <Sheet variant="soft" sx={{ pt: 4, borderRadius: 'sm' }}>
      <Table
        stripe="odd"
        hoverRow
        sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } ,width:'858px'}}
      >
        <caption><b>Player Stats</b></caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} style={{ width: '40%' }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
