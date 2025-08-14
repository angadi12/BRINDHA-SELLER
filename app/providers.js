"use client";

import Nav from "@/components/Navbarcomponents/Nav";
import Sidenav from "@/components/Navbarcomponents/Sidenav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeroUIProvider } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getVerificationStatusThunk } from "@/lib/Redux/Slices/vendorSlice";
import { useMobileDetection } from "@/lib/hooks/use-mobile-detection"
import MobileWarning from "@/lib/hooks/MobileWarning"

export function NextuiProviderWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status, loading, error } = useSelector((state) => state.vendor);
  const [localstatus, setStatus] = useState("");
  const [localtoken, settoken] = useState("");
  const dispatch = useDispatch();
  const { isMobile } = useMobileDetection()

  useEffect(() => {
    const Name = Cookies.get("isCompanyVerified");
    const token = Cookies.get("token");
    if (Name && token) {
      setStatus(Name);
      settoken(token);
    }
  }, []);

  useEffect(() => {
    if (localtoken) {
      dispatch(getVerificationStatusThunk());
    }
  }, [dispatch, localtoken]);

  useEffect(() => {
    if (status?.isCompanyVerified !== localstatus) {
      Cookies.remove("isCompanyVerified");
      Cookies.set("isCompanyVerified", status?.isCompanyVerified);
    } else {
      Cookies.set("isCompanyVerified", status?.isCompanyVerified);
    }
  }, [status?.isCompanyVerified]);

  useEffect(() => {
    if (
      status?.isCompanyVerified === "Resend" ||
      status?.isCompanyVerified === "Pending" ||
      status?.isCompanyVerified === "rejected"
    ) {
      router.push("/notverified");
      return;
    }
  }, [status]);

 if (isMobile) {
    return (
      <HeroUIProvider>
        <MobileWarning/>
      </HeroUIProvider>
    )
  }


  return (
    <HeroUIProvider>
      <section>
        {pathname !== "/Signin" && pathname !== "/notverified" ? (
          <main className="grid grid-cols-1 md:grid-cols-[auto_1fr] w-full h-screen overflow-hidden ">
            {pathname !== "/Signin" && (
              <div className="w-full">
                <Sidenav />
              </div>
            )}

            <section className="flex  flex-col  w-full  h-screen   ">
              {pathname !== "/Signin" && <Nav />}
              {/* <ScrollArea className="w-full h-screen pb-14"> */}
              {children}
              {/* </ScrollArea> */}
            </section>
          </main>
        ) : (
          children
        )}
      </section>
    </HeroUIProvider>
  );
}
