import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../src/index.css"

const Login = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [error,setError] =useState("");

    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:
                 { "content-Type":"application/json"},

                 body: JSON.stringify({email,password}),
            });

            const data = await response.json();

            if(response.ok){
                navigate("/dashboard");
            } else{
                setError(data.message || "authentication Failed");
            }
        } catch(error){
            console.error(error);
            setError("Error")
        }

    };


    return (
        <div className="h-screen flex items-center justify-center"
        style={{
          backgroundImage: "https://www.pexels.com/photo/cash-inside-a-tiny-shopping-cart-5632371/",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)} />


                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)} />


                </div>

                <button type ="submit">Login</button>
                {error && <p style ={{ color : "red"}}>{error}</p>}

            </form>
        </div>
    );
};

export default Login;