import { useState, useEffect } from 'react';
import { Swipeable } from 'react-swipeable';

const ModalSelectSettings = ({setModalSelectSettings, setSelectedName}) => {
    const [users, setUsers] = useState([])
    const [swipeIndex, setSwipeIndex] = useState(null);

  //function to get users from the database
  async function handleGetAllUsers() {
    try {
      const response = await fetch('http://localhost:3001/api/getAllUsersWithAllInfo');

      if (!response.ok) {
        throw new Error('Failed to retrieve users');
      }

      const data = await response.json();
      console.log(data)
      setUsers(data); 

    } catch (error) {
      console.error(error);
    }
  }
  //run the handleGetAllUsers once when component mounted
  useEffect(() => {
    handleGetAllUsers()
  }, []); 

  const handleSwipeLeft = (index) => {
    setSwipeIndex(index);
  };

  const handleEditClick = (user) => {
    // Implement edit functionality here
    console.log(`Editing user ${user.name}`);
  };

  const handleDeleteClick = (user) => {
    // Implement delete functionality here
    console.log(`Deleting user ${user.name}`);
  };

    //close modal when clicked outside
    function handleCloseModal(event) {
        if(event) {
            const isInsideModalContent = event.target.closest('.modal-list-content');
            if (!isInsideModalContent) {
                setModalSelectSettings(false);
            }
        }
    }

    return ( 
        <div onClick={handleCloseModal} className="modal-list">
            <div className="modal-list-content">
                <div className="modal-list-header">
                    <h4 className="modal-list-title">
                        Modal Settings
                    </h4>
                </div>
                <ul className='modal-list-list'>
                    {users.map((user) => (
                        <div key={user.id}>
                            <li className='user-name' key={user.id}><span className='highlight'>id: </span>{user.id} ,<span className='highlight'>name:</span> {user.name}</li>    
                        </div>
                    ))}
                </ul>
                <div className='submit-btn-container'>
                    <button className='btn'>Add icon</button>
                </div>
            </div>
        </div>
     );
}
 
export default ModalSelectSettings;