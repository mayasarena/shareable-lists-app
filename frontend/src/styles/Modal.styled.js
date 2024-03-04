import styled from 'styled-components';

export const Overlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

export const Modal = styled.div`
    width: 600px;
    background-color: white;
    padding:30px;
    border-radius: 10px;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;

export const CancelButton = styled.button`
    height: 40px;
    width: 120px;
    background-color: #f2f2f2;
    border: none;
    color: #7a7a7a;
    font-size: 15px;
    border: 1px solid white;
    margin-top: 30px;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #e9e9e9;
        border: 1px solid white;
        color: #7a7a7a;
    }
`;

export const Title = styled.h1`
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
`

export const Option = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 13px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const Input = styled.input`
    width: 100%;
    height: 10px;
    border-radius: 5px;
    border: none;
    background-color: #f2f2f2;
`;

export const SubmitButton = styled.input`
    height: 40px;
    width: 120px;
    background-color: #2d7dfc;
    border: none;
    color: white;
    font-size: 15px;
    border: 1px solid white;
    margin-top: 30px;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: white;
        border: 1px solid #2d7dfc;
        color: #2d7dfc;
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const DeleteButtonContainer = styled.div`
    display: flex;
`;

export const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export const DeleteButton = styled.button`
    height: 40px;
    width: 120px;
    background-color: #f55353;
    border: none;
    color: white;
    font-size: 15px;
    border: 1px solid white;
    margin-top: 30px;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: white;
        border: 1px solid #f55353;
        color: #f55353;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: left;
    margin-bottom: 20px;
`;

export const Info = styled.div`
    display: flex;
    gap: 15px;
    font-size: 13px;
    align-items: center;
`;

export const TextContainer = styled.div`
    display: flex;
    gap: 5px;
`;
