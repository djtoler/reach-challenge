import React from 'react';
import { Badge, Avatar, Box, Text, Flex } from '@chakra-ui/react';
import GameFormEasy from './GameFormEasy';

function UserData(props) {
    return (
        <Flex>
            <Flex>
                <Avatar src='https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png' />
                <Box ml='3'bg="white" w="100%" borderRadius="lg" borderWidth="1px">
                    <Text fontWeight='bold'>
                        Player Name:  <br/>
                        <Badge ml='1' colorScheme='green'>
                            Guess Attempts Left: {props.counter}
                        </Badge> 
                        <br/>
                    </Text>
                </Box>
            </Flex>
            <Flex>
                <Box 
                    ml='3'
                    bg="green" 
                    w="100%"           
                    borderRadius="lg"
                    borderWidth="1px"
                    >
                    <Text>
                        {props.guessHistory}
                        {"text spot"}
                    </Text>
                </Box>
            </Flex> 
        </Flex>
    )
}

export default UserData;