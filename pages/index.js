// pages/index.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
export default function BirthdayPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    setLoading(true); // Show the loading state
    
      router.push('/images'); // Redirect to /images after a slight delay
     // Optional: Delay to simulate loading
  };
  const handleRedirect1 = () => {
    setLoading(true); // Show the loading state
    
      router.push('/notes'); // Redirect to /images after a slight delay
    // Optional: Delay to simulate loading
  }
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center">
      <div className="revolving-container">
  <img
    src="/og-image.png"
    alt="Revolving IMg"
    className="revolving-image w64 h-64 rounded-full"
  />
</div>
      <Head>
        <title>Happy Birthday!</title>
        <meta name="description" content="Celebrate your special day with Next.js!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-yellow-400">🎉 Happy Birthday! 🎂</h1>
        <p className="text-xl mb-8 text-gray-300">
         
        </p>

        {loading ? (
          <div className="text-lg text-yellow-400 animate-bounce">🎁 Loading your gift...</div>
        ) : (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={handleRedirect}
              className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-200"
            >
              🖼️ Open Your Images
            </button>
            <button
              onClick={handleRedirect1}
              className="bg-blue-600 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
            >
              📝 Notes 
            </button>
          </div>
        )}
      </main>

      <footer className="absolute bottom-4 text-gray-500 text-sm">
        Made with ❤️ using Next.js
      </footer>
    </div>
  );
}
