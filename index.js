// it fetches meals from api and return it
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}

//it  shows full meal details in main
async function showMealDetails(id) {
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

    await fetchMealsFromApi(url, id).then((data) => {
        const modal = document.getElementById("detailModal")
        modal.classList.remove("hidden")
        document.getElementById("detail-heading").innerHTML = data.meals[0].strMeal;
        document.getElementById("detail-category").innerHTML = "Category : " + data.meals[0].strCategory;
         document.getElementById("detail-area").innerHTML = "Area : " + data.meals[0].strArea;
         
         document.getElementById("detail-instructions").innerHTML =  data.meals[0].strInstructions
         document.getElementById("detail-video").href =  data.meals[0].strYoutube
         document.getElementById("detail-article").href = data.meals[0].strSource
         document.getElementById("detail-image").src =
         data.meals[0].strMealThumb

    });

}

function closeModal() {
     const modal = document.getElementById("detailModal")
        modal.classList.add("hidden")
}

// it shows all favourites meals in favourites body
async function showFavMealList() {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
  
    if (arr?.length == 0) {
        html += `
    `;
    } else {
        for (let index = 0; index < arr?.length; index++) {
            await fetchMealsFromApi(url, arr[index]).then((data) => {
                  const element = data.meals[0];
                html += `
                <div
          class="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative mb-4"
        >
         <div class="flex">
          <div class=" flex-1">
          <span
            class="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 inline-block mb-4"
            >${element.strCategory}</span
          ></div>
          <button id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class= "fa-solid fa-heart fa-xl" style="color: #ff0000;"></i></button>
        </div>

          <img
            class="w-64 mx-auto transform transition duration-300 hover:scale-105"
            src="${element.strMealThumb}"
            alt=""
          />
          <div class="flex flex-col items-center my-3 space-y-2">
            <h1 class="text-gray-900 poppins text-lg">${element.strMeal}</h1>
            

            <button
              class="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
              onclick="showMealDetails(${element.idMeal})"
            >
              More Details
            </button>
          </div>
        </div>
                `;
            });
        }
    }
    document.getElementById("favourites-body").innerHTML = html;
}


// it show's all meals card in main acording to search input value
function showMealList() {
    let inputValue = document.getElementById("search-bar").value;
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals = fetchMealsFromApi(url, inputValue);
    meals.then((data) => {
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav = false;
                for (let index = 0; index < arr?.length; index++) {
                    if (arr[index] == element.idMeal) {
                        isFav = true;
                    }
                }

                    html += `
                <div
          class="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative"
        >
         <div class="flex">
          <div class=" flex-1">
          <span
            class="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 inline-block mb-4"
            >${element.strCategory}</span
          ></div>
          <button id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="${isFav ? "fa-solid": "fa-regular"} fa-heart fa-xl" style="color: #ff0000;"></i></button>
        </div>

          <img
            class="w-64 mx-auto transform transition duration-300 hover:scale-105"
            src="${element.strMealThumb}"
            alt=""
          />
          <div class="flex flex-col items-center my-3 space-y-2">
            <h1 class="text-gray-900 poppins text-lg">${element.strMeal}</h1>
            

            <button
              class="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
              onclick="showMealDetails(${element.idMeal})"
            >
              More Details
            </button>
          </div>
        </div>
                `;
                
            });
            document.getElementById("meals").innerHTML = html;
            document.getElementById("no-result").innerHTML = "";
        } else {
            html += `
            <div class="flex h- items-center justify-center p-5 bg-primary w-full">
  <div class="text-center">
    <div class="inline-flex rounded-full bg-yellow-100 p-2">
      <div class="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
        <svg class="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
    <h1 class="mt-5 text-[36px] font-bold text-white lg:text-[50px]">Meal not found</h1>
    
  </div>
</div>
            `;
            document.getElementById("no-result").innerHTML = html;
            document.getElementById("meals").innerHTML = "";


        }
        
    });
}

//it adds and remove meals to favourites list
function addRemoveToFavList(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let contain = false;
    for (let index = 0; index < arr?.length; index++) {
        if (id == arr[index]) {
            contain = true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        alert("Meal removed from favourites list");
    } else {
        arr.push(id);
        alert("Meal added to favourites list");
    }
    localStorage.setItem("favouritesList", JSON.stringify(arr));
    showMealList();
    showFavMealList();
}

