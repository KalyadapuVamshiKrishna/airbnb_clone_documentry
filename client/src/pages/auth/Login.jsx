import React, { useContext } from 'react'
import {useState} from "react"
import axios from "axios"
import {Navigate, Link} from "react-router-dom"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/button" 


const Login = () => {
const [email, setEmail] =useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [redirect, setRedirect] = useState(false);
const {setUser} = useContext(UserContext);

async function handleOnSubmit(ev){
    ev.preventDefault();
    setLoading(true);

    try{
        const {data} = await axios.post("/login", {email, password});
        setUser(data);
        setRedirect(true);
    }
    catch(e){
        console.error("Failed to Login. Please check your credentials.", e);
    } finally {
        setLoading(false);
    }
}

if (redirect) return <Navigate to={"/"}/>

  return (
    <>
    <div>
        <h1>Login</h1>
        <form onsubmit={handleOnSubmit}>
            <Label>Email</Label>
            <Input
            type="email"
            placeholder='yourmail@gmail.com'
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            required
            />
            <Label>Password</Label>
            <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={ev =>  setPassword(ev.target.value)}
            required
            />
            <Button
            type="submit"
            disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

        </form>
    </div>

    </>
  )
}

export default Login