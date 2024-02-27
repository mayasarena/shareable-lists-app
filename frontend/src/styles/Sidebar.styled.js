import styled from 'styled-components';

export const SidebarContainer = styled.div`
    background-color: #fff;
    width: 500px;
    padding: 20px;
    border-right: 1px solid #ededed;
    padding-top: 100px;
`;

export const SidebarListsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 50px;
`;

export const ListButton = styled.button.attrs(props => ({
    isSelected: props.isSelected ? true : undefined,
}))`
    background-color: ${({ isSelected }) => isSelected ? '#ebf8fc' : 'transparent'};
    color: ${({ isSelected }) => isSelected ? '#2d7dfc' : '#575c6b'};
    border-radius: 30px;
    height: 30px;
    text-align: left;
    padding-left: 80px;
    border: none;
    font-size: 15px;
    font-weight: 600;

    &:hover {
        color: #2d7dfc;
    }

    &:active {
        color: #2d7dfc;
        background-color: #ebf8fc;
    }
`;

export const Header = styled.h1`
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 500;
    color: #000;
    padding-left: 70px;
    padding-bottom: 15px;
`;

export const AddListButton = styled.button`
    background-color: #2d7dfc;
    color: #fff;
    width: 100%;
    border: none;
    height: 30px;
    border-radius: 30px;
    margin-bottom: 30px;

    &:hover {
        background-color: #ebf8fc;
        border: 1px solid #2d7dfc;
        color: #2d7dfc;
    }
`;