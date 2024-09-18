// Wait until the DOM is fully loaded before running any JavaScript code
document.addEventListener('DOMContentLoaded', () => {

    // Grab the modal element by its ID
    const modal = document.getElementById('myModal');

    // Grab the button that opens the modal
    const openModalBtn = document.getElementById('addListBtn');

    // Grab the 'close' element inside the modal (the back arrow)
    const closeModalBtn = document.getElementsByClassName('close')[0];

    // Grab the 'Create List' button inside the modal
    const createListBtn = document.getElementById('createListBtn');

    // Grab the 'Delete List' button on the main screen
    const deleteListBtn = document.getElementById('deleteListBtn');

    // Grab the container where the lists will be added
    const listContainer = document.getElementById('listContainer');

    // -------- Modal Functionality -------- //

    // Open the modal when the "Add List" button is clicked
    openModalBtn.onclick = function() 
        {
            modal.style.display = 'block'; // Show the modal
        }

    // Close the modal when the 'close' element is clicked
    closeModalBtn.onclick = function() 
        {
            modal.style.display = 'none'; // Hide the modal
        }

    // Close the modal when clicking outside of it
    window.onclick = function(event) 
        {
            if (event.target === modal) 
                {
                    modal.style.display = 'none'; // Hide the modal if outside area is clicked
                }
        }

    // -------- CREATE LIST Functionality -------- //

    // When the "Create List" button is clicked
    createListBtn.addEventListener('click', () => 
        {
            // Get the values of the title and note inputs from the modal
            const title = document.getElementById('listTitle').value;
            const note = document.getElementById('listNote').value;

            // Check if title is empty
            if (title.trim() !== '') 
                {
                // Create a new 'div' for each list item
                const listDiv = document.createElement('div');

                // Add class 'list-item' to each new list item for styling
                listDiv.className = 'list-item';

                // Add HTML for the title and note inside the list div
                listDiv.innerHTML = `<h3>${title}</h3><p>${note}</p>`;

                // Append the new list item to the container on the main screen
                listContainer.appendChild(listDiv);

                // Reset input fields to empty for title and note
                document.getElementById('listTitle').value = '';
                document.getElementById('listNote').value = '';

                // Close the modal after list creation
                modal.style.display = 'none';
                } 
            else 
                {
                    alert("Title cannot be empty.");
                }
        });

    // -------- DELETE LIST Functionality -------- //
    deleteListBtn.addEventListener('click', () => 
        {
            // Check if there is at least one list item to delete
            if (listContainer.lastElementChild)
                {
                    // Remove the last list item added to the container
                    listContainer.lastElementChild.remove();
                }
            else
                {
                    alert("No lists detected");
                }
        });
});
