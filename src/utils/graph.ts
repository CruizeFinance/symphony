import { gql } from '@apollo/client'

export const GET_TOKENS = gql`
  {
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }
`
