import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, View, ScrollView, Text } from 'react-native';
import { ListView } from 'realm/react-native';
import Calendar from 'react-native-calendar';

export class ProgramsPane extends Component {
  render() {
    return (
      <View>
        <NavigatorIOS
          barTintColor='#444'
          titleTextColor='#eee'
          initialRoute={{
            component: View,
            title: '放送予定',
            //pass
          }}
        />

        <View style={{paddingTop: 65}}>
          <Calendar
            scrollEnabled={true}
            showControls={true}
            titleFormat={'YYYY年 M月'}
            dayHeadings={['日', '月', '火', '水', '木', '金', '土']}
            prevButtonText={'< 前月'}
            nextButtonText={'翌月 >'}
            onDateSelect={(date) => this.onDateSelect(date)}
            onTouchPrev={this.onPrev}
            onTouchNext={this.onNext}
            onSwipePrev={this.onPrev}
            onSwipeNext={this.onNext}
            customStyle={{day: {fontSize: 15, textAlign: 'center'}}}
            weekStart={1}
           />
         </View>

         <ScrollView>
          <Text>anime01</Text>
          <Text>anime02</Text>
         </ScrollView>
      </View>
    );
  }

  onPrev() {
    // load prev month animes
  }

  onNext() {
    // load next month animes
  }

}
