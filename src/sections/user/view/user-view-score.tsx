import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Scrollbar } from 'src/components/scrollbar';
import { getData } from 'src/utils/request';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';

import { TableNoData } from '../table-no-data';
import { UserTableRowScore } from '../user-table-row-score';
import { UserTableHeadScore } from '../user-table-head-score'; 
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

export function UserViewScore() {
  const table = useScoreTable();
  const [filterName, setFilterName] = useState('');
  const [leaderboardData, setLeaderboardData] = useState<UserProps[]>([]);
  const [choosegame, setChoosegame] = useState<string | null>(null);
  
  // 1️⃣ Fetch User Data and Set choosegame
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem('userId');
        const response = await getData(`auth/${id}`);
        if (response.isSuccess && response.user) {
          setChoosegame(response.user.choosegame); // Store the choosegame value
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // 2️⃣ Fetch Leaderboard Data When choosegame is Available
  useEffect(() => {
    const fetchLeaderboard = async () => {
        if (!choosegame) return; // Wait for choosegame to be set
      
        const normalizedChoosegame = choosegame.toLowerCase();
      
        try {
          let endpoint = '';
          if (normalizedChoosegame === 'sudoku') {
            endpoint = 'games/getsudukuleaderboard';
          } else if (normalizedChoosegame === 'chess') {
            endpoint = 'games/getchessleaderboard';
          } else {
            console.error('Invalid game selected:', choosegame);
            return;
          }
      
          const response = await getData(endpoint);
      
          if (response && response.data) {
            // Sort data by score in descending order
            const sortedData = response.data
            .map((user: UserProps) => ({
              ...user,
              score: Math.trunc(Number(user.score)), // Store only the integer part of the score
            }))
            .sort((a: UserProps, b: UserProps) => {
              const scoreA = Number(a.score); // Ensure score is a number
              const scoreB = Number(b.score); // Ensure score is a number
              return scoreB - scoreA; // Sort in descending order by score
            });
          
          // Add rank based on sorted data
          const rankedData = sortedData.map((user: UserProps, index: number) => ({
            ...user,
            rank: index + 1,  // Rank starts from 1
          }));
          
          setLeaderboardData(rankedData);  // Set the leaderboard data with ranks
            // Set the sorted leaderboard data
          
          }
        } catch (error) {
          console.error('Error fetching leaderboard data:', error);
        }
      };
      
    
    
  
    fetchLeaderboard();
  }, [choosegame]); // Runs only when choosegame changes
   // Runs only when choosegame changes
  

  
  
  

  
  const dataFiltered: UserProps[] = applyFilter({
    inputData: leaderboardData,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={1}>
        {/* <Typography variant="h4" flexGrow={1} color="#ffffff">
        {choosegame ? choosegame.toUpperCase() : 'Loading...'} -Leaderboard
        </Typography> */}
        <Box
        
  display="flex"
  alignItems="center"
  justifyContent="center"
 // Full viewport height
>
  <img
    src="../../public/assets/images/img/leaderboard-image.png"
    style={{ width: '70%', height: 'auto',marginTop: '50px' }}
    alt="Leaderboard"
  
  />
</Box>
        {/* <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New Entry
        </Button> */}
      </Box>

      <Card>
        {/* <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        /> */}

<Scrollbar>
  <Box
    sx={{
      width: '100%',
      overflowX: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 1, sm: 2, md: 3 }, // Adjust padding for different breakpoints
    }}
  >
    <TableContainer
      sx={{
        minWidth: { xs: 300, sm: 400, md: 500 }, // Adjust minWidth for screen sizes
        maxWidth: '100%', // Ensure it doesn't overflow
        overflowX: 'auto',
      }}
    >
      <Table>
        <UserTableHeadScore
          order={table.order}
          orderBy={table.orderBy}
          rowCount={leaderboardData.length}
          numSelected={table.selected.length}
          onSort={table.onSort}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              leaderboardData.map((user) => user.id)
            )
          }
          headLabel={[
            { id: 'rank', label: 'Rank' },
            { id: 'name', label: 'Name' },
            { id: 'email', label: 'Employee code' },
            { id: 'score', label: 'Score' },
            { id: 'time', label: 'Time' },
          ]}
        />
        <TableBody>
          {dataFiltered
            .slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            )
            .map((row, index) => (
              <UserTableRowScore
                key={row.id}
                row={{
                  ...row,
                  time: `${row.time}m`, // Add 'm' in front of the time
                }}
                selected={table.selected.includes(row.id)}
                onSelectRow={() => table.onSelectRow(row.id)}
                rank={index + 1} // Pass the rank (index + 1 for 1-based ranking)
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
</Scrollbar>

{/* 
        <TablePagination
          component="div"
          page={table.page}
          count={leaderboardData.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        /> */}
      </Card>
    </DashboardContent>
  );
}

export function useScoreTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('score'); // Default to 'score'
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc'); // Default to 'desc'

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

  



