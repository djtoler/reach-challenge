import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import axios from "axios";
import HomePage from "../pages/HomePage";

const Login = (props) => {
    // Set useState hooks for form fields
    const [email, setEmail] = useState()   
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState()
    const [status, setStatus] = useState(false)      
    // Set useState hook & function for showing & concealing password entry
    const [show, setShow] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState()
    const [redirect, setRedirect] = useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast();
    const history = useHistory();
    let passToken;

 
   
    const submitHandler = async () => {
        
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                },
            };

            const {data} = await axios.post(
                "/user/login",
                {email, password},
                config
            );
            setToken(data.token);
            passToken = data.token;
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
            sessionStorage.setItem("userInfo", JSON.stringify(data));
            sessionStorage.setItem("userToken", JSON.stringify(data.token));
            setLoading(false);
            console.log("successful login");
            history.push("/home")
            
        }
        catch (error ){
            console.log(error.response.data);
            toast({
                title: 'Error Occured!',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }   
    }

        //    if (redirect) {
        //      return (
        //        <Redirect
        //          to={{
        //            pathname: "/home",
        //            state: passToken,
        //          }}
        //        />
        //      );
        //    } else {
             return (
               <VStack spacing="5px" color="black">
                 <FormControl id="emailLog" isRequired>
                   <FormLabel>Email</FormLabel>
                   <Input
                     placeholder="Enter Your Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} //Set email to whats entered in email field
                   />
                 </FormControl>

                 <FormControl id="passwordLog" isRequired>
                   <FormLabel>Password</FormLabel>
                   <InputGroup>
                     <Input
                       type={show ? "text" : "password"}
                       placeholder="Enter Your Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)} //Set password to whats entered in password field
                     />
                     <InputRightElement width="4.5rem">
                       <Button h="1.75rem" size="sm" onClick={handleClick}>
                         {show ? "Hide" : "Show"}
                       </Button>
                     </InputRightElement>
                   </InputGroup>
                 </FormControl>

                 <Button
                   colorScheme="green"
                   width="100%"
                   style={{ marginTop: 15 }}
                   onClick={submitHandler}
                   isLoading={loading}
                 >
                   Login
                 </Button>

                 <Button
                   variant="solid"
                   colorScheme="green"
                   width="100%"
                   onClick={() => {
                     setEmail("notregistered@example.com");
                     setPassword("test");
                   }}
                 >
                   Sign In Using Guest Credentials
                 </Button>
               </VStack>
             );
           }




export const HomePageRender = () => {
    return <HomePage/>
}

export default Login

