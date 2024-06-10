import { Check, Trash2 } from "lucide-react";
import { useEffect } from "react";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`absolute top-16 right-6 transition-all duration-300 ease-in-out ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      {isShown && (
        <div
          className={`min-w-52 bg-slate-50 rounded-md shadow-sm after:w-[5px] after:h-full ${
            type === "delete" ? "after:bg-red-400" : "after:bg-green-400"
          } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
        >
          <div className="flex items-center gap-3 py-2 px-3">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                type === "delete" ? "bg-red-50" : "bg-green-50"
              }`}
            >
              {type !== "delete" ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <Trash2 size={20} className="text-red-500" />
              )}
            </div>
            <p className="text-sm text-slate-500">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toast;
