import styled from '@emotion/styled';


export const ProjectContainer = styled.li`
position: relative;
transition: all 0.25s ease-in-out;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 30rem;
height: 40rem;
padding: 1rem;
border-radius: 0.5rem;

background-color: var(--color-primary);

.date {
  font-size: small;
}

a: hover {
  text-decoration: underline;
  text-underline-offset: 0.25rem;
  width: max-content;
}

p:last-of-type {
  font-size: smaller;
}

a, p {
  margin-left: 1rem;
}

> img{
  border-radius: 0.5rem;
  transform: scale(0.8);
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);  
}


@media (prefers-color-scheme: dark) {

  a > img {
    filter: invert(1);
  }

}

/* Tablet */
@media screen and (min-width: 768px) {
  
} 
`;

export const TagsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
gap: 0.5rem;
background-color: #ffffff;
padding: 0.5rem;
border-radius: 0.5rem;
`

export const Tag = styled.picture`
width: 2rem;
height: 2rem;

img {
  width: 100%;
  height: 100%;
}
`