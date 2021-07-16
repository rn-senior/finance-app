import {
    Header,
    NewsWishlist,
    SafeAreaView,
    Text,
    ModalFilter,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { FavouriteData } from "@data";
import React, { Fragment, useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { FlatList, RefreshControl, View } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const sortOptionInit = [
    {
        value: "remove",
        icon: "sort-amount-up",
        text: "remove",
    },
    {
        value: "share_this_article",
        icon: "sort-amount-down",
        text: "share_this_article",
    },
    {
        value: "view_detail",
        icon: "sort-amount-up",
        text: "view_detail",
    },
    {
        value: "reset_all",
        icon: "sort-amount-up",
        text: "reset_all",
    },
];

const Favourite = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [favourite, setFavourite] = useState(FavouriteData);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [sortOption, setSortOption] = useState(sortOptionInit);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, Math.floor(Math.random() * 1000) + 1000);
    }, []);

    const onSelectFilter = (selected) => {
        setSortOption(
            sortOption.map((item) => {
                return {
                    ...item,
                    checked: item.value == selected.value,
                };
            })
        );
    };

    const onApply = () => {
        let itemSelected = null;
        for (const item of sortOption) {
            if (item.checked) {
                itemSelected = item;
            }
        }
        if (itemSelected) {
            setModalVisible(false);
            setSortOption(sortOptionInit);
        }
    };

    const renderPlaceholder = () => {
        let holders = Array.from(Array(10));
        let y = 0;
        let height = 60;

        return (
            <View style={BaseStyle.container}>
                <ContentLoader
                    speed={0.5}
                    width={"100%"}
                    height={"100%"}
                    backgroundColor="#f3f3f3"
                    foregroundColor={BaseColor.dividerColor}
                >
                    <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />

                    {holders.map((item, index) => {
                        y = index == 0 ? height : y + height + 20;
                        return (
                            <Fragment key={index}>
                                <Rect
                                    x="0"
                                    y={y}
                                    rx="8"
                                    ry="8"
                                    width="60"
                                    height={height}
                                />
                                <Rect
                                    x="70"
                                    y={y + 5}
                                    rx="8"
                                    ry="8"
                                    width="80%"
                                    height={10}
                                />
                                <Rect
                                    x="70"
                                    y={y + 25}
                                    rx="8"
                                    ry="8"
                                    width="40%"
                                    height={10}
                                />
                                <Rect
                                    x="70"
                                    y={y + 45}
                                    rx="8"
                                    ry="8"
                                    width="20%"
                                    height={10}
                                />
                            </Fragment>
                        );
                    })}
                </ContentLoader>
            </View>
        );
    };

    const renderContent = () => {
        return (
            <View style={[{ flex: 1, paddingTop: 20 }]}>
                <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
                    <Text header bold>
                        {t("favorites")}
                    </Text>
                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                            refreshing={refreshing}
                            onRefresh={() => {}}
                        />
                    }
                    data={favourite}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <NewsWishlist
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                            rate={item.rate}
                            onPress={() =>
                                navigation.navigate("PostDetail", {
                                    item: item,
                                })
                            }
                            onAction={() => setModalVisible(true)}
                        />
                    )}
                />
                <ModalFilter
                    options={sortOption}
                    isVisible={modalVisible}
                    onSwipeComplete={() => {
                        setModalVisible(false);
                        setSortOption(sortOptionInit);
                    }}
                    onApply={onApply}
                    onSelectFilter={onSelectFilter}
                />
            </View>
        );
    };

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        >
            {loading ? renderPlaceholder() : renderContent()}
        </SafeAreaView>
    );
};

export default Favourite;
