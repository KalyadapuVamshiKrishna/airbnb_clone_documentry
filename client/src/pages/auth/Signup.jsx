import React from 'react'
import {useState} from "react"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"


const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password,  setPassword] = useState("")
    const [role, setRole] = useState("customer")
    const [loading, setLoading] = useState(false)

    async function handleSignup(ev){
        ev.preventDefault()
        setLoading(true)

    try{
            await axios.post('/register',{
                name, email, password, role
            }, {withCredentials: true});
            alert("Registeration Successful. Now you can Login.")
            navigate('/login')
        }
        catch(e){
            alert("Registration failed.", e)

    }
        finally{
            setLoading(false)
        }
    }
    

  return (
    <div>
        <form onSubmit={handleSignup}>
        <div>
            <Input
                type="text"
                placeholder="Username"
                value={name}
                onChange = {ev => setName(ev.target.value)}
                required
            />
        </div>
        <div>
            <Input
                type="email"
                placeholder="youmail@gmail.com"
                value= {email}
                onChange= {ev => setEmail(ev.target.value)}
                required
            />
        </div>
        <div>
            <Input
                type="password"
                placeholder='Password'
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                required
            />
        </div>
        <RadioGroup defaultValue="Customer">
            <div>
                <RadioGroupItem value={role} id="customer" onChange= {setRole('customer')}/>
                <Label>Customer</Label>
            </div>
            <div>
                <RadioGroupItem value={role} id="host" onChange={setRole('host')}/>
                <Label>Host</Label>
            </div>
        </RadioGroup>

        <Button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
        </Button>
        </form>

        <div>
            Already a member? {''}
            <Link to="/login">Login</Link>
        </div>
    </div>
    
  )
}

export default Signup