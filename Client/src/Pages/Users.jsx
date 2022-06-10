import { useEffect, useState, startTransition, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
//* CSS
import './CSS/Users.scss'
//* Queries
import { allUsers, allMessages } from '../Queries/Queries'
//* Redux
import { getMessagesUserWhenCliket, getUserWhenCliked } from '../Redux/Actions/Creator'





function Users({ userSignUser }) {
  const Dispatch = useDispatch()
  const [whenClick, setWhenClick] = useState([])
  //* Data: MongoDB
  const { loading, data: dataUser } = useQuery(allUsers)
  const { data: dataMessage } = useQuery(allMessages)

  useEffect(() => {
    Dispatch(getMessagesUserWhenCliket(
      dataMessage?.allMessages.filter(item =>
        item.fromUser === userSignUser.id && item.toUser === whenClick.id ||
        item.fromUser === whenClick.id && item.toUser === userSignUser.id
      ).sort((a, b) => a.time.replaceAll(/[- :]/g, '') - b.time.replaceAll(/[- :]/g, ''))
    ))
  }, [whenClick])

  //* click on user
  const handleClickOnUserList = (user) => {
    startTransition(() => {
      setWhenClick(user)
    })

    Dispatch(getUserWhenCliked(user))
    return
  }






  return (
    <div id='users'>
      {loading ? <h1>Loading...</h1> :
        dataUser?.allUsers.map((item) => (
          <ol key={item.id} className={item.userName === userSignUser.userName ? 'Display-matchUser' : ''}
            onClick={() => handleClickOnUserList(item)}
          >
            <div className='characteristic'>
              <li>{item.name} &nbsp;</li>
              <li>{item.lastName}</li>
            </div>
            <div className='badg-group'>
              <li>{item.userName}</li>
              <li>{item.age}</li>
            </div>
          </ol>
        ))
      }
    </div >
  )
}

export default Users