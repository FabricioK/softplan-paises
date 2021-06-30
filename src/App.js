import './App.css';
import Routes from './routes';
import { Container } from '@material-ui/core';
import { appStyles } from './styles/app';


const App = () => {
  const classes = appStyles();
  return (
    <Container className={classes.root}>
      <Routes />
    </Container>
  );
}

export default App;