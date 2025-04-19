import { ReactNode } from "react";
import cn from "@/utils/class-merge";
import { useAnimation, aos } from "@/context/aos";
import { useTranslation } from "@/context/translation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface BaseSensorCardProps {
  title: string;
  icon: ReactNode;
  className?: string;
  lastUpdated?: Date;
  children: ReactNode;
}

export function BaseSensorCard({ title, icon, className, children, lastUpdated }: BaseSensorCardProps) {
  useAnimation();
  const t = useTranslation();

  return (
    <div className={cn("h-full", className)} data-aos={aos.fadeUp}>
      <Card   
        className="h-[400px] min-w-[300px] bg-white border-gray-300 shadow-md transition-all hover:shadow-lg hover:border-gray-400"
        style={{ padding: "0" }}
      >
        {/* Header Section */}
        <CardHeader
          className="pb-2 pt-4 border-b border-gray-200 bg-gray-100"
          data-aos={aos.fadeRight}
          data-aos-delay="100"
        >
          <CardTitle className="flex items-center justify-between text-gray-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300">
                {icon}
              </div>
              <span>{t(title as any)}</span>
            </div>
            {lastUpdated && (
              <div
                key={lastUpdated.getTime()}
                className="text-xs text-gray-600 animate-pulse"
              >
                {t("updated")}: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </CardTitle>
        </CardHeader>

        {/* Content Section */}
        <CardContent
          className="p-6 text-gray-900"
          data-aos={aos.zoomIn}
          data-aos-delay="300"
        >
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
