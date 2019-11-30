var geneLength = 100
var geneChoices = [0,1]
var fittest = 0 
var populationSize = 100
var generationCount = 0 

function evolute(population = false, callback) {
  generationCount = generationCount + 1 

  if(!population) {
    population = initializePopulation()

    callback(population)
  } else {
    var { fittest, secondFittest } = getFittestParents(population)

    var children = crossover(fittest, secondFittest)

    if(Math.random() % 7 < 0.5) {
      mutateChildren(children.firstChild, children.secondChild, (firstChild, secondChild) => {
        var leastFittestIndex = getLeastFittestIndex(population)
        population[leastFittestIndex] = firstChild.fitness > secondChild.fitness ? firstChild : secondChild

        callback(population)
      })
    } else {
      console.log(`Generation ${generationCount} Fittest: ${fittest.fitness}`)
      callback(population)
    }
  }
}

function getLeastFittestIndex(population) {
  var leastFit = 1000
  var leastFitIndex = 0 

  for(var i = 0; i < population.length; i++) {
    var fitness = calcFitness(population[i].genes)

    if(fitness < leastFit) {
      leastFit = fitness
      leastFitIndex = i
    }
  }

  return leastFitIndex
}

function initializePopulation() {
  var population = []
  for (var i = 0; i < populationSize; i++) {
    population[i] = initializeIndividual()
  }

  return population
}

function initializeIndividual() {
  var individual = {}

  individual.genes = []
  for(var i = 0; i < geneLength; i++) {
    var random = Math.random() 
    individual.genes[i] = geneChoices[random <= 0.7 ? 0 : 1]
  }

  individual.fitness = calcFitness(individual.genes)

  return individual
}

function calcFitness(individual) {
  return individual.reduce((a,b) => a + b, 0)
}

function calculateFitness(population) {
  for(var i = 0; i < population.length; i++) {
    fitness = individual.reduce((a,b) => a + b, 0) 
  }
}

function getFittestParents(population) {
  var maxFit1 = 0 
  var maxFit2 = 0 
  var fittestIndividual = {}
  var secondFittestIndividual = {}
  for(var i = 0; i < population.length; i++) {
    var fitness = calcFitness(population[i].genes)

    if(fitness > maxFit1) {
      maxFit2 = maxFit1
      maxFit1 = fitness
      secondFittestIndividual = fittestIndividual
      fittestIndividual = population[i]
    } else if(fitness > maxFit2) {
      maxFit2 = fitness
      secondFittestIndividual = fittestIndividual
    }
  }

  return { fittest: fittestIndividual, secondFittest: secondFittestIndividual }
}

function mutateChildren(firstChild, secondChild, callback) {

  var firstMutationPoint = getRandomInt(0, 100)
  var secondMutationPoint = getRandomInt(0, 100)

  var mutatedFirstChild = {}
  mutatedFirstChild.genes = Object.assign([], firstChild.genes, {[firstMutationPoint]: firstChild.genes[firstMutationPoint] == 1 ? 0 : 1 })
  mutatedFirstChild.fitness = calcFitness(mutatedFirstChild.genes)

  var mutatedSecondChild = {} 
  mutatedSecondChild.genes = Object.assign([], secondChild.genes, {[secondMutationPoint]: secondChild.genes[secondMutationPoint] == 1 ? 0 : 1 })
  mutatedSecondChild.fitness = calcFitness(mutatedSecondChild.genes)

  callback(mutatedFirstChild, mutatedSecondChild)
}

function crossover(fittest, secondFittest) {
  var crossoverPoint = getRandomInt(0, 100) 

  var firstChild = fittest
  var secondChild = secondFittest

  for(var i = 0; i < crossoverPoint; i++) {
    firstChild.genes[i] = secondFittest.genes[i]
    secondChild.genes[i] = firstChild.genes[i]
  }

  return { firstChild: firstChild, secondChild: secondChild }
}

function selection(population) {
  var fittest = getFittest(population)
  var secondFittest = getSecondFittest(population)

  return { fittest: fittest, secondFittest: secondFittest }
}