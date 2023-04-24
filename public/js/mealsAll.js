 
    const mealName = document.getElementById('mealName').value.trim();
    const mealDescription = document.getElementById('mealDescription').value.trim();
    const mealCalories = document.getElementById('mealCalories').value.trim();
    const mealType = document.getElementById('mealType')
    const newMealBtn = document.getElementById('newMealBtn')
    const renderInfo = document.getElementById('renderInfo')


   






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
  
  const selectedValue = mealType.value;

  function renderMeal(event){
    event.preventDefault()
    renderInfo.innerHTML = `

    <h1>Meal Name:</h1 
    <p>${mealName}</p>

    <h1>Meal Description:</h1 
    <p>${mealDescription}</p>

    <h1>Meal Type:</h1 
    <p>${selectedValue}</p>

    <h1>Meal Calories:</h1 
    <p>${mealCalories}</p>
    `


  }


  newMealBtn.addEventListener('click', renderMeal)
