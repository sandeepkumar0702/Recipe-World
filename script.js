document.addEventListener("DOMContentLoaded", function () {
    
  const recipeForm = document.getElementById("recipe-form");

  if (recipeForm) {
      recipeForm.addEventListener("submit", function (event) {
          event.preventDefault(); 
          
          const recipeName = document.getElementById("recipe-name").value.trim();
          const ingredients = document.getElementById("ingredients").value.trim().split("\n");
          const category = document.getElementById("category").value;
          const preparation = document.getElementById("preparation").value.trim();

          if (recipeName === "" || ingredients.length === 0 || preparation === "") {
              alert("Please fill in all fields.");
              return;
          }

          const recipe = {
              id: Date.now(), 
              name: recipeName,
              ingredients: ingredients,
              category: category,
              preparation: preparation,
          };

          let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
          recipes.push(recipe);
          localStorage.setItem("recipes", JSON.stringify(recipes));

          alert("Recipe added successfully!");

          recipeForm.reset();

          window.location.href = "index.html";
      });
  }

  const recipeList = document.getElementById("recipe-list");
  if (recipeList) {
      displayRecipes();
  }

  function displayRecipes(filterCategory = "All") {
      recipeList.innerHTML = "";

      let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

      if (filterCategory !== "All") {
          recipes = recipes.filter(recipe => recipe.category === filterCategory);
      }

      if (recipes.length === 0) {
          recipeList.innerHTML = "<p>No recipes available.</p>";
          return;
      }

      recipes.forEach(recipe => {
          const recipeCard = document.createElement("div");
          recipeCard.classList.add("recipe-card");
          recipeCard.innerHTML = `
              <h3>${recipe.name}</h3>
              <p><strong>Category:</strong> ${recipe.category}</p>
              <p><strong>Ingredients:</strong></p>
              <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
              <p><strong>Preparation:</strong> ${recipe.preparation}</p>
          `;
          recipeList.appendChild(recipeCard);
      });
  }

  const filterCategory = document.getElementById("filter-category");
  if (filterCategory) {
      filterCategory.addEventListener("change", function () {
          displayRecipes(this.value);
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeToggle.textContent = 'Switch to Light Mode';
    } else {
      themeToggle.textContent = 'Switch to Dark Mode';
    }
    
    const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('preferredTheme', currentMode);
  });
  
  const savedTheme = localStorage.getItem('preferredTheme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Switch to Light Mode';
  }
});