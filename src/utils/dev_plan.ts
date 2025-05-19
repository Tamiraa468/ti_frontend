import { DevPlanQuistions } from "config";

export const DevPlanQuistion = (value: string) => {
  switch (value) {
    case DevPlanQuistions.TreatInteract:
      return "devPlanQuistion1";
    case DevPlanQuistions.LifePride:
      return "devPlanQuistion2";
    case DevPlanQuistions.LifeValue:
      return "devPlanQuistion3";
    case DevPlanQuistions.PriorityService:
      return "devPlanQuistion4";
  }
};
