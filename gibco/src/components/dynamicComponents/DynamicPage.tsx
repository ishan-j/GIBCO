import { JSX, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Field {
  type: string; // Field type (e.g., text, number, select)
  name: string; // Internal field name
  displayName: string; // User-friendly display name
  trigger: string | null; // Trigger event or function (if any), nullable
}
interface Page {
  name: string; // Page name
  fields: Field[]; // Array of fields with the `Field` interface
}
interface Element {
  type: string;
  name: string;
  displayName: string;
  trigger: string;
}
interface Setting {
  type: string;
  name: string;
  displayName: string;
  trigger: string;
  index: any;
}
function DynamicPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { pageid } = useParams<{ pageid: string }>(); // Extract the pageid parameter
  const [page, setPage] = useState<Page | null>(null);
  const [fields, setFileds] = useState<Element[]>([]);
  const [settings, setSettings] = useState<Setting>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pages/${pageid}`
        );
        console.log(response.data);

        setPage(response.data);
        // const newElement: Element = {
        //     type : response.data.fields.type,
        //     name : response.data.fields.name,
        //     displayname: "default",
        //     trigger : "default trigger",
        // }
        setFileds(response.data.fields);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDynamicInput = (controlType: string) => {
    const newElement: Element = {
      type: controlType,
      name: "text",
      displayName: "default",
      trigger: "default trigger",
    };
    setFileds((prevFields) => [...prevFields, newElement]);
  };

  const handlePageSave = async () => {
    const pageData = {
      name: "page",
      fields: fields,
    };

    const response = await axios.put(
      `http://localhost:5000/pages/${pageid}`,
      pageData
    );
    console.log(response);
  };

  const handleSettings = (
    type: string,
    name: string,
    displayName: string,
    trigger: string,
    index: any
  ) => {
    const data = {
      type: type,
      name: name,
      displayName: displayName,
      trigger: trigger,
      index: index,
    };
    setSettings(data);
    console.log(data);
  };
  const changeSettings = (
    type: string | undefined,
    name: string | undefined,
    displayName: string | undefined,
    trigger: string | undefined,
    index: any
  ) => {
    const updatedFileds = fields.map((field, i) => {
      if (i === index) {
        return {
          ...field,
          type: type ?? "defaultType", //
          name: name ?? "defaultName",
          displayName: displayName ?? "defaultDisplayName", //
          trigger: trigger ?? "defaultTrigger", //
        };
      }
      return field;
    });
    setFileds(updatedFileds);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-6">
        {page ? page.name : "Page not found"}
      </h1>
      <div className="flex gap-8 w-full max-w-6xl">
        <div>
          <h2>Settings</h2>
          <div>
            <h1>{settings?.type}</h1>
            <input
              type="text"
              value={settings?.name || ""}
              onChange={(e) =>
                setSettings((prevSettings) => {
                  if (prevSettings) {
                    return {
                      ...prevSettings,
                      name: e.target.value, // Update displayName
                    };
                  }
                  return prevSettings;
                })
              }
            />
            <input
              type="text"
              value={settings?.displayName || ""}
              onChange={(e) =>
                setSettings((prevSettings) => {
                  if (prevSettings) {
                    return {
                      ...prevSettings,
                      displayName: e.target.value, // Update displayName
                    };
                  }
                  return prevSettings;
                })
              }
            />

            <input
              type="text"
              value={settings?.trigger || ""}
              onChange={(e) =>
                setSettings((prevSettings) => {
                  if (prevSettings) {
                    return {
                      ...prevSettings,
                      trigger: e.target.value, // Update displayName
                    };
                  }
                  return prevSettings;
                })
              }
            />
            <h2>{settings?.index || ""}</h2>
            <button
              onClick={() =>
                changeSettings(
                  settings?.type,
                  settings?.name,
                  settings?.displayName,
                  settings?.trigger,
                  settings?.index
                )
              }
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Editor</h2>
          <div className="space-x-4">
            <button
              onClick={() => handleDynamicInput("button")}
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
            >
              Add Button
            </button>
            <button
              onClick={() => handleDynamicInput("input")}
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
            >
              Add Input
            </button>
          </div>
          <button
            onClick={handlePageSave}
            className="mt-6 py-2 px-6 bg-green-500 hover:bg-green-600 rounded-lg transition"
          >
            Save Page
          </button>
        </div>
        <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Viewer</h2>
          <div className="space-y-4">
            {fields.map((element, index) => {
              let control: JSX.Element | null = null;
              switch (element.type) {
                case "button":
                  control = (
                    <button
                      key={index}
                      className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
                      onClick={() =>
                        handleSettings(
                          element.type,
                          element.name,
                          element.displayName,
                          element.trigger,
                          index
                        )
                      }
                    >
                      Click me
                    </button>
                  );
                  break;
                case "input":
                  control = (
                    <input
                      onClick={() =>
                        handleSettings(
                          element.type,
                          element.name,
                          element.displayName,
                          element.trigger,
                          index
                        )
                      }
                      key={index}
                      type={element.name}
                      className="w-full py-2 px-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  );
                  break;
              }
              return <div key={index}>{control}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicPage;
