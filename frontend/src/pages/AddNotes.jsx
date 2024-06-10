import { useState } from "react";
import { X } from "lucide-react";
import TagInput from "../components/TagInput";
import axiosInstance from "../utils/axiosInstance";

const AddNotes = ({ onclose, type , getAllNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes()
        onclose()
      }
    } catch (error) {
      setError("An error occurred while adding the note");
    }
  };

  const editNote = () => {};

  const addNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError(null);

    if (!type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        onClick={onclose}
        className="flex justify-center items-center w-10 h-10 hover:bg-blue-950 absolute right-0 -top-10 rounded-full hover:text-white"
      >
        <X size={25} />
      </button>

      <div className="flex flex-col gap-3 mt-10">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="bg-sky-100 text-lg text-slate-600 outline-none p-2 mb-5 font-semibold rounded-md"
          placeholder="Type Go to GYM at 6 PM"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm bg-sky-100 text-slate-600 outline-none p-2 rounded-md"
          placeholder="Type the content of the note here"
          rows={10}
          onChange={({ target }) => {
            setContent(target.value);
          }}
          value={content}
        />
      </div>

      <div className="mt-4">
        <label className="input-label"> TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className=" btn-primary font-medium mt-5 " onClick={addNote}>
        ADD
      </button>
    </div>
  );
};

export default AddNotes;
