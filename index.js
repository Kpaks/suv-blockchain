provider = new Web3.providers.HttpProvider("http://127.0.0.1:8888/api");
web3 = new Web3(provider);

$(document).ready(function() {
    
    $.getJSON('/build/contracts/SarampoRubeolaCaxumba.json', function(abi) {
        contract = TruffleContract(abi);
        contract.setProvider(provider);
        contract.deployed().then((c) => {
            contract = c;
            $("#address").html(contract.address);
                contract.totalSupply().then((response => {
                    web3.eth.getAccounts().then((accounts) => {
                        contract.balanceOf(accounts[0]).then((validVaccines) => {
                            callChart(response.words[0],validVaccines);
                        });
                    });
               }));  
        });
        // Load accounts
        web3.eth.getAccounts().then((accounts) => {
            // Showing all accounts
            $select = $('#selectAccount');
            $transOrigem = $('#transOrigem');
            $transDest = $('#transDest');
            $checkOrigem = $('#checkOrigem');

            $select.append($('<option>').attr('value', accounts[0]).text(accounts[0]));
            $transOrigem.append($('<option>').attr('value', accounts[0]).text(accounts[0]));

            accounts.forEach(function(c) {
                // append option
                $transDest.append($('<option>').attr('value', c).text(c));
                $checkOrigem.append($('<option>').attr('value', c).text(c));
            });
        });
    });

    //blockchain status
    web3.eth.getBlockNumber().then((f) => {
        blockNumber = f;
        $("#blockNumber").html(blockNumber);
            web3.eth.getBlock(f).then((response) =>{
                $("#gasLimit").html(response.gasLimit);
                $("#gasUsed").html(response.gasUsed);
            });
            web3.eth.getBlock(f).then((response) =>{
                $.getJSON('/eth/', function(eth){
                    $.getJSON('/usdbrl/', function(real){ 
                        $("#dollarPrice").html(Number(response.gasUsed * eth[0].price_usd * real[0].low * 0.00000002).toFixed(2) + " BRL");
                    });  
                });
            });
        })


        web3.eth.getGasPrice().then((f) => {
            gasLimit = f;
            $("#gasPrice").html(gasLimit + " wei");
        })
        
        
        
    //Create Vaccine
    $('#btnCreateVaccine').click(function() {
        var data = {};
        var account = $('#selectAccount').val();
        var tokenId = $('#inputCreateTokenid').val();
        data['expiration_date'] = $('#inputCreateTokenDate').val();
        data['status'] = "Valid";
        contract.mintWithTokenURI(account, tokenId, JSON.stringify(data), {from: account}).then((r) => {
            document.location.reload(true);
        });
    });

    //Transfer Vaccine
    $('#btnTransVaccine').click(async function() {
        var origin = $('#transOrigem').val();
        var dest = $('#transDest').val();
        var tokenId = Number($('#transToken').val());
        await contract.safeTransferFrom(origin, dest, tokenId, {from: origin}).then((r) => {
            document.location.reload(true);
        });
    }); 

    //Check Wallet
    $('#btnCheckWallet').click(function() {
        contract.balanceOf($('#checkOrigem').val()).then((r) => {
            $('#checkVacineTriple').text(r);
        });

        contract.totalSupply().then((response => {
            console.log(response.words[0]);
        }));
    });

    //Check expiration date
    $('#btnExpiration').click(function() {
        console.log($('#expirationToken').val());
        contract.tokenURI($('#expirationToken').val()).then((r) => {
            var data = JSON.parse(r)
            $('#expirationValue').text('');
            $('#statusValue').text('');
            $('#expirationValue').text(data['expiration_date']);
            $('#statusValue').text(data['status']);
        });
    });
    
    //call Chart
    function callChart(totalSupply,validVaccines){
        var myBarChart = new Chart(document.getElementById("myBarChart"), {
            type: 'bar',
            data: {
              labels: ["Total", "Não Aplicada", "Aplicada"],
              datasets: [
                {
                  label: "Status das Vacinas",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: [totalSupply,validVaccines,totalSupply-validVaccines]
                }
              ]
            },
            options: {
              legend: { display: false },
              scales: {
                xAxes: [{
                    barPercentage: 0.1
                }]},
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
              title: {
                display: true,
                text: 'Status das Vacinas'
              }
            }
          });
    };
    
});