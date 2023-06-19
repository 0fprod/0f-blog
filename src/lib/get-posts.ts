import { join } from 'path';
import { readdirSync } from 'fs';
import { Post } from '../models/Post';
import { parsePost } from './parse-post';


export const getAllPosts = (): Post[] => {
  const postsDirectory = join(process.cwd(), 'data');
  const postFiles = readdirSync(postsDirectory);
  const posts = postFiles.map((postFile) =>
    parsePost(join(postsDirectory, postFile))
  );

  return posts;
};
