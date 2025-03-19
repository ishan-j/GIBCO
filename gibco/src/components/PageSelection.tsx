import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function PageSelection() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch("http://localhost:5000/pages");
        if (!response.ok) throw new Error("Failed to fetch pages");
        const data = await response.json();
        setPages(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) 
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    );
  
  if (error) 
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400 text-lg">Error: {error}</div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-2xl shadow-2xl w-96">
        {pages.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-400 mb-4">No pages found. Create a new one?</p>
            <button
              onClick={() => navigate('/createpage')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg"
            >
              Create Page
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Select a Page</h2>
            <button
              onClick={() => navigate('/createpage')}
              className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg"
            >
              Create Page
            </button>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page._id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg shadow-md">
                  <span className="text-lg font-medium text-gray-300">{page.name}</span>
                  <button
                    onClick={() => navigate(`/dynamicPage/${page._id}`)}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-lg"
                  >
                    View Page
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageSelection;