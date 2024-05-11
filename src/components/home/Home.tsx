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
              Welcome to my blog! Here I'm going to share some articles about software development, blockchain, and
              other tech-related topics. I hope you find them interesting and useful. Enjoy your stay! 🚀 Also some of
              my pet projects 🐕
            </p>
          </SectionContent>
        </SectionHeader>

        <section>
          <h3> Who am I?</h3>
          <p>
            I graduated in 2017 as a software engineer and have been diving into the tech world ever since. I'm all
            about football, blockchain, and full-stack development, especially in the Web3 space. I had the opportunity
            to share insights as a speaker at JavaScript Day Canarias in2023 about web3 development tools and how to
            write decentralized applications compatible with EVM.
          </p>
          <p>
            With over 7 years of delivering professional software. I've been tinkering with everything from front end
            applications, back-ends to smart contracts and always trying to follow the best practices. I'm a huge
            advocate for automated testing; it gives me that extra confidence boost. For me, it's all about writing
            quality, straightforward code that's easy to maintain and adapt.
          </p>
          <p>And speaking of adaptability, successful software should be able to evolve effortlessly, right?</p>
        </section>
      </PageSection>
    </React.Fragment>
  );
}
