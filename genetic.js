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

    var { firstChildGenes, secondChildGenes } = crossover(fittest, secondFittest)

    if(Math.random() % 7 < 5) {
      firstChildGenes = mutate(firstChildGenes)
      secondChildGenes = mutate(secondChildGenes)
    }

    firstChild = {}
    firstChild.genes = firstChildGenes
    firstChild.fitness = calcFitness(firstChildGenes)
    // firstChildFitness = calcFitness(firstChild)

  }
  


  return population
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
    individual.genes[i] = geneChoices[Math.floor(Math.random() * geneChoices.length)]
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

  for(var i = 0; i < population.length; i++) {
    var fitness = calcFitness(population[i])

    if(fitness > maxFit1) {
      maxFit2 = maxFit1
      maxFit1 = fitness
    } else if(fitness > maxFit2) {
      maxFit2 = fitness
    }
  }

  return { fittest: maxFit1, secondFittest: maxFit2 }
}

function addFittestOffspring() {

}

function mutation(individual) {
  var mutationPoint = getRandomInt(0, 100)

  // Flip over the gene
  if(individual[mutationPoint] === 0) {
    individual[mutationPoint] = 1 
  } else {
    individual[mutationPoint] = 0 
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