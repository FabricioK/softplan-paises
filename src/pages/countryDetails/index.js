import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { countryDetailsStyles } from '../../styles/countryDetails';
import { Grid, Card, CardMedia, CardContent, Typography, TextField, CardActions, Button, CardHeader, Chip } from '@material-ui/core';
import { compareObjects } from '../../util';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CloseCountryMarker from '../../components/CloseCoutryMarker';
import { GET_COUNTRY_DETAILS } from '../../data/schemas';
import { useQuery, useApolloClient } from '@apollo/client';

const InitialValues = {
  name: "",
  capital: "",
  area: 0,
  population: 0,
}

const CountryDetails = () => {

  const client = useApolloClient();
  const classes = countryDetailsStyles();

  const [Country, setCountry] = useState();
  const [values, setValues] = useState(InitialValues);
  const [domain, domainChange] = useState("");
  const { id } = useParams();

  const { loading, data } = useQuery(GET_COUNTRY_DETAILS,
    {
      fetchPolicy: "cache-first",
      variables: { id },
      operationName: 'SEARCH_COUNTRIES',
    });

  useEffect(() => {
    if (loading === false && data) {
      if (data.Country[0]) {
        setValues({ ...data.Country[0] });
        setCountry({ ...data.Country[0] });
      }
    }
  }, [loading, data])


  if (loading) return <> Loading </>
  if (!Country) return <> Country not found </>

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleDelete = (chipToDelete) => () => {
    const { topLevelDomains } = values;
    setValues({
      ...values,
      topLevelDomains: topLevelDomains.filter((chip) => chip.name !== chipToDelete.name)
    });
  };

  const newDomain = () => {
    const { topLevelDomains } = values;
    setValues({
      ...values,
      topLevelDomains: topLevelDomains.concat({
        name: domain
      })
    });
  }

  const saveChanges = () => {
    const country = {
      ...Country,
      ...values,
      _id: id
    }
    client.cache.modify({
      id: client.cache.identify(country),
      fields: {
        name: () => country.name,
        capital: () => country.capital,
        area: () => country.area,
        population: () => country.population,
        topLevelDomains: () => country.topLevelDomains
      },
    });
  }

  //fixeds
  const { _id, flag, location, distanceToOtherCountries } = Country;

  //editables
  const { name, capital, area, population, topLevelDomains } = values;

  const Domains = topLevelDomains && topLevelDomains.map((domain) => (
    <Chip
      key={`chip_${domain.name}`}    
      size="small"
      data-testid={`${domain.name}-domain`}
      label={domain.name}
      onDelete={handleDelete(domain)}
    />
  ));

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Card data-testid={`country_details_${_id}`} key={`country_details_${_id}`} name={_id} className={classes.card} >
        <CardHeader
          title="Country Details"
        />
        <CardMedia
          component="img"
          image={flag.svgFile}
          title={flag.emoji}
        />
        <CardContent>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            inputProps={{
              "data-testid": "name-field"
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="capital"
            label="Capital"
            name="capital"
            value={capital}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="area"
            label="Area in km²"
            name="area"
            onChange={handleChange}
            type="number"
            value={area}
          />
          <TextField
            margin="normal"
            fullWidth
            id="population"
            label="Population"
            name="population"
            onChange={handleChange}
            type="number"
            value={population}
          />
          <Typography color="textSecondary" gutterBottom>domains:</Typography>
          <div data-testid="domain-list">
          {Domains}
          </div>
          <br />
          <TextField
            size="small"
            inputProps={{
              style: { fontSize: 10 },
              "data-testid": "domain-field"
            }}
            id="outlined-multiline-static"
            multiline
            rows={1}
            placeholder="New Domain"
            variant="outlined"
            value={domain}
            onChange={e => domainChange(e.target.value)}
          />
          <Button
            color="primary"
            onClick={newDomain}
            data-testid="add-domain-button"
          >
            Add
        </Button>
        </CardContent>
        <CardActions>
          <Link to={`/`}> <Button size="small" color="primary">Back</Button></Link>
          <Button size="small" color="primary"
            disabled={compareObjects(Country, values)}
            onClick={() => setValues({ ...Country })}
            data-testid="reset-button"
          >Reset changes</Button>
          <Button size="small" color="primary"
            disabled={compareObjects(Country, values)}
            onClick={saveChanges}
            data-testid="save-button"
          >Save</Button>
        </CardActions>
      </Card>
      <MapContainer style={{ width: "100%", height: "100%" }} center={[location.latitude, location.longitude]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>
            <h1>{name}</h1>
          </Popup>
        </Marker>
        {
          distanceToOtherCountries && distanceToOtherCountries.map((country) => <CloseCountryMarker key={`marker_${country.countryName}`} country={country} />)
        }
      </MapContainer>
    </Grid >
  );
}

export default CountryDetails;