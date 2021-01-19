import { Entity } from "../../types/entity";

type TimingBase = {
  code: string;
  daysLater: string | number;
};

type Timing =
  | (TimingBase & {
      hoursLater: string | number;
    })
  | (TimingBase & {
      time: string;
    });

export type NotificationForParameter = {
  timing: Timing;
  filterCond?: string;
  title?: string;
  targets: Array<{
    entity: Entity;
    includeSubs?: boolean | string;
  }>;
};
