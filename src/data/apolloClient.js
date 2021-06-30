import { ApolloClient, InMemoryCache } from '@apollo/client';
const enchancedFetch = (url, init) => {
    return fetch(url, {
        ...init,
        headers: {
            ...init.headers,
            'Access-Control-Allow-Origin': '*',
        },
    }).then(response => response)
}

const httpLink = new HttpLink({
    uri: "http://testefront.dev.softplan.com.br/graphql",
    fetchOptions: {
        mode: 'no-cors',
    },
    fetch: enchancedFetch,
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        typePolicies: {
            Country: {
                fields: { // Field policy map for the Product type
                    name: { // Field policy for the isInCart field
                        merge(existing, incoming) {
                            return existing || incoming;
                        },
                    },
                    capital: { // Field policy for the isInCart field
                        merge(existing, incoming) {
                            return existing || incoming;
                        },
                    },
                    area: { // Field policy for the isInCart field
                        merge(existing, incoming) {
                            return existing || incoming;
                        },
                    },
                    population: { // Field policy for the isInCart field
                        merge(existing, incoming) {
                            return existing || incoming;
                        },
                    },
                    topLevelDomains: { // Field policy for the isInCart field
                        merge(existing, incoming) {
                            return existing || incoming;
                        },
                    }
                }
            }
        }
    }),
});