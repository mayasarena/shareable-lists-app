import styled from 'styled-components';

export const Button = styled.button`
    background-color: red;
    color: pink;

    &:hover {
        color: red;
    }

    &:active {
        color: blue;
    }
`;

export const SignOutButton = styled.button`
    padding: 0px 10px;
    height: 30px;
    background-color: white;
    border: 1px solid #2d7dfc;
    color: #2d7dfc;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 20px;

    &:hover {
        background-color: #2d7dfc;
        color: white;
    }
`;