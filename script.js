function search() {
  var query = document.getElementById("search-box").value;


  fetch("http://localhost:8983/solr/nutch/query?q=" + query)
    .then((response) => response.json())
    .then((data) => {
      var resultsContainer = document.getElementById("results-container");
      resultsContainer.innerHTML = "";

      if (data.response.numFound > 0) {
        // Hiển thị kết quả tìm kiếm
        data.response.docs.forEach((doc) => {
          var resultItem = document.createElement("div");
          resultItem.classList.add("result-item");
          resultItem.innerHTML =
            "<h3>" + doc.title + "</h3><p>" + doc.content + "</p>";
          resultsContainer.appendChild(resultItem);
        });
      } else {
        // Hiển thị thông báo nếu không có kết quả
        var noResults = document.createElement("p");
        noResults.textContent = "No results found.";
        resultsContainer.appendChild(noResults);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
