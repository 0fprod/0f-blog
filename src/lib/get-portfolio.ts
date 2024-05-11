import { join } from 'path';
import { readdirSync } from 'fs';
import { Project } from '@/models/Project';
import { parseProject } from './parse-project';

const sortByMostRecentDate = (a: Project, b: Project) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

export const getPortfolio = (): Project[] => {
  const portfolioDirectory = join(process.cwd(), 'portfolio');
  const portfolioFiles = readdirSync(portfolioDirectory);
  const projects = portfolioFiles.map((postFile) =>
    parseProject(join(portfolioDirectory, postFile))
  );

  return projects.sort(sortByMostRecentDate);
};
