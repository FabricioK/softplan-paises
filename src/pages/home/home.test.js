import React from "react";
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import { MockedProvider, } from "@apollo/client/testing";
import { GET_COUNTRY_LIST } from "../../data/schemas";
import Home from ".";
import { MemoryRouter } from "react-router-dom";

describe("Testing Home", () => {
  let component;
  beforeEach(() => {
    const defaultMocks = [
      {
        request: {
          query: GET_COUNTRY_LIST,
          variables: { name: `.*(?i)(b)(?-i).*` },
        },
        result: {
          data: {
            Country: [
              {
                __typename: 'Country',
                _id: '661',
                name: 'Brazil',
                capital: 'Brasília',
                flag: {
                  __typename: 'Flag',
                  emoji: '🇧🇷',
                  svgFile: 'https://restcountries.eu/data/bra.svg'
                }
              }
            ]
          }
        },
      },
    ];

    component = render(
      <MemoryRouter>
        <MockedProvider addTypename={false} mocks={defaultMocks}>
          <Home />
        </MockedProvider>
      </MemoryRouter>
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
      const countLoading = queryAllByText('loading ...');
      expect(countLoading).toHaveLength(1);
    });
  });

  it('should render brazil card', async () => {
    const { getByTestId } = component;
    const input = getByTestId('search-field');
    fireEvent.change(input, {
      target: {
        value: "b"
      }
    })
    await waitFor(() => {
      const countLoading = getByTestId('country_card_661');
      expect(countLoading).toBeDefined();
    });
  });
});