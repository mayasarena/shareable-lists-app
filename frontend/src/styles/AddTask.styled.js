import styled from 'styled-components';

export const Form = styled.form`
    background-color: #eee;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 25px;
    padding-left: 15px;
`;

export const TextInput = styled.input`
    background-color: #eee;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 15px;
    margin: 0;
    width: 100%;
    padding-left: 5;

    &::placeholder {
        color: #969696;
    }
`;

export const ButtonInput = styled.input`
    background-color: #2d7dfc;
    color: white;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 0px 25px 25px 0px;
    margin: 0;

    &:hover {
        background-color: white;
        color: #2d7dfc;
    }
`;

export const TextContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
    font-size: 15px;
    padding-left: 5px;
    color: #969696;
`;