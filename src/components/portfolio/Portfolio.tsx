import React from 'react';
import { PageSection, PortfolioContainer } from './Portfolio.styles';
import { Project as ProjectModel } from '@/models/Project';
import Project from './project/Project';

interface PortfolioProps {
  projects: ProjectModel[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  return (
    <React.Fragment>
      <PageSection>
        <h1>Projects </h1>
        <PortfolioContainer>
          {projects.map((project) => (
            <Project key={project.title} project={project} />
          ))}
        </PortfolioContainer>
      </PageSection>
    </React.Fragment>
  );
}
