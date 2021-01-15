import { Entity } from "../../types/entity";

export type AppUpdateGeneralNotificationsParameter = {
  entity: Entity;
  includeSubs?: boolean;
  recordAdded?: boolean;
  recordEdited?: boolean;
  commentAdded?: boolean;
  statusChanged?: boolean;
  fileImported?: boolean;
  notifyToCommenter?: boolean;
};
