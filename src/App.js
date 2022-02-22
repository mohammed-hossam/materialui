import './App.css';
import Employees from './components/Employees';
import Table from './components/Table';
import TableTest from './components/TableTest';
import { Container, Paper } from '@mui/material';
import Main from './components/formik';
// import classes from './App.module.css';

function App() {
  return (
    <Container>
      <Main />
      <Paper
        sx={{
          padding: '2em',
          marginBottom: '1.5em',
          marginTop: '1.5em',
        }}
        elevation={3}
        // className={classes['MuiPaper-root']}
      >
        <Employees />
      </Paper>
      <Table />
      {/* <TableTest /> */}
    </Container>
  );
}

export default App;
