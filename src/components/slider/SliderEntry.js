import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,Pressable } from 'react-native';
import PropTypes from 'prop-types';
import {styles,fontSizeMain} from '../Style';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default class SliderEntry extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    get image () {
        const { data: { afterImg} } = this.props;
        return (
            <Image
              source={{ uri: afterImg }}
              style={styles.sliderImage}
            />
        );
    }

    downloadFile(uri){
      const fileUri = FileSystem.documentDirectory + `${this.props.id}-1.jpg`;
      FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
          this.saveFile(uri);
        })
        .catch(error => {
          console.error(error);
        })
    }

    async saveFile(fileUri: string){
      const res = await MediaLibrary.requestPermissionsAsync()
        if (res.granted) {
          const asset = await MediaLibrary.createAssetAsync(fileUri)
          await MediaLibrary.createAlbumAsync("Fotou", asset, false)
        }
    }

    render () {
        const { even } = this.props;
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => {}}
              >
                <View style={[styles.sliderImageContainer,styles.flex]}>
                    { this.image }
                    <Pressable
                        hitSlop={24}
                        onPress={() => this.downloadFile(this.props.data.afterImg)}
                        style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? '#C55454'
                                : '#D07070',
                              right:0,
                              bottom:0,
                              position:'absolute',
                              padding:fontSizeMain*0.8                         }]}
                      >
                        <Ionicons name="ios-download-outline" size={fontSizeMain*1.16} color="#fff" />
                      </Pressable>
                </View>
            </TouchableOpacity>
        );
    }
}
