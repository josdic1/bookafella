import App from "./App"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import EditMember from "./pages/EditMember"
import EditReservation from "./pages/EditReservation"
import Login from "./pages/Login"
import Member from "./pages/Member"
import NewMember from "./pages/NewMember"
import NewReservation from "./pages/NewReservation"
import MemberList from "./pages/MemberList"
import RedirectHome from "./components/RedirectHome"
import ReservationList from "./pages/ReservationList"
import Reservation from "./pages/Reservation"

const routes = [
    {
        path: "/", element: <App />, errorElement: <Error />,
        children: [
            { index: true, element: <RedirectHome /> },
            { path: "/member/:id", element: <Member />, errorElement: <Error /> },
            { path: "/memberlist", element: <MemberList />, errorElement: <Error /> },
            { path: "/new/member", element: <NewMember />, errorElement: <Error /> },
            { path: "/edit/member/:id", element: <EditMember />, errorElement: <Error /> },
            { path: "/reservation/:id", element: <Reservation />, errorElement: <Error /> },
            { path: "/reservationlist", element: <ReservationList />, errorElement: <Error /> },
            { path: "/new/reservation", element: <NewReservation />, errorElement: <Error /> },
            { path: "/edit/reservation/:id", element: <EditReservation />, errorElement: <Error /> },
            { path: "/login", element: <Login />, errorElement: <Error /> },
            { path: "/home", element: <Dashboard />, errorElement: <Error /> }

        ]
    }
]

export default routes