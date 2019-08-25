import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/BlogContext';

const navigator = createStackNavigator({
    Index: IndexScreen,
  }, 
  {
    initalRoutName: 'Index',
    defaultNavigationOptions: {
      title: 'Blogs'
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
  <Provider>
    <App />
  </Provider>
  )
}