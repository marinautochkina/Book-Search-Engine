import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            email
            savedBooks {
                bookId
                title
                authors
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deletedBook($bookId: ID!) {
        deletedBook(bookId: $bookId) {
            _id
            savedBooks {
                bookId
            }
        }
    }
`;