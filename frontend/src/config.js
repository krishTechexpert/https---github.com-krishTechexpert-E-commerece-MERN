import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true, // whenever you send cookie from browser to server this required
  headers: { 
    'Content-Type': 'application/json'
  }
  });


  /*
when you want to set cookie in browser and want to send it on every request , 
with fetch you have to add some below configration such as credentials:"include"

fetch(appConfigApi.profile,{
    method:'GET',
    headers:{
      Accept:'application/json',
      "Content-Type":"application/json"
    },
    credentials:"include"
  })
*/