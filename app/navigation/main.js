import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, Text, Image } from "@components";
import * as Utils from "@utils";
import { store } from "app/store";
import { Animated } from "react-native";

/* Bottom Screen */
import Home from "@screens/Home";
import Profile from "@screens/Profile";
import ProfileSeller from "@screens/ProfileSeller";
import DataShippingPick from "@screens/DataShippingPick";
import Favourite from "@screens/Favourite";

/* Modal Screen only affect iOS */
import SignUp from "@screens/SignUp";
import SignUp2 from "@screens/SignUp2";
import SignIn from "@screens/SignIn";
/* Stack Screen */
import Messages from "@screens/Messages";
import ResetPassword from "@screens/ResetPassword";
import PhoneNumber from "@screens/PhoneNumber";
import ConfirmOTP from "@screens/ConfirmOTP";
import ChangePassword from "@screens/ChangePassword";
import Politics from "@screens/Politics";
import ProfileEdit from "@screens/ProfileEdit";
import ChangeLanguage from "@screens/ChangeLanguage";
import ContactUs from "@screens/ContactUs";
import AboutUs from "@screens/AboutUs";
import TermsAndConditions from "@screens/TermsAndConditions";
import PostDetail from "@screens/PostDetail";
import Setting from "@screens/Setting";
import ThemeSetting from "@screens/ThemeSetting";

/** Preview Component */
import PreviewComponent from "@screens/PreviewComponent";
import { useSelector } from "react-redux";
import { BaseColor, useTheme, BaseStyle, Images } from "@config";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

/** ECommerce */
import ECart from "@screens/ECart";
import EShipping from "@screens/EShipping";
import Shipping from "@screens/Shipping";
import ShippingPick from "@screens/ShippingPick";
import EPayment from "@screens/EPayment";
import Payment from "@screens/Payment";
import ECharge from "@screens/ECharge";
import Charge from "@screens/Charge";
import EConfirmed from "@screens/EConfirmed";
import EShared from "@screens/EShared";
import QLink from "@screens/QLink";
import QRShare from "@screens/QRShare";
import EProductShared from "@screens/EProductShared";
import EProductSharedWsp from "@screens/EProductSharedWsp";
import EProductSharedInstagramPost from "@screens/EProductSharedInstagramPost";
import Confirmed from "@screens/Confirmed";
import EMyOrder from "@screens/EMyOrder";
import ETrackOrder from "@screens/ETrackOrder";
import ETConfirmed from "@screens/ETConfirmed";
import ETAccepted from "@screens/ETAccepted";
import ETReceived from "@screens/ETReceived";
import ETFinished from "@screens/ETFinished";
import ETCancelled from "@screens/ETCancelled";
import ETDelivered from "@screens/ETDelivered";
import ETClaim from "@screens/ETClaim";
import ETRejected from "@screens/ETRejected";
import ETAnnulled from "@screens/ETAnnulled";
import EWishlist from "@screens/EWishlist";
import ENotification from "@screens/ENotification";
import EUserProfile from "@screens/EUserProfile";
import EBank from "@screens/EBank";
import EBankDetail from "@screens/EBankDetail";
import EMessages from "@screens/EMessages";
import EProductPageNotFound from "@screens/EProductPageNotFound";
// import EFeedback from "@screens/EFeedback";
import EHome from "@screens/EHome";
import EProduct from "@screens/EProduct";
import QProduct from "@screens/QProduct";
import EProductDetail from "@screens/EProductDetail";
import News from "@screens/News";
import EProductStoreProfile from "@screens/EProductStoreProfile";
import QProductSeller from "@screens/QProductSeller";
import QProductCreateEdit from "@screens/QProductCreateEdit";
import SplashScreen from "@screens/SplashScreen";
import Summary from "@screens/Summary";

