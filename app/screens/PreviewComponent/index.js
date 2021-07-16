import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor } from "@config";
import { BaseSetting } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  BookingTime,
  Button,
  Card,
  CardChannel,
  CardChannelGrid,
  CardList,
  CardList2,
  CardSlide,
  CategoryBlock,
  CategoryBoxColor,
  CategoryBoxColor2,
  CategoryFull,
  CategoryGrid,
  CategoryIcon,
  CategoryList,
  CommentItem,
  FilterSort,
  Image,
  ListThumbCircle,
  ListThumbSquare,
  News43,
  News169,
  NewsGrid,
  NewsList,
  NewsWishlist,
  PlaceItem,
  ProfileAuthor,
  ProfileDescription,
  ProfileDetail,
  ProfileGroup,
  ProfilePerformance,
  RateDetail,
  SearchBox,
  StarRating,
  Tag,
} from "@components";
import { useTheme } from "@config";
import { Images } from "@config";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const PreviewComponent = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("preview_component")}
        renderLeft={true}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1, padding: 16 }}>
            <Text body1 style={styles.title}>
              1. BookingTime
            </Text>
            <BookingTime
              checkInTime="09:00"
              checkOutTime="18:00"
              onCancel={() => {}}
              onChange={() => {}}
            />
            <Text body1 style={styles.title}>
              2. Button
            </Text>
            <Button style={{ marginVertical: 4 }}>Button Normal</Button>
            <Button loading style={{ marginVertical: 4 }}>
              Button Loading
            </Button>
            <Button style={{ marginVertical: 4 }} outline>
              Button Outline
            </Button>

            <Button
              style={{ marginVertical: 4 }}
              round
              icon={
                <Icon
                  style={{ marginHorizontal: 5 }}
                  name="plus"
                  color="white"
                  size={16}
                />
              }
            >
              Button Icon
            </Button>
            <Text body1 style={styles.title}>
              3. Card
            </Text>
            <Card
              style={{ width: "100%", height: 100 }}
              // image={Images.profile1}
              styleContent={{
                position: "absolute",
                bottom: 0,
                padding: 10,
              }}
              onPress={() => {}}
            >
              <Text footnote whiteColor>
                {"Mr.NavaTa"}
              </Text>
              <Text headline whiteColor semibold>
                {"Nguyen Van Thai"}
              </Text>
            </Card>
            <Text body1 style={styles.title}>
              4. Card Channel
            </Text>
            <CardChannel
              onPress={() => {}}
              onPressTag={() => {}}
              item={{
                image: Images.channel1,
                title: "CNN",
              }}
            />
            <Text body1 style={styles.title}>
              5. Card Channel Grid
            </Text>
            <CardChannelGrid
              onPress={() => {}}
              onPressTag={() => {}}
              item={{
                image: Images.channel1,
                title: "CNN",
              }}
            />
            <Text body1 style={styles.title}>
              6. Card List
            </Text>
            <CardList
              style={{}}
              image={Images.channel1}
              title="News"
              subtitle="Description news"
              rate={4.5}
              onPress={() => {}}
              onPressTag={() => {}}
            />
            <Text body1 style={styles.title}>
              7. Card Slide
            </Text>
            <CardSlide
              style={{}}
              image={Images.channel1}
              title="News"
              date="28-04-2020"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              8. Category Block
            </Text>
            <CategoryBlock
              style={{}}
              image={Images.location1}
              title="News"
              subtitle="Subtitle News"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              9. Category Box Color
            </Text>
            <CategoryBoxColor
              style={{}}
              title="News"
              icon="book"
              color="#FF8A65"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              10. CategoryBoxColor2
            </Text>
            <CategoryBoxColor2
              style={{}}
              title="News"
              subtitle="Subtitle News"
              icon="book"
              color="#FF8A65"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              11. Category Full
            </Text>
            <CategoryFull
              style={{}}
              image={Images.location1}
              title="News"
              subtitle="Subtitle News"
              icon="book"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              12. Category Grid
            </Text>
            <CategoryGrid
              style={{}}
              image={Images.location1}
              title="News"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              13. Category Icon
            </Text>
            <CategoryIcon
              style={{}}
              icon="book"
              title="News"
              subtitle="Subtitle News"
              color={colors.primary}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              14. Category List
            </Text>
            <CategoryList
              style={{}}
              title="News"
              subtitle="Subtitle News"
              image={Images.channel1}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              15. Comment Item
            </Text>
            <CommentItem
              style={{}}
              image={Images.channel1}
              name="Jony"
              rate={4}
              date={"27-04-2020"}
              title="News"
              comment={"Very helpful"}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              16. Filter Sort
            </Text>
            <FilterSort
              style={{ height: 50 }}
              modeView={"square"}
              labelCustom={""}
            />
            <Text body1 style={styles.title}>
              17. Header
            </Text>
            <Header
              title="Preview Component"
              renderLeft={() => {
                return (
                  <Icon
                    name="angle-left"
                    size={20}
                    color={colors.primary}
                    enableRTL={true}
                  />
                );
              }}
              renderRight={() => {
                return <Icon name="search" size={20} color={colors.primary} />;
              }}
            />
            <Text body1 style={styles.title}>
              18. Image
            </Text>
            <Image
              source={Images.channel1}
              resizeMode={"contain"}
              style={{ width: 100, height: 100 }}
            />
            <Text body1 style={styles.title}>
              19. List Thumb Circle
            </Text>
            <ListThumbCircle
              image={Images.channel1}
              txtLeftTitle="Corona"
              txtContent="Corona is virus ..."
              txtRight="27-04-2020"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              20. List Thumb Square
            </Text>
            <ListThumbSquare
              image={Images.channel1}
              txtLeftTitle="Corona"
              txtContent="Corona is virus ..."
              txtRight="27-04-2020"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              21. News43
            </Text>
            <News43
              style={{}}
              name={"Steve Garrett"}
              description={"5 hours ago | 100k views"}
              title={"What is coronavirus and how worried should we be?"}
              image={Images.newsMain}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              22. News169
            </Text>
            <News169
              style={{}}
              image={Images.news}
              avatar={Images.profile}
              name={"Steve Garrett"}
              description={"5 hours ago | 100k views"}
              title={"What is coronavirus and how worried should we be?"}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              23. NewsGrid
            </Text>
            <NewsGrid
              style={{}}
              image={Images.news}
              title={"What is coronavirus and how worried should we be?"}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              24. NewsList
            </Text>
            <NewsList
              style={{}}
              image={Images.news}
              title={"What is coronavirus and how worried should we be?"}
              subtitle={
                "New and troubling viruses usually originate in animal hosts."
              }
              onPress={() => {}}
              date={"07-05-2020"}
            />
            <Text body1 style={styles.title}>
              25. NewsWishlist
            </Text>
            <NewsWishlist
              style={{}}
              image={Images.news}
              title={"What is coronavirus and how worried should we be?"}
              subtitle={
                "New and troubling viruses usually originate in animal hosts."
              }
              onPress={() => {}}
              onPressTag={() => {}}
            />
            <Text body1 style={styles.title}>
              26. PlaceItem
            </Text>
            <PlaceItem
              style={{}}
              image={Images.channel1}
              list={false}
              block={false}
              grid={true}
              title={"What is coronavirus ?"}
              subtitle={"New and troubling viruses usually originate ..."}
              location={"Ho Chi Minh"}
              phone={"0912345678"}
              rate={4.5}
              status={"Active"}
              rateStatus={"Total rate"}
              numReviews={99}
              onPress={() => {}}
              onPressTag={() => {}}
            />
            <Text body1 style={styles.title}>
              27. ProfileAuthor
            </Text>
            <ProfileAuthor
              style={{}}
              image={Images.profile1}
              name="Mr.Jolly"
              description="jolly@gmail.com"
              textRight="22-02-1992"
              styleLeft={{}}
              styleThumb={{}}
              styleRight={{}}
              style={{}}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              28. ProfileDescription
            </Text>
            <ProfileDescription
              image={Images.profile1}
              name="Cristiano Ronaldo"
              subName="CR7"
              description="cr7@gmail.com"
              textRight="22-02-1992"
              styleThumb={{}}
              style={{}}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              29. ProfileDetail
            </Text>
            <ProfileDetail
              image={Images.profile1}
              textFirst="Cristiano Ronaldo"
              textSecond="CR7"
              icon={true}
              point="9.0"
              style={{}}
              styleLeft={{}}
              styleThumb={{}}
              styleRight={{}}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              30. ProfileGroup
            </Text>
            <ProfileGroup
              users={[
                {
                  image: Images.profile1,
                },
                {
                  image: Images.profile1,
                },
                {
                  image: Images.profile1,
                },
              ]}
              name="Members"
              detail="The first 20 members include ex-Guardian editor Alan "
              style={{}}
              styleLeft={{}}
              styleThumb={{}}
              styleRight={{}}
              onPress={() => {}}
              onPressLove={() => {}}
            />
            <Text body1 style={styles.title}>
              31. ProfilePerformance
            </Text>
            <ProfilePerformance
              flexDirection="row"
              type="medium"
              data={[
                {
                  title: "Normal",
                  value: 1,
                },
                {
                  title: "Good",
                  value: 8,
                },
                {
                  title: "Very good",
                  value: 10,
                },
              ]}
              style={{}}
              contentLeft={{}}
              contentCenter={{}}
              contentRight={{}}
            />
            <Text body1 style={styles.title}>
              32. RateDetail
            </Text>
            <RateDetail
              style={{}}
              point={4.5}
              maxPoint={5}
              totalRating={4.5}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              33. SearchBox
            </Text>
            <SearchBox onSubmitEditing={() => {}} loading={false} />
            <Text body1 style={styles.title}>
              34. StarRating
            </Text>
            <StarRating
              containerStyle={{ width: "50%" }}
              disabled={true}
              starSize={26}
              maxStars={5}
              rating={4.5}
              selectedStar={(rating) => {}}
              fullStarColor={BaseColor.yellowColor}
            />
            <Text body1 style={styles.title}>
              34. Tag
            </Text>
            <Tag onPress={() => {}} rateSmall style={{ marginVertical: 4 }}>
              4.5
            </Tag>
            <Tag chip style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>

            <Tag primary style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Tag outline style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Tag
              outlineSecondary
              style={{ marginVertical: 4 }}
              onPress={() => {}}
            >
              4.5
            </Tag>
            <Tag small style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Tag sale style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Text body1 style={styles.title}>
              35. Text
            </Text>
            <Text header>Header</Text>
            <Text title1>Title1</Text>
            <Text title2>Title2</Text>
            <Text title3>Title3</Text>
            <Text headline>Headline</Text>
            <Text body1>Body1</Text>
            <Text body2>Body2</Text>
            <Text callout>Callout</Text>
            <Text subhead>Subhead</Text>
            <Text footnote>footnote</Text>
            <Text caption1>caption1</Text>
            <Text caption2>caption2</Text>
            <Text overline>overline</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PreviewComponent;
