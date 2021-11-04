import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import News from '../Components/News'
import Search from '../Components/Search';

const homeStack = createStackNavigator();
const homeStackScreen = () => (
    <homeStack.Navigator >
        <homeStack.Screen name="Search" component={Search}/>
        <homeStack.Screen name="FilmDetail" component={FilmDetail} />
    </homeStack.Navigator>
)

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Accueil" component={homeStackScreen} />
                <Tab.Screen name="Favorites" component={Favorites} />
                <Tab.Screen name="News" component={News} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}