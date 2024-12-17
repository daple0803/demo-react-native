import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import PostComponent from "@/components/ui/PostItem";
import { useRoute } from "@react-navigation/native";

const PostDetail = () => {
    const router = useRouter();
    const route = useRoute();
    const { post } = route.params;
    const mockData = {
        isVerify: true,
    };

    const [comment, setComment] = useState("");

    const handleCommentChange = (text: string) => {
        setComment(text);
    };

    const handlePostComment = () => {
        console.log("User commented:", comment);
        setComment("");
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                            }}>
                            <TouchableOpacity onPress={handleGoBack}>
                                <Ionicons
                                    name="chevron-back"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                <Image
                                    source={{
                                        uri: "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
                                    }}
                                    style={styles.avatar}
                                />
                                <View style={styles.headerText}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 8,
                                        }}>
                                        <Text style={styles.userName}>
                                            John Doe
                                        </Text>
                                        {mockData.isVerify && (
                                            <Ionicons
                                                name="checkmark-circle"
                                                size={20}
                                                color="#3864FF"
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.postTime}>
                                        2 hours ago
                                    </Text>
                                </View>
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

                    {/* Post Content */}
                    <PostComponent post={post} notShowHeader />
                </ScrollView>

                <View style={styles.commentInputContainer}>
                    <Image
                        source={{
                            uri: "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
                        }}
                        style={styles.commentAvatar}
                    />
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Nhập bình luận"
                        value={comment}
                        onChangeText={handleCommentChange}
                        onSubmitEditing={handlePostComment}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 4,
                            marginLeft: 8,
                        }}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Entypo
                                name="emoji-happy"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Entypo name="image" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    header: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
        justifyContent: "space-between",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerText: {
        marginLeft: 10,
    },
    userName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    postTime: {
        color: "gray",
        fontSize: 12,
    },
    postContent: {
        margin: 10,
    },
    postText: {
        fontSize: 16,
        marginBottom: 10,
    },
    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    commentInputContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingLeft: 10,
        height: 40,
    },
    postButton: {
        marginLeft: 10,
        backgroundColor: "#3864FF",
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    postButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    iconButton: {
        backgroundColor: "#F9FAFB",
        padding: 8,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PostDetail;
