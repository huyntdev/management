import { IconBox, IconHome, IconTag } from "../components/icons";
import { TSidebarLink } from "../types/general.types";

export const sidebarLinks: TSidebarLink[] = [
  {
    title: "Dashboard",
    icon: <IconHome />,
    path: "/",
  },
  {
    title: "Products",
    icon: <IconBox />,
    path: "/products",
  },
  {
    title: "Settings",
    icon: <IconTag />,
    path: "/settings",
  },
];

export const productStatus = [
  {
    value: "",
    label: "All",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "no_rule",
    label: "No rule",
  },
];
