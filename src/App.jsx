import './App.css'
import Login from './Login/Login';
import VoteData from "./Data/VoteData";
import PAGES from './Data/pages';
import { useEffect, useState } from 'react';
import Vote from './Vote/Vote';
import Navbar from './Navbar/Navbar';
import Admin from './Admin/Admin';

import axios from "./instance/axiosConfig"






const EMPTY_USER = {
  id: "",
  name: "",
  email: "",
  role: "user",
};
const userInfo = JSON.parse(localStorage.getItem("loggedUser")) || EMPTY_USER;
const [vote, login, admin] = PAGES;
const votesLocalData = VoteData;



function App() {
  const [data, setData] = useState([])
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async()=>{
    try {
      const response = await axios.get('/users')

    setTimeout(()=>{
      setData(response.data);
    },2000)
    } catch (error) {
      console.log(error.message)
    }
  }




  const [loggedUser, setLoggedUser] = useState(userInfo);
  const [currentPage, setCurrentPage] = useState(
    userInfo.id === "" ? login : vote
  );

  const [votes, setVotes] = useState(votesLocalData); 
  useEffect(() => {
    localStorage.setItem("voteData", JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    if (loggedUser.id === "") {
      setCurrentPage(login);
    } else {
      setCurrentPage(vote);
    }
  }, [loggedUser]);

  
  const database = data;
  const isCurrentPage = (page) => page === currentPage;



  return (
    <>
    <div className="App">
      {isCurrentPage(login) && (
        <Login
          usersData={database}
          setLoggedUser={setLoggedUser}
          setCurrentPage={setCurrentPage}
        />
      )}

      {!isCurrentPage(login) && (
        <Navbar
          setCurrentPage={setCurrentPage}
          user={loggedUser}
          setUser={setLoggedUser}
        />
      )}

      {isCurrentPage(vote) && (
        <Vote voter={loggedUser} votes={votes} setVotes={setVotes} />
      )}


      {isCurrentPage(admin) && <Admin users={database} candidatesList={votes} />}




      </div>
    </>
  )
}

export default App
