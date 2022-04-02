import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import {Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import GameFormEasy from '../components/GameFormEasy';
import GameFormDifficult from '../components/GameFormDifficult';
import UserData from '../components/UserData';

const HomePage = () => {
    const [serverNums, setServerNums] = useState();
    let toast = useToast();
    useEffect(()=> {
        try {
            const fetchData = async() => {
                await axios
                .get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
                .then((res) => {
                    setServerNums(res.data.replace(/[\n]/gm, '').toString())
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
   
    return (
      <Container maxWidth="xl" centerContent>
          <UserData/>
          <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          marginTop="200px"
          >
            <Text fontSize="4xl" fontFamily="Work sans" color="black">
                Mastermind Game
            </Text> 
          </Box>

            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black">
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList mb="1em">
                        <Tab width="50%">Easy</Tab>
                        <Tab width="50%">Difficult</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <GameFormEasy numbers={serverNums}/>
                        </TabPanel>
                        <TabPanel>
                            <GameFormDifficult numbers={serverNums}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
  }
  
  export default HomePage;