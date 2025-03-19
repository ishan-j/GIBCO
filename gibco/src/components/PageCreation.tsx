import { useState } from "react";

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
        body: JSON.stringify({ name, fields: [] }), // Empty fields array for now
      });

      if (!response.ok) throw new Error("Failed to create page");

      setMessage("Page created successfully!");
      setName(""); // Clear input
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a New Page</h2>
      <input
        type="text"
        placeholder="Enter page name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreatePage} disabled={loading}>
        {loading ? "Creating..." : "Create Page"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PageCreation;
