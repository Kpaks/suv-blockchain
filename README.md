# Final Project for Blockchain course - Sistema Único de Saúde

O objetivo deste projeto é a criação de um sistema de administração de vacinas atendendo os diversos participantes deste processo: os Governos Federais e Estaduais, as unidades de saúde pública e as unidades clínicas particulares e os cidadãos. No nível do usuário final o sistema criará, através do uso da Blockchain, um registro único, acessível e permanente das vacinas que cada cidadão recebeu, garantindo um registro único e disponível de seu histórico de vacinação. No nível intermediário, o sistema registra cada uma das unidades de saúde, públicas ou particulares, o recebimento dos lotes de vacinas em cada uma dessas unidades e os profissionais de saúde atuantes em cada uma delas. Enquanto no nível mais alto será possível o registro de campanhas e estratégias de distribuição de vacinas e doses, conforme a distribuição da população, focos de endemias ou epidemias entre outras estratégias.

## Git Clone

https://github.com/bpfrare/suv.git

## NPM INSTALL

npm install

## Start web server

./node_modules/.bin/ws -v -p 8888 --rewrite '/api -> http://localhost:8545' --rewrite '/eth/ -> https://api.coinmarketcap.com/v1/ticker/ethereum/' --rewrite '/usdbrl/ -> http://economia.awesomeapi.com.br/USD-BRL/'

## Start etherium server

./node_modules/.bin/ganache-cli --db ./db -i="1108" -d --mnemonic="Todas as vacinas aqui"

 - Vaccine Registration Ledger


## Contract address

0x1bf15F562ebD6e1b66845f1F9fe0610e50DC67A4


## Compile

./node_modules/.bin/truffle compile

## Migrate (Deploy)

./node_modules/.bin/truffle migrate

## Export ABI

./node_modules/.bin/truffle-export-abi

## Console

./node_modules/.bin/truffle console

### get Contract

let c = await SarampoRubeolaCaxumba.deployed()

## Interact with SarampoRubeolaCaxumba (Console)

### Create Token (Vaccine)

a = await web3.eth.getAccounts()
c.mintWithTokenURI(a[0], 1, 'teste')

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721MetadataMintable.sol#L19


### Get Token URI (Metadata)

c.tokenURI(tokenId)