import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import PostComponent from "@/components/ui/PostItem";
import useBasicStore from "@/store/zustand";
import axios from "axios";

const UserProfile = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("posts");
    const [page, setPage] = useState(1);
    const [photosData, setPhotosData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { postData } = useBasicStore();

    const handleGoBack = () => {
        router.back();
    };

    const mockUserData = {
        name: "Duy Anh",
        avatar: "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
        coverImage:
            "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA0L2Z0LTIxMDMyNC1mcmVlc3R5bGUxLXBsb3ktMDEwYS1ibG9nYmFubmVyLmpwZw.jpg",
        email: "daple0803@gmail.com",
        friendsCount: 320,
        followersCount: 560,
    };

    const listOptions = ["Phát trực tiếp", "Vị trí", "Thêm bạn bè", "Cảm xúc"];

    const handleNavigateCreatePost = () => {
        router.navigate("/(tabs)/createPost");
    };

    const fetchDataFromAPI = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://api-blue-archive.vercel.app/api/characters?page=${page}`
            );
            const data = response.data.data;
            if (selectedTab === "photos") {
                setPhotosData((prevData) => [...prevData, ...data]); // Append data
            }
        } catch (err) {
            setError("Error fetching data");
            Alert.alert("Error fetching data", error);
        } finally {
            setIsLoading(false);
        }
    }, [page, selectedTab]);

    useEffect(() => {
        fetchDataFromAPI();
    }, [fetchDataFromAPI]);

    const handleFetchMoreData = () => {
        if (!isLoading) {
            setPage((prev) => prev + 1);
        }
    };

    const ImageItem = ({ item }) => {
        return (
            <View style={styles.characterContainer}>
                <Image
                    source={{ uri: item.photoUrl }}
                    style={styles.characterImage}
                />

                <View style={styles.characterInfo}>
                    <Text style={styles.characterName}>{item.name}</Text>
                    <Text style={styles.characterSchool}>{item.school}</Text>
                    <Text style={styles.characterBirthday}>
                        {item.birthday}
                    </Text>
                    <Text style={styles.characterDamageType}>
                        {item.damageType}
                    </Text>
                </View>

                <Image
                    source={{ uri: item.imageSchool }}
                    style={styles.schoolImage}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={selectedTab === "photos" ? photosData : postData}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={handleGoBack}>
                                <Ionicons
                                    name="chevron-back"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>
                                {mockUserData.name}
                            </Text>
                            <View style={{ width: 30 }} />
                        </View>

                        {/* Cover Photo */}
                        <View style={styles.coverPhotoContainer}>
                            <Image
                                source={{
                                    uri: mockUserData.coverImage,
                                }}
                                style={styles.coverPhoto}
                            />
                        </View>

                        {/* Avatar and User Info */}
                        <View style={styles.userInfoBox}>
                            <Image
                                source={{
                                    uri: mockUserData.avatar,
                                }}
                                style={styles.avatar}
                            />
                            <View style={styles.userInfoText}>
                                <Text style={styles.userName}>
                                    {mockUserData.name}
                                </Text>
                                <Text style={styles.userEmail}>
                                    {mockUserData.email}
                                </Text>
                            </View>
                        </View>

                        {/* User Actions */}
                        <View
                            style={{
                                backgroundColor: "#fff",
                                paddingBottom: 10,
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    gap: 16,
                                    marginVertical: 12,
                                }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 4,
                                    }}>
                                    <Text style={styles.countNumber}>
                                        {mockUserData.friendsCount}
                                    </Text>
                                    <Text>Bạn bè</Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 4,
                                    }}>
                                    <Text style={styles.countNumber}>
                                        {mockUserData.followersCount}
                                    </Text>
                                    <Text>Người theo dõi</Text>
                                </View>
                            </View>
                            <View style={styles.actionsContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.primaryButton,
                                    ]}>
                                    <Entypo
                                        name="plus"
                                        size={24}
                                        color="white"
                                    />
                                    <Text style={styles.primaryButtonText}>
                                        Thêm tin
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.secondaryButton,
                                    ]}>
                                    <Text style={styles.secondaryButtonText}>
                                        Chỉnh sửa trang cá nhân
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Tabs: Posts, Photos, Videos */}
                        <View style={styles.tabsContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    selectedTab === "posts" &&
                                        styles.selectedTabButton,
                                ]}
                                onPress={() => setSelectedTab("posts")}>
                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedTab === "posts" &&
                                            styles.selectedTabText,
                                    ]}>
                                    Bài viết
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    selectedTab === "photos" &&
                                        styles.selectedTabButton,
                                ]}
                                onPress={() => setSelectedTab("photos")}>
                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedTab === "photos" &&
                                            styles.selectedTabText,
                                    ]}>
                                    Ảnh
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    selectedTab === "videos" &&
                                        styles.selectedTabButton,
                                ]}
                                onPress={() => setSelectedTab("videos")}>
                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedTab === "videos" &&
                                            styles.selectedTabText,
                                    ]}>
                                    Video
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={handleNavigateCreatePost}
                            style={{
                                paddingBottom: 14,
                                paddingTop: 8,
                                backgroundColor: "#fff",
                                paddingHorizontal: 16,
                                marginBottom: 8,
                            }}>
                            <Text
                                style={{
                                    fontWeight: "700",
                                    fontSize: 18,
                                }}>
                                Bài viết của bạn
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 16,
                                }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 12,
                                        flex: 1,
                                        alignItems: "center",
                                    }}>
                                    <Image
                                        source={{
                                            uri: "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
                                        }}
                                        style={styles.avatarMini}
                                    />
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            color: "#4D5761",
                                        }}>
                                        Bạn đang nghĩ gì
                                    </Text>
                                </View>

                                <TouchableOpacity>
                                    <Ionicons
                                        name="images-outline"
                                        size={24}
                                        color="#4D5761"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.listOptionsContainer}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={
                                        styles.listOptionsScroll
                                    }>
                                    {listOptions.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.listOptionButton}>
                                            <Ionicons
                                                name="location-outline"
                                                size={24}
                                                color="black"
                                            />
                                            <Text style={styles.listOptionText}>
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
                onEndReached={() => {
                    if (selectedTab === "photos") {
                        handleFetchMoreData();
                    }
                }}
                onEndReachedThreshold={0.3}
                renderItem={({ item }) =>
                    selectedTab === "photos" ? (
                        <ImageItem item={item} />
                    ) : (
                        <PostComponent post={item} />
                    )
                }
                ListFooterComponent={
                    isLoading ? (
                        <ActivityIndicator size="large" color="#3864FF" />
                    ) : null
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    characterContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 16,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    characterImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    characterInfo: {
        marginBottom: 10,
    },
    characterName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    characterSchool: {
        fontSize: 14,
        color: "gray",
    },
    characterBirthday: {
        fontSize: 14,
        color: "gray",
    },
    characterDamageType: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#3864FF",
    },
    schoolImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    characterFullImage: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginTop: 10,
    },
    noImageText: {
        color: "gray",
        fontStyle: "italic",
    },
    scrollView: {
        flex: 1,
        paddingBottom: 80,
        backgroundColor: "#F9FAFB",
    },
    photoItem: {
        height: 100,
        width: 100,
    },
    tabsContainer: {
        flexDirection: "row",
        marginTop: 16,
        marginBottom: 8,
        backgroundColor: "#fff",
        gap: 24,
        paddingHorizontal: 16,
    },
    tabButton: {
        paddingVertical: 10,
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "transparent",
    },
    listOptionsContainer: {
        backgroundColor: "#fff",
    },
    listOptionsScroll: {
        paddingRight: 16,
    },
    listOptionButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
        backgroundColor: "#F9FAFB",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 100,
    },
    listOptionText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "700",
    },
    selectedTabButton: {
        borderBottomColor: "#3864FF",
    },
    tabText: {
        fontSize: 16,
        color: "#333",
    },
    selectedTabText: {
        color: "#3864FF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
    },
    userInfoBox: {
        gap: 12,
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginTop: -50,
        marginHorizontal: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
    },
    backButton: {
        padding: 10,
    },
    userInfoText: {
        flex: 1,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    coverPhotoContainer: {
        width: "100%",
        height: 173,
        backgroundColor: "#e0e0e0",
    },
    coverPhoto: {
        width: "100%",
        height: "100%",
    },

    userInfoContainer: {
        alignItems: "center",
        marginTop: -50,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#fff",
        marginBottom: 10,
    },
    avatarMini: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#fff",
        marginBottom: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: "700",
    },
    userEmail: {
        fontSize: 16,
        color: "gray",
    },
    friendsCount: {
        fontSize: 16,
        color: "gray",
    },
    actionsContainer: {
        gap: 10,
        flexDirection: "row",
        paddingHorizontal: 30,
        justifyContent: "space-between",
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    primaryButton: {
        backgroundColor: "#3864FF",
        flexDirection: "row",
        gap: 4,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    secondaryButton: {
        backgroundColor: "#f0f0f0",
        flexGrow: 1,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    postsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    postContainer: {
        marginBottom: 15,
    },
    postText: {
        fontSize: 16,
        color: "#333",
    },
    countNumber: {
        fontWeight: "700",
    },
});

export default UserProfile;
