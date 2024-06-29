import { Routes , Route } from "react-router-dom"
import Login from "./pages/login/login"

function App() {

  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="index.html" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
