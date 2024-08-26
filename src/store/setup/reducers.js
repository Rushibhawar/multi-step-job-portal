import { combineReducers } from "redux";
import personalInfo from "../local/personalInfo";
import stepProgress from "../local/progress";
import educationalInfo from "../local/educationalInfo";
import workExperienceInfo from "../local/workExperienceInfo";

const reducers = combineReducers({
  personalInfo,
  stepProgress,
  educationalInfo,
  workExperienceInfo,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
