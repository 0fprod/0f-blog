import React from 'react';
import { PageSection, PostsContainer } from './Posts.styles';
import { Post } from '@/models/Post';
import PostPreview from './post-preview/PostPreview';
import Filter from './filter/Filter';

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  const [term, setTerm] = React.useState('');

  const updateSearchTerm = (termToSearch: string) => {
    setTerm(termToSearch);
  };

  const filterByTitle = (post: Post) => {
    return post.title.toLowerCase().indexOf(term.toLowerCase()) != -1;
  };

  return (
    <React.Fragment>
      <PageSection>
        <h1>All posts </h1>
        <Filter onType={updateSearchTerm} />
        <PostsContainer>
          {posts.filter(filterByTitle).map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
        </PostsContainer>
      </PageSection>
    </React.Fragment>
  );
}
