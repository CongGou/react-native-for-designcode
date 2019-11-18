import React from "react";
import styled from "styled-components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
class NoticeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const section = this.props.navigation.getParam("section");
    return (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <Cover>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <CloseCover>
                  <CloseView>
                    <Ionicons
                      name="ios-close"
                      size={36}
                      color="#4775f2"
                      style={{ marginTop: 2 }}
                    />
                  </CloseView>
                </CloseCover>
              </TouchableOpacity>
              <Subtitle>通知</Subtitle>
              {section.map((Notice, index) => (
                <ContentCover key={index}>
                  <TitleCover>
                    <Logo source={Notice.logo} />
                    <Title>{Notice.title}</Title>
                    <DateCover>
                      <Date>{Notice.date}</Date>
                    </DateCover>
                  </TitleCover>
                  <Text>{Notice.text}</Text>
                </ContentCover>
              ))}
            </Cover>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}
export default NoticeScreen;
const Container = styled.View`
  width: 100%;
  background: #f0f3f5;
`;
const Cover = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;
const CloseCover = styled.View`
  align-items: center;
`;
const CloseView = styled.View`
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
const Subtitle = styled.Text`
  margin: 20px 0;
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
`;
const ContentCover = styled.View`
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`;
const TitleCover = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;
const Logo = styled.Image`
  width: 20px;
  height: 20px;
`;
const Title = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-left: 10px;
`;
const DateCover = styled.View`
  position: absolute;
  right: 0;
  height: 20px;
  font-size: 14px;
  background: #4775f2;
  padding: 0 10px;
  border-radius: 10px;
  justify-content: center;
`;
const Date = styled.Text`
  color: white;
  font-weight: bold;
`;
const Text = styled.Text``;
