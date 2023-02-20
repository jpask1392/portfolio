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

        <div 
        style={{
          backgroundImage: `url(/images/noise.png)`
        }}
        className="absolute z-50 w-full h-full !pointer-events-none bg-[length:200px_200px]"
      />
        {children}

        <Toaster position="bottom-center" />
      </ScrollContextProvider>
    </>
  )
};

export default Layout;
