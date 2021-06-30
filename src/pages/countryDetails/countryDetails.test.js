import React from "react";
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import { MockedProvider, } from "@apollo/client/testing";
import { GET_COUNTRY_DETAILS } from "../../data/schemas";
import CountryDetails from ".";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from 'history'

describe("Testing Country Details", () => {
  let component;
  const history = createMemoryHistory();
  beforeEach(() => {
    const defaultMocks = [
      {
        request: {
          query: GET_COUNTRY_DETAILS,
          variables: { id: '661' },
        },
        result: {
          data: {
            Country: [
              {
                __typename: 'Country',
                _id: '661',
                name: 'Brazil',
                nativeName: 'Brasil',
                capital: 'Brasília',
                area: 8515767,
                population: 206135893,
                topLevelDomains: [
                  {
                    __typename: 'TopLevelDomain',
                    name: '.br'
                  }
                ],
                location: {
                  __typename: '_Neo4jPoint',
                  latitude: -10,
                  longitude: -55
                },
                flag: {
                  __typename: 'Flag',
                  svgFile: 'https://restcountries.eu/data/bra.svg',
                  emoji: '🇧🇷'
                },
                distanceToOtherCountries: [
                  {
                    __typename: 'DistanceToOtherCountry',
                    countryName: 'Bolivia (Plurinational State of)',
                    distanceInKm: 1333.0445603821204
                  },
                  {
                    __typename: 'DistanceToOtherCountry',
                    countryName: 'Paraguay',
                    distanceInKm: 1481.9677422904354
                  },
                  {
                    __typename: 'DistanceToOtherCountry',
                    countryName: 'Suriname',
                    distanceInKm: 1562.413522321208
                  },
                  {
                    __typename: 'DistanceToOtherCountry',
                    countryName: 'French Guiana',
                    distanceInKm: 1574.1741073802189
                  },
                  {
                    __typename: 'DistanceToOtherCountry',
                    countryName: 'Guyana',
                    distanceInKm: 1727.7054803482656
                  }
                ]
              }
            ]
          }
        },
      },
    ];

    history.push('/country/661')
    component = render(
      <Router history={history}>
        <Route path='/country/:id'>
          <MockedProvider addTypename={false} mocks={defaultMocks}>
            <CountryDetails />
          </MockedProvider>
        </Route>
      </Router>
    );
  })

  it('should render without error', () => {
    act(() => {
      component;
    });
  });

  it('should render loading state initially', async () => {
    const { queryAllByText } = component;
    await waitFor(() => {
      const countLoading = queryAllByText('Loading');
      expect(countLoading).toHaveLength(1);
    });
  });

  it('should render loading state country not found', async () => {
    const { queryAllByText } = component;
    await waitFor(() => {
      history.push('/country/01');
      const countLoading = queryAllByText('Country not found');
      expect(countLoading).toHaveLength(1);
    });
  });

  it('should render brazil details', async () => {
    const { getByTestId } = component;
    await waitFor(() => {
      const countLoading = getByTestId('country_details_661');
      expect(countLoading).toBeDefined();
    });
  });

  it('should allow reset on change name', async () => {
    const { getByTestId } = component;

    await waitFor(() => {
      const countLoading = getByTestId('country_details_661');
      expect(countLoading).toBeDefined();
    });

    await waitFor(() => {
      const resetButton = getByTestId('reset-button');
      expect(resetButton).toBeDisabled();
    });

    await waitFor(() => {
      const input = getByTestId('name-field');

      fireEvent.change(input, {
        target: {
          value: "b"
        }
      });
    });

    await waitFor(() => {
      const resetButton = getByTestId('reset-button');
      expect(resetButton).toBeEnabled();
      fireEvent(
        resetButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    });
  });

  it('should allow save on change name', async () => {
    const { getByTestId } = component;

    await waitFor(() => {
      const countLoading = getByTestId('country_details_661');
      expect(countLoading).toBeDefined();
    });

    await waitFor(() => {
      const resetButton = getByTestId('save-button');
      expect(resetButton).toBeDisabled();
    });

    await waitFor(() => {
      const input = getByTestId('name-field');

      fireEvent.change(input, {
        target: {
          value: "b"
        }
      });
    });

    await waitFor(() => {
      const saveButton = getByTestId('save-button');
      expect(saveButton).toBeEnabled();
      fireEvent(
        saveButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    });
  });

  it('should allow add and remove domain', async () => {
    const { getByTestId } = component;

    await waitFor(() => {
      const countLoading = getByTestId('country_details_661');
      expect(countLoading).toBeDefined();
    });

    await waitFor(() => {
      const countLoading = getByTestId('domain-list')
      const domain = countLoading.children;
      expect(domain).toHaveLength(1);
    });

    await waitFor(() => {
      const resetButton = getByTestId('add-domain-button');
      expect(resetButton).toBeEnabled();
    });

    await waitFor(() => {
      const input = getByTestId('domain-field');

      fireEvent.change(input, {
        target: {
          value: ".new"
        }
      });
    });   

    await waitFor(() => {
      const saveButton = getByTestId('add-domain-button');
      expect(saveButton).toBeEnabled();
      fireEvent(
        saveButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    });

    await waitFor(() => {
      const countLoading = getByTestId('domain-list')
      const domain = countLoading.children;
      expect(domain).toHaveLength(2);
    });

    await waitFor(() => {
      const domain = getByTestId('.new-domain');
      expect(domain).toBeDefined();
      let children = domain.querySelector(".MuiChip-deleteIcon");
      fireEvent.click(
        children
      )
    });

    await waitFor(() => {
      const countLoading = getByTestId('domain-list')
      const domain = countLoading.children;
      expect(domain).toHaveLength(1);
    });

  });
  
});