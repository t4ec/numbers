

var app = angular.module('numbersApp',[]);

app.controller('NumberController', function($scope) {

    function random_int(min, max) {
      if (max < min) {
        throw "Max = " + max + " is less than min = " + min;
      }
      return Math.round(Math.random() * (max - min) + min);
    }


    function shuffle(array) {
      var counter = array.length;
      var temp;
      var index;
      // While there are elements in the array
      while (counter > 0) {
          counter--;

          // Pick a random index
          index = random_int(0, counter);

          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      return array;
    }


    function gen_rand_array_with_duplicates(size, max_value, min_duplicates_num) {
      if (min_duplicates_num >= size) {
        throw("Minimal dumplicates number = " + min_duplicates_num + " >= size = " + size);
      }
      var array = [];
      var array_count = {};
      duplicates_num = 0;
      // Fill first part of array with random values
      for (i=0; i < size - min_duplicates_num; i++) {
        array[i] = random_int(0, max_value);
        if (array[i] in array_count) {
          array_count[array[i]]++;
          duplicates_num++;
          continue;
        }
        array_count[array[i]] = 1;
      }

      // Fill second part of array with duplicates
      for (i = size - min_duplicates_num; i < size; i++) {
        rand_index = random_int (0, size - min_duplicates_num - 1);
        array[i] = array[rand_index];
        // if (array[i] in array_count) {
          array_count[array[i]]++;
          duplicates_num++;
        // }
      }

      return [shuffle(array), array_count, duplicates_num];

    }

    $scope.game_status = {'win': false, 'lost': false};

    var min_duplicates_num = random_int(1, 5);
    gen_data = gen_rand_array_with_duplicates(10, 999, min_duplicates_num);
    $scope.array = gen_data[0];
    var array_count = gen_data[1];
    var duplicates_num = gen_data[2];

    $scope.remove = function(index) {
      if (!$scope.game_status['lost'] && !$scope.game_status['win']) {
        var value = $scope.array[index];
        $scope.array.splice(index, 1);
        array_count[value]--;

        if (array_count[value] == 0) {
          $scope.game_status['lost'] = true;
        }
        else {
          duplicates_num--;
        }

        if (duplicates_num == 0 && array_count[value] != 0) {
          $scope.game_status['win'] = true;
        }
      }

    }

  });
