import styled from 'styled-components';

export const AuthContainer = styled.div`
    width: 600px;
    height: 480px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* Media query for medium-sized screens */
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 60vw; /* Set width to 70% of the viewport width for medium-sized screens */
    }

    /* Media query for mobile screens */
    @media (max-width: 768px) {
        width: 80vw; /* Set width to 90% of the viewport width for mobile screens */
    }
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    margin-bottom: 30px;
`;

export const Button = styled.button`
    background-color: ${({ isSelected }) => isSelected ? 'white' : '#f2f2f2'};
    border: none;
    width: 100%;
    height: 50px;
    border-radius: ${({ border }) => border};
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: #f8f8f8;
    }
`;

export const Title = styled.h1`
    font-size: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    width: 80%;
    height: 100%;
`;

export const Option = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 13px;
    width: 100%;
`;

export const OptionTitle = styled.div`
    width: 100px;
`;

export const SubmitButton = styled.button`
    height: 40px;
    width: 120px;
    background-color: #2d7dfc;
    border: none;
    color: white;
    font-size: 15px;
    border: 1px solid #2d7dfc;
    margin-top: 30px;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(45,125,252,0.5);

    &:hover {
        background-color: white;
        border: 1px solid #2d7dfc;
        color: #2d7dfc;
    }
`;