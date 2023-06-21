import styled from '@emotion/styled';

export const Main = styled.main`
transition: all 0.5s ease-in-out;

/* Mobile */
display: flex;
padding: 2rem;


// preffered color scheme
@media (prefers-color-scheme: dark) {
}


/* Tablet */
@media screen and (min-width: 768px) {
  transition: all 0.25s ease-in-out;
  padding: 2.5rem 3rem;
  font-size: 2rem;
}

/* Desktop */
@media screen and (min-width: 1024px) {
  padding: 1rem 8rem;
}
`;