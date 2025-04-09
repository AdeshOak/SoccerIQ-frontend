import React from 'react';
import { 
  Table,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

export default function TableData({ data }) {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No data available
        </Typography>
      </Box>
    );
  }

  const columns = Object.keys(data[0] || {});
  
  // Format column headers - capitalize and add spaces
  const formatHeader = (header) => {
    return header
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };
  
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        backgroundColor: 'rgba(18, 18, 18, 0.7)',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          Player Stats
        </Typography>
      </Box>
      
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            '& th': { 
              fontWeight: 'bold', 
              color: 'primary.main',
              fontSize: '0.875rem',
              borderBottom: '2px solid rgba(0, 188, 212, 0.5)'
            }
          }}>
            {columns.map((column) => (
              <TableCell key={column}>
                {formatHeader(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow 
              key={index}
              sx={{ 
                '&:nth-of-type(odd)': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)' 
                },
                '&:hover': { 
                  backgroundColor: 'rgba(0, 188, 212, 0.08)'
                }
              }}
            >
              {columns.map((column) => (
                <TableCell key={column}>
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}