"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

export function NavMain({ items }) {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.isAccardion ? (
            <Accordion
              className="text-sm flex items-center mt-2"
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <div className="flex items-center gap-5">
                  <div className="w-1 h-1 mb-6 ml-2 mr-2">
                    <item.icon />
                  </div>
                  <AccordionTrigger>{t(item.title)}</AccordionTrigger>
                </div>
                <AccordionContent>
                  {item.acardionItems.map((i) => {
                    return (
                      <div
                        style={
                          location.pathname == i.title ? { color: "red" } : {}
                        }
                        className="ml-12 mt-1 mb-2 transition-all text-md  hover:text-blue-500 "
                      >
                        <Link className="pt-2 " to={i.url}>
                          {t(i.title)}
                        </Link>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link
                    style={
                      location.pathname == item.title ? { color: "red" } : {}
                    }
                    to={item.url}
                    className="mt-2 transition-all hover:text-blue-500"
                  >
                    <div>
                      <item.icon />
                    </div>
                    <span className=""> {t(item.title)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
