import { useState } from "react";
import { LabInput } from "./LabInput";

// Example suggestions array
const allSuggestions = [
  "React Tutorial",
  "JavaScript Tutorial",
  "Next.js Tutorial",
  "How to build a website",
  "How to build a website",
  "How to build a website",
  "Frontend Development",
  "Web Development",
  "Node.js Basics",
  "React State Management",
  "JavaScript Async/Await",
];

const SearchSuggestions = () => {
  const [input, setInput] = useState(""); // State to store user input
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // State for filtered suggestions

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInput(query);

    // Filter suggestions based on user input
    const filtered = allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  return (
    <div className="search-suggestions-container">
      {/* Input field */}
      <LabInput
        label={"Search With Item Name"}
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />

      {/* Suggestions dropdown */}
      {input && filteredSuggestions.length > 0 && (
        <ul className="w-96 border-2 suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item border-b-2 cursor-pointer hover:bg-gray-400"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestions;
