function search() {
    var query = document.getElementById("search-box").value;
  
  
    fetch("http://localhost:3000/solr-proxy/?q=" + query)
      .then((response) => response.json())
      .then((data) => {
        var resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = "";
  
        if (data.response.numFound > 0) {
          data.response.docs.forEach((doc, index) => {
            var resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            var resultNumber = index + 1;
            resultItem.innerHTML =
            "<span class='result-number'>" + resultNumber +". "+ "</span>" +
            "<a href='" + doc.id + "'>" + doc.id + "</a>" +
            "<h5>" + doc.title + "</h5>";
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
  