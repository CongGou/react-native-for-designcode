import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectScreen from "../screens/ProjectScreen";
import NoticeScreen from "../screens/NoticeScreen";
const activeColor = "#4775f2";
const inactiveColor = "#b8bece";
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
    Notice: NoticeScreen
  },
  {
    mode: "modal"
  }
);
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routeName == "Section") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: "首页",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};
const CoursesStack = createStackNavigator({
  Courses: CoursesScreen
});
CoursesStack.navigationOptions = {
  tabBarLabel: "消息",

  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const ProjectsStack = createStackNavigator({
  Projects: ProjectScreen
});
ProjectsStack.navigationOptions = {
  tabBarLabel: "动画",

  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};
const TabNavigator = createBottomTabNavigator({
  HomeStack,
  ProjectsStack,
  CoursesStack
});
export default createAppContainer(TabNavigator);
