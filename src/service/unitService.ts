import { Age } from "../constants/Ages";
import { Cost } from "../constants/Costs";
import UnitList from "../data/age-of-empires-units.json";
import { CostRangeType } from "../redux/slices/unitSlice";

export interface CostFilter {
  [Cost.FOOD]?: CostRangeType;
  [Cost.WOOD]?: CostRangeType;
  [Cost.GOLD]?: CostRangeType;
}

export interface GetUnitsProps {
  costFilter: CostFilter;
  age?: Age;
}
export interface Unit {
  id: number;
  name: string;
  description: string;
  expansion: string;
  age: string;
  cost?: CostNumbers | null;
  build_time?: number;
  reload_time?: number;
  attack_delay?: number;
  movement_rate?: number;
  line_of_sight: number;
  hit_points: number;
  range?: number | string;
  attack?: number;
  armor: string;
  accuracy?: string;
  attack_bonus?: string[];
  search_radius?: number;
  blast_radius?: number;
  armor_bonus?: string[];
}

export interface CostNumbers {
  Wood?: number;
  Food?: number;
  Gold?: number;
}

function isAnyCostFilterActive(costFilter: CostFilter): boolean {
  return Object.values(costFilter).some((filter) => filter.active);
}

function filterUnitsByCost(units: Array<Unit>, costFilter: CostFilter) {
  return units.filter((unit: Unit) => {
    if (!unit.cost) return false;
    for (const key of Object.keys(unit.cost)) {
      if (!costFilter[key as Cost] || !costFilter[key as Cost]?.active)
        return false;
      const unitCost = unit.cost[key as Cost];
      const filter = costFilter[key as Cost];
      if (!filter || !unitCost) return false;
      if (!filter || unitCost < filter.min || unitCost > filter.max)
        return false;
    }
    return true;
  });
}

export const getUnits = ({
  costFilter,
  age = Age.ALL,
}: GetUnitsProps): Promise<Array<Unit>> => {
  return new Promise((resolve, reject) => {
    const ageFiltered: Array<Unit> =
      age !== Age.ALL
        ? UnitList.units.filter((unit: Unit) => (unit.age as Age) === age)
        : UnitList.units;

    const costsFiltered = isAnyCostFilterActive(costFilter)
      ? filterUnitsByCost(ageFiltered, costFilter)
      : ageFiltered;

    setTimeout(() => {
      resolve(costsFiltered);
    }, 1000);
  });
};

export const getUnitDetail = (unitId: number): Promise<Unit> => {
  return new Promise((resolve, reject) => {
    const detail = UnitList.units.filter((unit: Unit) => unit.id == unitId);

    setTimeout(() => {
      resolve(detail[0]);
    }, 1000);
  });
};
