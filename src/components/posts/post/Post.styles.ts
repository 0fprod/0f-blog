import styled from '@emotion/styled';

export const Article = styled.article`
max-width: 100vw;
overflow-x: hidden;

p {
  margin: 1rem 0;

  img {
    width: 90vw;
  }
}

table {
  font-family: Arial, Helvetica, sans-serif;
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

  thead th:nth-child(4),
  tbody td:nth-child(4) {
    display: none;
  }

  td,  th {
    padding: 0.5rem;
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
  list-style: circle;
}

a {
  text-decoration: underline;
}

hr {
  margin: 2rem 0;
}

@media (min-width: 768px) {
  th,td,p, li {
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
`;