import { Icon, Text } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import ECart from "@screens/ECart";
import EShipping from "@screens/EShipping";
import Shipping from "@screens/Shipping";
import ShippingPick from "@screens/ShippingPick";
import EPayment from "@screens/EPayment";
import Payment from "@screens/Payment";
import Charge from "@screens/Charge";
import ECharge from "@screens/ECharge";
import EConfirmed from "@screens/EConfirmed";
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
import SignIn from "@screens/SignIn";
import SplashScreen from "@screens/SplashScreen";
import Summary from "@screens/Summary";

/* Bottom Screen */
import EHome from "@screens/EHome";
import EProduct from "@screens/EProduct";
import Profile from "@screens/Profile";
import Setting from "@screens/Setting";
import EProductDetail from "@screens/EProductDetail";
import News from "@screens/News";
import QProduct from "@screens/QProduct";
import QProductSeller from "@screens/QProductSeller";

/* Setting */
import ProfileEdit from "@screens/ProfileEdit";
import ChangeLanguage from "@screens/ChangeLanguage";
import ContactUs from "@screens/ContactUs";
import AboutUs from "@screens/AboutUs";
import TermsAndConditions from "@screens/TermsAndConditions";
import ThemeSetting from "@screens/ThemeSetting";
import ChangePassword from "@screens/ChangePassword";
import Politics from "@screens/Politics";

/** Preview Component */
import PreviewComponent from "@screens/PreviewComponent";
import EProductStoreProfile from "@screens/EProductStoreProfile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

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
        activeTintColor: colors.primaryColor,
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
          tabBarIcon: ({ color }) => {
            return <Icon name="inbox" size={20} solid color={color} />;
          },
        }}
      />

      <BottomTab.Screen
        name="QProduct"
        component={QProduct}
        options={{
          title: "Catálago", //t("products"),
          tabBarIcon: ({ color }) => {
            return <Icon name="th-large" size={20} solid color={color} />;
          },
        }}
      />

      <BottomTab.Screen
        name="News"
        component={EBank}
        options={{
          title: t("news"),
          tabBarIcon: ({ color }) => {
            return <Icon name="book" size={20} solid color={color} />;
          },
        }}
      />

      <BottomTab.Screen
        name="ECart"
        component={ECart}
        options={{
          title: t("cart"),
          tabBarIcon: ({ color }) => {
            return (
              <View>
                <Icon
                  solid
                  name="shopping-cart"
                  size={20}
                  solid
                  color={color}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: BaseColor.whiteColor,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    width: 20,
                    height: 20,
                    backgroundColor: "red",
                    top: -5,
                    right: -12,
                    borderRadius: 10,
                  }}
                >
                  <Text whiteColor caption2>
                    5
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Cuenta", //t("account"),
          tabBarIcon: ({ color }) => {
            return <Icon solid name="user-circle" size={20} color={color} />;
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
      initialRouteName="EBottomTabNavigator"
    >
      <MainStack.Screen
        name="EBottomTabNavigator"
        component={EBottomTabNavigator}
      />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="EProductDetail" component={EProductDetail} />
      <MainStack.Screen name="News" component={News} />
      <MainStack.Screen name="EShipping" component={EShipping} />
      <MainStack.Screen name="Shipping" component={Shipping} />
      <MainStack.Screen name="ShippingPick" component={ShippingPick} />
      <MainStack.Screen name="EPayment" component={EPayment} />
      <MainStack.Screen name="Payment" component={Payment} />
      <MainStack.Screen name="ECharge" component={ECharge} />
      <MainStack.Screen name="Charge" component={Charge} />
      <MainStack.Screen name="EConfirmed" component={EConfirmed} />
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
      <MainStack.Screen name="EWishlist" component={EWishlist} />
      <MainStack.Screen name="ENotification" component={ENotification} />
      <MainStack.Screen name="EUserProfile" component={EUserProfile} />
      <MainStack.Screen name="EBank" component={EBank} />
      <MainStack.Screen name="EBankDetail" component={EBankDetail} />
      <MainStack.Screen name="QProductSeller" component={QProductSeller} />
      <MainStack.Screen name="Summary" component={Summary} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="AboutUs" component={AboutUs} />
      <MainStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <MainStack.Screen name="PreviewComponent" component={PreviewComponent} />
      <MainStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="Politics" component={Politics} />
      <MainStack.Screen name="SplashScreen" component={SplashScreen} />
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
