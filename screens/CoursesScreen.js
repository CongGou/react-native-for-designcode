import React from "react";
import styled from "styled-components";
class CoursesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Text>CoursesScreen</Text>
      </Container>
    );
  }
}
export default CoursesScreen;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;
