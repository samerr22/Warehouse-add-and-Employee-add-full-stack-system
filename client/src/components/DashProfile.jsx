
import { useSelector } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import { deleteUserFailure,deleteUserStart,deleteUserSuccess, signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
 
 //delete profile
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

//singout
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      

      <Link to={'/create-post'}>
            <button
            className="  bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type='button'
              gradientDuoTone='purpleToPink'
            >
              Add new Warehouse
            </button>
          </Link>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      
      
    </div>
  );
}