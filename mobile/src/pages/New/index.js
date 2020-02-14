import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';

export default function New({navigation}) {
  const [finalImg, setFinalImg] = useState(null);
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

  function handleSelectImage() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar Imagem',
      },
      upload => {
        if (upload.error) {
          console.log('Error');
        } else if (upload.didCancel) {
          console.log('Canceled by user');
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLocaleLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const finalImage = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };
          setImage(preview);
          setFinalImg(finalImage);
        }
      },
    );
  }

  async function handleSubmit() {
    const data = new FormData();

    data.append('image', finalImg);
    data.append('author', author);
    data.append('location', location);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('/posts', data);

    navigation.navigate('Feed');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
        <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {image && <Image style={styles.preview} source={image} />}

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Nome do autor"
        placeholderTextColor="#999"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Local "
        placeholderTextColor="#999"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Texto do post"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Hashtags"
        placeholderTextColor="#999"
        value={hashtags}
        onChangeText={setHashtags}
      />
      <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
        <Text style={styles.shareButtonText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
}

New.navigationOptions = ({navigation}) => ({
  headerTitle: 'Novo Post',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});
