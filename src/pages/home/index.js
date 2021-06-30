import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TablePagination, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  CardMedia, 
  Grid, 
  TextField, 
  Paper 
} from '@material-ui/core';

import { homeStyles } from '../../styles/home';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_LIST } from '../../data/schemas';


function Home() {
  const classes = homeStyles();
  const [countryQueryString, setCountryQueryString] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const { loading, data } = useQuery(GET_COUNTRY_LIST,
    {
      fetchPolicy: "cache-first",
      variables: { name: `.*(?i)(${countryQueryString})(?-i).*` },
      operationName: 'SEARCH_COUNTRIES',
    });

  useEffect(() => {
    setPage(0);
  }, [countryQueryString]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return <>
    <TextField
      id="search-field"
      label="Search for a country here!"
      className={classes.textField}
      value={countryQueryString}
      onChange={(e) => setCountryQueryString(e.target.value)}
      margin="normal"
      inputProps={{
        "data-testid":"search-field"
      }}      
    />
    <Paper className={classes.paper}>
      <TablePagination
        labelRowsPerPage="Cards per page"
        rowsPerPageOptions={[4, 8, 25]}
        component="div"
        count={(data && data.Country && data.Country.length) || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Grid container spacing={4}>
        {loading && <Grid item xl={3} md={4} sm={12}>loading ...</Grid>}
        {!loading && data && data.Country && data.Country.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Country) =>
          <Grid item data-testid={`country_card_${Country._id}`} key={Country._id} xl={3} md={4} sm={12}>
            <Card className={classes.root} >
              <CardMedia
                height="140"
                component="img"
                image={Country.flag.svgFile}
                title={Country.flag.emoji}
              />
              <CardContent>
                <Typography variant="h5" component="h2">{Country.name}</Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>{Country.capital}</Typography>
              </CardContent>
              <CardActions>
                <Link to={`/country/${Country._id}`}><Button size="small">Know more!</Button></Link>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Paper>
  </>;
}

export default Home;