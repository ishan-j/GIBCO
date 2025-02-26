import React from 'react';

// Define types for the section data
type Section =
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'button'; label: string; onClick: () => void };

// Dynamic components (e.g., section types)
const TextSection: React.FC<{ content: string }> = ({ content }) => (
  <div className="p-4 bg-gray-100 rounded-md shadow-md text-lg">{content}</div>
);

const ImageSection: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="p-4 flex justify-center">
    <img src={src} alt={alt} className="rounded-md shadow-md" />
  </div>
);

const ButtonSection: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => (
  <div className="p-4 flex justify-center">
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400"
    >
      {label}
    </button>
  </div>
);

const DynamicPage: React.FC = () => {
  // Define an array of sections with dynamic content and type
  const sections: Section[] = [
    {
      type: 'text',
      content: 'This is a dynamic text section with Tailwind styling!',
    },
    {
      type: 'image',
      src: 'https://via.placeholder.com/150',
      alt: 'Placeholder Image',
    },
    {
      type: 'button',
      label: 'Click Me!',
      onClick: () => alert('Button clicked!'),
    },
    {
      type: 'text',
      content: 'Another dynamic text section with Tailwind!',
    },
  ];

  // Function to render each section based on its type
  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'text':
        return <TextSection key={index} content={section.content} />;
      case 'image':
        return <ImageSection key={index} src={section.src} alt={section.alt} />;
      case 'button':
        return <ButtonSection key={index} label={section.label} onClick={section.onClick} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-6">
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
};

export default DynamicPage;
