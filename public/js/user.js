
const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const weight = document.querySelector('#current-weight').value.trim();
    const goal_weight = document.querySelector('#goal-weight').value.trim();
    const height = document.querySelector('#height').value.trim();
    const age = document.querySelector('#age').value.trim();
    const bmi = document.querySelector('#bmi').value.trim();
    

    if (weight && goal_weight && height && age && bmi) {
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify({ weight, goal_weight, height, age, bmi }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const updateUserBtn = document.getElementById('updateUserbtn');
  updateUserBtn.addEventListener('click', updateFormHandler);
  