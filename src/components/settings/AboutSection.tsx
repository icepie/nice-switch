import { useEffect, useState } from "react";
import { Info, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getVersion } from "@tauri-apps/api/app";
// 更新相关功能已隐藏
// import { Download, ExternalLink, RefreshCw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { settingsApi } from "@/lib/api";
// import { useUpdate } from "@/contexts/UpdateContext";
// import { relaunchApp } from "@/lib/updater";

interface AboutSectionProps {
  isPortable: boolean;
}

export function AboutSection({ isPortable }: AboutSectionProps) {
  const { t } = useTranslation();
  const [version, setVersion] = useState<string | null>(null);
  const [isLoadingVersion, setIsLoadingVersion] = useState(true);
  // 更新相关功能已隐藏
  // const [isDownloading, setIsDownloading] = useState(false);
  // const {
  //   hasUpdate,
  //   updateInfo,
  //   updateHandle,
  //   checkUpdate,
  //   resetDismiss,
  //   isChecking,
  // } = useUpdate();

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const loaded = await getVersion();
        if (active) {
          setVersion(loaded);
        }
      } catch (error) {
        console.error("[AboutSection] Failed to get version", error);
        if (active) {
          setVersion(null);
        }
      } finally {
        if (active) {
          setIsLoadingVersion(false);
        }
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  // 更新相关功能已隐藏
  // const handleOpenReleaseNotes = useCallback(async () => { ... }, []);
  // const handleCheckUpdate = useCallback(async () => { ... }, []);

  const displayVersion = version ?? t("common.unknown");

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h3 className="text-sm font-medium">{t("common.about")}</h3>
        <p className="text-xs text-muted-foreground">
          {t("settings.aboutHint")}
        </p>
      </header>

      <div className="space-y-4 rounded-lg border border-border-default p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">NiceCode</p>
            <p className="text-xs text-muted-foreground">
              {t("common.version")}{" "}
              {isLoadingVersion ? (
                <Loader2 className="inline h-3 w-3 animate-spin" />
              ) : (
                `v${displayVersion}`
              )}
            </p>
            {isPortable ? (
              <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                {t("settings.portableMode")}
              </p>
            ) : null}
          </div>

          {/* 更新日志和检查更新功能已隐藏 */}
        </div>

        {/* 更新信息已隐藏 */}
      </div>
    </section>
  );
}
