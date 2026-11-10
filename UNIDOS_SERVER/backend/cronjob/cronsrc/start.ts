import scheduledFunction from "./cronservice.js"
import { THRESHOLDS } from "./utils/constants.js";


const ids = ["183709", "183644", "171892", "171872", "171871", "171897", "171882"];
const out = await scheduledFunction(ids, "pm02", THRESHOLDS);``
console.log(out);