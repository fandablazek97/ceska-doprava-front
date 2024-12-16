import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import Button from "../bricks/Button";
import Checkbox from "../forms/Checkbox";

// Define the cookie types
export type CookiePreferences = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  necessary?: boolean;
};

type CookieContextType = {
  preferences: CookiePreferences;
  setPreferences: (value: CookiePreferences) => void;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  onCookieSubmit: () => void;
  handleCheckboxChange?: (id: keyof CookiePreferences, isSelected: boolean) => void;
};

// Create the cookie context
const CookieContext = createContext<CookieContextType>({} as CookieContextType);

// Helper function to update Google Analytics consent
const updateGoogleConsent = (preferences: CookiePreferences) => {
  if (typeof window !== "undefined") {
    (window as any).gtag("consent", "update", {
      analytics_storage: preferences.analytics ? "granted" : "denied",
      ad_storage: preferences.marketing ? "granted" : "denied",
      ad_user_data: preferences.marketing ? "granted" : "denied",
      ad_personalization: preferences.marketing ? "granted" : "denied",
      functionality_storage: preferences.functional ? "granted" : "denied",
      security_storage: "granted", // Always granted for necessary cookies
    });
  }
};

// Context provider component
type CookieProviderProps = {
  children: React.ReactNode;
};

export function CookieProvider({ children }: CookieProviderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window !== "undefined") {
      const savedPreferences = localStorage.getItem("cookiePreferences");
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences) as CookiePreferences;
          setIsVisible(false);
          // Update Google consent with saved preferences
          updateGoogleConsent(parsed);
          return parsed;
        } catch (error) {
          console.error("Error parsing saved preferences from localStorage:", error);
        }
      }
    }
    return {
      analytics: false,
      marketing: false,
      functional: false,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "denied",
        security_storage: "granted", // Always grant necessary cookies
      });
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    // Update Google consent whenever preferences change
    updateGoogleConsent(preferences);
  }, [preferences]);

  return (
    <CookieContext.Provider
      value={{
        preferences,
        setPreferences,
        isVisible,
        setIsVisible,
        onCookieSubmit: () => {
          updateGoogleConsent(preferences);
        },
        handleCheckboxChange: (id, isSelected) => {
          const newPreferences = {
            ...preferences,
            [id]: isSelected,
          };
          setPreferences(newPreferences);
          updateGoogleConsent(newPreferences);
        },
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

type CookieBannerProps = {
  isDebugMode?: boolean;
  showOnScroll?: boolean;
};

export function CookieBanner({ isDebugMode = false, showOnScroll = false }: CookieBannerProps) {
  const {
    setIsVisible,
    isVisible,
    preferences,
    setPreferences,
    onCookieSubmit,
    handleCheckboxChange,
  } = useCookieConsent();
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bannerDismissed") === "true";
    }
    return false;
  });
  {
    isDebugMode && setIsVisible(true);
  }


  // Set the banner as dismissed and save to localStorage
  const handleDismissBanner = () => {
    localStorage.setItem("bannerDismissed", "true");
    setIsBannerDismissed(true);
    !isDebugMode && setIsVisible(false);
  };


  // Accept selected preferences and close the banner
  const handleAcceptSelected = () => {
    onCookieSubmit();
    handleDismissBanner();
  };

  // Accept all preferences and close the banner
  const handleAcceptAll = () => {
    setPreferences({
      analytics: true,
      marketing: true,
      functional: true,
      necessary: true,
    });
    onCookieSubmit();
    handleDismissBanner();
  };

  // Decline all preferences and close the banner
  const handleDeclineAll = () => {
    setPreferences({
      analytics: false,
      marketing: false,
      functional: false,
      necessary: false,
    });
    onCookieSubmit();
    handleDismissBanner();
  };

  const { scrollY } = useScroll();
  const thresholdScrolledPx = 200;

  useEffect(() => {
    if (!showOnScroll || isBannerDismissed) return;

    return scrollY.on("change", (y) => {
      const current = y;

      if (current > thresholdScrolledPx) {
        setIsVisible(true);
      }
    });
  }, [scrollY, setIsVisible, showOnScroll, isBannerDismissed]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed w-[calc(100%-32px)] sm:w-min bottom-0 right-0 z-fixed flex m-4 flex-col gap-2 border border-gray-800 bg-body p-3 sm:gap-4 sm:p-6 lg:gap-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <p className="sm:text-sm">
            Používáme cookies ke zlepšení vašeho zážitku. Více informací najdete v našich{" "}
            <Link href="/cookies" className="text-primary">
              zásadách používání cookies
            </Link>
            .
          </p>
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <Checkbox checked isDisabled label={"Nezbytné"} name="necessary" />
            <Checkbox
              name="analytics"
              checked={preferences.analytics}
              onChange={(isSelected: boolean) =>
                handleCheckboxChange && handleCheckboxChange("analytics", isSelected)
              }
              label="Analytika"
            />
            <Checkbox
              name="marketing"
              checked={preferences.marketing}
              onChange={(isSelected: boolean) =>
                handleCheckboxChange && handleCheckboxChange("marketing", isSelected)
              }
              label="Marketing"
            />
            <Checkbox
              name="functional"
              checked={preferences.functional}
              onChange={(isSelected: boolean) =>
                handleCheckboxChange && handleCheckboxChange("functional", isSelected)
              }
              label="Funkční"
            />
          </form>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Button
              onClick={handleDeclineAll}
              variant="transparent"
              className="border border-gray-400"
              size="sm"
            >
              Odmítnout vše
            </Button>
            <Button
              onClick={handleAcceptSelected}
              variant="transparent"
              className="border border-gray-400"
              size="sm"
            >
              Přijmout vybrané
            </Button>
            <Button onClick={handleAcceptAll} size="sm">
              Přijmout vše
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Custom hook for using the context
export function useCookieConsent() {
  const {
    preferences,
    setPreferences,
    isVisible,
    setIsVisible,
    onCookieSubmit,
    handleCheckboxChange,
  } = useContext(CookieContext);

  return {
    preferences,
    setPreferences,
    isVisible,
    setIsVisible,
    onCookieSubmit,
    handleCheckboxChange,
  };
}
