import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {leaveMember} from '../Store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pt: 0,
  borderRadius: 5,
  alignItems: 'center',
};

export default function LeaveOrg({ecosystemId}) {
  const [open, setOpen] = React.useState(false);
  const { singleEcosystem, loggedInUser} =
    useSelector((state) => state)
  const router = useRouter();
  const dispatch = useDispatch()
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async (e,closing) => {
    if (closing) {
      setOpen(false);
      return;
    }
    router.push('/')
    dispatch(leaveMember(loggedInUser.id, ecosystemId))

    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={handleOpen}
        className='text-red-600 border border-red-600 rounded-3xl p-2 w-1/3 hover:bg-red-600 hover:text-white'
      >
        Leave Ecosystem
      </button>
      <Modal
        hideBackdrop
        open={open}
        onClose={(e) => handleClose(e, true)}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: 300,
            height: 185,
            boxShadow: '2px 5px 30px red',
          }}
        >
          <div className='w-full flex flex-col items-center pt-4'>
            <h2 id='child-modal-title' className='p-2'>
              Leaving will delete any/all uncompleted tasks you have created (even if currently claimed by another)
              <CloseIcon
                className='absolute top-0 right-0 m-3 duration-300 hover:scale-110 hover:font-bold'
                onClick={(e) => handleClose(e, true)}
              />
            </h2>
            <p id='child-modal-description'></p>
            <button
              onClick={() => {
                handleClose();

              }}
              className='text-red-600 border border-red-600 rounded-3xl p-2 w-3/4 hover:bg-red-600 hover:text-white'
            >
              Comfirm
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
            }
