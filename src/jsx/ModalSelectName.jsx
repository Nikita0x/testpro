import { useState, useEffect } from 'react';

const ModalSelectName = ({setModalSelectNameOpen, setSelectedName}) => {
    const [users, setUsers] = useState([])

  //function to get users from the database
  async function handleGetUsers() {
    try {
      const response = await fetch('http://localhost:3001/api/getUsers');

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

  useEffect(() => {
    handleGetUsers()
  }, []); 

    //close modal when clicked outside
    function handleCloseModal(event) {
        if(event) {
            const isInsideModalContent = event.target.closest('.modal-list-header');
            if (!isInsideModalContent) {
                setModalSelectNameOpen(false);
            }
        }
    }

    function handleSelectName(name) {
        setSelectedName(name)
        handleCloseModal();
    }

    return ( 
        <div onClick={handleCloseModal} className="modal-list">
            <div className="modal-list-content">
                <div className="modal-list-header">
                    <h4 className="modal-list-title">
                        Select a user
                    </h4>
                </div>
                <ul className='modal-list-list'>
                    {users.map((user) => (
                    <li onClick={() => handleSelectName(user.name)} className='user-name' key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        </div>
     );
}
 
export default ModalSelectName;