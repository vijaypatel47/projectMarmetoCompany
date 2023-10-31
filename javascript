let searchInputEl = document.getElementById("searchInput");
let listViewButton = document.getElementById("listButton");
let gridViewButton = document.getElementById("gridButton");
let productResultContainer = document.getElementById("resultContainer");
let search_result;

function displayProductObject(product) {

    product.data.map((forEach) => {
        let listContainerEl = document.createElement("div")
        listContainerEl.classList.add("list-view")
        productResultContainer.appendChild(listContainerEl)
        let imageEl = document.createElement("img")
        imageEl.classList.add("image-size")
        imageEl.setAttribute("src", forEach.product_image)
        imageEl.textContent = forEach.product_badge
        listContainerEl.appendChild(imageEl)

        let dataListContainer = document.createElement("div")
        dataListContainer.classList.add("data-list")
        listContainerEl.appendChild(dataListContainer)
        let titleEl = document.createElement("h1")
        titleEl.classList.add("heading")
        titleEl.textContent = forEach.product_title
        dataListContainer.appendChild(titleEl)
        let paragraphEl1 = document.createElement("p1")
        paragraphEl1.classList.add("para")
        paragraphEl1.textContent = forEach.product_variants.map(item => item.v1)
        dataListContainer.appendChild(paragraphEl1)
        let paragraphEl2 = document.createElement("p2")
        paragraphEl2.classList.add("para")
        paragraphEl2.textContent = forEach.product_variants.map(item => item.v2)
        dataListContainer.appendChild(paragraphEl2)
        let paragraphEl3 = document.createElement("p3")
        paragraphEl3.classList.add("para")
        paragraphEl3.textContent = forEach.product_variants.map(item => item.v3)
        dataListContainer.appendChild(paragraphEl3)

    })
}

async function fetchAndDisplayProducts() {
    let url = "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"

    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(await
            function(response) {
                return response.json()
            })
        .then(await
            function(jsonData) {
                search_result = jsonData

                if (search_result !== "") {
                    displayProductObject(search_result)
                } else {
                    console.log("error")
                }
            });

}

function displaysearchProject(forEach) {
    productResultContainer.textContent = ""
    let listContainerEl = document.createElement("div")
    listContainerEl.classList.add("list-view")
    productResultContainer.appendChild(listContainerEl)
    let imageEl = document.createElement("img")
    imageEl.classList.add("image-size")
    imageEl.setAttribute("src", forEach.product_image)
    imageEl.textContent = forEach.product_badge
    listContainerEl.appendChild(imageEl)

    let dataListContainer = document.createElement("div")
    dataListContainer.classList.add("data-list")
    listContainerEl.appendChild(dataListContainer)
    let titleEl = document.createElement("h1")
    titleEl.classList.add("highlight")
    titleEl.textContent = forEach.product_title
    dataListContainer.appendChild(titleEl)
    let paragraphEl1 = document.createElement("p1")
    paragraphEl1.classList.add("para")
    paragraphEl1.textContent = forEach.product_variants.map(item => item.v1)
    dataListContainer.appendChild(paragraphEl1)
    let paragraphEl2 = document.createElement("p2")
    paragraphEl2.classList.add("para")
    paragraphEl2.textContent = forEach.product_variants.map(item => item.v2)
    dataListContainer.appendChild(paragraphEl2)
    let paragraphEl3 = document.createElement("p3")
    paragraphEl3.classList.add("para")
    paragraphEl3.textContent = forEach.product_variants.map(item => item.v3)
    dataListContainer.appendChild(paragraphEl3)
}

function renderProducts(event) {
    if (event.key === "Enter") {
        searchInputEl.textContent = ""
        productResultContainer.textContent = ""
        const searchKey = searchInputEl.value.toLowerCase();
        search_result.data.map(Item => {
            if (Item.product_title.toLowerCase().includes(searchKey)) {
                displaysearchProject(Item);
            }
        })
    } else {
        productResultContainer.textContent = ""
        displayProductObject(search_result)
    }
}

searchInputEl.addEventListener("keydown", renderProducts);

listViewButton.addEventListener("click", () => {
    productResultContainer.classList.remove("grid-view");
    productResultContainer.classList.add("list-view");
})

gridViewButton.addEventListener("click", () => {
    productResultContainer.className = "grid-view";
})

fetchAndDisplayProducts();
