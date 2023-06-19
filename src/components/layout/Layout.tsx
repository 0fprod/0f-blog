import { Navbar } from '@/components/nav/Navbar';

export const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar></Navbar>
      <main> {children} </main>;
    </>
  );
};
