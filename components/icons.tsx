import { Award, TrendingUp, UsersRound, Zap } from "lucide-react";

import type { Metric } from "@/types/home";

const metricIcons = {
  trend: TrendingUp,
  award: Award,
  energy: Zap,
  people: UsersRound,
} satisfies Record<Metric["icon"], typeof TrendingUp>;

export function MetricIcon({ icon }: Pick<Metric, "icon">) {
  const Icon = metricIcons[icon];
  return <Icon aria-hidden="true" className="size-7 stroke-[2.2] lg:size-8" />;
}
