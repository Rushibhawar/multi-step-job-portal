import { combineReducers } from "redux";
import personalInfo from "../local/personalInfo";
import stepProgress from "../local/progress";
import educationalInfo from "../local/educationalInfo";
import workExperienceInfo from "../local/workExperienceInfo";
import skillsAndQualifications from "../local/skillsAndQualifications";

const reducers = combineReducers({
  personalInfo,
  stepProgress,
  educationalInfo,
  workExperienceInfo,
  skillsAndQualifications,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
