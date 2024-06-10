import { Pin, Pencil, Trash } from "lucide-react";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-7 bg-slate-50 hover:shadow-lg transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-md font-medium">{title}</h5>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMMM YYYY")}
          </span>
        </div>

        <Pin
          onClick={onPinNote}
          size={20}
          className={`icon-btn ${isPinned ? "text-cyan-500" : "text-black"}`}
        />
      </div>
      <p className="flex items-center justify-between mt-2">
        {content?.slice(0, 40)}
      </p>

      <div className="text-xs text-slate-500">
        <div>{tags.map((item)=> `#${item}`)}</div>

        <div className="flex items-center gap-2 mt-5">
          <Pencil
            size={20}
            onClick={onEdit}
            className="icon-btn hover:text-green-600"
          />
          <Trash
            size={20}
            onClick={onDelete}
            className="icon-btn hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
