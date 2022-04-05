import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { HintData } from "./HintData";
import axios from "axios";


const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [userInputNumber, setUserInputNumber] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [serverNums, setServerNums] = useState();
  const [loading, setLoading] = useState(false);
  const [guessAttemptCounter, setGuessAttemptCounter] = useState(0);
  const [guessAttemptCounter2, setGuessAttemptCounter2] = useState(0);   
  const [guessArray, setGuessArray] = useState([]); 
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);    
  let toast = useToast();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(()=> {
    try {
        const fetchData = async() => {
            await axios
            .get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
            .then((res) => {
                setServerNums(res.data.replace(/[\n]/gm, '').toString())
                console.log(res.data.replace(/[\n]/gm, '').toString());
            });
        }
        fetchData();
        
    }
    catch (errors) {
        toast({
            title: 'Error Occured!',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: "bottom"
        });
    }
  }, []); 

  
  const sendMessage = async () => {
    if (userInputNumber !== "") {
      const messageData = {
        guessesInfo: guessArray,
        room: room,
        author: username,
        message: userInputNumber,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setUserInputNumber("");
    }

    const gameOver = async () => {
      if (guessAttemptCounter == 2) {
        let over = "game over"
        await socket.emit("game_over", over)
      }
    }

    if (!userInputNumber || userInputNumber.length < 4) {
      toast({
        title: "Please Enter A 4-Digit Number The Field Before Clicking Submit",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    };

    let randomNums = serverNums;
    console.log(serverNums);
    if(userInputNumber.toString() === serverNums) {
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

      for (let i = 0; i < serverNums.length; i++) {
        if (
          serverNums.charAt(i) === userInputNumber.charAt(0).toString() ||
          serverNums.charAt(i) === userInputNumber.charAt(1).toString() ||
          serverNums.charAt(i) === userInputNumber.charAt(2).toString() ||
          serverNums.charAt(i) === userInputNumber.charAt(3).toString() 
          ) 
          {correctNumbersCount++}
        
        if(userInputNumber.toString().charAt(i) === serverNums.charAt(i)) 
          {correctLocationCount++} 


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
  };

  
  // display updated state of guessArray, give feedback message about guesses
  const renderGuesses = () => {
    {guessArray.map((guessData, i) => {
      console.log(guessArray);
      for(let i=0; i<guessArray.length; i++) {
        console.log(`You guessed ${guessArray[i].userInputNumberData.correctNumbers} correct numbers`);
        console.log(`You guessed ${guessArray[i].userInputNumberData.correctLocations} correct locations`);
      }
      return <div className="guess-content"> (<div key={i}> {guessData} </div>)</div>
      })};
  }
  renderGuesses();

  // display hints that correspond to the random number from the API. 
  const displayHint = () => {
      setShowHint(true)
      setHintIndex(Math.floor(Math.random() * 4));
      let serverNumsArray = [...serverNums];
      console.log(serverNumsArray);
      for (let i=0; i<serverNumsArray.length; i++) {
          if (serverNumsArray[i] == HintData[serverNumsArray[i]].number) {
              console.log(HintData[serverNumsArray[i]].hints[hintIndex].hint);
              console.log(HintData[serverNumsArray[i]].hints[hintIndex].image);
          } 
      }
  }

  const guessCounter = async () => {
    setGuessAttemptCounter(guessAttemptCounter + 1 );
    let url = "http://localhost:3001/counter";
    let counter2 = 0
    console.log("GUESS ATTEMPT COUNTER: " + guessAttemptCounter);
    try {
    //   axios({
    //     method: "post",
    //     url: "http://localhost:3001/counter",
    //     data: {
    //       count: counter2++
    //     }
    //   })
    // }
     await axios.post(url, {
        count:counter2++
      })
      .then( (response) => {
        console.log(response);
        console.log(counter2);
        console.log("added 1 to counter");
      })
    }
    catch (err) {
      if (err) {
        console.log("didnt count");
      }
    }

    if (guessAttemptCounter === 10) {
        window.location.reload();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>

                  <div>
                  {guessArray.map((guessData, i) => {
                    console.log(guessArray);
                    for(let i=0; i<guessArray.length; i++) {
                      return <div className="guessArray"> (<div key={i}> {guessData.userInputNumberData.correctNumbers} </div>)</div>
                    }
                    
        })};
                        
                      
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          placeholder='Enter a 4-Digit Number'
          maxlength = "4"
          minlength = "4"
          type="text"
          value={userInputNumber}
          onChange={(event) => {
            setUserInputNumber(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
