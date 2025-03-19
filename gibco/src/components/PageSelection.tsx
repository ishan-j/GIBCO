import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PageSelection() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch("http://localhost:5000/pages"); // Adjust URL if needed
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {pages.length === 0 ? (
        <div>
          <p>No pages found. Create a new one?</p>
          <button onClick={() => navigate('/createpage')}>
            Create Page
          </button>
        </div>
      ) : (
        <div>
          <h2>Select a Page</h2>
          <ul>
            {pages.map((page) => (
              <li key={page._id}>{page.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PageSelection;
