import React from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity, StatusBar, Linking } from "react-native";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";

class SectionSereen extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }
  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }
  render() {
    const section = this.props.navigation.getParam("section");
    return (
      <ScrollView>
        <Container style={{ minHeight: 15000 }}>
          <StatusBar hidden />
          <Cover>
            {/* <Image source={section.image} /> */}
            <Image source={require(`../assets/background${12}.jpg`)} />
            <Wrapper></Wrapper>
            <Title>{section.title}</Title>
            <Caption>{section.author.name}</Caption>
          </Cover>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseView>
              <Ionicons
                name="ios-close"
                size={36}
                color="#4775f2"
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            <WebView
              source={{ html: section.content + htmlStyle }}
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
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default SectionSereen;

const Container = styled.View`
  width: 100%;
  height: 100%;
`;
const Cover = styled.View`
  height: 250px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;
const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;
const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
const Content = styled.View`
  min-height: 15000px;
  padding: 20px;
`;
const htmlStyle = `
<style>
  *{
    font-family:-app-system,Roboto;
    margin:0;
    padding:0;
    font-size:28px;
    font-weight: normal;
    color: #3c4560;
    line-height: 48px;
    so
  }
  h2{
    font-size:34px;
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
