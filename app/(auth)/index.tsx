import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import CheckBox from "react-native-check-box";

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const router = useRouter();

    const handleInputChange = () => {
        if (email && password) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    };

    React.useEffect(() => {
        handleInputChange();
    }, [email, password]);

    const handleLogin = () => {
        setEmail("");
        setPassword("");
        setRememberMe(false);
        router.navigate("/(tabs)/profile");
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4267B2" />
            <Text style={styles.titleHeader}>Đăng nhập tài khoản</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email, Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập email hoặc số điện thoại"
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                />
            </View>

            <View style={[styles.inputContainer, { marginTop: 24 }]}>
                <Text style={styles.inputLabel}>Mật khẩu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#aaa"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>

            <View style={styles.rememberForgotContainer}>
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <View style={styles.rememberMeContainer}>
                    <CheckBox
                        isChecked={rememberMe}
                        onClick={() => setRememberMe(!rememberMe)}
                        checkBoxColor="#9DA4AE"
                        checkedCheckBoxColor="#3864FF"
                    />
                    <Text style={styles.rememberMeText}>Ghi nhớ mật khẩu</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.loginButton,
                    { opacity: disableButton ? 0.6 : 1 },
                ]}
                onPress={handleLogin}
                disabled={disableButton}>
                <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.divider}></View>
                <Text style={styles.orText}>Hoặc</Text>
                <View style={styles.divider}></View>
            </View>

            <View style={styles.registerContainer}>
                <Text style={{ color: "#9DA4AE" }}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity>
                    <Text style={styles.registerText}> Đăng kí</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: "900",
        alignSelf: "flex-start",
        marginBottom: 25,
    },
    inputContainer: {
        width: "100%",
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: "#333",
    },
    rememberForgotContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 12,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rememberMeText: {
        color: "#333",
    },
    forgotPassword: {
        fontWeight: "500",
        fontSize: 16,
    },
    loginButton: {
        width: "100%",
        paddingVertical: 8,
        backgroundColor: "#3864FF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    loginText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    divider: {
        height: 1,
        flex: 1,
        backgroundColor: "#ccc",
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 11,
        color: "#9DA4AE",
    },
    registerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    registerText: {
        color: "#3864FF",
        fontWeight: "bold",
    },
});
