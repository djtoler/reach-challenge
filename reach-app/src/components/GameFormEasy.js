import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState} from 'react';
import { useToast } from '@chakra-ui/react';


const GameFormEasy = (props) => {
    console.log(props.numbers);
    let serverData = props.numbers
    // Set useState hooks for form fields
    const [userInputNumber, setUserInputNumber] = useState();
    const [guessAttemptCounter, setGuessAttemptCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [guessArray, setGuessArray] = useState([]);           

    // toast for error message objects
    const toast = useToast();

    const guessCounter = () => {
        setGuessAttemptCounter(guessAttemptCounter + 1 );
        if(guessAttemptCounter === 10) {
            window.location.reload();
        }
    };


    const  corrcetNumberFeedback= {
        1: "You guessed 1 correct number",
        2: "You guessed 2 correct numbers",
        3: "You guessed 3 correct numbers",
        4: "You guessed 4 correct numbers",
        5: "You guessed 0 correct numbers"
    }
    const locationFeedback = {
        1: "You guessed 1 correct number with the correct location",
        2: "You guessed 2 correct numbers with the correct location",
        3: "You guessed 3 correct numbers with the correct location",
        4: "Your guess was incorrect"
    }

    
    const submitHandler = () => {
        setLoading(true);
        if (!userInputNumber || userInputNumber.length < 4) {
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
        if(userInputNumber.toString() === props.numbers) {
            console.log("yes");
            setLoading(false);
        }
        else {
            guessCounter();
            let correctLocationCountIndex = 0;
            let correctNumbersCountIndex = 0;

            for (let i = 0; i < userInputNumber.length; i++) {
                if(userInputNumber.toString().charAt(i) === serverData.charAt(i)) {
                    console.log(userInputNumber.toString().charAt(i) +"---"+ serverData.charAt(i));
                    correctLocationCountIndex++
                } 
            }

            for (let i = 0; i < serverData.length; i++) {
                if (
                    serverData.charAt(i) === userInputNumber.charAt(0).toString() ||
                    serverData.charAt(i) === userInputNumber.charAt(1).toString() ||
                    serverData.charAt(i) === userInputNumber.charAt(2).toString() ||
                    serverData.charAt(i) === userInputNumber.charAt(3).toString() 
                ) {
                    console.log(userInputNumber.toString().charAt(i) +"---"+ serverData.charAt(i));
                    correctNumbersCountIndex++
                }
            }

            for (let i = 0; i < serverData.length; i++) {
                if (
                    serverData.charAt(i) !== userInputNumber.charAt(0).toString() ||
                    serverData.charAt(i) !== userInputNumber.charAt(1).toString() ||
                    serverData.charAt(i) !== userInputNumber.charAt(2).toString() ||
                    serverData.charAt(i) !== userInputNumber.charAt(3).toString() 
                ) {
                    correctLocationCountIndex = 4;
                    correctNumbersCountIndex = 5;
                }
            }
            

            setGuessArray(guessArray => [...guessArray, 
                {
                    userInputNumberData: 
                        {
                            userGuess: userInputNumber,
                            guessNumberCount: guessAttemptCounter + 1,
                            correctLocations: locationFeedback[correctLocationCountIndex],
                            correctNumbers: corrcetNumberFeedback[correctNumbersCountIndex]
                        }
                        
                }
            ]);
            setLoading(false);
            return guessArray
        }
    }

    const renderGuesses = () => {
        {guessArray.map((guessData, i) => {
            console.log(guessArray);
            // console.log(guessData.userInputNumber.guessNumber);
            return <div className="guessArray"> (<div key={i}> {guessData} </div>)</div>
        })};
    }
    renderGuesses();
   
     return (
       <VStack spacing="5px" color="black">

           <FormControl className="intInput" isRequired>
               <FormLabel>4-Digit Number</FormLabel>
               <Input
               placeholder='Enter a 4-Digit Number'
               maxlength = "4"
               minlength = "4"
               value={userInputNumber}
               onChange={(e)=>setUserInputNumber(e.target.value)} //Set number to whats entered in number field
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

export default GameFormEasy;