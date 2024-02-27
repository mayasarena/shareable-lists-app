import styled from 'styled-components';

export const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f9f9f9;
`;

export const AuthContainer = styled.div`
    width: 600px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    /* Media query for medium-sized screens */
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 60vw; /* Set width to 70% of the viewport width for medium-sized screens */
    }

    /* Media query for mobile screens */
    @media (max-width: 768px) {
        width: 80vw; /* Set width to 90% of the viewport width for mobile screens */
    }
`;

export const AppContainer = styled.div`
    display: flex;
    background-color: pink;
    width: 100vw;
    height: 100vh;
`;

export const ContentContainer = styled.div`
    background-color: white;
    width: 100%;
    padding: 20px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ededed;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`;