import { Layout } from '@/components/layout/Layout';
import { Post } from '@/models/Post';
import { getAllPosts } from '@/lib';
import Posts from '@/components/posts/Posts';

export const getStaticProps = () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default function PostsPage({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  );
}
