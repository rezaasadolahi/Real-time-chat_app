import { Suspense, lazy } from 'react'
//* CSS
import './CSS/BothAside.scss'
//* Components
import ChatRoom from './ChatRoom'
const User = lazy(() => import('./Users'))




function BothAside({ userSignUser }) {
  return (
    <div id='bothAside'>
      <Suspense fallback={<h1>Loading...</h1>}>
        <User userSignUser={userSignUser} />
      </Suspense>
      <ChatRoom userSignUser={userSignUser} />
    </div>
  )
}

export default BothAside