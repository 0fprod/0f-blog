import styled from '@emotion/styled';

export const Nav = styled.nav`
  transition: all 0.5s ease-in-out;
/* Mobile */
background-color: var(--color-primary);
padding: 0.5rem 1rem;
font-weight: bold;

&.fixed {
  transition: all 0.5s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}


.active {
  text-decoration: underline;
  text-underline-offset: 0.15rem;
}

ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
}

/* Tablet */
@media screen and (min-width: 768px) {
  transition: all 0.25s ease-in-out;
  padding: 0.75rem 1.25rem;
  font-size: 1.5rem ;

  a:hover {
    text-decoration: underline;
    text-underline-offset: 0.25rem;
  }
}

/* Desktop */
@media screen and (min-width: 1024px) {
}
`;