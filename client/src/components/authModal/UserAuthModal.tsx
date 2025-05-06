import React from "react";
import { useAppDispatch } from "../../hooks/AppHooks";
import { useAppSelector } from "../../hooks/AppHooks";
import { setIsModalOpen } from "../../store/reducers/authModalSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const UserAuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.authModal.isModalOpen);
  const isLoginForm = useAppSelector((state) => state.authModal.isLoginForm);

  const handleCloseIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(isModalOpen == true){
      dispatch(setIsModalOpen(false))
    }
  };

  return (
  <div className="fixed inset-0 z-[10] flex items-center justify-center bg-black/80">
    {isLoginForm ? <LoginForm closeWindow = {handleCloseIconClick}/> : <RegisterForm closeWindow = {handleCloseIconClick} />}
  </div>
  );
};


export default UserAuthModal;