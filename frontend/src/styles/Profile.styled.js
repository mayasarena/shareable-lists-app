import styled from 'styled-components';

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 100px);
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
`;

export const UserIcon = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: ${(props) => props.backgroundcolor};
    color: ${(props) => props.textcolor};
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 20px;
    cursor: default;
`;

export const Input = styled.input`
    height: 10px;
    border-radius: 5px;
    border: none;
    background-color: #f2f2f2;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
`;

export const Option = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 13px;
`;

export const SubmitButton = styled.input`
    height: 40px;
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

export const Email = styled.p`
    font-size: 14px;
    color: #404040;
    margin: 0;
`;

export const Message = styled.p`
    font-size: 13px;
    margin: 0;
`;