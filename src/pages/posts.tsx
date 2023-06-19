import { Layout } from '@/components/layout/Layout';
import { Post } from '@/models/Post';
import { getAllPosts } from '@/lib';
import Link from 'next/link';

interface Props {
  posts: Post[];
}

export const getStaticProps = () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default function Posts({ posts }: Props) {
  return (
    <Layout>
      <h2>All posts </h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
