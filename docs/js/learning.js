
// 4. object - class :  
// - Nó là cục thông tin chứa nhiều trường
// - Là 1 cách định nghĩa hành động ngoài đời
// language class : Date , Error , Objrect , Array , ... 

// let date1 = new Date()
// console.log(date1.toISOString())
// console.log(date1.getDate())
// console.log(date1.getFullYear())
// let date2 = new Date('1990-01-11')
// console.log(date2.toLocaleString())
// console.log(date2.toLocaleDateString())

// class Human { 
//   constructor(name , age) { 
//     this.name = name 
//     this.age = age 
//   }
//   speak() {
//     console.log("Human Speak !")
//   }
// }
// // kế thừa : extends
// class Student extends Human {
//   // hàm tạo 
//   // constructor(name , age) {
//   //   this.name = name 
//   //   this.age = age 
//   // }
//   learn() {
//     console.log(this.name + ' learning.. ')
//   }
//   // Override : Đa hình - Hàm 
//   speak() {
//     console.log("Student Speak ")
//   }
// }

// let human1 = new Human('Tran Thi B ', 11)
// console.log(human1)
// let student1 = new Student('Nguyen Van A' , 18 )
// console.log(student1)
// student1.learn() // this = student1 >> this.name == student1.name == 'Nguyen Van A'

// // class 
// let student2 = new Student('Nguyen Van V',  19 )
// console.log(student2.name) // this = student2 >> this.name == student2.name == 'Nguyen Van B'
// student2.learn()

// let student3 = { 
//   name : "Nguyen Van C",
//   age : 25 ,
//   learn() {
//     console.log(this.name + ' learning..')
//   }
// }
// student3.learn( )

// // Overload
// function print(number) {
//   console.log(number)
// }

// function print(string) {
//   console.log(string)
// }

// function print(boolean) {
//   console.log(boolean)
// }

// 5. array

let array = [1, 2, 3]
// push() <> pop() , unshift() <> shift()
array.push(4)
console.log("after push" , array) // [1,2,3,4]

array.pop()
console.log("after pop" , array) // [1,2,3]

array.unshift(0)
console.log("after unshift : " , array ) // [0,1,2,3]

array.shift()
console.log("after shift : " , array) // [1,2,3]

// splice() : thêm hoặc xóa phần tử ở bất kì vị trí nào ở mảng 
array.splice(1,2)
console.log("after splice :" , array) // [1]

array = [1,2,3,4]
array.splice(1, 1, 2.1 , 2.2 , 2.3)
console.log("after splice(1, 1, 2.1 , 2.2 , 2.3) " , array) // [1, 2.1 , 2.3 , 2.3] 
array.splice(1, 0, 2.1 , 2.2 , 2.3)
console.log("after splice(1, 1, 2.1 , 2.2 , 2.3) " , array) // [1, 2.1 , 2.3 , 2.3, 2 , 3 , 4] 

// duyệt mảng: forEach()
array.forEach(function(value) {
  console.log(value)
})

// lọc mảng : filter()

array = [1,2,3,4]
let evens = []
for(let number of array) {
  if(isEven(number)) {
    evens.push(number)
  }
}
console.log(evens) // [2,4]

// let evens2 = array.filter(isEven)
// console.log(evens2)

function isEven(number) {
  return number % 2 == 0 
}

let evens2 = array.filter(isEven)
console.log(evens2) // [2,4]
let odds = array.filter(function(number) {
  return number % 2 == 1
})


// biến đổi mảng : map()
array = [1, 2, 3] // >> [2,4,6]
let newArray = array.map(function(number) {
  return number * 2
})
console.log(newArray) // [2, 4, 6]
// tìm kiếm trong mảng hàm điều kiện : find() , findIndex()
array = [1, 2, 3, 4, 5] // >> even : 2 4
let evenFound = array.find(function(number) {
  return number % 2 == 0 
})
console.log(evenFound) // 2

let greaterThan2 = array.find(function(number) {
  return number > 2
})
console.log(greaterThan2) // 3

// tìm kiếm trong mảng theo giá trị : indexOf() , lastIndexOf() , includes()
array = [1,2,3,2,1]
let indexOf2 = array.indexOf(2) // 1 
let lastIndexOf2 = array.lastIndexOf(2) // 3
let notExists = array.indexOf("abc") // -1
let include = array.includes(3) // true
let notInlude = array.inludes(10) // false
console.log(indexOf2) // 1
console.log(lastIndexOf2) // 3 
console.log(notExists) // -1 



// đản ngược mảng : reverse()




// 6. async - await 

// try - catch 