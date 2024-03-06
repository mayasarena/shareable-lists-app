import styled from 'styled-components';

export const SignOutButton = styled.button`
    padding: 0px 10px;
    height: 30px;
    background-color: #2d7dfc;
    border: 1px solid #2d7dfc;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px rgba(45,125,252,0.5);

    &:hover {
        background-color: white;
        border: 1px solid #2d7dfc;
        color: #2d7dfc;
    }
`;

export const ProfileButton = styled.button`
    padding: 0px 10px;
    height: 30px;
    background-color: white;
    border: 1px solid #2d7dfc;
    color: #2d7dfc;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 0px rgba(45,125,252,0.5);

    &:hover {
        background-color: #2d7dfc;
        color: white;
    }
`;