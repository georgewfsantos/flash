import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import io from 'socket.io-client';
import api from '../../services/api';

import camera from '../../assets/camera.png';
import more from '../../assets/more.png';
import like from '../../assets/like.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const response = await api.get('/posts');

    setPosts(response.data);
  }

  useEffect(() => {
    registerToSocket();
    loadPosts();
  }, []);

  function registerToSocket() {
    const socket = io('http://localhost:3333');

    socket.on('post', newPost => {
      setPosts(prev => [newPost, ...prev]);
    });

    socket.on('like', likedPost => {
      setPosts(prev =>
        prev.map(post => (post._id === likedPost._id ? likedPost : post)),
      );
    });
  }

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  return (
    <FlatList
      style={styles.container}
      showsVerticalScrollIndicator={false}
      data={posts}
      keyExtractor={post => post._id}
      renderItem={({item}) => (
        <View style={styles.feedItem}>
          <View style={styles.feedItemHeader}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.author}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <Image source={more} />
          </View>

          <Image
            style={styles.feedImage}
            source={{uri: `http://localhost:3333/files/${item.image}`}}
          />

          <View style={styles.feedItemFooter}>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.action}
                onPress={() => handleLike(item._id)}>
                <Image source={like} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={() => {}}>
                <Image source={comment} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={() => {}}>
                <Image source={send} />
              </TouchableOpacity>
            </View>

            <Text style={styles.likes}>{item.likes} curtidas</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.hashtags}>{item.hashtags}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginTop: 20,
  },
  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 14,
    color: '#000',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },

  feedItemFooter: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 8,
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    lineHeight: 18,
    color: '#000',
  },
  hashtags: {
    color: '#7159c1',
  },
});

Feed.navigationOptions = ({navigation}) => ({
  headerRight: () => (
    <TouchableOpacity
      // eslint-disable-next-line react-native/no-inline-styles
      style={{marginRight: 20}}
      onPress={() => navigation.navigate('New')}>
      <Image source={camera} />
    </TouchableOpacity>
  ),
});
