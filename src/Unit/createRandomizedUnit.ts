import { Portfolio } from "../Portfolio/Portfolio"
import { newUnit, Unit } from "./Unit"

export default function createRandomizedUnit(portfolio: Portfolio, parentGuid?: string): Unit {
  const unit = newUnit(parentGuid)
  unit.name = randomName()

  const fields = portfolio.fieldGuids.map((guid) => portfolio.fieldsByGuid[guid])
  const userGuids = portfolio.userGuids

  fields.forEach((field) => {
    if (parentGuid !== undefined && field.propogateDown) return

    switch (field.t) {
      case "DateField":
        break
      case "NumberField":
        unit.fieldValsByGuid[field.guid] = {
          t: "Number",
          val: randomModifiedFibonacci(),
        }
        break
      case "SelectField":
        const option = getRandomVal(field.selectOptions)
        unit.fieldValsByGuid[field.guid] = {
          t: "Select",
          vals: {
            [option]: 1,
          },
        }
        break
      case "UserField":
        const userGuid = getRandomVal(userGuids)
        unit.fieldValsByGuid[field.guid] = {
          t: "User",
          guids: {
            [userGuid]: 1,
          },
        }
        break
    }
  })

  return unit
}


function randomModifiedFibonacci(): number {
  const fib = [1, 2, 3, 5, 8, 13, 20, 40, 100]
  return fib[Math.floor(Math.random() * fib.length)]
}

function randomName() {
  const verbs = [
    "Build",
    "Fix",
    "Optimize",
    "Refactor",
    "Test",
    "Deploy",
    "Monitor",
    "Document",
    "Design",
    "Review",
  ]
  const nouns = [
    "App",
    "Website",
    "Database",
    "API",
    "Server",
    "Client",
    "Framework",
    "Library",
  ]

  return `${getRandomVal(verbs)} the ${getRandomVal(nouns)}`
}

function getRandomVal<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
