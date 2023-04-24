const newMealBtn = document.getElementById('newMealBtn');
const renderInfo = document.getElementById('renderInfo');

async function renderMeal(event) {
  event.preventDefault();
  const meal_name = document.getElementById('mealName').value;
  const description = document.getElementById('mealDescription').value;
  const calories = document.getElementById('mealCalories').value;
  const meal_type = document.getElementById('mealType').value

  
  const response = await fetch('/api/meal', {
        method: 'POST',
        body: JSON.stringify({ meal_name, description, calories, meal_type }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/meals');
      } else {
        alert(response.statusText);
      }
}

newMealBtn.addEventListener('click', renderMeal);

   






// const mealInputFormHandler = async (event) => {
//     event.preventDefault();
 

//     if (name && email && password) {
//       const response = await fetch('/api/meal', {
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
