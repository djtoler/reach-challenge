import React from 'react';
import { Badge, Avatar, Box, Text, Flex } from '@chakra-ui/react';
import GameFormEasy from './GameFormEasy';

function UserData() {
  return (
    <Flex>
        <Avatar src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' />
        <Box 
            ml='3'
            bg="white" 
            w="100%"           
            borderRadius="lg"
            borderWidth="1px"
        >
            <Text fontWeight='bold'>
                Player Name: 
                <br/>
                <Badge ml='1' colorScheme='green'>
                    Guess Attempts Left: 
                </Badge>
            </Text>
            <Text fontSize='sm'>{}</Text>
        </Box>
    </Flex>
  )
}

export default UserData;