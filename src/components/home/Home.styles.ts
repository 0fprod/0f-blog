import styled from '@emotion/styled';

export const PageSection = styled.section`
transition: all 0.25s ease-in-out;
display: flex;
flex-direction: column;
align-items: center;
font-size: 1.15rem;

p {
  margin: 1rem 0;
}


@media screen and (min-width: 768px) {
  transition: all 0.25s ease-in-out;
  font-size: 1.5rem;
} 
`;

export const SectionHeader = styled.section`
transition: all 0.25s ease-in-out;
display: flex;
flex-direction: column;
align-items: center;

img {
  display: none;
}


/* Tablet */
@media screen and (min-width: 768px) {
  transition: all 0.25s ease-in-out;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  img {
    display: block;
    width: 300px;
    height: 300px;
    background-color: azure;
    border-radius: 10rem;
  }
} 
`;

export const SectionContent = styled.div`
transition: all 0.25s ease-in-out;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;
align-items: center;



/* Tablet */
@media screen and (min-width: 768px) {
  transition: all 0.25s ease-in-out;
  height: auto;
}
`;