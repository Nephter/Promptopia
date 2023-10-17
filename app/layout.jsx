import "src/styles/globals.css";

import Provider from "src/components/Provider";
import Link from "next/link";
import Image from "next/image";
import Nav from "src/components/Nav";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <nav className='flex-between w-full mb-16 p-4'>
          <Link href='/' className='flex gap-2 flex-center'>
            <Image
              src='/assets/images/logo.svg'
              alt='logo'
              width={30}
              height={30}
              className='object-contain'
            />
            <p className='logo_text'>Promptopia</p>
          </Link>
          <Nav />
        </nav>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            zIndex="99999"
          />
          {children}
        </main>

      </Provider>
    </body>
  </html>
);

export default RootLayout;
