import React from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    action: state.action
  };
}
function mapDispatchToProps(dispatch) {
  return {
    openCard: () =>
      dispatch({
        type: "OPEN_CARD"
      }),
    closeCard: () =>
      dispatch({
        type: "CLOSE_CARD"
      })
  };
}
const screenWidth = Dimensions.get("window").width;
class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    cardTop: new Animated.Value(200),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(100)
  };
  openCard = () => {
    if (!this.props.canOpen) return;
    Animated.spring(this.state.cardWidth, { toValue: screenWidth }).start();
    Animated.spring(this.state.titleTop, { toValue: 40 }).start();
    Animated.spring(this.state.cardTop, { toValue: 0 }).start();
    Animated.timing(this.state.opacity, { toValue: 1 }).start();
    Animated.spring(this.state.textHeight, { toValue: 0 }).start();
    Animated.spring(this.state.cardHeight, { toValue: 16000 }).start();
    StatusBar.setHidden(true);
    this.props.openCard();
  };
  closeCard = () => {
    Animated.spring(this.state.cardWidth, { toValue: 315 }).start();
    Animated.spring(this.state.titleTop, { toValue: 20 }).start();
    Animated.spring(this.state.cardTop, { toValue: 200 }).start();
    Animated.timing(this.state.opacity, { toValue: 0 }).start();
    Animated.spring(this.state.textHeight, { toValue: 100 }).start();
    Animated.spring(this.state.cardHeight, { toValue: 460 }).start();
    StatusBar.setHidden(false);
    this.props.closeCard();
  };
  render() {
    return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={this.openCard}>
          <AnimatedContainer
            style={{
              width: this.state.cardWidth,
              height: this.state.cardHeight,
              top: this.state.cardTop
            }}
          >
            <Cover>
              <Image source={require("../assets/background5.jpg")} />
              <TitleAnimated style={{ top: this.state.titleTop }}>
                {this.props.title}
              </TitleAnimated>
              <Author>{this.props.author}</Author>
            </Cover>
            <WebViewAnimated
              style={{
                height: this.state.textHeight,
                fontSize: 17,
                margin: 20,
                lineHeight: 24,
                color: "#3c4560"
              }}
              source={{ html: this.props.text + htmlStyle }}
              scalesPageToFit={false}
              scrollEnabled={false}
              ref="webview"
              onNavigationStateChange={event => {
                if (event.url != "about:blank") {
                  this.refs.webview.stopLoading();
                  Linking.openURL(event.url);
                }
              }}
            />
            <AnimatedLinearGradient
              colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
              style={{
                position: "absolute",
                top: 350,
                width: "100%",
                height: this.state.textHeight
              }}
            />
            {/* 关闭按钮 */}
            <TouchableOpacity
              style={{ position: "absolute", top: 20, right: 20 }}
              onPress={this.closeCard}
            >
              <CloseAnimated style={{ opacity: this.state.opacity }}>
                <Ionicons name="ios-close" size={32} color="#546bfb" />
              </CloseAnimated>
            </TouchableOpacity>
          </AnimatedContainer>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);

const Container = styled.View`
  top: 200;
  width: 315px;
  height: 960px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: 100%;
  height: 290px;
`;
const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;
const TitleAnimated = Animated.createAnimatedComponent(Title);
const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;
const WebViewAnimated = Animated.createAnimatedComponent(WebView);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;
const CloseAnimated = Animated.createAnimatedComponent(CloseView);
const htmlStyle = `
<style>
  *{
    font-family:-app-system,Roboto;
    margin:0;
    padding:0;
    font-size:24px;
    font-weight: normal;
    color: #3c4560;
    line-height: 48px;
    so
  }
  h2{
    font-size:24px;
    text-transform:uppercase;
    color: #b8bene;
    font-weight:600;
  }
  img{
    width:100%;
    border-radius:10px;
    margin-top: 10px;
  }
  strong{
    font-weight:700;
  }
  p{
    margin-top:20px;
  }
  a{
    color:#4775f2;
    font-weight: 600;
    text-decoration:none;
  }
  pre{
    padding:20px;
    background:#212c4f;
    overflow:hidden;
    word-wrap:break-word;
    border-radius:10px;
    margin-top:20px;
    color:white ;
    overflow-x: scroll; 
  }
  code{
    color:white;
  }
</style>
`;
