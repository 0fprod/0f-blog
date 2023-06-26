import React from 'react';
import { Post } from '@/models/Post';
import Link from 'next/link';
import { PostPreviewContainer } from './PostPreview.styles';
import Image from 'next/image';

export default function PostPreview(post: Post) {
  return (
    <React.Fragment>
      <PostPreviewContainer key={post.slug}>
        <p className="date">{post.date}</p>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        <p>{post.description}</p>
        <Image src={post.imageUrl} alt={`imagen de ${post.title}`} width={120} height={120} />
      </PostPreviewContainer>
    </React.Fragment>
  );
}

// hay que ordenar los posts a nivel de estilos
