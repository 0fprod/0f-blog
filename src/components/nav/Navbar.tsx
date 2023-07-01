import Link from 'next/link';
import { Nav } from './Navbar.styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const threshold = 100; // Adjust this value according to your needs

      setIsFixed(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Nav className={isFixed ? 'fixed' : ''}>
      <ul>
        <li className={router.pathname === '/' ? 'active' : ''}>
          <Link href="/">Home</Link>
        </li>
        <li className={router.pathname === '/posts' ? 'active' : ''}>
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
    </Nav>
  );
};
