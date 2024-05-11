import { Layout } from '@/components/layout/Layout';
import Portfolio from '@/components/portfolio/Portfolio';
import { getPortfolio } from '@/lib/get-portfolio';
import { Project } from '@/models/Project';

export const getStaticProps = () => {
  const projects = getPortfolio();
  return {
    props: {
      projects,
    },
  };
};

export default function PortfolioPage({ projects }: { projects: Project[] }) {
  return (
    <Layout>
      <Portfolio projects={projects} />
    </Layout>
  );
}
