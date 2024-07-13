import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import Toast from "../components/Toast";
import {Plus } from "lucide-react";
import AddNotes from "./AddNotes";
import Modal from "react-modal"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import EmptyCard from "../components/EmptyCard";
import BgDefault from "../assets/BgImage.png";



const Home = () => {

  const [openModel, setOpenModel] = useState({
    isShow: false,
    type: "add",
    data: null,
  })

  const [toast, setToast] = useState({
    isShown: false,
    message: "",
    type:"add",
  });

  const showToast = (message, type) => { 
    setToast({ isShown: true, message, type });
  }
  const [search, setSearch] = useState(false)
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();


  const handleEdit = (noteDetails) => {
    setOpenModel({ isShow: true, type: "edit", data: noteDetails });
  }

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data.user) {
        setUser(response.data.user);
      }
    }
    catch (error) {
      if (error.response.status === 400) {
        localStorage.clear();
        navigate("/login");
      }
    }
    
  };

  const getAllNotes = async () => { 
    try {
      const response = await axiosInstance.get("/get-notes");
      if (response.data.note) {
        setNotes(response.data.note);
      }
    }
    catch (error) {
      console.log(error.response.data);
    }
  }

  const deleteNote = async (data) => { 
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data) {
        showToast("Note deleted successfully", "delete");
        getAllNotes();
      }
    }
    catch (error) {
      console.log(error.response.data);
    }
  
  }


  const onSearch = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: {query},
      })
    
    if (response.data && response.data.notes) { 
    setSearch(true);
    setNotes(response.data.notes);
    }
    }
    catch (error) {
      console.log(error); 
    }
  }

  const handleXSearch = () => {
    setSearch(false);
    getAllNotes();
  }
  
  const updatePin = async (noteData) => { 
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/update-note-pin-status/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (response.data && response.data.note) {
        showToast("Pin Updated");
        getAllNotes();
      }
    } catch (error) {
      console.log("error pinnig");
    }
  }


  useEffect(() => {
    getAllNotes();
    getUser();
    return () => { };
  }, []);


  return (
    <>
      <Navbar user={user} onSearch={onSearch} handleXSearch={handleXSearch} />
      <div className="mx-auto p-3 container">
        {notes.length > 0 ? (<div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
          {notes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              isPinned={item.isPinned}
              tags={item.tags}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updatePin(item)}
            />
          ))}
        </div>) : (<EmptyCard ImgSrc={BgDefault} notes={notes} />)}
      </div>

      <button
        className="right-10 bottom-10 absolute flex justify-center items-center bg-sky-800 hover:bg-blue-950 hover:shadow-md rounded-full w-12 h-12"
        onClick={() => {
          setOpenModel({ isShow: true, type: "add", data: null });
        }}
      >
        <Plus size={35} className="text-sky-100" />
      </button>

      <Modal
        isOpen={openModel.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
          },
        }}
        ariaHideApp={false}
        contentLabel="Add Note Modal"
        className="bg-sky-50 mx-auto mt-14 p-5 rounded-md w-[90%] md:w-[70%] xl:w-[50%] max-h-3/4"
      >
        <AddNotes
          type={openModel.type}
          noteData={openModel.data}
          onclose={() => {
            setOpenModel({ isShow: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToast={showToast}
        />
      </Modal>

      <Toast
        isShown={toast.isShown}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ isShown: false, message: "" })}
      />
    </>
  );
}

export default Home