import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getMe {
        me {
            _id
            username
            email
            savedbooks {
                bookId
                title
                authors
                description
                image
            }
        }
    }
`;

//add books and book