import React from "react";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Alert
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";

const screenWidth = Dimensions.get("window").width;

let cardWidth = screenWidth;
if (screenWidth > 500) {
  cardWidth = 500;
}

function mapStateToProps(state) {
  return { action: state.action };
}
function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
      }),
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name
      }),
    updateAvatar: photo =>
      dispatch({
        type: "UPDATE_AVATAR",
        photo
      })
  };
}
const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight)
  };
  componentDidMount() {
    this.toggleMenu();
  }
  componentDidUpdate() {
    this.toggleMenu();
  }
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start();
    }
    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
    }
  };

  handleMenu = index => {
    if (index === 3) {
      fetch("http://guohaucong.top:8088/logout")
        .then(response => response.json())
        .then(response => {
          if (response.errno) {
            Alert.alert(response.msg);
          } else {
            return Alert.alert(response.msg);
          }
        });
      this.props.closeMenu();
      this.props.updateName("未登录");
      this.props.updateAvatar(
        "https://p97.f4.n0.cdn.getcloudapp.com/items/kpudnrBx/avatar-default.jpg?v=4aadcdbdffe209bbd523530a75351afd"
      );
      AsyncStorage.clear();
    }
  };
  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require("../assets/background2.jpg")} />
          <Title>三点鱼</Title>
          <Subtitle>Design of react native</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            zIndex: 1
          }}
        >
          <ColseView>
            <Ionicons name="ios-close" size={44} color="#4775f2" />
          </ColseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handleMenu(index);
              }}
            >
              <MenuItem
                icon={item.icon}
                title={item.title}
                text={item.text}
                key={index}
              />
            </TouchableOpacity>
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth};
  align-self: center;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;
const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;
const ColseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const items = [
  {
    icon: "ios-settings",
    title: "设置",
    text: "settings"
  },
  {
    icon: "ios-card",
    title: "卡包",
    text: "settings"
  },
  {
    icon: "ios-compass",
    title: "指南",
    text: "settings"
  },
  {
    icon: "ios-exit",
    title: "退出登录",
    text: "settings"
  }
];
