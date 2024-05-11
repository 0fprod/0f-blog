import styled from "@emotion/styled";

export const PageSection = styled.section`
transition: all 0.25s ease-in-out;
display: flex;
flex-direction: column;
align-items: flex-start;
font-size: 1.15rem;
width: 100%;

p {
  margin: 1rem 0;
}


@media screen and (min-width: 768px) {
  transition: all 0.25s ease-in-out;
  font-size: 1.5rem;
} `


export const PortfolioContainer = styled.ul`
width: 100%;
margin-top: 1rem;
display: flex;
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
align-items: flex-start;
gap: 1rem;

/* Tablet */
@media screen and (min-width: 768px) {
  gap: 2.5rem;
} 
`;