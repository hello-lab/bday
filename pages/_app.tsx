import type { AppProps } from "next/app";
import "../styles/index.css";
import Layout from "../components/Layout"
// pages/_app.js
import '../styles/global.css';



export default function MyApp({ Component, pageProps }: AppProps) {
  
  return <Component {...pageProps} />;
}
