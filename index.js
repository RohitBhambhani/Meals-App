// it fetches meals from api and return it
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
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
                for (let index = 0; index < arr.length; index++) {
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
          <button id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart fa-xl" style="color: #ff0000;"></i></button>
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
              data-modal-target="defaultModal" data-modal-toggle="defaultModal"
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
