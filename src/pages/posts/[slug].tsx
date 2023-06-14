import { Layout } from '@/components/layout/Layout';
import { Post, getAllPosts, getPostBySlug } from '@/lib/get-posts';
import Markdown from 'markdown-to-jsx';

interface Props {
  post: Post;
}

interface Context {
  params: {
    slug: string;
  };
}

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
      <h2>{post?.title}</h2>
      <Markdown>{post?.content}</Markdown>
    </Layout>
  );
}
