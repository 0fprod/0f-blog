import Link from 'next/link';
import { Post, getAllPosts } from '@/lib/get-posts';
import { Layout } from '@/components/layout/Layout';

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
      <h2>Posts page </h2>
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
