import * as React from "react";
import {
  Grip,
  LifeBuoy,
  Percent,
  PersonStanding,
  Send,
  Store,
  ShoppingBag,
  Turtle,
  Star,
  SquareFunction,
  ChartNoAxesColumn,
  HandCoins,
  Truck,
  MapPin,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Ibrohim",
    email: "example@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/models",
      icon: Grip,
      isAccardion: false,
      acardionItems: [
        {
          title: "Products",
          url: "/products",
        },
      ],
    },
    {
      title: "Online Shop",
      url: "/online-shop",
      icon: Store,
      isActive: true,
      isAccardion: true,
      acardionItems: [
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Categories",
          url: "/categories",
        },
        {
          title: "Import",
          url: "/import/products",
        },
      ],
    },
    {
      title: "Users",
      url: "/users",
      icon: PersonStanding,
      isActive: true,
      isAccardion: false,
      acardionItems: [
        {
          title: "Products",
          url: "/products",
        },
      ],
    },
    {
      title: "Sales",
      url: "/sales",
      icon: ShoppingBag,
      isActive: true,
      isAccardion: true,
      acardionItems: [
        {
          title: "All sales",
          url: "/all-sales",
        },
        {
          title: "Settings",
          url: "/sales/settings",
        },
      ],
    },
    {
      title: "Marketing",
      url: "/marketing",
      icon: Percent,
      isActive: true,
      isAccardion: true,
      acardionItems: [
        {
          title: "Promocodes",
          url: "/marketing/promocodes",
        },
        {
          title: "Text messages",
          url: "/marketing/messages",
        },
      ],
    },
    {
      title: "Reviews",
      url: "/rewievs",
      icon: Star,
      isActive: true,
      isAccardion: false,
      acardionItems: [
        {
          title: "All sales",
          url: "/all-sales",
        },
        {
          title: "Pre-orders",
          url: "/pre-orders",
        },
        {
          title: "Settings",
          url: "/sales/settings",
        },
      ],
    },
    {
      title: "Loyalty Program",
      url: "/rewievs",
      icon: SquareFunction,
      isActive: true,
      isAccardion: true,
      acardionItems: [
        {
          title: "Scores",
          url: "/loyality/scores",
        },
        {
          title: "Analitics",
          url: "/loyality/analitics",
        },
      ],
    },
    {
      title: "Analitics",
      url: "/rewievs",
      icon: ChartNoAxesColumn,
      isActive: true,
      isAccardion: true,
      acardionItems: [
        {
          title: "Analitics by orders",
          url: "/loyality/scores",
        },
        {
          title: "Analitics by views",
          url: "/loyality/analitics",
        },
        {
          title: "Analitics by products",
          url: "/loyality/analitics",
        },
        {
          title: "Analitics by carts",
          url: "/loyality/analitics",
        },
        {
          title: "Analitics by search responses",
          url: "/loyality/analitics",
        },
      ],
    },
    {
      title: "Paying system",
      url: "/rewievs",
      icon: HandCoins,
      isActive: true,
      isAccardion: true,
      acardionItems: [
        {
          title: "Add paying system",
          url: "/loyality/scores",
        },
        {
          title: "Tranzactions",
          url: "/loyality/analitics",
        },
        {
          title: "IKPU",
          url: "/loyality/analitics",
        },
      ],
    },
    {
      title: "Delivering methods",
      url: "/rewievs",
      icon: Truck,
      isActive: true,
      isAccardion: false,
      acardionItems: [],
    },
    {
      title: "Branches",
      url: "/branches",
      icon: MapPin,
      isActive: true,
      isAccardion: false,
      acardionItems: [],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img
                    src="https://avatars.mds.yandex.net/i?id=0a32d2f753e665ef23329b8668d1f844_l-10653027-images-thumbs&n=13"
                    alt="logo"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Best Buy</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
