import React from "react";
import styled from "styled-components";
class Card extends React.Component {
  render() {
    return (
      <Container>
        <Cover>
          <Image source={require(`../assets/background${12 / 2}.jpg`)} />
          <Title>{this.props.title}</Title>
          <Content>
            <Avatar source={{ uri: this.props.avatar }} />
            <Wrapper>
              <Name>{this.props.name}</Name>
              <Subtitle>{this.props.subtitle}</Subtitle>
            </Wrapper>
          </Content>
        </Cover>
      </Container>
    );
  }
}

export default Card;

const Container = styled.View`
  background: white;
  width: 315px;
  height: 280px;
  border-radius: 14px;
  margin-top: 20px;
  margin-left: 20px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`;
const Cover = styled.View`
  width: 100%;
  height: 200px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  margin-top: 20px;
  margin-left: 20px;
  font-weight: bold;
  width: 180px;
  height: 200px;
  overflow: hidden;
`;
const Content = styled.View`
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
  bottom: 20px;
`;
const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;
const Name = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-size: 18px;
  font-weight: 600;
`;
