import styled from '@emotion/styled';

export const Article = styled.article`
max-width: 100vw;
overflow-x: hidden;

th, td, p, li, pre {
  font-size: 1.15rem;
}

p {
  margin: 1rem 0;

  img {
    width: 90vw;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  margin: 3rem 0;
  
  thead tr {
    border-bottom: 2px solid var(--color);
  }

  tbody tr {
    border-bottom: 1px solid var(--color);
  }

  thead th:nth-of-type(4),
  tbody td:nth-of-type(4) {
    display: none;
  }

  td,  th {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  
  tr:hover {
    background-color: var(--accent-color);
  }
  
  th {
    text-align: center;
    background-color: var(--color-primary);
    color: white;
  }
}


pre {
  overflow-x: auto;
  margin: 1rem 0;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
  background-color: var(--color-primary);

  pre {
    background-color: transparent !important;
  }
}

ul {
  margin: 1rem 0;
}

a {
  text-decoration: underline;
}

hr {
  margin: 2rem 0;
}

@media screen and (min-width: 425px) { 
  th, td,p, li, pre {
    font-size: 0.6rem;
  }
}

@media screen and (min-width: 768px) {
 
  th, td, p, li {
    font-size: smaller;
  }

  p {
    margin: 2rem 0;
  }

  pre {
    font-size: 1.25rem;
  }

  table {
    thead th:nth-of-type(4),
    tbody td:nth-of-type(4) {
      display: block;
    }
  }
}

@media screen and (min-width: 1024px) {
  th, td, p, li {
    font-size: 1.25rem;
  }

  h2 {
    font-size: 2rem;
  }
}
`;