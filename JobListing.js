export class JobListing {
  #jobListing;
  #id;
  #company;
  #logo;
  #isNew;
  #featured;
  #position;
  #role;
  #level;
  #postedAt;
  #contract;
  #location;
  #languages;
  #tools;

  #filter;

  #tags;

  constructor({
    id,
    company,
    logo,
    isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,

    filter,
  }) {
    this.#id = id;
    this.#company = company;
    this.#logo = logo;
    this.#isNew = isNew;
    this.#featured = featured;
    this.#position = position;
    this.#role = role;
    this.#level = level;
    this.#postedAt = postedAt;
    this.#contract = contract;
    this.#location = location;
    this.#languages = languages;
    this.#tools = tools;

    this.#filter = filter;
    this.#tags = [];
    this.#CreateElement();
  }
  ShowJob() {
    this.#jobListing.style.display = `flex`;
  }

  ContainsTag(jobTag) {
    return this.#tags.includes(jobTag);
  }

  HideJob() {
    this.#jobListing.style.display = `none`;
  }

  #CreateElement() {
    this.#jobListing = document.createElement("div");

    this.#jobListing.className = `jobListing`;
    this.#jobListing.id = this.#id;

    if (this.#featured) {
      this.#AddFeatureSideLine(this.#jobListing);
    }

    this.#AddMainJobContainer(this.#jobListing);

    const mainElement = document.querySelector("main");
    mainElement.appendChild(this.#jobListing);

    this.#jobListing.style.display = `none`;

    this.#filter.AddNewJob(this);
  }

  #AddFeatureSideLine(jobListing) {
    const isFeaturedLine = document.createElement("div");
    isFeaturedLine.className = `sideLine`;
    jobListing.appendChild(isFeaturedLine);
  }

  #AddMainJobContainer(jobListing) {
    const mainJobContainer = document.createElement(`div`);
    mainJobContainer.className = `mainJobContainer`;

    jobListing.appendChild(mainJobContainer);

    this.#AddLogo(mainJobContainer);
    this.#AddJobDescriptionContainer(mainJobContainer);
    this.#AddLineSeparator(mainJobContainer);
    this.#AddJobTags(mainJobContainer);
  }

  #AddLogo(mainJobContainer) {
    const jobLogoContainer = document.createElement(`div`);
    jobLogoContainer.className = `jobLogoContainer`;

    mainJobContainer.appendChild(jobLogoContainer);

    const img = document.createElement("img");
    img.src = this.#logo;

    jobLogoContainer.appendChild(img);
  }

  #AddJobDescriptionContainer(mainJobContainer) {
    const jobDescriptionContainer = document.createElement(`div`);
    jobDescriptionContainer.className = `jobDescriptionContainer`;

    mainJobContainer.appendChild(jobDescriptionContainer);

    this.#AddCompanyInfo(jobDescriptionContainer);
    this.#AddRole(jobDescriptionContainer);
    this.#AddJobSpecifications(jobDescriptionContainer);
  }

  #AddCompanyInfo(jobDescriptionContainer) {
    const companyInfo = document.createElement(`div`);
    companyInfo.className = `companyInfo`;
    jobDescriptionContainer.appendChild(companyInfo);

    const companyName = document.createElement(`h3`);
    companyName.className = `companyName`;
    companyName.innerText = this.#company;
    companyInfo.appendChild(companyName);

    if (this.#isNew) {
      const isNew = document.createElement(`div`);
      isNew.className = `isNew`;
      isNew.innerText = `NEW!`;
      companyInfo.appendChild(isNew);
    }

    if (this.#featured) {
      const isFeatured = document.createElement(`div`);
      isFeatured.className = `isFeatured`;
      isFeatured.innerText = `FEATURED`;
      companyInfo.appendChild(isFeatured);
    }
  }

  #AddRole(jobDescriptionContainer) {
    const role = document.createElement(`div`);
    role.className = `role`;
    role.innerText = this.#position;
    jobDescriptionContainer.appendChild(role);
  }

  #AddJobSpecifications(jobDescriptionContainer) {
    const jobSpecifications = document.createElement(`div`);
    jobSpecifications.className = `jobSpecifications`;
    jobDescriptionContainer.appendChild(jobSpecifications);

    const specification1 = document.createElement(`div`);
    specification1.className = `specification`;
    specification1.innerText = this.#postedAt;
    jobSpecifications.appendChild(specification1);

    const dot1 = document.createElement(`div`);
    dot1.className = `specificationDot`;
    jobSpecifications.appendChild(dot1);

    const specification2 = document.createElement(`div`);
    specification2.className = `specification`;
    specification2.innerText = this.#contract;
    jobSpecifications.appendChild(specification2);

    const dot2 = document.createElement(`div`);
    dot2.className = `specificationDot`;
    jobSpecifications.appendChild(dot2);

    const specification3 = document.createElement(`div`);
    specification3.className = `specification`;
    specification3.innerText = this.#location;
    jobSpecifications.appendChild(specification3);
  }

  #AddLineSeparator(mainJobContainer) {
    const lineSeparator = document.createElement(`div`);
    lineSeparator.className = `lineSeparator mobileResponsive`;
    mainJobContainer.appendChild(lineSeparator);
  }

  #AddJobTags(mainJobContainer) {
    const jobTags = document.createElement(`div`);
    jobTags.className = `jobTags`;
    mainJobContainer.appendChild(jobTags);

    this.#AddJobTag(jobTags, this.#role);
    this.#AddJobTag(jobTags, this.#level);
    this.#languages.forEach((lang) => {
      this.#AddJobTag(jobTags, lang);
    });
    this.#tools.forEach((tool) => {
      this.#AddJobTag(jobTags, tool);
    });
  }

  #AddJobTag(jobTags, tag) {
    const jobTag = document.createElement(`div`);
    jobTag.className = `jobTag`;
    jobTag.innerText = tag;
    jobTags.appendChild(jobTag);

    jobTag.addEventListener(`click`, () => {
      this.#filter.AddFilter(tag);
    });
    this.#tags.push(tag);
  }
}
