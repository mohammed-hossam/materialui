import './App.css';
import Employees from './components/Employees';
import Table from './components/Table';
import { Container, Paper } from '@mui/material';
// import classes from './App.module.css';

function App() {
  return (
    <Container>
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
    </Container>
  );
}

export default App;
