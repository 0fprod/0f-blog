import React from 'react';
import { Article } from './Post.styles';
import { Post } from '@/models/Post';
import remarkGfm from 'remark-gfm';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Code } from '@/components/posts/post/code/Code';

interface Props {
  post: Post;
}

export default function Post({ post }: Props) {
  return (
    <React.Fragment>
      <Article>
        <h2>{post?.title}</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: Code }} children={post?.content} />
      </Article>
    </React.Fragment>
  );
}
