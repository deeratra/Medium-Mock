import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useEffect, useState } from "react"
import { AuthSchema, authSchema } from "@deer21/medium-z-common"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<AuthSchema>({
        name: "",
        password: "",
        email: ""
    })

    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    interface ZodValidationError {
        path: (string | number)[];
        message: string;
    }

    const validateInputs = () => {
        try {
            authSchema.parse(postInputs);
            setValidationErrors({});
            return true
        }
        catch (error) {
            if (error instanceof Error && error.name === "ZodError") {
                const newErrors: { [key: string]: string } = {};
                (error.errors as ZodValidationError[]).forEach((err: ZodValidationError) => {
                    const field = err.path[0];
                    const message = err.message;
                    newErrors[field] = message;
                });
                setValidationErrors(newErrors);
            }
            return false;
        }

    };

    useEffect(() => {
        return () => {
            setError("")
        };
    }, []);


    const handleInputChange = (field: string, value: string) => {
        setPostInputs(prevInputs => ({
            ...prevInputs,
            [field]: value
        }));

        setValidationErrors(prevErrors => ({
            ...prevErrors,
            [field]: ""
        }));
    };


    const [error, setError] = useState<string>("")
    async function sendRequest() {
        if (!validateInputs()) {
            return;
        }
        try {
            const url = `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`
            const response = await axios.post(url, postInputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt)
            // setIsLoggedIn(true)
            navigate("/posts")
        }
        catch (e) {
            setError("An error occurred. Please try again later.");
        }

    }

    if (error !== "") {
        navigate("/error")
    }

    return <div>
        <div className=" max-w-full  flex flex-col justify-center h-screen">
            <div className=" max-w-full flex justify-center">
                <div className=" max-w-full flex flex-col gap-y-10">
                    <div className="px-20">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-4xl font-bold">Welcome to Writing Blogs</div>
                            <div className="text-lg text-center text-slate-400">
                                {type === "signup" ? "Already have an account?" : "Don't have an account? "}
                                < Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                                    {type === "signup" ? "Login" : "Signup"}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-y-3 flex-col">
                        {type === "signup" ? (<div>
                            <InputBox onChange={(e) => handleInputChange('name', e.target.value)}
                                label={'Name'} placeholder={"Enter your Name"} error={validationErrors['name']} /></div>) : null}


                        <div>
                            <InputBox onChange={(e) => handleInputChange('email', e.target.value)}
                                label={'email'} placeholder={"Enter your Email"} error={validationErrors['email']} />
                        </div>
                        <div>
                            <InputBox onChange={(e) => handleInputChange('password', e.target.value)}
                                label={'password'} placeholder={"Enter your Password"} type="password" error={validationErrors['password']} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button type={"auth"} onClick={sendRequest} name={type === "signup" ? "Sign up" : "Sign in"} />
                    </div>
                </div>
            </div>
        </div>
    </div >
}