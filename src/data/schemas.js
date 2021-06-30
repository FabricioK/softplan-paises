import { gql } from '@apollo/client';

export const GET_COUNTRY_LIST = gql`
query Country($name: String!) {
  Country(filter : { name_regexp : $name }) {
    _id
    name
    capital
    flag {
      emoji
      svgFile
    }
  }
}
`;

//bandeira, nome, capital, área, população e top-level domain
export const GET_COUNTRY_DETAILS = gql`
query Country($id: String!) {
  Country(_id : $id ) {
    _id
    name 
    nativeName
    capital
    area
    population
    topLevelDomains {
      name
    }
    location {
      latitude
      longitude
    }
    flag {
        svgFile
        emoji
    }
    distanceToOtherCountries(first:5){
      countryName
      distanceInKm    
    }   
  }
}
`;

export const GET_COUNTRY_LOCATION = gql`
  query Country($name: String) {
    Country( name: $name , first : 1 ) {
      _id
      name
      location {
        latitude
        longitude
      }
    }
  }
`