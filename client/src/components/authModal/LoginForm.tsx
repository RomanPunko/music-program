import React, { FC } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { isLoginForm } from "../../store/reducers/authModalSlice";
import { useAppDispatch } from "../../hooks/AppHooks";
import { setIsAuthenticated } from "../../store/reducers/userSlice";
import { setIsModalOpen } from "../../store/reducers/authModalSlice";

interface ILoginFormProps {
  closeWindow: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({closeWindow}) =>{
  const dispatch = useAppDispatch();

  const goRegister = () =>{
    dispatch(isLoginForm(false))
  }

  const singIn = () =>{
    dispatch(setIsAuthenticated(true));
    dispatch(setIsModalOpen(false))
  }

  const sx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
      '&:-webkit-autofill': {
      '-webkit-background-clip': 'text !important',
      '-webkit-text-fill-color': 'white !important',
    },
    }
  }

  return(
    <>
          <div className="bg-config-primary-color p-6 rounded-lg w-[400px] h-[400px] relative">
      <IconButton
        aria-label="close"
        onClick={closeWindow}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        >
        <CloseIcon />
      </IconButton>
    </div>
    <div className="absolute">
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch',} }}
        noValidate
        autoComplete="off"
      >
        <div className="flex flex-col">
          <TextField
            sx={sx}
            id="outlined-required"
            label="Email"
            type="email"
            autoComplete="email"
          />
          <TextField
            sx={sx}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
      <Button
        variant="contained"
        onClick={singIn}
        sx={{ 
          backgroundColor: '#333', 
          display: 'block', 
          margin: '0 auto',
          marginTop: '50px',
          width: '140px',
          height: '50px'
        }}
      >
        Sign in
      </Button>
      <div>
        <p className="text-xs text-center mt-4 hover:underline cursor-pointer" onClick={goRegister}>Don't have an account?</p>
      </div>
    </div>
    </>
  )
}

export default LoginForm;