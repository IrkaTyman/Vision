import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import {styles} from '../../Style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    get image () {
        const { data: { illustration,src }} = this.props;
        return (
            <Image
              source={{ uri: illustration }}
              style={styles.sliderImage}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => {}}
              >
                <View style={styles.sliderImageContainer}>
                    { this.image }
                </View>
            </TouchableOpacity>
        );
    }
}
