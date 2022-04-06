import React, {useState}from 'react';
import GameFormEasy from './GameFormEasy';
import { HintData } from './HintData';
import { Button } from "@chakra-ui/button";
import "./HintDisplay.css"

function HintDisplay(props) {
    const [hints, setHints] = useState([]);
    const [pics, setPics] = useState([]);
    const [hintIndex, setHintIndex] = useState(0);
    const [showHint, setShowHint] = useState(() => () => console.log("hi"));
    const [loading, setLoading] = useState(false);
    const [serverDataArray, setServerDataArray] = useState([]);
    

  // display hints that correspond to the random number from the API.
    const displayHint = () => {
        const renderHints = () => {
            // generate a random number to use as hint array index so same hints arent used every time
            setHintIndex(Math.floor(Math.random() * 4));
            let randomNum = Math.floor(Math.random() * 4)
            let guessHints = [...props.serverData];
                guessHints.map((data) => {
                    <div>
                        return (
                            <div>
                                {setHints(hints => 
                                    [
                                        ...hints, 
                                        HintData[data].hints[randomNum].hint, 
                                        <img className="img" src={HintData[data].hints[randomNum].image} />
                                    ])}

                            </div>
                        );       
                    </div>
                   

                })
        }
        renderHints();
    
};

  return (
    <div>
        {hints}
      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
            setShowHint(displayHint)
        }}
      >
        Hint
      </Button>
    </div>
  );
}

export default HintDisplay;