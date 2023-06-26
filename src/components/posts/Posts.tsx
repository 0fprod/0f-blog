import React from 'react';
import { PageSection, PostsContainer } from './Posts.styles';
import { Post } from '@/models/Post';
import PostPreview from './post-preview/PostPreview';

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  return (
    <React.Fragment>
      <PageSection>
        <h1>All posts </h1>
        <PostsContainer>
          {posts.map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
        </PostsContainer>
      </PageSection>
    </React.Fragment>
  );
}
