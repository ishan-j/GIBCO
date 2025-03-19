import { JSX, useState } from "react";

interface Element {
  control: string;
  type: string;
}

function Editor() {
  const [page, setPage] = useState<Element[]>([]);

  const handleDynamicInput = (controlType: string) => {
    const newElement: Element = {
      control: controlType,
      type: "text",
    };
    setPage([...page, newElement]);
  };

  return (
    <>
    <div className="flex space-x-8 p-6 bg-gray-900 min-h-screen">
      <div className="flex-1">
        <h1 className="text-white text-2xl font-semibold mb-6">Editor</h1>
        <button
          onClick={() => handleDynamicInput("button")}
          className="mt-4 py-2 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Add Button
        </button>
        <button
          onClick={() => handleDynamicInput("input")}
          className="mt-4 py-2 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Add Input
        </button>
      </div>
      <div className="flex-1">
        <h1 className="text-white text-2xl font-semibold mb-6">Viewer</h1>
        <div className="mt-4 space-y-4">
          {page.map((element, index) => {
            let control: JSX.Element | null = null;
            switch (element.control) {
              case "button":
                control = (
                  <button key={index} className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
                    Click me
                  </button>
                );
                break;
              case "input":
                control = (
                  <input
                    key={index}
                    type={element.type}
                    className="py-2 px-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                );
                break;
            }
            return <div key={index}>{control}</div>;
          })}
        </div>
      </div>
    </div>
  </>
  );
}

export default Editor;
