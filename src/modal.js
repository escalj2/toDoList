document.addEventListener('DOMContentLoaded', () => {
    // Grab the modal and button elements
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('addListBtn');
    const closeModalBtn = document.getElementsByClassName('close')[0];
    const createListBtn = document.getElementById('createListBtn');
    const deleteListBtn = document.getElementById('deleteListBtn');
    const listContainer = document.getElementById('listContainer');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmYesBtn = document.getElementById('confirmYesBtn');
    const confirmNoBtn = document.getElementById('confirmNoBtn');

    // Initialize the lists array from localStorage or empty if not available
    let lists = JSON.parse(localStorage.getItem('lists')) || [];
    let editingIndex = null; // Tracks which item is being edited

    // Function to display the lists on the page
    function displayLists() {
        // Clear existing lists in the UI
        listContainer.innerHTML = ''; 

        // Loop through the lists and render each one
        lists.forEach((list, index) => {
            const listDiv = document.createElement('div');
            listDiv.className = 'list-item';
            listDiv.innerHTML = `
                        <h3>${list.title}</h3>
                        <p>${list.note}</p>
                        <button class="edit-btn" data-index="${index}">Edit</button>`;
            listContainer.appendChild(listDiv);
        });

        // Add event listener to the edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                editList(index);
            });
        });
    }

    // Function to save the lists array to localStorage
    function saveLists() {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    // Function to handle editing a list item
    function editList(index){
        // Pre-fill modal fields with the current title and note
        const list = lists[index];
        document.getElementById('listTitle').value = list.title;
        document.getElementById('listNote').value = list.note;
        modal.style.display = 'block';
        // Tracks which item is being edited
        editingIndex = index;

        // Change the button text to "Save Changes"
        createListBtn.textContent = 'Save Changes';
    }

    // Reset modal button and input fields after adding or editing a list
    function resetModal() {
        document.getElementById('listTitle').value = '';
        document.getElementById('listNote').value = '';
        // Reset button text
        createListBtn.textContent = 'Create List';
        editingIndex = null;
        modal.style.display = 'none'
    }

    // Open the modal when "Add List" button is clicked
    openModalBtn.onclick = function() {
        modal.style.display = 'block'; // Show the modal
    };

    // Close the modal when the 'close' element is clicked
    closeModalBtn.onclick = function() {
        modal.style.display = 'none'; // Hide the modal
    };

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal if outside area is clicked
        }
    };

    // -------- CREATE OR EDIT LIST Functionality -------- //
    createListBtn.addEventListener('click', () => {
        const title = document.getElementById('listTitle').value;
        const note = document.getElementById('listNote').value;

        if (title.trim() !== '') {
            if (editingIndex !== null){
                lists[editingIndex] = {title, note};
            }
            else {
                // Add new list to the array
                lists.push({ title, note });
            }
        

            // Save the updated list array to localStorage
            saveLists();

            // Redisplay the lists
            displayLists();

            // Reset input fields
            document.getElementById('listTitle').value = '';
            document.getElementById('listNote').value = '';

            // Close the modal
            modal.style.display = 'none';
        } else {
            alert("Title cannot be empty.");
        }
    });

    // -------- DELETE LIST Functionality -------- //
    deleteListBtn.addEventListener('click', () => {
        if (lists.length > 0) {
            // Display confirmation message
            confirmationModal.style.display = 'block';
        } else {
            alert("No lists detected");
        }
    });

    // If 'Yes' button is clicked in the confirmation modal
    confirmYesBtn.addEventListener('click', () => {
        // Remove the last list from the array
        lists.pop();

        // Save the updated lists array to localStorage
        saveLists();

        // Redisplay the lists
        displayLists();

        // Close confirmation modal
        confirmationModal.style.display = 'none';
    });

    // If 'No' button is clicked in the confirmation modal
    confirmNoBtn.addEventListener('click', () => {
        // Close confirmation modal without deleting the list
        confirmationModal.style.display = 'none';
    });

    // Display the lists when the app loads
    displayLists();
});
