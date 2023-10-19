document.addEventListener("DOMContentLoaded", function () {
    const cepForm = document.getElementById("cepForm");
    const cepInput = document.getElementById("cepInput");
    const enderecoCard = document.getElementById("enderecoCard");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const cepInfo = document.getElementById("cepInfo");
    const logradouroInfo = document.getElementById("logradouroInfo");
    const bairroInfo = document.getElementById("bairroInfo");
    const cidadeInfo = document.getElementById("cidadeInfo");
    const estadoInfo = document.getElementById("estadoInfo");

    cepForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const cepValue = cepInput.value.replace(/\D/g, "");

        if (cepValue.length !== 8) {
            alert("CEP inválido. Certifique-se de digitar um CEP válido com 8 dígitos!");
            return;
        }

        loadingIndicator.classList.remove("hidden");
        enderecoCard.classList.add("hidden");

        fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.erro) {
                    alert("CEP não encontrado. Verifique se o CEP está correto.");
                    loadingIndicator.classList.add("hidden");
                } else {
                    cepInfo.textContent = data.cep;
                    logradouroInfo.textContent = data.logradouro;
                    bairroInfo.textContent = data.bairro;
                    cidadeInfo.textContent = data.localidade;
                    estadoInfo.textContent = data.uf;

                    enderecoCard.classList.remove("hidden");
                    loadingIndicator.classList.add("hidden");
                }
            })
            .catch((error) => {
                console.error("Ocorreu um erro na consulta:", error);
                loadingIndicator.classList.add("hidden");
            });
    });

    const showMapButton = document.getElementById("showMapButton");

    showMapButton.addEventListener("click", function () {
        // const cepValue = cepInput.value.replace(/\D/g, "");

        // if (cepValue.length !== 8) {
        //     alert("CEP inválido. Certifique-se de digitar um CEP válido com 8 dígitos.");
        //     return;
        // }

        const address = `${logradouroInfo.textContent}, ${bairroInfo.textContent}, 
                         ${cidadeInfo.textContent}, ${estadoInfo.textContent}`;

        // Construa o URL para abrir o Google Maps
        const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

        // Abra o Google Maps em uma nova aba
        window.open(googleMapsUrl, "_blank");
    });

});
