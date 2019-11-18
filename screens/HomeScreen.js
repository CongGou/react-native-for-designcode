import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  StatusBar,
  AsyncStorage,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Logo from "../components/Logo";
import Card from "../components/Card";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import ModalLogin from "../components/ModalLogin";
function mapStateToProps(state) {
  return {
    action: state.action,
    name: state.name,
    allArtive: state.allArtive
  };
}
function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN"
      }),
    upDateAllArtive: allArtive =>
      dispatch({
        type: "UPDATE_ALLARTIVE",
        allArtive
      })
  };
}
class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    noticeScale: new Animated.Value(0)
  };
  static navigationOptions = {
    header: null
  };
  //存储所有文章数据
  storeAllArtive = async data => {
    try {
      await AsyncStorage.setItem("AllArtiveData", JSON.stringify(data));
    } catch (error) {}
  };
  //获取所有文章存储数据
  retrieveAllArtive = async () => {
    try {
      const Artives = await AsyncStorage.getItem("AllArtiveData");
      if (Artives !== null) {
        const ArtivesData = JSON.parse(Artives);
        this.props.upDateAllArtive(ArtivesData);
      }
    } catch (error) {}
  };
  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    fetch("http://guohaucong.top:8088/allarticles")
      .then(res => res.json())
      .then(res => {
        this.storeAllArtive(res.data);
        this.props.upDateAllArtive(res.data);
        this.retrieveAllArtive();
      });
  }
  componentDidUpdate() {
    this.toggleMenu();
    this.toggleNotice();
  }
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }
    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 1
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };
  handleAvatar = () => {
    if (this.props.name !== "未登录") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  };
  toggleNotice = () => {
    if (this.props.name !== "未登录") {
      if (Notices.length > 0) {
        Animated.spring(this.state.noticeScale, { toValue: 1 }).start();
      } else {
        Animated.spring(this.state.noticeScale, { toValue: 0 }).start();
      }
    }
  };
  handleNotice = () => {
    if (this.props.name !== "未登录") {
      if (Notices.length > 0) {
        this.props.navigation.push("Notice", {
          section: Notices
        });
        Animated.spring(this.state.noticeScale, { toValue: 0 }).start();
      } else {
        Alert.alert("没有新通知");
      }
    } else {
      Alert.alert("请先登录");
    }
  };
  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ heigth: "100%" }}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handleAvatar}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome!back</Title>
                <Name>{this.props.name}</Name>
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, top: 5 }}
                  onPress={this.handleNotice}
                >
                  <Ionicons
                    name="ios-notifications"
                    size={32}
                    color="#4775f2"
                  />
                </TouchableOpacity>
                <NoticeAnimated style={{ opacity: this.state.noticeScale }} />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo image={logo.image} text={logo.text} key={index} />
                ))}
              </ScrollView>
              <Subtitle>最新热门文章</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {this.props.allArtive.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.push("Section", {
                        section: card
                      });
                    }}
                  >
                    <Card
                      title={card.title}
                      name={card.author.name}
                      avatar={card.author.photo}
                      subtitle={card.label}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Subtitle>推荐文章</Subtitle>
              <CourseContainer>
                {this.props.allArtive.map((course, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.push("Section", {
                        section: course
                      });
                    }}
                  >
                    <Course
                      title={course.title}
                      avatar={course.author.photo}
                      name={course.author.name}
                      subtitle={course.label}
                    />
                  </TouchableOpacity>
                ))}
              </CourseContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const RootView = styled.View`
  background: black;
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const TitleBar = styled.View`
  width: 100%;
  margin-top: 30px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const Notice = styled.View`
  position: absolute;
  right: 18px;
  top: 5px;
  height: 10px;
  width: 10px;
  background: red;
  border-radius: 5px;
  border: 1px solid white;
`;
const NoticeAnimated = Animated.createAnimatedComponent(Notice);
const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
  margin-left: 20px;
`;
const CourseContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const logos = [
  {
    image: require("../assets/logo-vue.png"),
    text: "Vue"
  },
  {
    image: require("../assets/logo-javascript.png"),
    text: "Javascript"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "figma"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React Native"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch"
  }
];
const Notices = [
  {
    logo: require("../assets/logo-vue.png"),
    title: "Vue.js for Design",
    date: "刚刚",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-react.png"),
    title: "React.js for Design",
    date: "刚刚",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-javascript.png"),
    title: "Javascript.js for Design",
    date: "刚刚",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-sketch.png"),
    title: "xcode for Design",
    date: "1小时",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-xcode.png"),
    title: "xcode for Design",
    date: "2小时前",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-xcode.png"),
    title: "xcode for Design",
    date: "2小时前",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-xcode.png"),
    title: "xcode for Design",
    date: "2小时前",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-xcode.png"),
    title: "xcode for Design",
    date: "2小时前",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-xcode.png"),
    title: "xcode for Design",
    date: "2小时前",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  },
  {
    logo: require("../assets/logo-xcode.png"),
    title: "xcode for Design",
    date: "2小时前",
    text:
      "Discover interesting projects and people to populate your personal news feed."
  }
];
