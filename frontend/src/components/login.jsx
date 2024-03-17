import { useEffect, useState } from "react"
import { login } from "../services/api"
import { useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { Header } from "./header"

export const Login=()=>{
  const navigation = useNavigate();
const [form,setForm] = useState({
  username:'',
  password:'',
})

useEffect(()=>{
  const user = localStorage.getItem('user')
if(user){
  navigation('/')
} else {
  navigation('/login')
}
},[])


const [errors,setErrors] = useState(null)

const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})
};

const handleSubmit = async ()=>{
  const result = await login(form)
  console.log('form',result);

  setErrors(null)

if(result.status == 200){
  if(result.data.status===200){
    localStorage.setItem('user',JSON.stringify(result.data.data))
    alert("Login Successfully")
    navigation('/')
    return;
  }

  if(result.data.status===201){
   // setErrors(result.data.data)
    alert('Invalid credentials');
    return;
  }

  if(result.data.status===202){
    console.error('Error:',"wrong Details");
      alert('Invalid credentials');
    return;
  }
}

}
    return <>
    <Header/>
    <ToastContainer/>
    <div className="container card mt-4 register-login-box">
    
        <h3 className="">Login</h3>
    <div className="form-group">
      <label for="exampleInputEmail1" className="form-label mt-4">Email or Username</label>
      <input type="text" 
      onChange={handleChange}
      name="username"
      className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email or username"/>
      
      {
        errors?.username &&
        <small id="emailHelp" className="form-text text-danger">{errors.username.msg}</small>
      }
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
      <input type="password"
      onChange={handleChange}
      name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
     
     {
        errors?.password &&
        <small id="emailHelp" className="form-text text-danger">{errors.password.msg}</small>
      }

    </div>
   
   
    <br />
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
    <p>
          Don't have an account? <a href="/register">Sign up here</a>.
        </p>
 
</div>
    </>
}