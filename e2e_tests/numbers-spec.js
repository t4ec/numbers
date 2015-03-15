describe('Numbers game', function() {


  // Return difference between 'this' and array
  // Exaple: [1, 1, 1, 2] - [1, 1, 1] => [2]
  Array.prototype.diff = function(array) {
    // Copy our arrays
    var copy = this.slice();

    for (i=0;i < array.length;i++ ) {
      copy_index = copy.indexOf(array[i]);
      if (copy_index >= 0) {
        copy.splice(copy_index, 1);
      }
    }

    return copy;
  }


  // Return array consisting of duplicated elements, last one is not included
  // Example: [1, 1, 1, 2] => [1, 1]
  function get_extra_duplicates(array) {
    sorted_numbers = array.sort();
    var duplicates = [];
    for (var i = 0; i < array.length - 1; i++) {
        if (sorted_numbers[i + 1] == sorted_numbers[i]) {
            duplicates.push(sorted_numbers[i]);
        }
    }
    return duplicates;
  }


  // Return array consisting of duplicated elements including last one
  // Example: [1, 1, 1, 2] => [1, 1, 1]
  function get_duplicates(array) {
    sorted_numbers = array.sort();
    var duplicates = [];
    for (var i = 0; i < array.length - 1; i++) {
        if (sorted_numbers[i + 1] == sorted_numbers[i]) {
            duplicates.push(sorted_numbers[i], sorted_numbers[i + 1]);

        }
    }
    return duplicates;
  }


  // Return array consisting of all number not having duplicates in array
  // Example: [1, 1, 1, 2] => [2]
  function get_unique_elements(array) {
    var duplicates = get_duplicates(array);
    return array.diff(duplicates);
  }


  function get_numbers() {
    return element.all(by.repeater('element in array track by $index'));
  }


  beforeEach(function(){
    browser.get('http://192.168.33.33:5000');
  });


  it('should show 10 numbers with duplicates', function() {
    var numbers = get_numbers();
    expect(numbers.count()).toEqual(10);

    numbers_array = numbers.map(function (elm) {
      return elm.getText();
    });

    numbers_array.then(function(array){
      var duplicates = get_extra_duplicates(array);
      expect(duplicates.length).toBeGreaterThan(0);
      expect(duplicates.length).toBeLessThan(10);
    });

  });


  it('should remove number when we click it', function() {
    var numbers = get_numbers();
    // Check that we have 10 numbers
    expect(numbers.count()).toEqual(10);
    numbers_array = numbers.map(function (elm) {
      return elm.getText();
    });
    numbers_array.then(function(array){
      element.all(by.buttonText(array[0])).get(0).click();
      var numbers_after = get_numbers();
      // Check that we have 9 numbers
      expect(numbers_after.count()).toEqual(9);
      numbers_after.map(function (elm) {
        return elm.getText();
      }).then(function(array_after){
        expect(array.diff(array_after)[0]).toEqual(array[0]);
      });
    });
  });


  it('should show "Victory" message if all duplicates are removed', function(){
    var numbers = get_numbers();
    numbers_array = numbers.map(function (elm) {
      return elm.getText();
    });
    numbers_array.then(function(array){
      var duplicates = get_extra_duplicates(array);
      for (i=0;i<duplicates.length;i++) {
        element.all(by.buttonText(duplicates[i])).get(0).click();
      }
    expect(element(by.css(".alert")).getText()).toEqual("Victory");
    });

  });


  it('should show "Game Over" message if unique number is clicked', function(){
    var numbers = get_numbers();
    numbers_array = numbers.map(function (elm) {
      return elm.getText();
    });
    numbers_array.then(function(array){
      var unique_elements = get_unique_elements(array);
      element(by.buttonText(unique_elements[0])).click();
    expect(element(by.css(".alert")).getText()).toEqual("Game Over");
    });
  });

});
