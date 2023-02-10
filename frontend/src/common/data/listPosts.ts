import { IPost } from "../model/post";

export const listPosts: IPost[] = [
  {
    id: "1",
    user: {
      id: "1",
      userName: "#brunofernades",
      displayName: "Bruno Fernades",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      haveSeenBefore: false,
    },
    isLiked: true,
    description: "A true rock at the back. Have a great day, Vida 🎁💪",
    totalLike: 186941,
    totalCmt: 4977,
    image:
      "https://images.unsplash.com/photo-1666245035270-42b01a0532f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=470&q=80",
  },
  {
    id: "4",
    user: {
      id: "24",
      userName: "#john",
      displayName: "John Waston",
      avatar: "https://reqres.in/img/faces/5-image.jpg",
      haveSeenBefore: true,
    },
    isLiked: false,
    description: "A true rock at the back. Have a great day, Vida 🎁💪",
    totalLike: 2120090,
    totalCmt: 902,
    image:
      "https://images.unsplash.com/photo-1666713533005-3efd57ae59c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
  },
  {
    id: "3",
    user: {
      id: "12",
      userName: "#emma",
      displayName: "Emma",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      haveSeenBefore: true,
    },
    isLiked: false,
    description: "A true rock at the back. Have a great day, Vida 🎁💪",
    totalLike: 470212,
    totalCmt: 92,
    image:
      "https://images.unsplash.com/photo-1666760012359-b9a91c518c1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  },
  {
    id: "2",
    user: {
      id: "4",
      userName: "#lindsay",
      displayName: "Lindsay",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
      haveSeenBefore: true,
    },
    isLiked: false,
    description: "A true rock at the back. Have a great day, Vida 🎁💪",
    totalLike: 13204,
    totalCmt: 195,
    image:
      "https://images.unsplash.com/photo-1661347334036-d484f970b1a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=100",
  },
  {
    id: "7",
    user: {
      id: "34",
      userName: "#monica",
      displayName: "Monica",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      haveSeenBefore: true,
    },
    isLiked: false,
    description: "A true rock at the back. Have a great day, Vida 🎁💪",
    totalLike: 13204,
    totalCmt: 195,
    image:
      "https://images.unsplash.com/photo-1666649013413-0be5868a337d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
];
