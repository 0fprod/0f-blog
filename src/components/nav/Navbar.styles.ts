import styled from '@emotion/styled';

export const Nav = styled.nav`
  transition: all 0.5s ease-in-out;
/* Mobile */
background-color: #d6cfe2;
padding: 0.25rem 1rem;
color: #404040;
font-weight: bold;

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
  font-size: larger ;

  a:hover {
    text-decoration: underline;
    text-underline-offset: 0.25rem;
  }
}

/* Desktop */
@media screen and (min-width: 1024px) {
}
`;