var app = angular.module('facultyApp', []);

// Controller to manage form and display faculty list
app.controller('FacultyController', function($scope, $http) {
    // Initialize the faculty object
    $scope.faculty = {};
    // Initialize an empty array for faculty
    $scope.faculties = [];
    
    // Initialize search term for filtering
    $scope.searchTerm = '';

    // Fetch all faculty from the backend (GET request)
    $scope.getFaculties = function() {
        $http.get('http://localhost:3000/faculties')
            .then(function(response) {
                // Populate the faculties array with the data from the backend
                $scope.faculties = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching faculty data:', error);
            });
    };

    // Submit form data to the backend (POST request)
    $scope.submitForm = function() {
        if ($scope.faculty.name && $scope.faculty.age && $scope.faculty.subject && $scope.faculty.department) {
            // POST request to add new faculty
            $http.post('http://localhost:3000/faculties', $scope.faculty)
                .then(function(response) {
                    // Refresh the faculty list after adding the new faculty
                    $scope.getFaculties();
                    // Clear the form fields
                    $scope.faculty = {};
                })
                .catch(function(error) {
                    console.error('Error adding faculty:', error);
                });
        }
    };

    // Initially load the faculties when the page is loaded
    $scope.getFaculties();
});
