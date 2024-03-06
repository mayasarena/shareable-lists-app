import styled from 'styled-components';

export const SidebarContainer = styled.div`
    background-color: #fff;
    width: 500px;
    padding: 20px;
    border-right: 1px solid #ededed;

    @media screen and (max-width: 850px) {
        padding-left: 50px;
        padding-right: 50px;
        padding-top: 20px;
        position: fixed;
        width: calc(100% - 100px);
        top: 0;
        left: ${({ isOpen }) => isOpen ? '0' : '-100vw'}; 
        height: 100vh;
        overflow-x: hidden; 
        transition: left 0.5s; 
        z-index: 999;
    }
`;

export const SidebarListsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-bottom: 30px;
`;

export const ListButton = styled.button.attrs(props => ({
    isSelected: props.isSelected ? true : undefined,
}))`
    background-color: ${({ isSelected }) => isSelected ? '#f2f2f2' : 'transparent'};
    color: ${({ isSelected, color }) => isSelected ? color : '#575c6b'};
    border-radius: 8px;
    height: 40px;
    text-align: left;
    padding-left: 80px;
    border: none;
    font-size: 15px;
    font-weight: 600;
    transition: background-color 0.3s ease;

    &:hover {
        color: ${({color}) => color};
    }

    &:active {
        color: ${({color}) => color};
        background-color: #ebf8fc;
    }

    @media screen and (max-width: 850px) {
        text-align: center;
        padding-left: 0px;
    }
`;

export const Header = styled.h1`
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 500;
    color: #000;
    padding-left: 70px;
    padding-bottom: 15px;

    @media screen and (max-width: 850px) {
        text-align: center;
        padding-left: 0px;
    }
`;

export const AddListButton = styled.button`
    background-color: #2d7dfc;
    color: #fff;
    width: 100%;
    border: none;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 30px;
    transition: background-color 0.3s ease;
    box-shadow: 0px 0px 5px 0px rgba(45,125,252,0.5);

    &:hover {
        background-color: transparent;
        border: 1px solid #2d7dfc;
        color: #2d7dfc;
    }
`;

export const ToggleButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    padding-bottom: 40px;
`;

export const ToggleButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    font-size: 20px;
    transition: color 0.3s ease;

    &:hover {
        color: #2d7dfc;
    }

    @media screen and (max-width: 850px) {
        display: block;
    }
`;

export const ToggleHeaderContainer = styled.div`
    display: flex;
    gap: 40px;

    @media screen and (max-width: 850px) {
        margin-left: -30px;
    }
`;