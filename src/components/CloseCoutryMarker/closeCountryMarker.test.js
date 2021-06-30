import React from "react";
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import { MockedProvider, } from "@apollo/client/testing";
import { GET_COUNTRY_LOCATION } from "../../data/schemas";
import CloseCountryMarker from ".";
import { MapContainer } from "react-leaflet";

describe("Testing Country Marker", () => {
  let component;
  beforeEach(() => {
    const defaultMocks = [
      {
        request: {
          query: GET_COUNTRY_LOCATION,
          variables: { name: 'Guyana' },
        },
        result: {
          data: {
            Country: [
              {
                __typename: 'Country',
                _id: '1852',
                name: 'Guyana',
                location: {
                  __typename: '_Neo4jPoint',
                  latitude: 5,
                  longitude: -59
                }
              }
            ]
          }
        },
      },
    ];

    component = render(
      <MockedProvider addTypename={false} mocks={defaultMocks}>
        <MapContainer>
          <CloseCountryMarker country={{
            countryName: 'Guyana',
            distanceInKm: 1727.7054803482656
          }} />
        </MapContainer>
      </MockedProvider>
    );
  })

  it('should render without error', () => {
    act(() => {
      component;
    });
  });

});