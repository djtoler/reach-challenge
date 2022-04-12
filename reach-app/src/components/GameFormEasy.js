import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState} from 'react';
import { useToast } from '@chakra-ui/react';
import { HintData } from "./HintData";
import HintDisplay from "./HintDisplay";
import UserData from "./UserData";
import { Badge, Avatar, Box, Text, Flex } from '@chakra-ui/react';
import { render } from "@testing-library/react";
import { useHistory } from 'react-router';



const GameFormEasy = (props) => {
    console.log(props.numbers);
    let serverData = props.numbers;
    const [userInputNumber, setUserInputNumber] = useState();
    const [guessAttemptCounter, setGuessAttemptCounter] = useState(0);
    const [guessAttemptCounter2, setGuessAttemptCounter2] = useState(2);
    const [guessArray, setGuessArray] = useState([]); 
    const [loading, setLoading] = useState(false);  
    const [showHistory, setShowHistory] = useState(() => () => console.log("hi"));
    const [historyArray, setHistoryArray] = useState([]);
    const [correctLocationCount, setCorrectLocationCount] = useState()
    const [correctNumbersCount, setCorrectNumbersCount] = useState()
    // const [hintIndex, setHintIndex] = useState(0);
    // const [showHint, setShowHint] = useState(false);   
    const [wonGame, setWonGame] = useState(false);    

    // toast for error message objects
    const toast = useToast();
    const history = useHistory();

    const homeRedirect = () => {
        // setUserInputNumber();
        // setGuessAttemptCounter(0);
        // setWonGame(false);
        window.location.reload();
    }

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
            setWonGame(true);
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
            return <div className="guessArray"> (<div key={i}> {guessData.userInputNumberData.correctNumbers} </div>)</div>
        }
        
    })};
}
renderGuesses();

    // function that tracks number of gues attempts, limits to 10 & restarts game after reaching limit
    const guessCounter = () => {
        setGuessAttemptCounter2(guessAttemptCounter2 - 1 );
        if(guessAttemptCounter2 === 0) {
            alert("You Lost");
            setTimeout(homeRedirect(), 4000);
        }
    };
    
   
    return (
        !wonGame ? 
        <VStack spacing="5px" color="black">
             {/* <UserData counter={guessAttemptCounter2} /> */}
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
 
             <HintDisplay serverData={serverData}/>
 
             <Button 
                colorScheme="green"
                width="100%"
                style={{marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
             >
                Submit Your Numbers
             </Button>
             <Button
                 colorScheme="green"
                 width="100%"
                 style={{ marginTop: 15 }}
                 // onClick={() => {
                 //     setShowHistory(renderGuesses)
                 // }}
                 >
                 History
             </Button> 

            <div>
                {guessArray.map((guessData, i) => {
                    console.log(guessArray);
                    return <div key={i}> 
                        Guess Attempt: {guessData.userInputNumberData.guessNumberCount}<br/> Number You Guessed: {guessData.userInputNumberData.userGuess}
                        <br/>
                        You guessed {guessData.userInputNumberData.correctNumbers} correct numbers and {guessData.userInputNumberData.correctLocations} correct locations
                        <br/>
                        </div>
                })}
            </div>
        </VStack>
    :
    <VStack>
       <div>
           {"You Won"}
           <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={homeRedirect}
                isLoading={loading}
                >
                Replay The Game
            </Button>
       </div>  
    </VStack>
    )
 }

export default GameFormEasy;