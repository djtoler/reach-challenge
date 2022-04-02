import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";

const GameFormDifficult = () => {
    // Set useState hooks for form fields
    const [numberOne, setNumberOne] = useState()
    // const [numberTwo, setNumberTwo] = useState()   
    // const [numberThree, setNumberThree] = useState()   
    // const [numberFour, setNumberFour] = useState()      

    const [loading, setLoading] = useState()      
    // Set useState hook & function for showing & concealing password entry
    const toast = useToast();
   
    const submitHandler = async () => {
        setLoading(true);
        if (!numberOne ) {
            toast({
                title: "Please Enter A 4-Digit Number The Field Before Clicking Submit",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        

    }
   
     return (
       <VStack spacing="5px" color="black">

           <FormControl className="intInput" isRequired>
               <FormLabel>4-Digit Number</FormLabel>
               <Input
               placeholder='Enter A 4-Digit Number'
               value={numberOne}
               onChange={(e)=>setNumberOne(e.target.value)} //Set number to whats entered in number field
               />
           </FormControl>

           <Button 
               colorScheme="green"
               width="100%"
               style={{marginTop: 15}}
               onClick={submitHandler}
               isLoading={loading}
           >
               Submit Your Numbers
           </Button>

       </VStack>
    )
   
}

export default GameFormDifficult;