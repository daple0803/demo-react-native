import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useBasicStore from "@/store/zustand";

const CreatePost = () => {
    const router = useRouter();
    const [postContent, setPostContent] = useState("");
    const { addPost } = useBasicStore();

    const formData = {
        username: "Duy Anh",
        avatar: "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
        time: "Vài giây trước",
        content: postContent,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
            "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
            "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        ],
    };
    const handlePost = () => {
        addPost(formData);
        router.back();
    };

    const handleBackButton = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackButton}>
                    <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tạo bài viết</Text>
                <View style={{ width: 30 }} />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    marginTop: 16,
                }}>
                <Image
                    source={{
                        uri: "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
                    }}
                    style={styles.avatar}
                />
                <View style={{ gap: 8 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                        }}>
                        <Text style={styles.userName}>Duy Anh</Text>
                        {true && (
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color="#3864FF"
                            />
                        )}
                    </View>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            gap: 8,
                            padding: 10,
                            alignItems: "center",
                            backgroundColor: "#F9FAFB",
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#F3F4F6",
                        }}>
                        <Entypo name="globe" size={16} color="#4D5761" />
                        <Text style={{ color: "#4D5761" }}>Công khai</Text>
                        <Entypo name="chevron-down" size={16} color="#4D5761" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Post Input */}
            <TextInput
                style={styles.input}
                placeholder="Hãy viết gì đó cho hôm nay?"
                multiline
                numberOfLines={50}
                value={postContent}
                placeholderTextColor={"#D2D6DB"}
                onChangeText={(text) => setPostContent(text)}
            />

            {/* Image Selection and Post Button */}
            <View style={styles.imageSelectionContainer}>
                <View style={styles.imageSelection}>
                    <TouchableOpacity>
                        <Ionicons
                            name="camera-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons
                            name="image-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                {/* Post Button */}
                <TouchableOpacity
                    style={styles.postButton}
                    onPress={handlePost}>
                    <Text style={styles.postButtonText}>Đăng</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 80,
    },
    userName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    postTime: {
        color: "gray",
        fontSize: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        backgroundColor: "#fff",
    },
    backButton: {
        padding: 10,
    },

    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 12,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#4D5761",
    },
    input: {
        borderColor: "#ddd",
        padding: 12,
        fontSize: 16,
        minHeight: 200,
        textAlignVertical: "top",
        marginBottom: 16,
    },
    imageSelectionContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#F3F4F6",
    },
    imageSelection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingHorizontal: 14,
    },
    postButton: {
        backgroundColor: "#3864FF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    postButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default CreatePost;
