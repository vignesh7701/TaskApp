import { PlusCircle as Add,X } from "lucide-react";
import { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleAddTag = () => {
    if (!inputVal.trim() !== "") {
      setTags([...tags, inputVal.trim()]);
      setInputVal("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleAddTag();
    }
    };
    
    const handleRemoveTag = (tagToRemove) => { 
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-3handleAddTag">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-4 bg-sky-200 text-sky-900 px-2 py-1 rounded-md text-sm"
            >
              # {tag}
                  <button onClick={() => {
                        handleRemoveTag(tag);
                    }
              }>
                      <X />
              </button>
              </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
              <input
                  value={inputVal}
          type="text"
          placeholder="Add Tags"
          className="px-2 py-1 rounded-md outline-none border-b border-sky-200  bg-transparent"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button>
          <Add
            size={21}
            className="text-md text-blue-950 hover:text-cyan-500"
            onClick={() => {
              handleAddTag();
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
