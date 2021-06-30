import { ApolloClient,InMemoryCache } from '@apollo/client';
export const client = new ApolloClient({
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
    uri: "http://testefront.dev.softplan.com.br/graphql"
});