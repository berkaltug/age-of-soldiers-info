import { call, put, takeEvery } from "redux-saga/effects";
import { getUnitDetail, getUnits } from "../../service/unitService";
import {
    getUnitDetailFailure,
    getUnitDetailSuccess,
  getUnitsFailure,
  getUnitsSuccess,
} from "../slices/unitSlice";

function* workerUnitGet(action: any):any {
  try {
    const units = yield call(() => getUnits(action.payload));
    yield put(getUnitsSuccess(units));
  } catch (_) {
    yield put(getUnitsFailure("An error happened while getting units"));
  }
}

function* workerUnitDetailGet(action: any):any {
  try {
    const detail = yield call(() => getUnitDetail(action.payload));
    yield put(getUnitDetailSuccess(detail));
  } catch (_) {
    yield put(getUnitDetailFailure("An error happened while getting unit detail"));
  }
}

function* unitSaga() {
  yield takeEvery("units/getUnits", workerUnitGet);
  yield takeEvery("units/getUnitDetail", workerUnitDetailGet);
}

export default unitSaga;
