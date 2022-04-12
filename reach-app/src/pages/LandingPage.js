import React, {useState} from 'react';
import {Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import Login from '../components/Login';
import Register from '../components/Register';

const LandingPage = (props) => {

    return (
        <Container maxWidth="xl" centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work sans" color="black">
                    LinkedIn MasterMind Game
                </Text>
            </Box>
        <Box
            bg="white"
            w="100%"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            color="black"
        >
            <Tabs variant="soft-rounded" colorScheme="green">
                <TabList mb="1em">
                    <Tab width="50%">Login</Tab>
                    <Tab width="50%">Register</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>

                    <TabPanel>
                        <Register />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
        </Container>
    );
};

export default LandingPage;