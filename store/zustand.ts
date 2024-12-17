import { create } from "zustand";

// Create the store
const useBasicStore = create((set, get) => ({
    postData: [
        {
            username: "John Doe",
            avatar: "https://via.placeholder.com/150/FF6347/808080?text=Avatar",
            time: "2 giờ trước",
            content: "Đây là một bài đăng tuyệt vời!",
            images: [
                "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
                "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
                "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
            ],
        },
        {
            username: "Jane Smith",
            avatar: "https://via.placeholder.com/150/FF6347/808080?text=Avatar",
            images: [
                "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
            ],
            time: "1 ngày trước",
            content: "Học React Native thật thú vị",
            image: null,
        },
    ],

    addPost: (item) =>
        set((state) => ({
            postData: [item, ...state.postData],
        })),
}));

export default useBasicStore;
