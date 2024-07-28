import { createSlice } from "@reduxjs/toolkit";
import { Age } from "../../constants/Ages";
import { Unit } from "../../service/unitService";
export interface CostRangeType {
  min: number;
  max: number;
  active:boolean;
}
export interface InitialStateType {
  unitsLoading: boolean;
  units: Array<any>;
  unitsError: string | null;
  ageFilter: string;
  woodFilter: CostRangeType;
  foodFilter: CostRangeType;
  goldFilter: CostRangeType;
  unitDetail: Unit | null;
  unitDetailLoading: boolean;
  unitDetailError: string | null;
}

const initialState: InitialStateType = {
  unitsLoading: false,
  units: [],
  unitsError: null,
  ageFilter: Age.ALL,
  woodFilter: {min:0,max:0,active:false},
  foodFilter: {min:0,max:0,active:false},
  goldFilter: {min:0,max:0,active:false},
  unitDetail: null,
  unitDetailLoading: false,
  unitDetailError: null,
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    getUnits: (state, action) => {
      state.unitsLoading = true;
    },
    getUnitsSuccess: (state, action) => {
      state.unitsLoading = false;
      state.units = action.payload;
    },
    getUnitsFailure: (state, action) => {
      state.unitsLoading = false;
      state.unitsError = action.payload;
    },
    getUnitDetail: (state, action) => {
      state.unitDetailLoading = true;
    },
    getUnitDetailSuccess: (state, action) => {
      state.unitDetailLoading = false;
      state.unitDetail = action.payload;
    },
    getUnitDetailFailure: (state, action) => {
      state.unitDetailLoading = false;
      state.unitDetailError = action.payload;
    },
    setAgeFilter: (state, action) => {
      state.ageFilter = action.payload;
    },
    setWoodFilter: (state, action) => {
      state.woodFilter = action.payload;
    },
    setFoodFilter: (state, action) => {
      state.foodFilter = action.payload;
    },
    setGoldFilter: (state, action) => {
      state.goldFilter = action.payload;
    },
  },
});

export const {
  getUnits,
  getUnitsSuccess,
  getUnitsFailure,
  getUnitDetail,
  getUnitDetailSuccess,
  getUnitDetailFailure,
  setAgeFilter,
  setFoodFilter,
  setWoodFilter,
  setGoldFilter
  ,
} = unitsSlice.actions;

export default unitsSlice.reducer;
