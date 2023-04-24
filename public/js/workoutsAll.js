const newWorkoutBtn = document.getElementById('newWorkoutBtn');
const renderInfo = document.getElementById('renderInfo');

async function renderWorkout(event) {
  event.preventDefault();
  const workout_name = document.getElementById('workoutName').value;
  const duration = document.getElementById('workoutDuration').value;
  const calories_burnt = document.getElementById('workoutCalories').value;
  const workout_description = document.getElementById('workoutDescription').value
  const workout_type = document.getElementById('workoutType').value;
//   const selectedValue  = workoutType;
  
  const response = await fetch('/api/workout', {
        method: 'POST',
        body: JSON.stringify({ workout_name, duration, calories_burnt, workout_description, workout_type }),
        headers: { 'Content-Type': 'application/json' },
      });
  
    if (response.ok) {
        document.location.replace('/workouts');
      } else {
        alert(response.statusText);
      }
}

newWorkoutBtn.addEventListener('click', renderWorkout);