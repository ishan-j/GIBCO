import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const sliderData = [
  { id: 1, title: 'Drag-and-Drop Components', description: 'Quickly build pages with easy drag-and-drop.' },
  { id: 2, title: 'Custom CSS Support', description: 'Style components effortlessly with custom CSS.' },
  { id: 3, title: 'API Integration', description: 'Connect with external services seamlessly.' }
];

function Home() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
const navigate = useNavigate();
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleRedirect = () => {
    navigate('/editor');
  }
  return (
    <div className="bg-black text-white min-h-screen flex flex-col ">
      <header className="py-6 ml-[2%]">
        <h1 className="text-4xl font-bold text-green-500">GIBCO</h1>
        <p className="text-gray-300 mt-2">Low-Code Automation Made Simple</p>
      </header>
      <main className="flex flex-col items-center mt-10 items-center">
        <h2 className="text-2xl text-green-400 mb-4">Build Faster, Automate Smarter</h2>
        <p className="text-center max-w-xl text-gray-400 mb-6">
          With GIBCO, streamline your web development process with easy drag-and-drop components, API integration, and custom automation.
        </p>
      </main>
      <div className="relative flex items-center justify-center my-10 gap-6 items-center">
        {sliderData.map((item, index) => (
          <motion.div
            key={item.id}
            className={`p-4 rounded-lg text-center bg-[#3d2b1f] text-white shadow-lg ${
              index === currentIndex ? 'z-20' : 'z-10 opacity-50'
            }`}
            animate={{
              opacity: index === currentIndex ? 1 : 0.5,
              scale: index === currentIndex ? 1.05 : 0.9,
            }}
            transition={{ duration: 0.5 }}
            style={{ minWidth: '250px', maxWidth: '300px' }}
          >
            <h3 className="text-xl font-bold text-green-400">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </div>
      <button className="bg-green-500 ml-[45%]  w-[10%] text-black px-6 py-2 rounded-lg hover:bg-green-600 transition mb-10 "
      onClick={handleRedirect}>
        Get Started
      </button>
      <footer className="mt-auto py-4 ml-[2%]">
        <p className="text-gray-500">&copy; 2025 GIBCO. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;