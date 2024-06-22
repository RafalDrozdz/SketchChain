import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function useLeavePageConfirm() {
  const router = useRouter();
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      sessionStorage.setItem("refreshed", "true");
    };

    if (sessionStorage.getItem("refreshed") === "true") {
      router.replace("/");
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sessionStorage.removeItem("refreshed");
    };
  }, []);
}
