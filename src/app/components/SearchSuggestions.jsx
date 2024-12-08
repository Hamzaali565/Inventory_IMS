import { useState, useEffect } from "react";
import { LabInput } from "./LabInput";
import { useSelector } from "react-redux";

// Example suggestions array
const allSuggestions = [
  "React Tutorial",
  "JavaScript Tutorial",
  "Next.js Tutorial",
  "How to build a website",
  "Frontend Development",
  "Web Development",
  "Node.js Basics",
  "React State Management",
  "JavaScript Async/Await",
];

const SearchSuggestions = ({ value, onClick, ref }) => {
  const [input, setInput] = useState(value); // State to store user input
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // State for filtered suggestions
  const [selectedIndex, setSelectedIndex] = useState(-1); // Index of the selected suggestion
  const url = useSelector((state) => state.main.url);
  const handleInputChange = async (e) => {
    try {
      setInput(e.target.value);
      let response = await fetch(
        `${url}/item-partial?item_name=${e.target.value}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      response = (await response.json()).data.data;
      setFilteredSuggestions(response);
      setSelectedIndex(-1);
    } catch (error) {
      console.log("error", error);
      setFilteredSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Navigate down in suggestions
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Navigate up in suggestions
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      // Select the current suggestion
      setInput(filteredSuggestions[selectedIndex].item_name);
      onClick(filteredSuggestions[selectedIndex]);
      // console.log(filteredSuggestions[selectedIndex]);

      setFilteredSuggestions([]); // Hide suggestions after selection
    } else if (e.key === "Escape") {
      // Dismiss suggestions on Escape
      setFilteredSuggestions([]);
    }
  };

  // Add event listener to handle keyboard events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredSuggestions, selectedIndex]);

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
        ref={ref}
      />

      {/* Suggestions dropdown */}
      {input && filteredSuggestions.length > 0 && (
        <ul className="w-96 border-2 suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`suggestion-item border-b-2 cursor-pointer ${
                index === selectedIndex ? "bg-gray-400 text-white" : ""
              }`}
            >
              {suggestion.item_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestions;
