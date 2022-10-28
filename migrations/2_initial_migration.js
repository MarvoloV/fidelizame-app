const NegocioFidelizado = artifacts.require("NegocioFidelizado");

module.exports = function(deployer) {
  deployer.deploy(NegocioFidelizado, "Tiendas Tambo", "PTM", 10000);
};

// NAME_: Tiendas Tambo
// SYMBOL_: PTM
// TOTALSUPPLY_: 10000