var geneLength = 100
var geneChoices = [0,1]
var fittest = 0 
var populationSize = 100
var generationCount = 0 

function evolute(population = false) {

  if(!population) {
    population = initializePopulation()

    return population
  } else {
    var { fittest, secondFittest } = getFittestParents(population)

    var children = crossover(fittest, secondFittest)
    var firstChild = children.firstChild
    var secondChild = children.secondChild

    if(Math.random() % 7 < 0.5) {
      firstChild = mutate(children.firstChild)
      secondChild = mutate(children.secondChild)
    }

    var leastFittestIndex = getLeastFittestIndex(population)

    population[leastFittestIndex] = firstChild.fitness > secondChild.fitness ? firstChild : secondChild

  }
  
  return population
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
  console.log({ fittest: fittestIndividual })
  return { fittest: fittestIndividual, secondFittest: secondFittestIndividual }
}

function mutate(individual) {
  var mutationPoint = getRandomInt(0, 100)
  // Flip over the gene
  if(individual.genes[mutationPoint] === 0) {
    individual.genes[mutationPoint] = 1 
  } else {
    individual.genes[mutationPoint] = 0 
  }

  return individual 
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