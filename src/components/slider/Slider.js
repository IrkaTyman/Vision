import React, { Component } from 'react';
import {View, ScrollView,Text} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {styles,sliderWidth,itemWidth} from '../Style';
import { ENTRIES1} from '../static/entries';
import SliderEntry from './components/SliderEntry'

export default class Slider extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 0,
        };
    }
    _renderItem ({item, index}) {
        return (
            <SliderEntry
              data={item}
            />
        );
    }

    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;
        return (
            <View>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={this.props.data || ENTRIES1}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  firstItem={slider1ActiveSlide}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.6}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
            </View>
        );
    }
    render () {
        const example1 = this.mainExample();
        return (
                <View >
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                        { example1 }
                    </ScrollView>
                </View>
        );
    }
}
