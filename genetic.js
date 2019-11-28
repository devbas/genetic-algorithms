var geneLength = 100
var geneChoices = [0,1]
var fittest = 0 
var populationSize = 100

function initializePopulation() {
  var population = []
  for (var i = 0; i < populationSize; i++) {
    population[i] = initializeIndividual()
  }

  return population
}

function initializeIndividual() {
  var genes = []
  for(var i = 0; i < geneLength; i++) {
    genes[i] = geneChoices[Math.floor(Math.random() * geneChoices.length)]
  }

  return genes
}

function calcFitness(individual) {
  return individual.reduce((a,b) => a + b, 0)
}

function getFittest(population) {
  var maxFit = 0
  var fittestIndividual = []

  for(var i = 0; i < population.length; i++) {
    var fitness = calcFitness(population[i])

    if(fitness > maxFit) {
      maxFit = fitness 
      fittestIndividual = population[i]
    }
  }

  return fittestIndividual
}

function getSecondFittest(population) {
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

  return { maxFit1: maxFit1, maxFit2: maxFit2 }
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

function crossover() {

}

function selection(population) {
  var fittest = getFittest(population)
  var secondFittest = getSecondFittest(population)

  return { fittest: fittest, secondFittest: secondFittest }
}