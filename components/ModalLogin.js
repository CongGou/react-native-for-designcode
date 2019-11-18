import React from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  Dimensions,
  AsyncStorage
} from "react-native";
import { BlurView } from "expo-blur";
import Success from "./Success";
import Loading from "./Loading";
import { connect } from "react-redux";

import md5 from "react-native-md5";
const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.action };
}
function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSE_LOGIN"
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
class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/ios-email.png"),
    IconpassWord: require("../assets/ios-password.png"),
    isSuccessful: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };
  componentDidMount() {
    this.retrieveName();
  }
  componentDidUpdate() {
    this.retrieveName();
    if (this.props.action === "openLogin") {
      Animated.timing(this.state.top, { toValue: 0, duration: 0 }).start();
      Animated.spring(this.state.scale, {
        toValue: 1
      }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 0
      }).start();
    }
    if (this.props.action === "closeLogin") {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          duration: 0
        }).start();
        Animated.spring(this.state.scale, {
          toValue: 1.3
        }).start();
      }, 500);

      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 500
      }).start();
    }
  }
  storeName = async data => {
    try {
      await AsyncStorage.setItem("nickData", JSON.stringify(data));
    } catch (error) {}
  };
  retrieveName = async () => {
    try {
      const nickData = await AsyncStorage.getItem("nickData");
      if (nickData !== null) {
        const userData = JSON.parse(nickData);
        this.props.updateName(userData.name);
        this.props.updateAvatar(userData.photo);
      }
    } catch (error) {}
  };
  handleLogin = () => {
    const email = this.state.email;
    const password = this.state.password;
    let salt = "sandianyu";
    let pass = md5.hex_md5(password + salt);
    // console.log(pass);
    if (email === "") {
      return Alert.alert("请输入账号");
    } else {
      if (password === "") {
        return Alert.alert("请输入密码");
      }
      fetch("http://guohaucong.top:8088/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: email,
          pass
        })
      })
        .then(res => res.json())
        .then(response => {
          if (response.errno) {
            this.setState({ isLoading: false });
            this.setState({ isSuccessful: true });
            Alert.alert("登录成功", "欢迎进入三点鱼！");
            this.storeName(response.user);
            this.props.updateName(response.user.name);
            // 修改后台图片代码成URL形再执行该操作
            this.props.updateAvatar(response.user.photo);
            setTimeout(() => {
              this.props.closeLogin();
              this.setState({ isSuccessful: false });
            }, 1000);
          } else {
            Alert.alert(response.msg);
          }
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    }
  };
  tapBackground = () => {
    Keyboard.dismiss();
    this.props.closeLogin();
  };
  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>

        <AnimatedModal
          style={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Logo source={require("../assets/logo-figma.png")} />
          <Text>Start Leaing ,Access Pro Content</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            keyboardType="default"
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="PassWord"
            secureTextEntry={true}
          />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.IconpassWord} />
          <TouchableOpacity onPress={this.handleLogin}>
            <Button>
              <ButtonText>Login IN</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessful} />
        <Loading isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;
const AnimatedModal = Animated.createAnimatedComponent(Modal);
const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;
const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;
const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;
const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;
const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;
const Button = styled.View`
  margin-top: 20px;
  width: 295px;
  height: 50px;
  background: #5263ff;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
`;
