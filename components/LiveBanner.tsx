"use client";

import { ExternalLink, X } from "lucide-react";
import { useState } from "react";

interface LiveBannerProps {
  title: string;
  date: string;
  link: string;
}

export default function LiveBanner({ title, date, link }: LiveBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-brand-blue text-white text-sm">
      <div className="content-width">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
              🔴 LIVE
            </span>
            <span className="truncate font-medium">
              {title}
              <span className="text-blue-200 ml-2">{date}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 ml-3 shrink-0">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/90 hover:text-white font-semibold text-xs underline underline-offset-2"
            >
              신청하기 <ExternalLink size={12} />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/70 hover:text-white"
              aria-label="배너 닫기"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
