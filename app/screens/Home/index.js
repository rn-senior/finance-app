import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  NewsList,
  SafeAreaView,
  Text,
  ActionButton,
} from "@components";
import { BaseColor, BaseStyle } from "@config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@data";
import React, { useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

const locationInit = [
  { id: "1", name: "Delux Room" },
  { id: "2", name: "Tripple Room" },
  { id: "3", name: "Single Room" },
  { id: "4", name: "King Room" },
  { id: "5", name: "King Room" },
];

const Home = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [topics, setTopics] = useState(HomeTopicData);
  const [location, setLocation] = useState(locationInit);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const goPostDetail = (item) => () => {
    navigation.navigate("PostDetail", { item: item });
  };

  const goToCategory = () => {
    navigation.navigate("Category");
  };

  const renderPlaceholder = () => {
    return (
      <View style={styles.paddingSrollView}>
        <ContentLoader
          speed={0.5}
          width={"100%"}
          height={"100%"}
          backgroundColor="#f3f3f3"
          foregroundColor={BaseColor.dividerColor}
        >
          <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />
          <Rect x="0" y="40" rx="8" ry="8" width="80%" height="20" />
          <Rect x="0" y="80" rx="8" ry="8" width="100%" height={250} />

          <Rect x="0" y={350} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={360} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={380} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={410} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={440} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={450} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={470} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={495} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={530} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={540} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={560} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={585} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={630} rx="8" ry="8" width="50%" height={160} />
          <Rect x="53%" y={630} rx="8" ry="8" width="50%" height={160} />
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <ScrollView contentContainerStyle={styles.paddingSrollView}>
        <Text header bold>
          {t("today")}
        </Text>
        <Text subhead grayColor style={{ marginTop: 5 }}>
          {t("discover_last_news_today")}
        </Text>
        <News43
          onPress={goPostDetail(mainNews)}
          style={{ marginTop: 15 }}
          image={mainNews.image}
          name={mainNews.name}
          description={mainNews.description}
          title={mainNews.title}
        />
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={styles.paddingFlatList}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <NewsList
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              style={{
                marginBottom: index == list.length - 1 ? 0 : 15,
              }}
              onPress={goPostDetail(item)}
            />
          )}
        />
        <FlatList
          contentContainerStyle={styles.paddingFlatList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popular}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <CardSlide
              onPress={goPostDetail(item)}
              style={{
                marginRight: index == popular.length - 1 ? 0 : 15,
              }}
              image={item.image}
              date={item.date}
              title={item.title}
            />
          )}
        />
        <View style={styles.topicsView}>
          <Text title3 semibold style={styles.title}>
            {t("browse_topics")}
          </Text>
          <Text light footnote regular grayColor>
            {t("select_your_most_interesting_category")}
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: 10 }}
            data={topics}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <CategoryList
                // onPress={goPost(item)}
                style={{
                  marginBottom: index == topics.length - 1 ? 0 : 15,
                }}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
              />
            )}
            ListFooterComponent={
              <TouchableOpacity onPress={goToCategory}>
                <Text body2 semibold accentColor>
                  {t("see_more")}
                </Text>
              </TouchableOpacity>
            }
            ListFooterComponentStyle={{
              width: "100%",
              alignItems: "center",
              paddingTop: 15,
            }}
          />
        </View>
        <View>
          <Text title3 semibold style={styles.title}>
            {t("discover_channels")}
          </Text>
          <Text light footnote regular grayColor>
            {t("description_discover_channels")}
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: 15 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={channels}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <CardChannelGrid
                onPress={goPostDetail}
                style={{
                  marginRight: index == channels.length - 1 ? 0 : 15,
                }}
                image={item.image}
                title={item.title}
              />
            )}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        {loading ? renderPlaceholder() : renderContent()}
        <ActionButton />
      </SafeAreaView>
    </View>
  );
};

export default Home;
