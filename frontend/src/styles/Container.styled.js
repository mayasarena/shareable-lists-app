import styled from 'styled-components';

export const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f9f9f9;
`;

export const AppContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
`;

export const ContentContainer = styled.div`
    background-color: ${({ backgroundcolor }) => backgroundcolor};
    width: 100%;
    height: 100%;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    padding: 0px 50px 0px 50px;
    height: 70px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

export const DashboardContainer = styled.div`
    height: calc(100% - 90px);
    overflow: auto;
    padding: 10px;
`;