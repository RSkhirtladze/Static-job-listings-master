export class Filter {
  #filterElement;

  #allJobElements;
  #activeFilters;

  #clearDiv;
  #filtersContainer;

  constructor() {
    this.#filterElement = document.createElement(`div`);
    this.#filterElement.id = `filterDiv`;

    this.#filtersContainer = document.createElement(`div`);
    this.#filtersContainer.className = `filtersContainer`;
    this.#filterElement.appendChild(this.#filtersContainer);

    this.#clearDiv = document.createElement(`div`);
    this.#clearDiv.className = `clearDiv`;
    this.#clearDiv.innerText = `Clear`;
    this.#clearDiv.addEventListener(`click`, () => {
      this.#HideFilter();
      this.#ResetFilter();
    });
    this.#filterElement.appendChild(this.#clearDiv);

    const mainElement = document.querySelector("main");
    mainElement.prepend(this.#filterElement);

    this.#HideFilter();

    this.#allJobElements = [];
    this.#activeFilters = {};
  }

  AddFilter(jobTag) {
    if (!(jobTag in this.#activeFilters)) {
      this.#ShowFilter();
      this.#AddFilterTagToFilterDiv(jobTag);

      this.#allJobElements.forEach((job) => {
        if (job.ContainsTag(jobTag)) {
          job.HideJob();
        }
      });
    }
  }

  #AddFilterTagToFilterDiv(jobTag) {
    const filter = document.createElement(`div`);
    filter.className = `filter`;
    this.#filtersContainer.appendChild(filter);

    const filterType = document.createElement(`div`);
    filterType.className = `filterType`;
    filterType.innerText = jobTag;
    filter.appendChild(filterType);

    // const deleteFilter = document.createElement(`img`);
    // deleteFilter.className = `deleteFilter`;
    // deleteFilter.src = "./images/icon-remove.svg";

    const svgNS = "http://www.w3.org/2000/svg";

    // Create the main SVG element
    const deleteFilter = document.createElementNS(svgNS, "svg");
    deleteFilter.setAttribute("width", "32");
    deleteFilter.setAttribute("height", "32");
    deleteFilter.setAttribute("viewBox", "0 0 32 32");
    deleteFilter.setAttribute("fill", "none");

    // Create the first 'path' element
    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttribute(
      "d",
      "M0 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H0V0Z"
    );
    path1.setAttribute("fill", "#5CA5A5");
    deleteFilter.appendChild(path1); // Append the first 'path' to the SVG

    // Create the second 'path' element
    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute("fill-rule", "evenodd");
    path2.setAttribute("clip-rule", "evenodd");
    path2.setAttribute(
      "d",
      "M22.435 11.1213L20.3137 9L15.7175 13.5962L11.1213 9L9 11.1213L13.5962 15.7175L9 20.3137L11.1213 22.435L15.7175 17.8388L20.3137 22.435L22.435 20.3137L17.8388 15.7175L22.435 11.1213Z"
    );
    path2.setAttribute("fill", "white");
    deleteFilter.appendChild(path2); // Append the second 'path' to the SVG

    // Set class for styling (if needed)
    deleteFilter.classList.add("deleteFilter");

    deleteFilter.addEventListener(`mouseenter`, () => {
      path1.setAttribute("fill", "#2B3939");
    });
    deleteFilter.addEventListener(`mouseleave`, () => {
      path1.setAttribute("fill", "#5CA5A5");
    });

    deleteFilter.addEventListener(`click`, () => {
      this.RemoveFilter(jobTag);
    });
    filter.appendChild(deleteFilter);

    this.#activeFilters[jobTag] = filter;
  }

  #ResetFilter() {
    for (let key of Object.keys(this.#activeFilters)) {
      this.#activeFilters[key].remove();
      delete this.#activeFilters[key];
    }
    this.#HideFilter();

    this.#allJobElements.forEach((job) => {
      job.ShowJob();
    });
  }

  RemoveFilter(jobTag) {
    this.#activeFilters[jobTag].remove();
    delete this.#activeFilters[jobTag];

    this.#allJobElements.forEach((job) => {
      let shouldShowJob = true;
      for (let key of Object.keys(this.#activeFilters)) {
        if (job.ContainsTag(key)) {
          shouldShowJob = false;
          break;
        }
      }
      if (shouldShowJob) {
        job.ShowJob();
      }
    });

    if (Object.keys(this.#activeFilters).length === 0) {
      this.#HideFilter();
    }
  }

  AddNewJob(job) {
    this.#allJobElements.push(job);
  }

  #HideFilter() {
    this.#filterElement.style.display = `none`;
  }

  #ShowFilter() {
    this.#filterElement.style.display = `flex`;
  }
}
