import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import axios from "axios";

const Register = () => {
    // Set useState hooks for form fields
    const [name, setName] = useState()
    const [email, setEmail] = useState()   
    const [password, setPassword] = useState()   
    const [confirmPassword, setConfirmPassword] = useState()
    const [picture, setPicture] = useState()   

    
    const [loading, setLoading] = useState(false)

    const toast = useToast();
    const history = useHistory();
     
    // Set useState hook & function for showing & concealing password entry
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
     
     
    const postDetails = (pictures) => {
        setLoading(true);

        if (pictures === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              return;
        }
        console.log(pictures);

        if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
            // set data to a new FormData object (from WebAPIs)
            const formData = new FormData();
            // use append method to create key/value pairs for the object
            formData.append("file", pictures);
            formData.append("upload_preset", "student-assignment-app");
            formData.append("cloud_name", "dcrwhj71h");
            // use fetch to send data to picture mgt. url through a post method
            fetch("https://api.cloudinary.com/v1_1/dcrwhj71h/image/upload", {
                method: "post",
                body: formData,
            })
            .then((res) => res.json())
            .then((formData) => {
                setPicture(formData.url.toString());
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        }
        else {
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }
    } 
 
    const submitHandler = async () => {
        setLoading(true);
        if(!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please fill out all fields',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
        }
        if(password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
        }
        try {
            const config = {
                headers: {
                    "Content-Type":"application/json  "
                },
            }
            const {data} = await axios.post(
                "/user", 
                {name, email, password, picture},
                config
            );
            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
            sessionStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push('/home')
        }
        catch (error ){
            toast({
                title: 'Error Occured!',
                description: error.response.data,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    };
 
    return (
        <VStack spacing="5px" color="black">

        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
            placeholder='Enter Your Name'
            onChange={(e)=>setName(e.target.value)} //Set name to whats entered in name field
            />
        </FormControl>

        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
            placeholder='Enter Your Email'
            onChange={(e)=>setEmail(e.target.value)} //Set email to whats entered in email field
            />
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                type={show? 'text' : 'password'}
                placeholder='Enter Your Password'
                onChange={(e)=>setPassword(e.target.value)} //Set password to whats entered in password field
                />
                <InputRightElement width="4.5rem"> 
                    <Button h="1.75rem" size="sm" onClick={handleClick}> 
                        {show ? "Hide" : "Show"} 
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        
        <FormControl id="passwordConfirm" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
                <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="picture" >
            <FormLabel>Upload Your Picture</FormLabel>
            <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e)=>postDetails(e.target.files[0])}
            />
        </FormControl>

        <Button 
            colorScheme = "blue"
            width = "100%"
            style = {{marginTop: 15}}
            onClick = {submitHandler}
            isLoading = {loading}
        >
            Register
        </Button>
        </VStack>
    )
}

export default Register