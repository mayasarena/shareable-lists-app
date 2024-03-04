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