describe('Numbers game', function() {

  beforeEach(function(){
    browser.get('http://192.168.33.33:5000');
  })

  it('Show 10 numbers with duplicates', function() {
    var numbers = element.all(by.repeater('element in array track by $index'));
    expect(numbers.count()).toEqual(10);

    numbers_array = numbers.map(function (elm) {
      return elm.getText();
    });

    numbers_array.then(function(ar){
      sorted_numbers = ar.sort();

      var duplicates = [];
      for (var i = 0; i < ar.length - 1; i++) {
          if (sorted_numbers[i + 1] == sorted_numbers[i]) {
              duplicates.push(sorted_numbers[i]);
          }
      }

      expect(duplicates.length).toBeGreaterThan(0);
    });

  });

});
