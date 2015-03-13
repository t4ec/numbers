angular.module('numbersApp', [])
  .controller('NumberController', ['$scope', function($scope) {


    function shuffle(array) {
      var counter = array.length;
      var temp;
      var index;

      // While there are elements in the array
      while (counter > 0) {
          counter--;

          // Pick a random index
          index = Math.round(Math.random() * counter);

          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      console.log(array);
      return array;
    }


    function gen_rand_array_with_duplicates(size, max_value, duplicates_num) {
      var array = [];
      // Fill first part of array with random values
      for (i=0; i < size - duplicates_num; i++) {
        array[i] = Math.round(Math.random() * max_value);
      }

      // Fill second part of array with duplicates
      for (i = size - duplicates_num; i < size; i++) {
        rand_index = Math.round(Math.random() * (size - duplicates_num));
        array[i] = array[rand_index];
      }

      return shuffle(array);
    }

    var duplicates_num = 1 + Math.round(Math.random() * 8);
    $scope.array = gen_rand_array_with_duplicates(10, 200, duplicates_num);

    // $scope.todos = [
    //   {text:'learn angular', done:true},
    //   {text:'build an angular app', done:false}];

    // $scope.addTodo = function() {
    //   $scope.todos.push({text:$scope.todoText, done:false});
    //   $scope.todoText = '';
    // };

    // $scope.remaining = function() {
    //   var count = 0;
    //   angular.forEach($scope.todos, function(todo) {
    //     count += todo.done ? 0 : 1;
    //   });
    //   return count;
    // };

    // $scope.archive = function() {
    //   var oldTodos = $scope.todos;
    //   $scope.todos = [];
    //   angular.forEach(oldTodos, function(todo) {
    //     if (!todo.done) $scope.todos.push(todo);
    //   });
    // };
  }]);
