import { ScrollContextProvider } from '../context/scroll';
import { Toaster } from 'react-hot-toast';
import Head from "@/components/common/Head";
import { ReactNode, Component } from 'react';

interface Props {
  children: ReactNode | Component | any
  preview?: boolean
  id?: string
}

const Layout: React.FC<Props> = ({ 
  children,
  id
}) => {
  return (
    <>
      <ScrollContextProvider>
        {/* <Head seo={false} /> */}

        {children}

        <Toaster position="bottom-center" />
      </ScrollContextProvider>
    </>
  )
};

export default Layout;
