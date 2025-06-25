import { Outlet } from "react-router-dom"
import clocheLogo from "./assets/cloche.svg"
import MemberProvider from "./providers/MemberProvider"
import NavBar from "./components/NavBar"
import ReservationProvider from "./providers/ReservationProvider"

function App() {
  
  return (
    <>
     <header>
          {/* <img src={clocheLogo} className="logo react animated-logo" alt="Cloche logo"/> */}
          <NavBar />
     </header>
     <main>
      <MemberProvider>
        <ReservationProvider>
      <Outlet />
      </ReservationProvider>
      </MemberProvider>
     </main>
    </>
  )
}

export default App
