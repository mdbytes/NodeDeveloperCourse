// const square = function (x) {
//     return x*x
// }

// const square = (x) => {
//     return x*x
// }

//const square = (x) => x*x

//console.log(square(2))

const event = {
  name: 'birthday party',
  guestList: ['martin', 'rose', 'casey', 'kyle', 'noah', 'hollyann'],
  printGuestList () {
    console.log('Guest List for ' + this.name)
    this.guestList.forEach(guest => {
      console.log(guest + ' is attending the ' + this.name)
    })
  }
}

event.printGuestList()
