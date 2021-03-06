import React from "react";
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import { MockedProvider, } from "@apollo/client/testing";
import App from "./App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import { GET_COUNTRY_LIST } from "./data/schemas";

describe("Testing App", () => {
  let component;
  const history = createMemoryHistory();
  beforeEach(() => {
    history.push('/');
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
      <MockedProvider addTypename={false} mocks={defaultMocks}>
        <React.Suspense fallback={<span> Carregando</span>}>
          <Router history={history}>
            <App />
          </Router>
        </React.Suspense>
      </MockedProvider>
    );
  })

  it('should render without error', () => {
    act(() => {
      component;
    });
  });
});