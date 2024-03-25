import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Posts } from "./pages/Posts"
import { Post } from "./pages/Post"
import { Error } from "./pages/Error"
import { Publish } from "./pages/Publish"

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={isLoggedIn ? <Posts /> : <Signin setIsLoggedIn={setIsLoggedIn} />} /> */}
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/publish" element={<Publish />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
