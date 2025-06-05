

export const featureFields = {
    "Summary": { type: "free", values: [] },
    "Priority": { type: "enum", values: ["Highest", "High", "Medium", "Low", "Lowest"] },
    "Component/s": { type: "free", values: [] },
    "Fix Version/s": { type: "free", values: [] },
    "Label": { type: "free", values: [] },
    "Acceptance Criteria": { type: "free", values: [] },
    "Description": { type: "free", values: [] },
    "Assignee": { type: "free", values: [] },
    "Sprint": { type: "free", values: [] },
    "Story point estimate": { type: "enum", values: ["1", "3", "5", "8"] },
    "Reporter": { type: "free", values: [] },
  };
  
  export const storyFields = {
    "Summary": { type: "free", values: [] },
    "Feature Link": { type: "free", values: [] },
    "Fix Version/s": { type: "free", values: [] },
    "Component/s": { type: "free", values: [] },
    "Label": { type: "free", values: [] },
    "Priority": { type: "enum", values: ["Highest", "High", "Medium", "Low", "Lowest"] },
    "Acceptance Criteria": { type: "free", values: [] },
    "Reporter": { type: "free", values: [] },
    "Description": { type: "free", values: [] },
    "Assignee": { type: "free", values: [] },
    "Sprint": { type: "free", values: [] },
    "Story point estimate": { type: "enum", values: ["1", "3", "5", "8"] },
  };
  
  export function getFieldConfig(type: "epic" | "story") {
    const fields = type === "epic" ? featureFields : storyFields;
    return Object.entries(fields).map(([key, config]) => ({
      key,
      ...config,
    }));
  }
  