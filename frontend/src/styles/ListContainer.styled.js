import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 3px;
    background-color: #fff;
    flex: 0 0 30%;
    border-left: 3px solid ${({ color }) => color};
    box-shadow: 0px 0px 14px 1px rgba(0,0,0,0.05); 
`;

export const TitleContainer = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
    color: white;
    border-radius: 0px 3px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.h1`
    margin: 0;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: 400;
`;

export const Button = styled.button`
    margin-right: 10px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: white;
`;

export const ListInfoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ListInfo = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    margin-left: 15px; 
    margin-right: 15px;
    margin-top: 10px;
    margin-bottom: 3px;
    color: #a1a1a1;
`;

export const TaskList = styled.ul`
    list-style: none;
    padding: 0;
    margin-left: 15px;
`;

export const TaskItem = styled.li`
    margin-bottom: 15px;
    display: flex;
    color: #292929;
    font-size: 14px;
`;