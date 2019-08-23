import React, { useContext } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import BlogContext from '../context/BlogContext';
import { FlatList } from 'react-native-gesture-handler';

const IndexScreen = () => {
  const { data, addBlogPost } = useContext(BlogContext);

  return (
    <>
      <Text>Index Screen</Text>
      <Button title="Add Post" onPress={addBlogPost}/>
      <FlatList
        data={data}
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