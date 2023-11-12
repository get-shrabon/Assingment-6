// Create All Tabs Buttons

const tabsParent = document.getElementById("pills-tab");

const handleCatagory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const button = await res.json();
  button.data.forEach((data) => {
    const tabs = document.createElement("li");
    tabs.innerHTML = `
        <li class="nav-item">
          <button  onclick="loadData(${data.category_id})"
            class="nav-link"
            id=""
            data-bs-toggle="pill"
            type="button"          
            aria-controls="pills-home"
            aria-selected="true"
          >
            ${data.category}
          </button>
        </li>
`;

    tabsParent.appendChild(tabs);
  });
};

// All category API Get With Fetch

const loadData = async (id = "1000") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const dataArray = await res.json();
  const singleData = dataArray.data;
  console.log(singleData);
  const dContent = document.getElementById("disable__content");
  dContent.textContent = " ";
  if (singleData.length === 0) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
     <img src="./Assets/Images/Icon.png" alt="" />
          <h3 class="fw-bold mt-3">
            Oops!! Sorry, There is no <br />
            content here
          </h3>
    `;
    dContent.appendChild(newDiv);
  }
  const cardContainer = document.getElementById("card__container");
  cardContainer.innerHTML = "";
  for (const data of singleData) {
    console.log(data)
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
     <div class="card h-100">
     <div class="position-relative">
      <img src="${data.thumbnail}" class="card-img-top" alt="...">
        <p class="m-0 p date__time">${convertTime(
          data?.others?.posted_date
        )}</p>
     </div>
      <div class="card-body">
    <div class="d-flex align-items-center gap-3">
      <img class="img-fluid rounded-circle author__img" src="${
        data?.authors[0].profile_picture
      }" alt="">
      <div>
      <h5 class="card-title">${data.title}</h5>
      <p class="m-0 p"><span>${data?.authors[0].profile_name}</span> <span>${
      data.authors[0].verified
        ? '<img class = "pl-3" src = "./Assets/Images/right-sign.png">'
        : ""
    }</span></p>
      <p class="m-0 p">${data?.others?.views}</p>
    
      </div>
    </div>

      </div>
    </div>
    `;
    cardContainer.appendChild(card);
  }
};
function convertTime(totalSeconds) {
  if (totalSeconds < 0) {
    throw new Error("Input must be a non-negative number of seconds.");
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const result = hours + "hrs" + " " + minutes + "min" + " " + seconds + "sec";

  return result;
}
handleCatagory();

loadData();
