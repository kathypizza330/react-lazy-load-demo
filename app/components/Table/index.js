import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 20px;
    text-align: left;
`;

export const Row = styled.div`
    padding: 5px;
    background-color: ${props => props.index % 2 === 0 ? '#86cecb' : '#bec8d1'};
    &:first-child {
        border-radius: 10px 10px 0 0;
    }
    
    &:last-child {
        border-radius: 0 0 10px 10px;
    }
`;
