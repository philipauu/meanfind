console.log('loaded frontend app');

angular.module('employees', []).controller('all_employees', do_all_employees);

function do_all_employees($scope, $http) {
    console.log('doing data stuff');

    $scope.read = function () {
        console.log('reading all records');

        $http.get('/api/v6/read')
            .then(function (results) {
                console.log(results);
                $scope.employees = results.data;
            });
    }

    $scope.read();

    $scope.create = function () {
        console.log('creating new employee');

        var data = {
            name: $scope.input.name,
            gender: $scope.input.gender,
            contact: {
                email: $scope.input.email,
                cell: $scope.input.cell,
                home: $scope.input.home
            }
        };

        $http.post('/api/v6/create', data)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
            });
    }

    $scope.update = function (employee) {
        console.log('updating employee');
        console.log(employee);

        $http.put('/api/v6/update', employee)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
            });
    }

    $scope.delete = function (employee) {
        console.log('deleting employee');
        console.log(employee);
        $http.delete('/api/v6/delete' + employee._id)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
            });
    }

}
