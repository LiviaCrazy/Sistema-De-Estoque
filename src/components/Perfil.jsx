import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";

const InputField = ({ label, type = "text", placeholder, Icon }) => (
  <div className="flex items-center space-x-3 border-b-2 border-[#768190] mb-6">
    {Icon && <Icon className="w-6 h-6 text-[#768190]" />}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 text-[#000000] bg-transparent outline-none text-[20px] font-normal"
    />
  </div>
);

const Button = ({ label, className, to, onClick }) => (
  <Link
    to={to}
    className={`block w-[186px] h-[53px] bg-[#123465] border-b-4 border-[#28487E] rounded-[40px] ${className} transition-all duration-300 ease-in-out hover:bg-[#0a1f3d]`}
    onClick={onClick}
  >
    <span className="text-white text-[20px] font-light block text-center py-2">{label}</span>
  </Link>
);

const ProfileCard = ({ avatar, onAvatarChange, onRemoveAvatar, userName, userEmail }) => (
  <div className="flex flex-col items-center space-y-6">
    <div className="relative w-[150px] h-[150px] bg-white border-none rounded-full overflow-hidden shadow-lg">
      <img
        src={avatar}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="flex items-center space-x-4 mt-4">
      <label className="bg-[#123465] p-3 rounded-full cursor-pointer shadow-lg transform hover:scale-105 transition-all">
        <input
          type="file"
          accept="image/*"
          className="absolute top-0 left-0 w-full h-full opacity-0"
          onChange={onAvatarChange}
        />
        <FaPencilAlt className="text-white" />
      </label>
      
      {avatar !== "https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg" && (
        <button
          onClick={onRemoveAvatar}
          className="bg-red-500 p-3 rounded-full cursor-pointer shadow-lg transform hover:scale-105 transition-all"
        >
          <FaTrashAlt className="text-white" />
        </button>
      )}
    </div>

    <div className="text-[#123465] text-[24px] font-semibold leading-[28px]">{userName}</div>
    <div className="text-[#123465] text-[18px] font-normal">{userEmail}</div>
  </div>
);

const Perfil = () => {
  const navigate = useNavigate();
  const defaultAvatar = "https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg";
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || defaultAvatar);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Nome do Usuário");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "email@exemplo.com");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setAvatar(newAvatar);
        localStorage.setItem("avatar", newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(defaultAvatar);
    localStorage.removeItem("avatar");
  };

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    const savedUserEmail = localStorage.getItem("userEmail");

    if (savedUserName) setUserName(savedUserName);
    if (savedUserEmail) setUserEmail(savedUserEmail);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-[#113364] to-[#113364] p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl mx-auto mt-44">
        <div className="flex justify-center">
          <ProfileCard 
            avatar={avatar} 
            onAvatarChange={handleAvatarChange} 
            onRemoveAvatar={handleRemoveAvatar}
            userName={userName}
            userEmail={userEmail}
          />
        </div>

        <div className="flex justify-center mt-10 space-x-8">
          <div className="w-[4000px]">
            <p> POPOPO</p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mt-10">
          <Button label="Favoritos" to="/favoritos" />
          <Button label="Contas" to="/contas" />
        </div>

        <div className="flex justify-center space-x-8 mt-6">
          <Button label="Mudar de senha" to="/esqueci" />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
