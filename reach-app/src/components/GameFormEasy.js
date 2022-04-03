import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState} from 'react';
import { useToast } from '@chakra-ui/react';
import { HintData } from "./HintData";


const GameFormEasy = (props) => {
    console.log(props.numbers);
    let serverData = props.numbers
    const [userInputNumber, setUserInputNumber] = useState();
    const [guessAttemptCounter, setGuessAttemptCounter] = useState(0);
    const [guessArray, setGuessArray] = useState([]); 
    const [loading, setLoading] = useState(false);  
    const [hintIndex, setHintIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);       

    // toast for error message objects
    const toast = useToast();

    const submitHandler = () => {
        setLoading(true);

        // if user tries to input w/out entering # or less than 4 digits
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
        // if user guess all 4 numbers in correct locations
        if(userInputNumber.toString() === props.numbers) {
            console.log("yes");
            setLoading(false);
        }
        else {
            // track # of guesses & limit # of guess attempts to 10
            guessCounter();

            // track # of correct numbers & locations that a user inputs, 
            // track # of correct numbers that a user inputs
            // counter stays at zero if nothing about input is correct
            let correctLocationCount = 0;
            let correctNumbersCount = 0;

            for (let i = 0; i < serverData.length; i++) {
                // evaluate for correct numbers only
                if (
                    serverData.charAt(i) === userInputNumber.charAt(0).toString() ||
                    serverData.charAt(i) === userInputNumber.charAt(1).toString() ||
                    serverData.charAt(i) === userInputNumber.charAt(2).toString() ||
                    serverData.charAt(i) === userInputNumber.charAt(3).toString() 
                ) {
                    correctNumbersCount++
                }
                // evaluate for correct number with correct location
                if(userInputNumber.toString().charAt(i) === serverData.charAt(i)) {
                    correctLocationCount++
                } 
            }

            // update array state to store users guess, # of guesses, # of correct locations 
            // & number of correct numbers
            setGuessArray(guessArray => [...guessArray, 
                {
                    userInputNumberData: 
                        {
                            userGuess: userInputNumber,
                            guessNumberCount: guessAttemptCounter + 1,
                            correctLocations: correctLocationCount,
                            correctNumbers: correctNumbersCount
                        }
                }
            ]);
            setLoading(false);
            // clear user input field
            setUserInputNumber("");
        }
    }

    // display updated state of guessArray, give feedback message about guesses
    const renderGuesses = () => {
        {guessArray.map((guessData, i) => {
            console.log(guessArray);
            for(let i=0; i<guessArray.length; i++) {
                console.log(`You guessed ${guessArray[i].userInputNumberData.correctNumbers} correct numbers`);
                console.log(`You guessed ${guessArray[i].userInputNumberData.correctLocations} correct locations`);
            }
            return <div className="guessArray"> (<div key={i}> {guessData} </div>)</div>
        })};
    }
    renderGuesses();

    // display hints that correspond to the random number from the API. 
    const displayHint = () => {
        setShowHint(true)
        // generator a random number to use as hint array index so same hints arent used every time
        setHintIndex(Math.floor(Math.random() * 4));
        let serverDataArray = [...serverData];
        console.log(serverDataArray);
        for (let i=0; i<serverDataArray.length; i++) {
            if (serverDataArray[i] == HintData[serverDataArray[i]].number) {
                console.log(HintData[serverDataArray[i]].hints[hintIndex].hint);
                console.log(HintData[serverDataArray[i]].hints[hintIndex].image);
            } 
        }
    }

    // function that tracks number of gues attempts, limits to 10 & restarts game after reaching limit
    const guessCounter = () => {
        setGuessAttemptCounter(guessAttemptCounter + 1 );
        console.log("GUESS ATTEMPT COUNTER: " + guessAttemptCounter);
        if(guessAttemptCounter === 10) {
            window.location.reload();
        }
    };
    
   
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
               width="20%"
               style={{marginTop: 15}}
               onClick={displayHint}
               isLoading={loading}
           >
               Hint
           </Button>

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