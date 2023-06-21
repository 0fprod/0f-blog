import { Navbar } from '@/components/nav/Navbar';
import { Main } from './Layout.styles';

export const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar></Navbar>
      <Main> {children} </Main>
    </>
  );
};
