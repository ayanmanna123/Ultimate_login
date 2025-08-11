import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoding, setSignupEmail } from "@/Redux/authSilce";
import { toast } from "sonner";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { googleauth } from "../api";
export default function CreateAccount() {
  
  const [input, setinput] = useState({
    fullname: "",
    email: "",

    password: "",

    file: "",
  });
  const navigate = useNavigate();
  const changeEventHandaler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };
  const { loding, user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append("fullname", input.fullname);
    fromdata.append("email", input.email);
    fromdata.append("password", input.password);

    if (input.file) {
      fromdata.append("file", input.file);
    }
     

    try {
      dispatch(setLoding(true));
      const res = await axios.post(
        ` http://localhost:5000/api/v1/user/register`,
        fromdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSignupEmail(input.email));
        toast.success(res.data.message);
        navigate("/user/varify");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoding(false));
    }
  };
    
  const handleGoogleResponse = async (authResult) => {
    
    try {
      if (authResult.code) {
        const result = await googleauth(authResult.code);
        const { email, name, image } = result.data.user; // Make sure 'image' matches your backend field
        
        const token = result.data.token;
				const obj = {email,name, token, image};
				localStorage.setItem('user-info',JSON.stringify(obj));
				navigate('/');
      }
      else{
        	console.log(authResult);
				throw new Error(authResult);
      }
      console.log("Auth Result:", authResult);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: (error) => console.error("Google login error:", error),
    flow: "auth-code",
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={submitHandler}>
        <Card className="w-[350px] bg-neutral-900 border-neutral-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button
                variant="outline"
                 onClick={googleLogin}
                className="flex-1 bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
              >
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-neutral-700" />
              <span className="absolute inset-0 flex justify-center items-center text-xs text-neutral-400">
                <span className="px-2 bg-neutral-900">OR CONTINUE WITH</span>
              </span>
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium ">
                Full Name
              </label>
              <Input
                id="name"
                type="name"
                value={input.fullname}
                name="fullname"
                placeholder="your name"
                onChange={changeEventHandaler}
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
              />
            </div>
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium ">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={input.email}
                name="email"
                placeholder="m@example.com"
                onChange={changeEventHandaler}
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandaler}
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label>Profile:</Label>
              <input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer border-b-white"
              />
            </div>

            <Button className="w-full bg-neutral-200 text-black hover:bg-neutral-300">
              Create account
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
