import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
function mapStateToProps(state) {
  return { name: state.name, photo: state.photo };
}
function mapDispatchToProps(dispatch) {
  return {
    updateAvatar: photo =>
      dispatch({
        type: "UPDATE_AVATAR",
        photo
      })
  };
}
class Avatar extends React.Component {
  componentDidMount() {
    if (this.props.name !== "未登录") {
      AsyncStorage.getItem("nickData").then(res => {
        const state = JSON.parse(res);
        this.props.updateAvatar(state.photo);
      });
    }
  }
  render() {
    // console.log(this.props, 1);
    return <Image source={{ uri: this.props.photo }}></Image>;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #ccc;
`;
