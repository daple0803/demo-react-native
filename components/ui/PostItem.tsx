import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";

interface Props {
    post: any;
    notShowHeader?: boolean;
}

const { width } = Dimensions.get("window");

const PostComponent = ({ post, notShowHeader }: Props) => {
    const router = useRouter();
    const handlePressPost = () => {
        router.navigate("/(tabs)/postDetails");
    };

    const images = [
        {
            id: "1",
            imageUrl:
                "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        },
        {
            id: "2",
            imageUrl:
                "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        },
        {
            id: "3",
            imageUrl:
                "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        },
        {
            id: "4",
            imageUrl:
                "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        },
    ];

    return (
        <View style={styles.postContainer}>
            {/* Header */}
            {!notShowHeader && (
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: post.avatar }}
                            style={styles.avatar}
                        />
                        <View style={styles.headerText}>
                            <Text style={styles.username}>{post.username}</Text>
                            <Text style={styles.postTime}>{post.time}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Entypo
                            name="dots-three-horizontal"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            )}

            <View
                style={{
                    height: width * (398 / 418),
                    borderRadius: 20,
                }}>
                <Swiper
                    autoplay={false}
                    paginationStyle={{ bottom: 16 }}
                    horizontal={true}
                    loop={false}
                    activeDotStyle={{ width: 20, backgroundColor: "#FDD3D0" }}
                    dotStyle={{ backgroundColor: "#B3B3B3" }}>
                    {images.map((image, index) => {
                        return (
                            <TouchableOpacity
                                onPress={handlePressPost}
                                key={index}>
                                <Image
                                    style={{
                                        width: width - 16 * 2,
                                        height: width * 0.85,
                                        borderRadius: 12,
                                    }}
                                    source={{
                                        uri: image.imageUrl,
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </Swiper>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={20} color="black" />
                    <Text style={styles.actionText}>11K</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbox-outline" size={20} color="black" />
                    <Text style={styles.actionText}>55K</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                        name="share-social-outline"
                        size={20}
                        color="#4B4F54"
                    />
                    <Text style={styles.actionText}>55k</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                        name="stats-chart-outline"
                        size={20}
                        color="black"
                    />
                    <Text style={styles.actionText}>55k</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.postContent}>
                {post?.content ? post.content : "Testing again 123 seconds ago"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerText: {
        marginLeft: 10,
    },
    username: {
        fontWeight: "bold",
        fontSize: 16,
    },
    postTime: {
        color: "gray",
        fontSize: 12,
    },
    sliderContainer: {
        width: "100%",
        height: 250,
        alignItems: "center",
        marginBottom: 10,
    },
    postImage: {
        width: width,
        height: 250,
        resizeMode: "cover",
    },
    pageIndicator: {
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D3D3D3",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#FF5A5F",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#4B4F54",
    },
    postContent: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default PostComponent;
