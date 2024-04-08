// Get the form element
const form = document.getElementById("github-form");

// Add an event listener for form submission
form.addEventListener("submit", handleSubmit);

// Function to handle form submission
function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get the value of the search input
    const inputValue = event.target.search.value;
    
    // Call the getUser function with the input value
    getUser(inputValue);
}

// Function to fetch user data from GitHub API
function getUser(inputValue) {
    // Fetch user data based on the input value
    fetch(`https://api.github.com/search/users?q=${inputValue}`)
    .then(res => res.json())
    .then(data => {
        // Log the fetched data
        console.log(data);
        
        // Extract the array of users from the response data
        const usersArray = data.items;
        
        // Iterate through each user in the array
        usersArray.forEach(user => {
            // Call the createLi function to create list items for each user
            createLi(user);
        });
    });
}

// Function to create list items for users
function createLi(user) {
    // Get the user list element
    const ul = document.getElementById("user-list");
    
    // Create a list item
    const li = document.createElement("li");
    li.innerHTML = `
        <p>User_Name: ${user.login}</p>
        <img src="${user.avatar_url}"> 
        <a href="${user.html_url}">Profile link</a>
    `;
    
    // Add a click event listener to the list item
    li.addEventListener('click', (event) => {
        // Get the GitHub username of the clicked user
        const githubName = user.login;
        
        // Call the getRepo function with the GitHub username
        getRepo(githubName);
    });
    
    // Append the list item to the user list
    ul.appendChild(li);
}

// Function to fetch user repositories from GitHub API
function getRepo(githubName) {
    // Fetch user repositories based on the GitHub username
    fetch(`https://api.github.com/users/${githubName}/repos`)
    .then(res => res.json())
    .then(data => {
        // Get the repository list element
        const ulRepo = document.getElementById("repos-list");
        
        // Clear the repository list
        ulRepo.innerHTML = "";
        
        // Iterate through each repository in the fetched data
        data.forEach(repo => {
            // Create a list item for each repository
            const li = document.createElement("li");
            li.innerHTML = `
                <h2>Repo Name: ${repo.full_name}</h2>
                <a href="${repo.html_url}">To the Repo</a><br>
                <a href="${repo.clone_url}">Clone the repo</a><br>
                <a href="${repo.fork_url}">Fork the repo</a>
            `;
            
            // Append the repository list item to the repository list
            ulRepo.appendChild(li);
        });
    });
}