import Search from "@screens/Search/";
const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const EBottomTabNavigator = (props) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="EHome"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: colors.orangeColor,
        inactiveTintColor: BaseColor.grayColor,
        style: BaseStyle.tabBar,
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <BottomTab.Screen
        name="EHome"
        component={EHome}
        options={{
          title: t("home"),
          fontSize: 4,
          tabBarIcon: ({ color }) => {
            //return <Icon name="inbox" size={20} solid color={color} />;
            return (
              <Animated.Image
                style={{
                  width: 24,
                  height: 22,
                  tintColor: color,
                }}
                source={Images.inicio}
              />
            );
          },
        }}
      />

      <BottomTab.Screen
        name="QProductSeller"
        component={QProductSeller}
        options={{
          title: t("products"),
          tabBarIcon: ({ color }) => {
            // return <Icon name="th-large" size={20} solid color={color} />;
            return (
              <Animated.Image
                style={{ width: 24, height: 22, tintColor: color }}
                source={Images.catalogo}
              />
            );
          },
        }}
      />

      <BottomTab.Screen
        name="EMyOrder"
        component={EMyOrder}
        options={{
          title: t("Pedidos"),
          tabBarIcon: ({ color }) => {
            // return <Icon name="book" size={20} solid color={color} />;
            return (
              // <View>
              //   <Image
              //     style={{ width: 18.32, height: 19.27 }}
              //     source={Images.notification}
              //   />
              //   <View
              //     style={{
              //       borderWidth: 1,
              //       borderColor: BaseColor.whiteColor,
              //       justifyContent: "center",
              //       alignItems: "center",
              //       position: "absolute",
              //       width: 20,
              //       height: 20,
              //       backgroundColor: "red",
              //       top: -5,
              //       right: -12,
              //       borderRadius: 10,
              //     }}
              //   >
              //     <Text whiteColor caption2>
              //       3
              //     </Text>
              //   </View>
              // </View>
              <Animated.Image
                style={{ width: 24, height: 22, tintColor: color }}
                source={Images.pedidos}
              />
            );
          },
          // tabBarBadge: 2,
          // tabBarBadgeStyle: {
          //   borderWidth: 1,
          //   borderColor: BaseColor.whiteColor,
          //   justifyContent: "center",
          //   alignItems: "center",
          //   position: "absolute",
          //   width: 20,
          //   height: 20,
          //   backgroundColor: "red",
          //   top: -5,
          //   right: -12,
          //   borderRadius: 10,
          // },
        }}
      />

      <BottomTab.Screen
        name="EWishlist"
        component={EWishlist}
        options={{
          title: t("favorites"),
          tabBarIcon: ({ color }) => {
            return (
              <Animated.Image
                style={{ width: 24, height: 22, tintColor: color }}
                source={Images.favoritos}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: t("Mi qury"),
          tabBarIcon: ({ color }) => {
            // return <Icon solid name="user-circle" size={20} color={color} />;
            return (
              <Animated.Image
                style={{ width: 24, height: 22, tintColor: color }}
                source={Images.perfil}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const Main = (props) => {
  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="ECommerceMenu"
      screenOptions={{ gestureEnabled: false }}
    >
      <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      <MainStack.Screen name="SignIn" component={SignIn} />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="SignUp2" component={SignUp2} />
      <MainStack.Screen name="Messages" component={Messages} />
      <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      <MainStack.Screen name="PhoneNumber" component={PhoneNumber} />
      <MainStack.Screen name="ConfirmOTP" component={ConfirmOTP} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="Politics" component={Politics} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="AboutUs" component={AboutUs} />
      <MainStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <MainStack.Screen name="PostDetail" component={PostDetail} />
      <MainStack.Screen name="PreviewComponent" component={PreviewComponent} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="ProfileSeller" component={ProfileSeller} />
      <MainStack.Screen name="DataShippingPick" component={DataShippingPick} />
      <MainStack.Screen name="EHomeQury" component={EBottomTabNavigator} />
      <MainStack.Screen name="ECart" component={ECart} />
      <MainStack.Screen name="QProductSeller" component={QProductSeller} />

      <MainStack.Screen
        name="QProductCreateEdit"
        component={QProductCreateEdit}
      />
      <MainStack.Screen name="EProductDetail" component={EProductDetail} />
      <MainStack.Screen name="News" component={News} />
      <MainStack.Screen name="EShipping" component={EShipping} />
      <MainStack.Screen name="Shipping" component={Shipping} />
      <MainStack.Screen name="ShippingPick" component={ShippingPick} />
      <MainStack.Screen name="EPayment" component={EPayment} />
      <MainStack.Screen name="Payment" component={Payment} />
      <MainStack.Screen name="Charge" component={Charge} />
      <MainStack.Screen name="ECharge" component={ECharge} />
      <MainStack.Screen name="EConfirmed" component={EConfirmed} />
      <MainStack.Screen name="EShared" component={EShared} />
      <MainStack.Screen name="QLink" component={QLink} />
      <MainStack.Screen name="QRShare" component={QRShare} />
      <MainStack.Screen name="EProductShared" component={EProductShared} />
      <MainStack.Screen
        name="EProductSharedWsp"
        component={EProductSharedWsp}
      />
      <MainStack.Screen
        name="EProductSharedInstagramPost"
        component={EProductSharedInstagramPost}
      />
      <MainStack.Screen name="Confirmed" component={Confirmed} />
      <MainStack.Screen name="EMyOrder" component={EMyOrder} />
      <MainStack.Screen name="ETrackOrder" component={ETrackOrder} />
      <MainStack.Screen name="ETConfirmed" component={ETConfirmed} />
      <MainStack.Screen name="ETAccepted" component={ETAccepted} />
      <MainStack.Screen name="ETReceived" component={ETReceived} />
      <MainStack.Screen name="ETFinished" component={ETFinished} />
      <MainStack.Screen name="ETCancelled" component={ETCancelled} />
      <MainStack.Screen name="ETDelivered" component={ETDelivered} />
      <MainStack.Screen name="ETClaim" component={ETClaim} />
      <MainStack.Screen name="ETRejected" component={ETRejected} />
      <MainStack.Screen name="ETAnnulled" component={ETAnnulled} />
      <MainStack.Screen name="Summary" component={Summary} />
      <MainStack.Screen name="EWishlist" component={EWishlist} />
      <MainStack.Screen name="ENotification" component={ENotification} />
      <MainStack.Screen name="EUserProfile" component={EUserProfile} />
      <MainStack.Screen name="EBank" component={EBank} />
      <MainStack.Screen name="EBankDetail" component={EBankDetail} />
      <MainStack.Screen
        name="EProductStoreProfile"
        component={EProductStoreProfile}
      />
      <MainStack.Screen name="EMessages" component={EMessages} />
      <MainStack.Screen
        name="EProductPageNotFound"
        component={EProductPageNotFound}
      />
    </MainStack.Navigator>
  );
};

export default Main;
