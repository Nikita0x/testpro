import { useState, useEffect } from 'react';

const ModalInfo = ({setIsModalInfoOpen, selectedName}) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        async function fetchUserData() {
            try {
                const encodedName = encodeURIComponent(selectedName)
                const response = await fetch(`http://localhost:3001/api/getFullInfoAboutUser/${encodedName}`);

                if(!response.ok) {
                    throw new Error('Failed to fetch user data')
                }

                const data = await response.json();
                setUserData(data);
                console.log(data)

            } catch (error) {
                console.error(error)
            }
        }

        if(selectedName) {
            fetchUserData()
        }
    }, [selectedName])

    //close modal when click outside
    function handleCloseModal(event) {
        const isInsideModalContent = event.target.closest('.modal-content');
        if (!isInsideModalContent) {
          setIsModalInfoOpen(false);
        }
    }

    return ( 
        <div onClick={handleCloseModal} className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                    {selectedName ? selectedName : "Default Modal Header"}
                    </h4>
                </div>

                <div className="modal-body">
                    {/* <p>This is modal content</p> */}
                    {userData ? (
                        <ul>
                            <li className='modal-body-item'><span className='highlight'>id:</span> {userData.id}</li>
                            <li className='modal-body-item'><span className='highlight'>name:</span> {userData.name}</li>
                            <li className='modal-body-item'><span className='highlight'>accesslevel:</span> {userData.accesslevel}</li>
                            <li className='modal-body-item'><span className='highlight'>datecreate:</span> {userData.datecreate}</li>
                            <li className='modal-body-item'><span className='highlight'>icon:</span> {userData.icon}</li>
                        </ul>
                    ) : (
                        <p>No data available</p>
                    )}

                </div>
            </div>
        </div>
     );
}
 
export default ModalInfo;