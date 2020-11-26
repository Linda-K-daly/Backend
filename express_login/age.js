

const ageCalculator = function (dateOfbirth) {
  var today = new Date();
  var birthday = new Date(dateOfbirth)
  var age = 0;

  age = today.getFullYear() - birthday.getFullYear();

  return age;
}; ageCalculator()
// console.log(ageCalculator("2004-06-02"));


module.exports = ageCalculator;