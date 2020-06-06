
class CatFighter {
    constructor(id,name,age,catInfo,record,image){
        this.id = id
        this.name = name;
        this.age = age;
        this.catInfo = catInfo;
        this.record = record
        this.image = image;
    }
}

    class FightGame {
        constructor(){
            this.firstFighter = null
            this.secondFighter = null
            this.firstFighters = []
            this.secondFighters = []
            this.areFighting = false
            this.init()
        }

        init(){
            console.log("Koja kita");
            let firstFighterButtons = document.querySelector('#firstSide').querySelectorAll('.fighter-box')
            Array.from(firstFighterButtons).forEach(element => {
                let imageSource = element.querySelector('img').getAttribute('src')
                let jsonData = JSON.parse([element.dataset['info']])
                let fighter = new CatFighter(jsonData.id,jsonData.name,jsonData.age,jsonData.catInfo,jsonData.record,imageSource)
                this.firstFighters.push(fighter)
            });
            firstFighterButtons.forEach((button) => {
                button.addEventListener('click', this.selectFirstFighter.bind(this))
              })

            let secondFighterButtons = document.querySelector('#secondSide').querySelectorAll('.fighter-box')
            Array.from(secondFighterButtons).forEach(element => {
                let imageSource = element.querySelector('img').getAttribute('src')
                let jsonData = JSON.parse([element.dataset['info']])
                let fighter = new CatFighter(jsonData.id,jsonData.name,jsonData.age,jsonData.catInfo,jsonData.record,imageSource)
                this.secondFighters.push(fighter)
            });
            secondFighterButtons.forEach((button) => {
                button.addEventListener('click',this.selectSecondFighter.bind(this))
            })

            let fightButton = document.querySelector("#generateFight")
            fightButton.addEventListener('click', this.fightButtonClicked.bind(this))

            let randomFightersButton = document.querySelector("#randomFight")
            randomFightersButton.addEventListener("click", this.randomButtonClicked.bind(this))
        }

        fightButtonClicked(event){
            if(this.areFighting == false){
                if(this.firstFighter != null && this.secondFighter != null){
                    this.areFighting = true
                    var timer = setTimeout(this.onTimeoutExpired.bind(this), 3000);
                }
            }
        }

        onTimeoutExpired(){
            this.areFighting = false
            clearTimeout(this.timer)
            this.simulateFight()
        }

        simulateFight(){
            let firstFighterWinChance = this.firstFighter.record.wins/(this.firstFighter.record.wins + this.firstFighter.record.loss)
            let secondFighterWinChance = this.secondFighter.record.wins/(this.secondFighter.record.wins + this.secondFighter.record.loss)
            let winChanceDifference
            let firstFighterWinInterval
            let secondFighterWinInterval
            if(firstFighterWinChance <= secondFighterWinChance){
                winChanceDifference = secondFighterWinChance - firstFighterWinChance
                if(winChanceDifference > 10){
                    secondFighterWinInterval = [0,69]
                    firstFighterWinInterval = [70,99]
                }else{
                    secondFighterWinInterval = [0,59]
                    firstFighterWinInterval = [60,99]
                }
            }else{
                winChanceDifference = firstFighterWinChance - secondFighterWinChance
                if(winChanceDifference > 10){
                    firstFighterWinInterval = [0,69]
                    secondFighterWinInterval = [70,99]
                }else{
                    firstFighterWinInterval = [0,59]
                    secondFighterWinInterval = [60,99]
                }
            }
            
            let result = Math.floor(Math.random() * 101)
            console.log("Result:",result)
            console.log("FirstInterval min: ",firstFighterWinInterval[0],",max:",firstFighterWinInterval[1])
            console.log("SecondInterval min: ",secondFighterWinInterval[0],",max:",secondFighterWinInterval[1])
            if(result >= firstFighterWinInterval[0] && result <= firstFighterWinInterval[1]){
                this.updateRecord(this.firstFighter,this.secondFighter)
                document.querySelector("#firstFighterImg").setAttribute("style", "border: 5px solid green;")
                document.querySelector("#secondFighterImg").setAttribute("style", "border: 5px solid red;")
            }else{
                this.updateRecord(this.secondFighter,this.firstFighter)
                document.querySelector("#secondFighterImg").setAttribute("style", "border: 5px solid green;")
                document.querySelector("#firstFighterImg").setAttribute("style", "border: 5px solid red;")
            }
        }

        randomButtonClicked(event){
            this.resetUI()
            if(this.areFighting == false){
                let firstFighterId = Math.floor(Math.random() * this.firstFighters.length)
                let secondFighterId = Math.floor(Math.random() * this.secondFighters.length)
                while(firstFighterId === secondFighterId){
                    secondFighterId = Math.floor(Math.random() * this.secondFighters.length)
                }
                this.firstFighter = this.firstFighters[firstFighterId]
                this.secondFighter = this.secondFighters[secondFighterId]
                this.setFirstFighterUI(this.firstFighter)
                this.setSecondFighterUI(this.secondFighter)
            }
        }

        updateRecord(winner,losser){
            this.firstFighters.forEach((fighter) =>{
                if(winner.id == fighter.id){
                    fighter.record.wins += 1
                    let element = document.querySelector("#firstSide").querySelector(`#id${fighter.id}`)
                    console.log(`#id${fighter.id}`);
                    element.setAttribute("data-info", JSON.stringify({
                        "id": fighter.id,
                        "name": fighter.name ,
                        "age" : fighter.age,
                        "catInfo": fighter.catInfo,
                        "record" : {
                            "wins":  fighter.record.wins,
                            "loss": fighter.record.loss
                        }
                    }))
                    console.log("New record, wins:", element.dataset["info"])
                }
                if(losser.id == fighter.id){
                    fighter.record.loss += 1
                    let element = document.querySelector("#firstSide").querySelector(`#id${fighter.id}`)
                    console.log(`#id${fighter.id}`);
                    element.setAttribute("data-info", JSON.stringify({
                        "id": fighter.id,
                        "name": fighter.name ,
                        "age" : fighter.age,
                        "catInfo": fighter.catInfo,
                        "record" : {
                            "wins":  fighter.record.wins,
                            "loss": fighter.record.loss
                        }
                    }))
                    console.log("New record, wins:", element.dataset["info"]["record"])
                }
            })
            this.secondFighters.forEach((fighter) => {
                if(winner.id == fighter.id){
                    fighter.record.wins += 1
                    let element = document.querySelector("#secondSide").querySelector(`#id${fighter.id}`)
                    console.log("Old record, wins:", element.dataset["info"])
                    element.setAttribute("data-info", JSON.stringify({
                        "id": fighter.id,
                        "name": fighter.name ,
                        "age" : fighter.age,
                        "catInfo": fighter.catInfo,
                        "record" : {
                            "wins":  fighter.record.wins,
                            "loss": fighter.record.loss
                        }
                    }))
                    console.log("New record, wins:", element.dataset["info"])
                }
                if(losser.id == fighter.id){
                    fighter.record.loss += 1
                    let element = document.querySelector("#secondSide").querySelector(`#id${fighter.id}`)
                    console.log("Old record, wins:", element.dataset["info"])
                    element.setAttribute("data-info", JSON.stringify({
                        "id": fighter.id,
                        "name": fighter.name ,
                        "age" : fighter.age,
                        "catInfo": fighter.catInfo,
                        "record" : {
                            "wins":  fighter.record.wins,
                            "loss": fighter.record.loss
                        }
                    }))
                    console.log("New record, wins:", element.dataset["info"])
                }
            })
            this.setFirstFighterUI(this.firstFighter)
            this.setSecondFighterUI(this.secondFighter)
        }

        resetUI(){
            document.querySelector("#firstFighterImg").setAttribute("style", "")
            document.querySelector("#secondFighterImg").setAttribute("style", "")
        }

        setFirstFighterUI(fighter){
            console.log(fighter.name);
            let firstFighterImage = document.querySelector('#firstFighterImg')
            firstFighterImage.src = fighter.image
            document.querySelector('#firstSide').querySelector('.name').innerHTML = fighter.name
            document.querySelector('#firstSide').querySelector('.age').innerHTML = fighter.age
            document.querySelector('#firstSide').querySelector('.skills').innerHTML = fighter.catInfo
            document.querySelector('#firstSide').querySelector('.wins').innerHTML = fighter.record.wins
            document.querySelector('#firstSide').querySelector('.loss').innerHTML = fighter.record.loss
        }

        setSecondFighterUI(fighter){
            console.log(fighter.name);
            let firstFighterImage = document.querySelector('#secondFighterImg')
            firstFighterImage.src = fighter.image
            document.querySelector('#secondSide').querySelector('.name').innerHTML = fighter.name
            document.querySelector('#secondSide').querySelector('.age').innerHTML = fighter.age
            document.querySelector('#secondSide').querySelector('.skills').innerHTML = fighter.catInfo
            document.querySelector('#secondSide').querySelector('.wins').innerHTML = fighter.record.wins
            document.querySelector('#secondSide').querySelector('.loss').innerHTML = fighter.record.loss
        }

        selectFirstFighter(event){
            if(this.areFighting == false){
                this.resetUI()
                let id = event.target.id
                this.firstFighters.forEach((fighter) => {
                    if(fighter.id == id){
                        this.firstFighter = fighter
                        if(this.secondFighter === null || this.secondFighter.id !== this.firstFighter.id){
                            this.setFirstFighterUI(this.firstFighter)
                        }
                    }
                })
                
            }
        }

        selectSecondFighter(event){
            if(this.areFighting == false){
                this.resetUI()
                let id = event.target.id
                this.secondFighters.forEach((fighter) => {
                    if(fighter.id == id){
                        this.secondFighter = fighter
                        if(this.firstFighter === null || this.firstFighter.id !== this.secondFighter.id){
                            this.setSecondFighterUI(this.secondFighter)
                        }
                    }
                })
                
            }
        }
    }

let fightGame = new FightGame()

