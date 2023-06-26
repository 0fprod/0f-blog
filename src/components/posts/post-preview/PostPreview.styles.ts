import styled from '@emotion/styled';


export const PostPreviewContainer = styled.li`
position: relative;
transition: all 0.25s ease-in-out;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 20rem;
height: 20rem;
padding: 1rem;
border-radius: 0.5rem;

background-color: #d6cfe2;

.date {
  font-size: small;
}

a {
  z-index: 1;
  text-decoration: underline;
  text-underline-offset: 0.25rem;
  width: max-content;
  :hover {
    ~ img {
        opacity: 0.15;
        filter: none;
      }
  }
}

p:last-of-type {
  font-size: smaller;
}

a, p {
  margin-left: 1rem;
}

img {
  transition: 0.5s;
  filter: blur(0.5rem);
  position: absolute;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  opacity: 0.15;
  z-index: 0;
  border-radius: 0.5rem;
  
  :hover {
    transition: 0.5s;
    filter: none;
  }
}

@media (prefers-color-scheme: dark) {
  background-color: #252526;

  a:hover ~ img {
    opacity: 0.35;
    filter: none;
  }

  img:hover {  
    opacity: 0.35;
    filter: none;
    
  }
}

/* Tablet */
@media screen and (min-width: 768px) {
  a {
    z-index: 1;
    text-decoration: none;
    :hover {
      text-decoration: underline;
      text-underline-offset: 0.25rem;

      ~ img {
          opacity: 0.15;
        }
    }
  }

  @media (prefers-color-scheme: dark) {

    a:hover ~ img {
      opacity: 0.35;
      filter: none;
    }

    img:hover {  
      opacity: 0.35;
      filter: none;
      
    }
  }
} 
`;