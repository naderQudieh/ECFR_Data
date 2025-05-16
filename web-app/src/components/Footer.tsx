import styled from 'styled-components';

const StyledFooter = styled.footer`
    background-color: #333;
    color: white;
    text-align: center;
    position: fixed;
    bottom: 2px;
    width: 100%;
    height: 50px;
`;

export default function Footer() {
    return (
        <StyledFooter>
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </StyledFooter>
    );
}