document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Display existing students on page load
    displayStudents();

    // Add new student record
    studentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        // Input validation
        if (!validateInputs(studentName, studentID, email, contact)) {
            return;
        }

        // Add the new student
        const newStudent = { studentName, studentID, email, contact };
        students.push(newStudent);

        // Save to localStorage
        localStorage.setItem('students', JSON.stringify(students));

        // Clear the form
        studentForm.reset();

        // Display updated student list
        displayStudents();
    });

    // Function to display students
    function displayStudents() {
        studentList.innerHTML = ''; // Clear the table

        students.forEach((student, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.studentName}</td>
                <td>${student.studentID}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;

            studentList.appendChild(row);
        });

        // Add scrollbar dynamically if needed
        if (studentList.scrollHeight > studentList.clientHeight) {
            studentList.style.overflowY = 'scroll';
        } else {
            studentList.style.overflowY = 'auto';
        }
    }

    // Edit student record
    window.editStudent = function (index) {
        const student = students[index];

        document.getElementById('studentName').value = student.studentName;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        // Remove the old entry and update on form submission
        students.splice(index, 1);
    };

    // Delete student record
    window.deleteStudent = function (index) {
        students.splice(index, 1);

        // Update localStorage and display
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };

    // Validate inputs before adding to the list
    function validateInputs(studentName, studentID, email, contact) {
        const nameRegex = /^[A-Za-z\s]+$/;
        const idRegex = /^\d+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d+$/;

        // Check for empty fields
        if (!studentName || !studentID || !email || !contact) {
            alert('Please fill in all fields.');
            return false;
        }

        // Validate student name (only characters)
        if (!nameRegex.test(studentName)) {
            alert('Student name should only contain letters and spaces.');
            return false;
        }

        // Validate student ID (only numbers)
        if (!idRegex.test(studentID)) {
            alert('Student ID should only contain numbers.');
            return false;
        }

        // Validate email (valid email format)
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Validate contact (only numbers)
        if (!contactRegex.test(contact)) {
            alert('Contact number should only contain numbers.');
            return false;
        }

        return true;
    }
});
