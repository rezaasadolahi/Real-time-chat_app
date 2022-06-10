import React, { useState, startTransition, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
//* CSS
import './CSS/ChatRoom.scss'
//* Queries
import { addMessage, allMessages } from '../Queries/Queries'






function ChatRoom({ userSignUser }) {
  const getMessage = useSelector(state => state.Reducer.MessagesUser)
  const getUserSelectedOnList = useSelector(state => state.Reducer.UserList)
  const [addMessages] = useMutation(addMessage)
  const [inputVal, setInputVal] = useState('')

  let today = new Date()
  let date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()} ${today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`


  const handleSubmit = (e) => {
    e.preventDefault()

    addMessages({
      variables: {
        text: inputVal,
        time: date,
        fromUser: userSignUser.id,
        toUser: getUserSelectedOnList.id
      },
      refetchQueries: [{ query: allMessages }]
    })

    setInputVal('')
  }





  return (
    <div id='chatroom'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <section id='chatBox'>
          {
            getMessage?.map((item) => (
              <div key={item.id} className={item.fromUser === userSignUser.id ? 'Div_userOne' : 'Div_userTwo'}>
                <label className={
                  item.fromUser === userSignUser.id ? 'userOne' : 'userTwo'
                }>
                  {item.text}
                </label>
              </div>
            ))
          }
        </section>
        <div>
          <input
            type="text"
            name='text'
            value={inputVal}
            className='form-control'
            placeholder='text'
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button
            type="submit"
            className='btn btn-primary'
            disabled={inputVal ? false : true}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatRoom