import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const ModalSelectSettings = ({ setModalSelectSettings, handleGetUsers }) => {
  const [users, setUsers] = useState([]);
  const [iconUpdated, setIconUpdated] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const swiperRef = useRef(null);

  //function to get users from the database
  async function handleGetAllUsers() {
    try {
      const response = await fetch(
        'http://localhost:3001/api/getAllUsersWithAllInfo'
      );

      if (!response.ok) {
        throw new Error('Failed to retrieve users');
      }

      const data = await response.json();
    //   console.log(data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }
  //run the handleGetAllUsers once when component mounted
  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleEditClick = async (user) => {
    try {
        const newIcon = prompt('Enter the new icon')

        if (newIcon) {
            const response = await fetch(`http://localhost:3001/api/updateUserIcon/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({newIcon})
            })

            if (response.ok) {
                console.log(`Updated user icon to: ${newIcon}`);
                // Update the user list with the new icon
                setUsers((prevUsers) =>
                  prevUsers.map((u) =>
                    u.id === user.id ? { ...u, icon: newIcon } : u
                  )
                );
                setIconUpdated(true)
                setTimeout(() => {
                    setIconUpdated(false) 
                }, 2000);
            } else {
                console.error('Failed to update user icon');
            }
        }
    } catch (error) {
        console.error('Error updating user icon:', error);
    }
  };

  const handleDeleteClick = async (user) => {
    try {
        const response = await fetch(`http://localhost:3001/api/deleteUser/${user.id}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            console.log(`Deleted user: ${user.name}`);
            // Update user list to remove the deleted user
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
            handleGetUsers()
            setUserDeleted(true)
            setTimeout(() => {
                setUserDeleted(false) 
            }, 2000);
          } else {
            console.log(user)
            console.error('Failed to delete user');
          }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
  };

  //close modal when clicked outside
  function handleCloseModal(event) {
    if (event) {
      const isInsideModalContent = event.target.closest('.modal-list-content');
      if (!isInsideModalContent) {
        setModalSelectSettings(false);
      }
    }
  }

  return (
    <div onClick={handleCloseModal} className='modal-list'>
      <div className='modal-list-content'>
        <div className='modal-list-header'>
          <h4 className='modal-list-title'>Modal Settings</h4>
          {iconUpdated && (
            <p className='success-color'>Icon was updated successfully</p>
          )}
          {userDeleted && (
            <p className='success-color'>User was <span className='highlight'>deleted</span> successfully</p>
          )}
        </div>
        <ul className='modal-list-list'>



            {users.map((user) => (
                <>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={0}
                    navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    }}
                >

              <SwiperSlide key={user.id}>
                <div key={user.id}>
                  <li className='user-name' key={user.id}>
                    <span className='highlight'>id: </span>
                    {user.id} ,<span className='highlight'>name:</span>{' '}
                    {user.name}
                  </li>
                </div>
              </SwiperSlide>
                <SwiperSlide key={Math.random()}>
                <div className='swiper-buttons'>
                  <button
                    className='swiper-buttons-edit'
                    onClick={() => handleEditClick(user)}
                  >
                    Edit icon
                  </button>
                  <button
                    className='swiper-buttons-delete'
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete user
                  </button>
                </div>
                </SwiperSlide>
                </Swiper>
              </>
            ))}



        </ul>
        <div className='submit-btn-container'>
          <button className='btn'>Add icon</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectSettings;
