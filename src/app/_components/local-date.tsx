import { getTimeAgoOrExactDate } from "@/utils/date";

export type LocalDateProps = {
  date: Date;
  className?: string;
};

export function LocalDate({ date, className }: LocalDateProps) {
  return <div className={className}>{getTimeAgoOrExactDate(date)}</div>;
}
