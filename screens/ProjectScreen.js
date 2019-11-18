import React from "react";
import styled from "styled-components";
import Project from "../components/Project";
import { PanResponder, Animated, AsyncStorage } from "react-native";
import { connect } from "react-redux";
function mapStateToProps(state) {
  return {
    action: state.action,
    allArtive: state.allArtive
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateAllArtive: allArtive =>
      dispatch({
        type: "UPDATE_ALLARTIVE",
        allArtive
      })
  };
}
class ProjectScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdtranslateY: new Animated.Value(-50),
    Index: 0,
    opacity: new Animated.Value(0),
    num: 0
  };
  componentDidMount() {
    this.loadState();
  }
  getNextIndex(index) {
    let nextIndex = index + 1;
    if (nextIndex > this.props.allArtive.length - 1) {
      return 0;
    }
    return nextIndex;
  }
  loadState = () => {
    AsyncStorage.getItem("AllArtiveData").then(res => {
      const state = JSON.parse(res);
      this.props.updateAllArtive(state);
    });
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (this.props.action === "openCard") {
            return false;
          } else {
            return true;
          }
        }
      },
      // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      onPanResponderGrant: () => {
        Animated.spring(this.state.opacity, { toValue: 1 }).start();
        //第二张卡片动画
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();
        //第三张卡片动画
        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdtranslateY, { toValue: 44 }).start();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。意味着一个手势操作已经成功完成。
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        Animated.spring(this.state.opacity, { toValue: 0 }).start();
        // console.log(typeof positionY);
        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 }
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdtranslateY.setValue(-50);
            this.setState({ Index: this.getNextIndex(this.state.Index) });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
          //第二张卡片动画
          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();

          //第三张卡片动画
          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdtranslateY, { toValue: -50 }).start();
        }
      }
    });
  }
  render() {
    return (
      <Container>
        <AnimatedMark style={{ opacity: this.state.opacity }} />
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title={this.props.allArtive[this.state.Index].title}
            author={this.props.allArtive[this.state.Index].author.name}
            text={this.props.allArtive[this.state.Index].content}
            canOpen={true}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Project
            title={
              this.props.allArtive[this.getNextIndex(this.state.Index)].title
            }
            author={
              this.props.allArtive[this.getNextIndex(this.state.Index)].author
                .name
            }
            text={
              this.props.allArtive[this.getNextIndex(this.state.Index)].content
            }
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.thirdScale },
              { translateY: this.state.thirdtranslateY }
            ]
          }}
        >
          <Project
            title={
              this.props.allArtive[this.getNextIndex(this.state.Index + 1)]
                .title
            }
            author={
              this.props.allArtive[this.getNextIndex(this.state.Index + 1)]
                .author.name
            }
            text={
              this.props.allArtive[this.getNextIndex(this.state.Index + 1)]
                .content
            }
          />
        </Animated.View>
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen);
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;
const Mark = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;
const AnimatedMark = Animated.createAnimatedComponent(Mark);
