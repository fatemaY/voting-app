import axios from "../instance/axiosConfig"
import React from 'react'
import { useEffect, useState } from 'react'
import Spinner from "../instance/Spinner"


const UserData = () => {
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
  // console.log(data); 

  return data? data: <Spinner />
}

export default UserData