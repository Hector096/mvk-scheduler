import {
  PATIENT_SUCCESS,
  PATIENT_FAIL,
} from '../actions/types';

const initialState = { patients: [] };

export default function patient(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PATIENT_SUCCESS:
      return {
        ...state,
        patients: payload.patients,
      };
    case PATIENT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
