import { Layout } from '@/components/layout/Layout';
import Post from '@/components/posts/post/Post';
import { getAllPosts, getPostBySlug } from '@/lib';
import { Post as PostModel } from '@/models/Post';
import React from 'react';
interface Context {
  params: {
    slug: string;
  };
}

// Generate all the paths for the posts
// at build time
export const getStaticPaths = () => {
  const paths = getAllPosts().map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }: Context) => {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
};

export default function PostPage({ post }: { post: PostModel }) {
  return (
    <Layout>
      <Post post={post} />
    </Layout>
  );
}
