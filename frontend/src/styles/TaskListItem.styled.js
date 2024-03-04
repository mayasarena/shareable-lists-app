import styled from 'styled-components';

export const Item = styled.li`
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding-left: 10px;
    padding-right: 10px;
`;

export const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const EditContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const TaskTitle = styled.h1`
    font-size: 15px;
    margin: 0;
    font-weight: 500;
`;

export const TaskInfo = styled.h2`
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #b6b6bf;
`;

export const EditButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #bbb;

    &:hover {
        color: #ccc;
    }
`;