
import { join } from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import { readFileSync, readdirSync } from 'fs';

export interface Post {
  title: string;
  slug: string;
  date: string;
  content: string;
}

const parsePost = (filepath: string): Post => {
  const rawContent = readFileSync(filepath, 'utf8');
  const { data, content } = matter(rawContent) as GrayMatterFile<string>;

  return {
    title: data.title,
    slug: data.id,
    date: data.date,
    content,
  };
};

export const getPostBySlug = (slug: string): Post => {
  const filepath = join(process.cwd(), 'data', `${slug}.md`);
  return parsePost(filepath);
};

export const getAllPosts = (): Post[] => {
  const postsDirectory = join(process.cwd(), 'data');
  const postFiles = readdirSync(postsDirectory);
  const posts = postFiles.map((postFile) =>
    parsePost(join(postsDirectory, postFile))
  );

  return posts;
};
