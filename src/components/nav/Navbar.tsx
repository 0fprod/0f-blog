import Link from 'next/link';
import { Nav } from './Navbar.styles';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();

  return (
    <Nav>
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
