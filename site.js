import { Filter } from "./Filter.js";
import { JobListing } from "./JobListing.js";

async function fetchAndMapData(filter) {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data.map((item) => new JobListing({ ...item, filter }));
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

async function init() {
  const filter = new Filter();

  const jobList = await fetchAndMapData(filter);

  jobList.forEach((job) => {
    job.ShowJob();
  });
}

init();
