import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Layout } from '@/components/layout/Layout';
import { getAllPosts, getPostBySlug } from '@/lib';
import { Code } from '@/components/code/Code';
import { Post } from '@/models/Post';
import remarkGfm from 'remark-gfm';
import React from 'react';

interface Props {
  post: Post;
}

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

export default function Post({ post }: Props) {
  return (
    <Layout>
      <article>
        <h2>{post?.title}</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: Code }} children={post?.content} />
      </article>
    </Layout>
  );
}
