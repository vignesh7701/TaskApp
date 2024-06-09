/* eslint-disable react/prop-types */
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isPassword, setIsPassword] = useState("");

  const togglePassword = () => { 
    setIsPassword(!isPassword);
  };

  return (
    <div className="block justify-center items-center relative  w-full">
      <input
        type={isPassword ? "text" : "password"}
        onChange={onChange}
        value={value}
        placeholder={placeholder || "Password"}
        className="field"
      />
      {isPassword ? (
        <div className="absolute right-2 top-4">
          <Eye
            size={32}
            className=" text-blue-50 cursor-pointer px-1 bg-blue-950 rounded-full"
            onClick={togglePassword}
          />
        </div>
      ) : (
          <div className="absolute right-2 top-4">
        <EyeOff
          size={32}
          className="text-blue-50 cursor-pointer px-1 bg-blue-950 rounded-full"
          onClick={togglePassword}
            />
            </div>
      )}
    </div>
  );
};

export default PasswordInput;
