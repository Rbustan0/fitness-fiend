const newMealBtn = document.getElementById('newMealBtn');
const renderInfo = document.getElementById('renderInfo');

function renderMeal(event) {
  event.preventDefault();
  const mealName = document.getElementById('mealName').value;
  const mealDescription = document.getElementById('mealDescription').value;
  const mealCalories = document.getElementById('mealCalories').value;
  const mealType = document.getElementById('mealType').value
  const selectedValue = mealType;
  
  renderInfo.innerHTML = `
    <h1>Meal Name:</h1><p>${mealName}</p>
    <h1>Meal Description:</h1><p>${mealDescription}</p>
    <h1>Meal Type:</h1><p>${selectedValue}</p>
    <h1>Meal Calories:</h1><p>${mealCalories}</p>`;
}

newMealBtn.addEventListener('click', renderMeal);

   






// const mealInputFormHandler = async (event) => {
//     event.preventDefault();
 

//     if (name && email && password) {
//       const response = await fetch('/api/user', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert(response.statusText);
//       }
//     }
//   };
  
