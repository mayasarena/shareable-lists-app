import styled from 'styled-components';

export const ShareListContainer = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    padding-right: 100px;
`;

export const ShareButton = styled.button`
    background-color: #efedf7;
    border: none;
    height: 30px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 15px;
    margin-left: 10px;
    color: #312857;
    cursor: pointer;

    &:hover {
        background-color: #312857;
        color: white;
    }
`;

export const UserIcon = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundcolor};
    color: ${(props) => props.textcolor};
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    cursor: default;

    &:hover::before {
        content: '${(props) => props.email}';
        position: absolute;
        bottom: -35px;
        background-color: grey;
        color: white;
        padding: 5px 10px;
        border-radius: 10px;
        z-index: 1;
        font-size: 12px;
        text-transform: lowercase;
    }

    &:hover {
        z-index: 2;
    }
`;