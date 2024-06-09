import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import {Plus } from "lucide-react";
import AddNotes from "./AddNotes";
import Modal from "react-modal"
import { useState } from "react";



const Home = () => {

  const [openModel, setOpenModel] = useState({
    isShow: false,
    type: "add",
    data: null,
  })
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
      
              <NoteCard
                title="Note Title"
                date="12/12/2021"
                content="This is a note content"
                tags="#Note"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => { }}
                onPinNote={() => { }}
                />
            
          </div>
      </div>

      <button className="w-12 h-12 flex items-center justify-center absolute right-10 bottom-10 bg-sky-800 hover:bg-blue-950 rounded-full hover:shadow-md"
        onClick={() => {
        setOpenModel({isShow: true, type: "add", data: null});
      }}
      >
        <Plus size={35} className="text-sky-100 "/>
      </button>

      <Modal
      isOpen={openModel.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
          },
        }}
        contentLabel="Add Note Modal"
        className="xl:w-[50%] md:w-[70%] w-[90%] max-h-3/4 bg-sky-50 rounded-md mx-auto p-5 mt-14 "
      >

        <AddNotes
          type={openModel.type}
          noteData = {openModel.data}
          onclose={() => {

          setOpenModel({isShow: false, type: "add", data: null});
        }}/>
        </Modal>

    </>
  )
}

export default Home