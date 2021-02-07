
const allItems = document.getElementById('foods');
const searchBtn = document.getElementById('searchBtn');
const error = document.getElementById('error');

searchBtn.addEventListener('click', function () {
    const serchInput = document.getElementById('serchInput').value;
    allItems.innerHTML = '';
    if (serchInput === '') {
     error.style.display = 'block';
    } else {
    getFood(serchInput);
    error.style.display = 'none';
    }
});

const mealInfo = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
    rendermealInfo(data.meals[0]);
    });
};


function getFood(meals) {
    const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`;
    fetch(api)
    .then(res => res.json())
    .then(data => {
    displayFoods(data.meals);
    });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
            const foodDiv = document.createElement('div');
            foodDiv.className = 'col-md-3';
            const foodInfo = `
                <div onclick="mealInfo('${food.idMeal}')" class="border rounded text-center h-80" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="img">
                <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                </div>
                `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            error.style.display = 'block';
        }
    };
}

const rendermealInfo = meal => {
    const mealDetailsDiv = document.getElementById('mealsDetails');
    mealDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${meal.strMealThumb}" alt="">
    <h4>${meal.strMeal}</h4>
    <h5 class="pt-3 pb-2">Material</h5>
    <ul class="list-unstyled mb-0">
        <li>${meal.strIngredient1}</li>
        <li>${meal.strIngredient2}</li>
        <li>${meal.strIngredient3}</li>
        <li>${meal.strIngredient4}</li>
    </ul>

`;
};
