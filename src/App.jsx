import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Profile from "./Pages/Profile"
import Header from "./Components/Header"
import PrivateRoute from "./Components/PrivateRoute"
import CreateListing from "./Pages/CreateListing"
import UpdateListing from "./Pages/UpdateListing"
import Listing from "./Pages/Listing"
import Search from "./Pages/Search"

function App() {

  return (
    <BrowserRouter >
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Sign-In" element={<SignIn />} />
      <Route path="/Sign-Up" element={<SignUp />} />
      <Route path="/listing/:listingId" element={<Listing/>} />
      <Route path="/Search" element={<Search />} />

 
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
