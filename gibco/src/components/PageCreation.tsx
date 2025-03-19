import { useState } from "react";
import { Loader2 } from "lucide-react";

function PageCreation() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreatePage = async () => {
    if (!name.trim()) {
      setMessage("Page name is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, fields: [] }),
      });

      if (!response.ok) throw new Error("Failed to create page");

      setMessage("Page created successfully!");
      setName("");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create a New Page</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">Define your page by giving it a unique name.</p>
        
        <input
          type="text"
          placeholder="Enter page name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        />
        
        <button
          onClick={handleCreatePage}
          disabled={loading}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Create Page"}
        </button>
        
        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
}

export default PageCreation;