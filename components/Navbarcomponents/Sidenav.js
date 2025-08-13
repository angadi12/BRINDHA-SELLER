"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/public/Asset/Logo3.png";
import Logo2 from "@/public/Asset/Logo2.png";
import {
  LayoutDashboard,
  PackageSearch,
  Heart,
  ReceiptIndianRupee,
  Mail,
  Users,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  PackageCheck,
  List,
  UserRoundPen,
  ShieldUser
} from "lucide-react";
import User from "@/public/Asset/User.png";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


const iconMap = {
  LayoutDashboard,
  PackageSearch,
  PackageCheck,
  ReceiptIndianRupee,
  Mail,
  Users,
};

const Sidenav = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [name, setname] = useState("");
  const [showDialog, setShowDialog] = useState(false);
const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const Name = Cookies.get("nme");
    if (Name) {
      setname(Name);
    }
  }, []);

useEffect(() => {
  const storedNavItems = localStorage.getItem("navitems");
  if (storedNavItems) {
    setNavItems(JSON.parse(storedNavItems));
  }
}, []);

  // const navItems = [
  //   { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  //   { label: "Product management", icon: PackageSearch, path: "/Product-management" },
  //   { label: "Order Management", icon: PackageCheck, path: "/Order-Management" },
  //   { label: "Manage Admins", icon:ShieldUser, path: "/manage-admins" },
  //   { label: "Earnings", icon: ReceiptIndianRupee, path: "/earnings" },
   
  //   { label: "Messages", icon: Mail, path: "/messages" },
  //   { label: "Customer Reviews", icon: Users, path: "/customer-reviews" },
  // ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") {
      return true;
    }

    const basePathRegex = new RegExp(`^${path}(/|$)`);
    if (basePathRegex.test(pathname)) {
      return true;
    }

    return false;
  };

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };


  const handleLogoutClick = () => {
    setShowDialog(true);
  };

  const handleCancelLogout = () => {
    setShowDialog(false);
  };

  const handleConfirmLogout = () => {
    Cookies.remove("token");
    Cookies.remove("usid");
    Cookies.remove("isCompanyVerified");
    Cookies.remove("nme");
    setShowDialog(false);
    router.refresh();
  };



  return (
    <>
    <div
      className={`h-screen sticky top-0 bottom-0 left-0 overflow-hidden border-r border-gray-300 hidden md:flex lg:flex flex-col items-center bg-white transition-all duration-700 ease-in-out ${
        isMinimized
          ? "w-20  transition-all duration-700 ease-in-out"
          : "w-60  transition-all duration-700 ease-in-out"
      }`}
    >
      {/* Header with logo and toggle button */}
        <div className={`p-0 sticky top-0 border-b w-full  flex justify-between items-center px-4 transition-all duration-300 ease-in-out  ${isMinimized?"h-16":""}`}>
        {!isMinimized ? (
          <>
            <Image
              src={Logo || "/placeholder.svg"}
              alt="Brindah Logo"
              loading="lazy"
                className="w-16   object-fill transition-all duration-500 ease-in-out"
            />
            <Image
              src={Logo2 || "/placeholder.svg"}
              alt="Brindah"
              loading="lazy"
              className="w-auto transform transition-all duration-500 ease-in-out"
            />
          </>
        ) : (
          <></>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-12 w-12 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          {isMinimized ? (
            <PanelLeftOpen
              size={20}
              className="text-[#106C83] cursor-pointer"
            />
          ) : (
            <PanelLeftClose
              size={20}
              className="text-[#106C83] cursor-pointer"
            />
          )}
        </Button>
      </div>

      <div className="flex w-full  px-2 flex-col flex-1">
        <div className="py-2">
          {!isMinimized && (
            <p className="px-4 text-xs mb-2 font-medium text-gray-500  transition-all duration-900 ease-in-out">
              Menu
            </p>
          )}
          <div
            className={cn(
              "space-y-1 pb-2",
              !isMinimized && "border-b border-gray-200"
            )}
          >
            <TooltipProvider>
              {navItems.map((item) => {
                const IconComponent = iconMap[item.icon] || LayoutDashboard; // fallback
                return isMinimized ? (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <Button
                        onPress={() => router.push(item.path)}
                        className={`w-full flex justify-center cursor-pointer items-center p-2 text-sm rounded-md transition-all duration-900 ${
                          isActive(item.path)
                            ? "bg-[#106C83] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <IconComponent size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="p-2">
                      <p className="text-sm font-medium">{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    key={item.label}
                    onPress={() => router.push(item.path)}
                    className={`w-56 flex justify-start cursor-pointer items-center px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-[#106C83] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent size={15} className="mr-2" />
                    <span
                      className={`transition-all transform duration-900 ${
                        isMinimized ? "w-20 opacity-0" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Button>
                )
              })}
            </TooltipProvider>
          </div>
        </div>

        <div className="py-2">
          {!isMinimized && (
            <p className="px-4 text-xs font-medium text-gray-500 mb-1">
              Account
            </p>
          )}
          <div className="space-y-0.5">
            <TooltipProvider>
              {isMinimized ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onPress={() => router.push("/profile")}
                      className={`w-full cursor-pointer flex justify-center items-center p-2 text-sm rounded-md transition-all duration-300 ${
                        isActive("/profile")
                          ? "bg-[#106C83] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <UserRoundPen size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="p-2">
                    <p className="text-sm font-medium">Profile</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  onPress={() => router.push("/profile")}
                  className={`w-56 flex justify-start cursor-pointer items-center px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                    isActive("/profile")
                      ? "bg-[#106C83] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <UserRoundPen size={15} className="mr-2" />
                  Profile
                </Button>
              )}
            </TooltipProvider>
          </div>
          <div className="space-y-0.5">
            <TooltipProvider>
              {isMinimized ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onPress={() => router.push("/settings")}
                      className={`w-full cursor-pointer flex justify-center items-center p-2 text-sm rounded-md transition-all duration-300 ${
                        isActive("/settings")
                          ? "bg-[#106C83] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Settings size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="p-2">
                    <p className="text-sm font-medium">Settings</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  onPress={() => router.push("/settings")}
                  className={`w-56 flex justify-start cursor-pointer items-center px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                    isActive("/settings")
                      ? "bg-[#106C83] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings size={15} className="mr-2" />
                  Settings
                </Button>
              )}
            </TooltipProvider>
          </div>
        </div>

        {/* User profile section */}
         <div
            className={cn(
              "mt-auto border-t",
              isMinimized ? "p-2" : "p-1",
              "flex items-center"
            )}
          >
            {isMinimized ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-16 h-16 rounded-full bg-white overflow-hidden cursor-pointer mx-auto">
                    <Image
                      src={Logo || "/placeholder.svg"}
                      alt="User Avatar"
                       width={40}
                      height={40}
                      className="object-contain w-16 h-16"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="w-auto bg-white border border-gray-300 p-0"
                >
                  <div className="p-3 w-60">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        <Image
                          src={Logo || "/placeholder.svg"}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="object-fill w-10 h-10"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">
                          {name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Button
                      onPress={handleLogoutClick}
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 rounded-sm bg-red-500 text-white  flex items-center cursor-pointer"
                    >
                      <LogOut size={14} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <div
                  onClick={handleLogoutClick}
                  className="w-16 h-16 cursor-pointer rounded-full bg-white mr-2 overflow-hidden"
                >
                  <Image
                    src={Logo || "/placeholder.svg"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-fill w-16 h-16"
                  />
                </div>
                <div
                  onClick={handleLogoutClick}
                  className="flex-1 w-56 cursor-pointer"
                >
                  <p className="text-sm font-medium"> {name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <LogOut
                  onClick={handleLogoutClick}
                  size={14}
                  className="cursor-pointer text-red-500"
                />
              </>
            )}
          </div>
      </div>
    </div>

 <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white border-none max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              {` Are you sure you want to log out? You'll need to sign in again to
              access your account.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onPress={handleCancelLogout}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-500 text-white"
              onPress={handleConfirmLogout}
            >
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Sidenav;
