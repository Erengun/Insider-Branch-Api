import { Routes , Route } from "react-router-dom"
import Login from "./pages/login/login"
import DataPage from "./pages/dataPage/dataPage"

function App() {

  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="index.html" element={<Login/>}/>
        <Route path="/home" element={<DataPage/>}/>
      </Routes>
    </>
  )
}

export default App
