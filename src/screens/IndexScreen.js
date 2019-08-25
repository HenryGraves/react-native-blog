import React, { useContext } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { Context } from '../context/BlogContext';
import { FlatList } from 'react-native-gesture-handler';

const IndexScreen = () => {
  const { state, addBlogPost } = useContext(Context);

  return (
    <>
      <Text>Index Screen</Text>
      <Button title="Add Post" onPress={addBlogPost}/>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (<Text>{item.title}</Text>)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({

})

export default IndexScreen;