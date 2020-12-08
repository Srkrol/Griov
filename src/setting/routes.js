import { Main } from "../layout/main";
import { Climat } from "../layout/climat";
import { Admin } from "../layout/admin";

import { Home } from "../pages/Home";
import { UserClimat } from "../pages/userClimat";
import { CreateBox } from "../pages/createbox";
import { Order } from "../pages/order";
import { Ladder } from "../pages/ladder";
import { LkMain } from "../pages/LkMain";
import { UserBoxLadder } from "../pages/userboxladder";
import { Topladder } from "../pages/topladder";
import { UserInfo } from "../pages/usersinfo";
import { Message } from "../pages/message";
import { Chat } from "../pages/chat";
import { OrderDevice } from "../pages/orderdevice";
import { ChatLadder } from "../pages/chatladder";
import { Gallery } from "../pages/gallery";
import { AdminINC } from "../pages/admin";
import { ImageComparison } from "../pages/imagecomparison";
import { ImageComparisonID } from "../pages/imagecomparisonid";
import { StepForwardOutlined } from "@ant-design/icons";

export const roleNoAuth = {
  role: "noauth",
};

export const roleAuth = {
  role: "auth",
};

export const routeSetting = [
  {
    link: "/",
    component: Home,
    layout: Main,
    icon: "",
    role: roleNoAuth.role,
  },
  {
    link: "/userclimat",
    component: UserClimat,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/order",
    component: Order,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/createbox",
    component: CreateBox,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/message",
    component: Message,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/userboxladder/:id/:box",
    component: UserBoxLadder,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/chat/:to/:from",
    component: Chat,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/chatladder/:ladder",
    component: ChatLadder,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/topladder/:id",
    component: Topladder,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/gallery/:id",
    component: Gallery,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/orderdevice/:box",
    component: OrderDevice,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/admin",
    component: AdminINC,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/imagecomparison",
    component: ImageComparison,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/imagecomparison/:box/:name/:plant/:user",
    component: ImageComparisonID,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/userinfo/:id",
    component: UserInfo,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/ladder",
    component: Ladder,
    layout: Climat,
    icon: "",
    role: roleAuth.role,
  },
  {
    link: "/adminpanel",
    component: LkMain,
    layout: Admin,
    icon: StepForwardOutlined,
    role: roleAuth.role,
  },
];
