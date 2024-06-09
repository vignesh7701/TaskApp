
import { getinitials } from "../utils/helper";

const ProfileInfo = ({onLogout}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-black w-9 h-9 flex items-center justify-center rounded-full bg-slate-200">
              {getinitials("Vicky")}
      </div>

      <div>
        <p className="font-medium text-white">Vicky</p>
        <button className="text-cyan-200 underline underline-offset-2  " onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo