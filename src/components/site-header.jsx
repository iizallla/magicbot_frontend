import { SidebarIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }

    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full justify-between items-center gap-2 px-4">
        <div className="flex items-center">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex justify-end items-center gap-4 ">
          <div className="text-sm font-xl text-white flex gap-4">
            {["uz", "ru", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`uppercase px-2 py-1 ${
                  i18n.language === lang
                    ? "font-bold text-[#40d09d]"
                    : "text-blue-500"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={toggleTheme}>
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g fill="" stroke="rgb(59 130 246)" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="4" strokeLinejoin="round" />
                  <path
                    strokeLinecap="round"
                    fill="Currentcolor"
                    d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707"
                  />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="rgb(59 130 246)"
                  d="m20.996 11.712l1.249-.04a1.25 1.25 0 0 0-1.605-1.159zm-8.707-8.707l1.198.355a1.25 1.25 0 0 0-1.16-1.605zm8.35 7.508A5.8 5.8 0 0 1 19 10.75v2.5a8.3 8.3 0 0 0 2.351-.34zM19 10.75A5.75 5.75 0 0 1 13.25 5h-2.5A8.25 8.25 0 0 0 19 13.25zM13.25 5c0-.572.083-1.122.237-1.64l-2.397-.71A8.3 8.3 0 0 0 10.75 5zM12 4.25q.124 0 .25.004l.078-2.499A10 10 0 0 0 12 1.75zM4.25 12A7.75 7.75 0 0 1 12 4.25v-2.5C6.34 1.75 1.75 6.34 1.75 12zM12 19.75A7.75 7.75 0 0 1 4.25 12h-2.5c0 5.66 4.59 10.25 10.25 10.25zM19.75 12A7.75 7.75 0 0 1 12 19.75v2.5c5.66 0 10.25-4.59 10.25-10.25zm-.004-.25q.004.126.004.25h2.5q0-.165-.005-.328z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
