import Image from 'next/image';
import profilePic from '../../../public/profile.webp';
import React from 'react';
import { PageSection, SectionContent, SectionHeader } from './Home.styles';

export default function Home() {
  return (
    <React.Fragment>
      <PageSection>
        <SectionHeader>
          <Image src={profilePic} alt="picture of the author" />
          <SectionContent>
            <h1>Hi! I'm Fran.</h1>
            <p>
              In this blog, I'm going to share my thoughts about software development, frontend technologies, and
              everything I learn during my journey as a developer.
            </p>
          </SectionContent>
        </SectionHeader>

        <section>
          <h3> Who am I?</h3>
          <p>
            I graduated as a software engineer in 2017 and I've not stopped learning since then, my interests are
            football ⚽️, finances 📈, blockchain ⛓️, and of course frontend development (💙 typescript). I'm also a big
            fan of Web3 technology 🤘🏼!
          </p>
          <p>
            As for my experience, I've worked with several stacks as a full-stack developer using technologies such as
            Java, C#, NodeJs and Python but during my last years I've been more focused, and where I feel more
            comfortable is as a frontend developer with the typical frameworks like Angular, React or Vue.
          </p>
          <p>
            I'm a team player, I enjoy working doing pairing sessions or even mob programming with the team. I'm also
            interested in following the best practices when we create software 😁
          </p>
        </section>
      </PageSection>
    </React.Fragment>
  );
}
