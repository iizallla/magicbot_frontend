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

import { Link } from "react-router-dom";

export function NavMain({ items }) {
  console.log("asdfasd", items.acardionItems);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.isAccardion ? (
            <Accordion
              className="text-sm flex items-center"
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <div className="flex items-center gap-5">
                  <div className="w-1 h-1 mb-6 ml-2 mr-2">
                    <item.icon />
                  </div>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                </div>
                <AccordionContent>
                  {item.acardionItems.map((i) => {
                    return (
                      <div className="ml-5">
                        <Link className="pt-2" to={i.url}>
                          {i.title}
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
                  <Link to={item.url}>
                    <div>
                      <item.icon />
                    </div>
                    <span>{item.title}</span>
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
