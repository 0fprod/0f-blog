import { join } from 'path';
import { readdirSync } from 'fs';
import { Post } from '../models/Post';
import { parsePost } from './parse-post';

const sortByMostRecentDate = (a: Post, b: Post) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

export const getAllPosts = (): Post[] => {
  const postsDirectory = join(process.cwd(), 'data');
  const postFiles = readdirSync(postsDirectory);
  const posts = postFiles.map((postFile) =>
    parsePost(join(postsDirectory, postFile))
  );

  return posts.sort(sortByMostRecentDate);
};
