import type { Project } from '@/models/Project';
import { ProjectContainer, Tag, TagsContainer } from './Project.styles';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectProps {
  project: Project;
}

export default function Project({ project }: ProjectProps) {
  return (
    <ProjectContainer>
      <p className="date">{project.date}</p>
      <h2>{project.title}</h2>
      <Image src={project.imageUrl} alt={project.imageAlt} width={120} height={120} />
      <i>{project.description}</i>
      <br />
      <Link href={project.url} target="_blank">
        <Image src="/tags/hyperlink.svg" alt={project.imageAlt} width={16} height={16} />
        &nbsp; Project
      </Link>
      <Link href={project.repository} target="_blank">
        <Image src="/tags/github.svg" alt={project.imageAlt} width={16} height={16} />
        &nbsp; Repository
      </Link>
      <br />
      <p>Tech stack:</p>
      <TagsContainer>
        {project.tags.map((tag, index) => (
          <Tag key={index}>
            <img
              src={`/tags/${tag}.svg`}
              alt={tag}
              title={tag}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = `/tags/${tag}.png`;
              }}
            />
          </Tag>
        ))}
      </TagsContainer>
    </ProjectContainer>
  );
}
