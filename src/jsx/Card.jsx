import { useState, useEffect } from 'react';
// import { createUser } from  "../backend/database"
import ModalInfo from './ModalInfo';
import ModalSelectName from './ModalSelectName';
import ModalSelectSettings from './ModalSettings';


const Card = (props) => {
  const [name, setName] = useState('')
  const [accesslevel, setAccesslevel] = useState('')
  const [datecreate, setDatecreate] = useState('')
  const [icon, setIcon] = useState('')
  const [users, setUsers] = useState([])
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false)
  const [isModalSelectNameOpen, setModalSelectNameOpen] = useState(false)
  const [isModalSelectSettings, setModalSelectSettings] = useState(false)
  const [selectedName, setSelectedName] = useState('Card Name')

  //function to create user in the database
  async function handleSubmit(event) {
    event.preventDefault()
    
    try {
      const response = await fetch('http://localhost:3001/api/createUser', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          accesslevel: accesslevel,
          datecreate: datecreate,
          icon: icon,
        })
      })
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      const data = await response.json()
      // console.log(data)
      handleGetUsers()
    } catch (error) {
      console.error(error);
    }

    setName('');
    setAccesslevel('');
    setDatecreate('');
    setIcon('');
  }


  //function to get users from the database
  async function handleGetUsers() {
    try {
      const response = await fetch('http://localhost:3001/api/getUsers');

      if (!response.ok) {
        throw new Error('Failed to retrieve users');
      }

      const data = await response.json();
      // console.log(data)
      setUsers(data); 

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetUsers()
  }, []); // Empty dependency array means it runs once when mounted


  //handle info button click
  function handleInfoButtonClick() {
    setIsModalInfoOpen(true)
  }

  //handle select button click 
  function handleSelectButtonClick() {
    setModalSelectNameOpen(true)
  }

  //handle settings button click 
  function handleSettingsButtonClick() {
    setModalSelectSettings(true)
  }

  //change the name of the title to a selected name
  function handleSelectName(userName) {
    setSelectedName(userName)
  }

  return (
    <div className='card-wrapper'>
      <header className='card-wrapper-header'>{selectedName}</header>
      <main className='card-wrapper-main'><span className='list-users-title'>List of users</span>
      <ul>
        {users.map((user) => (
          <li onClick={() => handleSelectName(user.name)} className='user-name' key={Math.random()}>{user.name}</li>
        ))}
      </ul>
      </main>


      {/* user create form */}
      <form onSubmit={handleSubmit} className='form' action="">
        <h1 className='form-title'>Create a new user</h1>
        {/* name */}
        <label className='form-label' htmlFor="name">name: {name}</label>
        <input required className='form-input' id='name' value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder='name'/>
        {/* accesslevel */}

        <label className='form-label' htmlFor="accesslevel">accesslevel: {accesslevel}</label>
        <input required className='form-input' id='accesslevel' value={accesslevel} onChange={(event) => setAccesslevel(event.target.value)} type="text" placeholder='accesslevel'/>

        {/* datecreate */}

        <label className='form-label' htmlFor="">datecreate: {datecreate}</label>
        <input required className='form-input' id='datecreate' value={datecreate} onChange={(event) => setDatecreate(event.target.value)} type="text" placeholder='datecreate'/>

        {/* icon */}

        <label className='form-label' htmlFor="icon">icon: {icon}</label>
        <input required className='form-input' id='icon' value={icon} onChange={(event) => setIcon(event.target.value)} type="text" placeholder='icon'/>


        <div className='submit-btn-container'>
          <button>Submit</button>
        </div>  
      </form>

      <footer className='card-wrapper-footer'>
        <ul className='card-wrapper-footer-list'>
          <li onClick={handleSelectButtonClick} className='card-wrapper-item'>
            <a href='#'>Select</a>
          </li>
          <li onClick={handleInfoButtonClick} className='card-wrapper-item'>
            <a href='#'>Info</a>
          </li>
          <li onClick={handleSettingsButtonClick} className='card-wrapper-item'>
            <a href='#'>Settings</a>
          </li>
        </ul>
      </footer>

      {isModalInfoOpen && <ModalInfo setIsModalInfoOpen={setIsModalInfoOpen} selectedName={selectedName}/>}

      {isModalSelectNameOpen && <ModalSelectName setModalSelectNameOpen={setModalSelectNameOpen} setSelectedName={setSelectedName}/>}

      {isModalSelectSettings && <ModalSelectSettings setModalSelectSettings={setModalSelectSettings} handleGetUsers={handleGetUsers}/>}

    </div>
  );
};

export default Card;
