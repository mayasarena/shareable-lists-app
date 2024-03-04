import styled from 'styled-components';

export const ListTitleContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

export const ListTitle = styled.h1`
    font-weight: 600;
    font-size: 35px;
    margin: 0;
    color: ${({ color }) => color};
`;

export const ListDetails = styled.h2`
    font-weight: 600;
    font-size: 12px;
    margin: 0;
    font-weight: 400;
    color: #888796;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
    height: 70px;
`;

export const TaskListContainer = styled.div`
    padding-left: 30px;
    padding-right: 50px;
    height: calc(100% - 80px);
`;

export const TasksContainer = styled.div`
    margin-top: 5px;
    padding-top: 10px;
    height: calc(100% - 230px);
    overflow: auto;
`;

export const EditListButton = styled.button`
    background-color: #f2f2f2;
    height: 35px;
    width: 35px;
    border: none;
    border-radius: 50%;
    font-size: 15px;
    color: #2d7dfc;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2d7dfc;
        color: white;
    }
`;