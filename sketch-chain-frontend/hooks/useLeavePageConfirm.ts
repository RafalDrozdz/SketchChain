import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
export default function useLeavePageConfirm() {
  const router = useRouter();
  const t = useTranslations();
  let isRendered = false;
  let hasBeenRefreshed = false;

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    sessionStorage.setItem("refreshed", "true");
  };

  const handleBrowserBack = () => {
    const isConfirmed = confirm(t(`areYouSureYouWantToLeaveThisPage`));
    if (isConfirmed) window.location.reload();
  };

  useEffect(() => {
    if (sessionStorage.getItem("refreshed") === "true") {
      router.replace("/");
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (sessionStorage.getItem("refreshed") === "true")
        hasBeenRefreshed = true;
      if (isRendered && !hasBeenRefreshed) handleBrowserBack();
      sessionStorage.removeItem("refreshed");

      isRendered = true;
    };
  }, []);
}
