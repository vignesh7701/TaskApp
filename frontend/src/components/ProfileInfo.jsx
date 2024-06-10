
import { getinitials } from "../utils/helper";

const ProfileInfo = ({onLogout, user}) => {
  return (
    user && (<div className="flex items-center gap-3">
      <div className=" hidden lg:flex text-black w-9 h-9  items-center justify-center rounded-full bg-slate-200">
              {getinitials(user?.fullName)}
      </div>

      <div>
        <p className="font-medium text-white">{user?.fullName}</p>
        <button className="text-cyan-200 underline underline-offset-2  " onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
    )
  );
}

export default ProfileInfo