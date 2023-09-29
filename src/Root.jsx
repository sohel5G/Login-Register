import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'

function Root() {

  return (
    <>

      <div>
        <Nav></Nav>
      </div>

      <div>
        <Outlet></Outlet>
      </div>

    </>
  )
}

export default Root
