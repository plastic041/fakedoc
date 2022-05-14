import type { AppProps } from "next/app";
import "modern-normalize/modern-normalize.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
