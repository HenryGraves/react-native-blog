import React, { useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { Context } from '../context/BlogContext';
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
4

const IndexScreen = ({ navigation }) => {
  const { state, addBlogPost, deleteBlogPost, getBlogPosts } = useContext(Context);
  
  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    return () => {
      listener.remove();
    }
  }, []);

  return (
    <>
      <Text>Blog Posts</Text>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash"/>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} style={{ paddingRight: 5 }}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24
  }
})

export default IndexScreen;