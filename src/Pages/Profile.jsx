import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateUserStart , updateUserFailure , updateUserSuccess , deleteUserFailure , deleteUserStart , deleteUserSuccess , signOutUserFailure , signOutUserSuccess , signOutUserStart} from '../redux/user/userSlice' 
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


function Profile() {
  const { currentUser , loading , error} = useSelector(state => state.user);
  const[formData , setFormData] = useState({})
  const dispatch = useDispatch();
  console.log(formData);
  const [showListingError , setShowListingError] = useState(false);
  const [userListing , setUserListing] = useState();
  
  console.log(userListing);

  const handelChange =(e)=>{
    setFormData({...formData ,[e.target.id]: e.target.value});  
  }
  
 const handelSubmit = async(e)=>{
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}` , {
      method : 'POST' ,
      headers : {
        'Content-Type' :'application/json',
        Authorization : 'Bearer ${currentUser.token}' ,
      },
      body: JSON.stringify(formData),
    });
    const data  = await res.json();
    if(data.success === false){
      dispatch(updateUserFailure(data.message));
      return ;
    }

    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
 }

 const handelDeleteUser = async()=>{
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}` , {
          method: 'Delete',
        })

        const data = await res.json();
        if(data.success === false){
          dispatch(deleteUserFailure(data.message));
          return ;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
 }

 const handelSignOut =async()=>{

  try {
    dispatch(signOutUserStart())  
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(data.message));
  }
 }


 const handelShowListings = async()=>{
    try {
      setShowListingError(false);
      const res =await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setShowListingError(false);
        return ;
      }
      setUserListing(data);
      
    } catch (error) {
      setShowListingError(true);
    }
 }

 const handelListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListing((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (error) {
    console.log(error.message);
  }
};


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form onSubmit={handelSubmit} action="" className='flex flex-col gap-4'>

       
        <img  src={currentUser.avatar} alt="profile" className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2'  onChange={handelChange}/>
        <input type="text" placeholder='username' defaultValue={currentUser.username} className='border p-3 rounded-lg ' id='username' onChange={handelChange}/>
        <input type="text" placeholder='email' defaultValue={currentUser.email} className='border p-3 rounded-lg ' id='email'/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg ' id='password'/>

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80' >{loading ? 'Loading...' : 'Update'}</button>

        <Link to={"/create-listing"} className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
         Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handelDeleteUser} className=' text-red-700 cursor-pointer ' >Delete Accout</span>
        <span onClick={handelSignOut} className=' text-red-700 cursor-pointer ' >Sign out</span>

      </div>
      <p className='text-red-600 mt-5'>{error? error : ""}</p>

      <button onClick={handelShowListings} className='text-green-700 w-full'>Show Listing</button>
      <p className='text-red-700 mt-5'>{showListingError ? 'Error showing Listings' : ''}</p>

      {  userListing?.map((listing)=>{
         <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'> 
          <Link to={`/listing/${listing._id}`}><img src={listing.imageUrls[0]} alt="listing image" className='h-16 w-16 object-contain '/>
          </Link>
          <Link className='text-slate-700  font-semibold  hover:underline truncate ' to={`/listing/${listing._id}`}>
          <p >{listing.name}</p>
          </Link>

          <div>

            <button  onClick={()=>handelListingDelete(listing._id)} className='text-red-700 uppercase '>Delete</button>
            <Link to={`/update-listing/${listing._id}`}>
            <button className='text-green-700 uppercase '>Edit</button>
            </Link>
          </div>
         </div>
      })}
    </div>
  )
}

export default Profile
