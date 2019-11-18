import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

function getCourseWidth() {
  let cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}
class Course extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  };
  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLoyout);
  }
  adaptLoyout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    });
  };
  render() {
    return (
      <Container style={{ width: this.state.cardWidth }}>
        <Cover>
          <Image source={require(`../assets/background${14}.jpg`)} />
          <Title>{this.props.title}</Title>
        </Cover>
        <Content>
          <Avatar source={{ uri: this.props.avatar }} />
          <Name>{this.props.name}</Name>
          <Subtitle>{this.props.subtitle}</Subtitle>
        </Content>
      </Container>
    );
  }
}
export default Course;

const Container = styled.View`
  width: 315px;
  height: 335px;
  background: white;
  margin: 10px 20px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Cover = styled.View`
  height: 260px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 170px;
`;

const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;

const Name = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #3c4560;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #b8bece;
`;
